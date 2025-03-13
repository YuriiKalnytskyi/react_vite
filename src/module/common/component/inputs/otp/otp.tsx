import { getIn, useFormikContext } from 'formik';
import { ChangeEvent, FocusEvent, KeyboardEvent, useMemo } from 'react';

import { IMargin } from '@/module/common/types';

import * as Styled from './otp.styled.ts';

export interface IOTPInput extends IMargin {
  name: string;
  valueLength: number;
  width?: string;
  height?: string;
  error?: boolean;
  noFormikValue?: {
    value: string;
    setFieldValue: (name: string, value: string) => void;
  };
}

export const RE_DIGIT = new RegExp(/^\d+$/);

export const OTP = ({ valueLength, name, noFormikValue, error, ...props }: IOTPInput) => {
  const { value, setFieldValue } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        setFieldValue: noFormikValue.setFieldValue
      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { values, setFieldValue } = useFormikContext();

      return {
        value: getIn(values, name) ?? '',
        setFieldValue
      };
    }
  })();

  const onChange = (_value: string) => {
    setFieldValue(name, _value);
  };

  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    // only delete digit if next input element has no value
    // const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    // if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
    //     return;
    // }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);

      const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
        nextElementSibling.focus();
      }
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    // keep the selection range position
    // if the same digit was typed
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }

    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }

    focusToPrevInput(target);
  };

  const inputOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    // keep focusing back until previous input
    // element has value
    const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <Styled.OtpContainer {...props}>
      {valueItems.map((digit, idx) => (
        <Styled.OtpInput
          key={idx}
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          pattern='\d{1}'
          maxLength={valueLength}
          className='otp-input'
          value={digit}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
          onChange={(e) => inputOnChange(e, idx)}
        />
      ))}
    </Styled.OtpContainer>
  );
};

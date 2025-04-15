import { getIn, useFormikContext } from 'formik';
import { RefObject, useState } from 'react';
import { DateRange, DaySelectionMode } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import calendarIcon from '@/assets/icons/default/calendar.svg';
import closeIcon from '@/assets/icons/default/close-icon.svg';
import { useClickOutside, useIsMobile } from '@/module/common/hooks';
import { IInputDefault } from '@/module/common/types';
import { MEDIA } from '@/theme';
import { dateTransform, functionStub } from '@/utils';

import { Input } from '../index';
import * as Styled from './calendar.styled';

export type DateSelection = DateRange | Date[] | Date | undefined;

export interface ICalendarProps extends IInputDefault {
  readOnly?: boolean;
  width?: string;
  height?: string;
  isIcon?: boolean;
  visibleOfMonths?: 1 | 2;
  noFormikValue?: {
    value: DateSelection;
    setFieldValue: (name: string, value: DateSelection) => void;
  };
  disabledDay?: Date;
  mode?: DaySelectionMode;
  isFlexLabel?: boolean;
  isSelectYearOrMounts?: { fromYear?: number; toYear?: number };
}

const CalendarFormatUtil = <T extends DateSelection>(
  data: T,
  mode: DaySelectionMode | undefined
): string => {
  let filterDate = '';

  if (data && mode === 'range' && 'from' in data && 'to' in data) {
    const startDate = dateTransform(data.from, true);
    const endDate = dateTransform(data.to, true);

    filterDate = `${startDate} - ${endDate.includes('NaN') ? '' : endDate}`;
  }

  if (data && mode === 'single') {
    filterDate = dateTransform(data as Date, true);
  }

  if (data && mode === 'multiple' && Array.isArray(data)) {
    filterDate = data.map((v) => dateTransform(v, true)).join(' - ');
  }

  return filterDate;
};

export const Calendar = ({
  name,
  label,
  width,
  placeholder,
  height,
  noFormikValue,
  readOnly,
  mode,
  isSelectYearOrMounts,
  disabledDay,
  visibleOfMonths,
  ...props
}: ICalendarProps) => {
  const { setFieldValue, value, error, touched } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        setFieldValue: noFormikValue.setFieldValue,
        error: '',
        touched: false
      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setFieldValue, values, errors, touched } = useFormikContext();
      return {
        value: getIn(values, name),
        setFieldValue,
        error: getIn(errors, name),
        touched: getIn(touched, name)
      };
    }
  })();

  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);

  const handleButtonClick = (flag: boolean) => {
    setIsCalendarOpened(flag);
  };

  const onSelect = (data: DateSelection | undefined) => {
    if (data && 'to' in data && data.to) {
      const to = new Date(data.to);
      to.setHours(23, 59, 59, 999);

      setFieldValue(name, { ...data, to });
    } else {
      setFieldValue(name, data);
    }
    mode === 'single' && handleButtonClick(false);
  };

  const selected: DateSelection =
    (mode === 'range' && (value as DateRange)) ||
    (mode === 'multiple' && (value as Date[])) ||
    (mode === 'single' && (value as Date)) ||
    undefined;

  const isMobile = useIsMobile();
  const isTabletS = useIsMobile(MEDIA.tablet);

  const { ref } = useClickOutside(() => {
    if (!isMobile) {
      handleButtonClick(false);
    }
  });
  const CalendarCommon = () => (
    <Styled.Calendar
      mode={mode as any}
      onSelect={onSelect}
      selected={selected as DateSelection}
      numberOfMonths={isTabletS ? 1 : isMobile && visibleOfMonths === 1 ? 2 : visibleOfMonths ?? 2}
      {...(disabledDay ? { disabled: { after: disabledDay } } : {})}
      weekStartsOn={1}
      {...(isSelectYearOrMounts
        ? {
            captionLayout: 'dropdown-buttons',
            fromYear: isSelectYearOrMounts.fromYear ?? 2022,
            toYear: isSelectYearOrMounts.toYear ?? new Date().getFullYear()
          }
        : { captionLayout: 'dropdown' })}
    />
  );

  return (
    <Styled.Wrapper
      ref={ref as RefObject<HTMLDivElement>}
      width={width}
      {...props}
      className='calendarContainer'
    >
      <Input
        noFormikValue={{
          value: CalendarFormatUtil(selected, mode),
          setFieldValue: functionStub,
          error,
          touched
        }}
        name={name}
        label={label}
        placeholder={placeholder}
        width='100%'
        height={height}
        onClick={handleButtonClick.bind(this, !isCalendarOpened)}
        startIcon={{ icon: calendarIcon, background: '#989AA0' }}
        {...(value && {
          endIcon: {
            icon: closeIcon,
            height: '0.625rem',
            onClick: () => {
              onSelect(undefined);
            },
            cursor: 'pointer'
          }
        })}
        isDontChange
        readOnly={readOnly}
      />

      {isCalendarOpened && !isMobile && <CalendarCommon />}

      <Styled.PopupLayoutStyle
        height='50%'
        contentPosition='bottom'
        slidePosition='bottom'
        onClose={() => handleButtonClick(false)}
        open={isCalendarOpened && isMobile}
      >
        <CalendarCommon />
      </Styled.PopupLayoutStyle>
    </Styled.Wrapper>
  );
};

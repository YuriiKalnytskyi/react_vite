import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

import arrowBottom from '@/assets/icons/default/arrow-bottom-icon.svg';
import { Icon } from '@/module/common/component';
import { IIconInput, IMargin } from '@/module/common/types';

import * as Styled from './accordion.styled';

export interface IAccordion extends IMargin {
  visibleBlock: ReactNode | string;
  children: ReactNode;
  icon?: IIconInput;
  isOpen?: boolean;
  name: string;
}

export const Accordion = ({
  children,
  icon,
  name,
  isOpen = false,
  visibleBlock,
  ...props
}: IAccordion) => {
  const [focused, setFocused] = useState(isOpen);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const toggleAccordion = () => {
    const allAccordions = document.querySelectorAll(`details[data-name="${name}"]`);

    allAccordions.forEach((accordion) => {
      if (accordion !== detailsRef.current) {
        accordion.removeAttribute('open');
      }
    });

    if (detailsRef.current) {
      const isOpen = detailsRef.current.hasAttribute('open');
      if (isOpen) {
        setFocused(false);
      } else {
        setFocused(true);
      }
    }
  };

  useEffect(() => {
    const handleToggle = () => {
      if (detailsRef.current) {
        setFocused(detailsRef.current.hasAttribute('open'));
      }
    };

    detailsRef.current?.addEventListener('toggle', handleToggle);
    return () => {
      detailsRef.current?.removeEventListener('toggle', handleToggle);
    };
  }, []);

  const contentVariants = {
    collapsed: { height: 0, opacity: 0, overflow: 'hidden' },
    expanded: { height: 'auto', opacity: 1, overflow: 'visible' }
  };

  return (
    <Styled.Details ref={detailsRef} data-name={name} {...props}>
      <Styled.Summary className='summary' onClick={toggleAccordion}>
        {visibleBlock}
        <Icon
          {...(icon as IIconInput)}
          icon={icon?.icon ?? arrowBottom}
          className={focused ? 'rotate' : ''}
          cursor='pointer'
        />
      </Styled.Summary>

      <AnimatePresence initial={false}>
        {focused && (
          <motion.section
            key='content'
            className='children'
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            variants={contentVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </Styled.Details>
  );
};

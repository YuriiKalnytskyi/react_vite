import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent } from 'react';

import '@/styles/drawer.css';

import { IDrawerProps } from '../../types';
import { Portal } from '../portal';
import { config } from './drawer.config.ts';
import * as Styled from './drawer.styled';

export const Drawer = ({
  children,
  slidePosition = 'right',
  contentPosition = 'right',
  open,
  onClose
}: IDrawerProps) => {
  const { variants, duration } = config[slidePosition];

  const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`backdrop ${[contentPosition]}`}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variants}
            transition={{ duration: duration }}
            onClick={onBackdropClick}
          >
            <motion.div
              variants={variants}
              initial='hidden'
              animate={open ? 'visible' : 'hidden'}
              exit='exit'
              transition={{ duration: duration }}
            >
              <Styled.Block onClick={(e) => e.stopPropagation()}>{children}</Styled.Block>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

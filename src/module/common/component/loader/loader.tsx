import {ILoaderProps} from '../../types';
import * as Styled from './loader.styled';

export const Loader = ({size, variant = 'ring', ...restProps}: ILoaderProps) => (
    <Styled.MyContainer id='Loader'>
        <Styled.Loader size={size ?? 'medium'} {...restProps} variant={variant}>
            {(variant === 'dots' || variant === 'bars') && (
                <>
                    <span/>
                    <span/>
                    <span/>
                </>
            )}
        </Styled.Loader>
    </Styled.MyContainer>
);

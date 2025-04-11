import {ReactNode} from 'react';

import {Loader} from '@/module/common/component';
import {TagCommon, TextCommon} from '@/module/common/styles';
import {FONTS} from '@/theme';

import * as Styled from './drawer.layout.styled';
import {ContentPositionType} from '@/module/common/types';
import {Drawer} from '@/module/common/component';

export interface IDrawerLayout {
    title: string | ReactNode;
    open: boolean;
    isLoading?: boolean;
    onClose: () => void;
    children?: ReactNode;
    slidePosition: ContentPositionType;
    contentPosition: ContentPositionType;
}

export const DrawerLayout = ({
                                 isLoading,
                                 onClose,
                                 open,
                                 children,
                                 title,
                                 slidePosition,
                                 contentPosition
                             }: IDrawerLayout) => {
    return (
        <Drawer
            onClose={onClose}
            open={open}
            contentPosition={contentPosition}
            slidePosition={slidePosition}>
            <Styled.Container>
                {isLoading ? <Loader/> : null}
                <TagCommon fd="row" ai="center">
                    {typeof title === 'string' ? (
                        <TextCommon fw={FONTS.WEIGHTS.semi_bold}>{title}</TextCommon>
                    ) : (
                        <>
                            {title}
                        </>
                    )}
                    <Styled.CloseBtn onClick={onClose}/>
                </TagCommon>

                {children}
            </Styled.Container>
        </Drawer>
    );
};

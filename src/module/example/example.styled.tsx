import styled from 'styled-components';

import { TagCommon } from '@/module/common/styles';
import { SPACES } from '@/theme';

export const Container = styled(TagCommon)`
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20rem;
  position: relative;
`;

export const Sctol = styled(TagCommon)`
  height: 150px;
  display: flex;
  gap: 20px;
  overflow-x: auto;

  padding-bottom: 10px;
`;

export const Net = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACES.l};
  background: #5eb325;

  & > .item {
    flex-grow: 1;
    flex-basis: 200px;
  }
`;
export const Net2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACES.l};
  background: #5eb325;
  justify-content: center;
  & > .item {
    flex: 0 1 200px;
  }
`;

export const NetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${SPACES.l};
  background: #5eb325;
`;
export const NetGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${SPACES.l};
  background: #5eb325;
`;

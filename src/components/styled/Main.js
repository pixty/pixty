import styled from 'styled-components';
import { backroundColor } from './Colors';

export const Main = styled.div.attrs({
  //marginRight: props => props.right || '0px',
})`
  position: absolute;
  right: ${props => props.right };
  left: 0px;
  top: 0px;
  bottom: 0px;
  margin-right: ${props => props.margin };
  transition: all 0.5s ease;
  background: rgba(0,0,0,0.3);
`;

export const RightBar = styled.div.attrs({
  width: props => props.width || '0px',
  opacity: props => props.opacity || 0,
})`
  position: absolute;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  background: none;
  opacity: ${props => props.opacity};
  right: 0px;
  top: 0px;
  padding: 0px;
  font-weight: 300;
  height: 100%;
  z-index: 3;
  transition: all 0.5s ease;
  width: ${props => props.width};
  border-left: 1px solid rgba(0,0,0,0.5);
`;
import styled from 'styled-components';
import { mainColor } from './Colors';

export const Button = styled.button`
  display: block;
  padding: 4px 10px;
  outline: none;
  border-radius: 3px;
  background-color: ${mainColor};
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: ${props => props.size ? props.size : '16px'};
  cursor: pointer;
  user-select: none;
  transition: background ease-out 0.3s;
  &:disabled {
    background-color: #bbb;
  }
  & {
    .button__text {
      transition: 0.5s ease;
    }
  }
  &:hover {
    opacity: 0.8;
  }
  &:active {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    border-left: 1px solid rgba(0, 0, 0, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const CancelButton = styled(Button)`
  color: rgba(255,255,255,0.5);
  background: rgba(0,0,0,0.2);
`;

export const DeleteButton = styled(Button)`
  color: white;
  background: red;
`;

export const RegularButton = styled.button`
  background: ${props => props.primary ? 'white' : 'none'};
  color: ${props => props.primary ? 'black' : 'white'};
  cursor: pointer;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 1px solid white;
  border-radius: 3px;
  transition: all 0.3s ease-out 0.06s;
  outline: none;
  &:hover {
    background: rgba(0,0,0,0.1)
  }
  &:active {
    opacity: 0.6;
  }
`;

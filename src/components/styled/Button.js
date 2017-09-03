import styled from 'styled-components'
import { mainColor } from './Colors'

const Button = styled.button`
  display: block;
  padding: 5px 10px;
  outline: none;
  border-radius: 3px;
  background-color: ${mainColor};
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    border-left: 1px solid rgba(0, 0, 0, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export default Button
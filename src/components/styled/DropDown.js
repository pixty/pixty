import styled from 'styled-components'
import { mainColor } from './Colors'

const DropDown = styled.div`
  position: absolute;
  top: 40px;
  width: auto;
  left: ${props => props.left + 'px'};
  font-size: ${props => props.font_size || '16px' };
  z-index: 100;
  color: black;
  cursor: pointer;
  box-shadow: 2px 2px 15px rgba(0,0,0,0.4);
  transition: opacity 0.5s ease;
  white-space: nowrap;

  & hr {
    background-color: white;
    padding: 0px;
    margin: 0px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }

  & ul li {
    transition: background-color 0.1s ease;
    transition: color 0.1s ease;
    background-color: white;
    padding: 5px 15px;

    & a {
      text-decoration: none;
      color: black;
    }

    &:first-child {
      border-radius: 2px 2px 0px 0px;
      &:hover:before {
        border-bottom: 10px solid ${mainColor};
      }
      &:before {
        position: absolute;
        ${props => props.float === 'right' ? 'right: 7px' : 'left: 7px'};
        top: -10px;
        width: 0;
        height: 0;
        content: '';
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
      }
    }

    &:last-child {
      border-radius: 0px 0px 2px 2px;
    }

    &:only-child {
      border-radius: 2px 2px 2px 2px;
    }

    &:hover {
      background-color: ${mainColor};
      color: white;

      & > a {
        color: white;
      }
    }
  }
`

export default DropDown
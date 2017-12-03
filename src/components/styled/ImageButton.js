import styled from 'styled-components';

const ImageButton = styled.button`
  display: flex;
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  height: ${props => props.height ? props.height : 'auto'};

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  ::before {
    background-image: url(${props => props.src});
    background-size: ${props => props.width} ${props => props.width};
    content: '';
    display: inline-block;
    color: ${props => props.titleColor};
    width: ${props => props.width};
    height: ${props => props.width};
  }
  ::after {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 13px;
    content: '${props => props.title}';
    color: ${props => props.titleColor};
    margin-left: 3px;
  }
`;

export default ImageButton;
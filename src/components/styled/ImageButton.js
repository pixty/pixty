import styled from 'styled-components';

const ImageButton = styled.input`
  display: block;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
`;

export default ImageButton;
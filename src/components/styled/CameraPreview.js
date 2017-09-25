import styled from 'styled-components';
import { mainColor } from './Colors';

const CameraPreview = styled.div`
  background: #111;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.3), inset 0px 0px 10px black;
  border: 1px solid #222;
  z-index: 99;
  cursor: move;
  &:hover {
    border-color: ${mainColor};
  }
`;

export default CameraPreview;
import styled from 'styled-components';
import { mainColor } from './Colors';

const CameraPreview = styled.div`
  background: 'white';
  box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
  border: 1px solid rgba(0,0,0,0.2);
  z-index: 99;
  cursor: move;
  &:hover {
    border-color: ${mainColor};
  }
`;

export default CameraPreview;
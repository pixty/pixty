import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
    position: absolute;
    margin-top: 34px;
    margin-left: -50px;
    text-align: center;
    color: rgba(255,255,255,0.2);
    font-size: 11px;
    width: 100px;
`

const Spinner = (props) => (
  <div>
  { props.noLabel ? null : <Label>identifying process</Label> }
  <StyledSpinner opacity={props.opacity} viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="1"
    />
  </StyledSpinner>
  </div>
);

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  opacity: ${props => props.opacity};

  & .path {
    stroke: #fff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Spinner;


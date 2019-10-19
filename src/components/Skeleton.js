import React from "react";
import styled from "styled-components";

const SkeletonPulse = styled.div`
  display: inline-block;
  height: ${props => (props.height ? `${props.height}px` : "100%")};
  width: ${props => (props.width ? `${props.width}px` : "100%")};
  border-radius: ${props =>
    props.borderRadius ? `${props.borderRadius}px` : "none"};
  
  /* #E2E9EF lightBlue, #CBDEEF darkBlue  #E3E3E3 lightGrey #CFCFD3, darkGrey */  
  background: ${props =>
    props.baseColor
      ? `linear-gradient(90deg, ${props.baseColor} 0%, #f8f8f8 50%, ${
          props.baseColor
        } 100%)`
      : "linear-gradient(90deg, #ddd 1%, #f8f8f8 50%, #ddd 100%);"};
  
  background-position: -80%
  background-size: 400% 400%;
  animation: pulse 1.6s infinite linear;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

const SkeletonLine = styled(SkeletonPulse)`
  &::before {
    content: "\00a0";
  }
`;

const Skeleton = props => {
  // width, height, border-radius
  return <SkeletonLine {...props} />;
};

export default Skeleton;

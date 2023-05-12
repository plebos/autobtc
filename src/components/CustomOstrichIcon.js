// CustomOstrichIcon.js
import React from 'react';
import { ReactComponent as OstrichIcon } from '../assets/images/ostrich.svg';

const CustomOstrichIcon = (props) => {
  return (
    <OstrichIcon
      className={props.className}
      style={props.style}
      onClick={props.onClick}
    />
  );
};

export default CustomOstrichIcon;

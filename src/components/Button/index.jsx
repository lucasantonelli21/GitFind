import "./styles.css";
import React from 'react';

const Button = ({label,onClick}) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
}

 export {Button};


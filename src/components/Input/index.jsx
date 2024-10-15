import "./styles.css";
import React from 'react';

const Input = ({name,value,onChange,placeHolder}) => {
  return (
    <input name={name} value={value} onChange={onChange} placeholder={placeHolder}/>
  );
}

 export {Input};
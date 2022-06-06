import React from 'react';

import './Input.module.scss'

const Input = (props) => {
  const {
    placeholder,
    value,
    styles,
    type,
    onChange,
    onBlur,
    name,
    defaultValue,
    readOnly,
    max
  } = props

  return (
    <>
      <input
        placeholder={placeholder}
        value={value}
        className={styles}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
        max={max}
      />
    </>


  );
};

export default Input;
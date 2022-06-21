import React, {InputHTMLAttributes} from 'react';

import './Input.module.scss'


const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => <input {...props}/>

export default Input;
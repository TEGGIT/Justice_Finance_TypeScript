import React, {InputHTMLAttributes} from 'react';

import './Input.module.scss'

interface InputType extends  InputHTMLAttributes<HTMLInputElement>{

}

const Input: React.FC<InputType> = (props) => <input {...props} />

export default Input;
import React from 'react';

import './styles.css';

//Todos os atributos que um Textarea pode receber
import {TextareaHTMLAttributes} from 'react';


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
    label: string;

}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>

    );
}

export default Textarea;
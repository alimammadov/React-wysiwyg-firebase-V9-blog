import React from 'react'

const ErrorText = (props) => {
 
    const { error } = props;

    if (error === '') return null;

    return <small className="text-danger">{error}</small>;
 
}

export default ErrorText


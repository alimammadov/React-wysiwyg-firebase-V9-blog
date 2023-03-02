import React from 'react'

const SuccessText = (props) => {
 
    const { success } = props;

    if (success === '') return null;

    return <small className="text-success">{success}</small>;
 
}

export default SuccessText


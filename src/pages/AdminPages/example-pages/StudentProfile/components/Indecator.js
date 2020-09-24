import React from 'react'

export default function Indecator(props) {
    const { value } = props
    const { maxValue } = props

    let color;

    const proportion = value/maxValue

    if(proportion <= 1) color="plabook-fluency-text-100"; 
    if(proportion <   0.75) color="plabook-fluency-text-75"; 
    if(proportion <   0.50) color="plabook-fluency-text-50"; 
    if(proportion <   0.25) color="plabook-fluency-text-25"; 
    
    return (
        <div className="d-flex align-items-center">
            <div className={`br-50 bg-${color} avatar-10 mr-3`} />
            <div>
                {value}/{maxValue}
            </div>
        </div>
    );
} 

import { AssignmentReturnSharp } from '@material-ui/icons';
import React from 'react'

export default function ScrollBox(props) {
    const { height } = props

    return (
        <div className="scroll-box w-100" style={{height: height}}>
            {
                React.Children.toArray(props.children).map(item=>{return(item)})
            }
        </div>
    );
} 

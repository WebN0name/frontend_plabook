import React from 'react'

const TestButton = ({OpenTestModal}) =>{

    function OpenTestRecord(){
        OpenTestModal(true)
    }

    return(
        <div className = "testButtonContainer">
            <div className = "testButton" onClick = {() => OpenTestRecord()}>

            </div>
        </div>
    )
}

export default TestButton
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

const Controls = ({dots, index, clickRecordButton, frequency, isRecord}) =>{
    
    function dotStyle(status){
        if(status === 'loading'){
            return{
                backgroundColor: 'yellow'
            }
        }

        if(status === 'done'){
            return{
                backgroundColor: 'green'
            }
        }

        if(status === 'error'){
            return{
                backgroundColor: 'red'
            }
        }
    }

    function activeMicro(frequency){
        if(isRecord){
            let num = 0
            if(frequency > 100){
                num = 100
            }else{
                num = frequency
            }
            
            return{
                color: '#ff4757',
                background: 'radial-gradient(' + String(num) + '% ' + String(num) +'%, #1e90ff, #1e90ff, #1e90ff, #1e90ff, white)',
            }
        }
    }

    return(
        <div className = "controlsContainer">
            <p className ="micro" onClick = {() => clickRecordButton()} style = {activeMicro(frequency)}><FontAwesomeIcon icon = { faMicrophone }/></p>
            <div className = "breadCrumbs">
                {dots.map((item) => (
                    <div className = "crumb crumbDisActiveColor" key={item.id} style = {dotStyle(item.status)}></div>
                ))}
            </div>
        </div>
    )
}

export default Controls
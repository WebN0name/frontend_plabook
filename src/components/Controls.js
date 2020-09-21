import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { boxSizing } from '@material-ui/system'

const Controls = ({ dots, index, clickRecordButton, frequency, isRecord }) => {

    function dotStyle(status, index, id) {



        let dotStyle = {
            backgroundColor:'#292526',
            boxSizing: 'content-box',
            border: '3px solid transparent'
        }

        if(status === 'loading'){
            dotStyle.backgroundColor = 'yellow'
        }

        if(status === 'done'){
            dotStyle.backgroundColor = 'green'
        }

        if(status === 'error'){
            dotStyle.backgroundColor = 'red'
        }

        if(id <= index){
            dotStyle.border = '3px solid #1e90ff'
        }


        return dotStyle

        // if ((status === 'default') && (id <= index)) {
        //     return {
        //         backgroundColor: '#292526',
        //         boxSizing: 'content-box',
        //         border: '3px solid #1e90ff'
        //     }
        // } else {
        //     return {
        //         backgroundColor: '#292526',
        //         boxSizing: 'content-box',
        //         border: '3px solid transparent'
        //     }
        // }

        // // eslint-disable-next-line no-unreachable
        // if ((status === 'loading') && (id <= index)) {
        //     return {
        //         backgroundColor: 'yellow',
        //         boxSizing: 'content-box',
        //         border: '3px solid #1e90ff'
        //     }
        // } else {
        //     return{
        //         backgroundColor: '#292526',
        //         boxSizing: 'content-box',
        //         border: '3px solid transparent'
        //     }
        // }

        // if ((status === 'done') && (id <= index)) {
        //     return {
        //         backgroundColor: 'green',
        //         boxSizing: 'content-box',
        //         border: '3px solid #1e90ff'
        //     }
        // }else{
        //     return{
        //         backgroundColor: '#green',
        //         boxSizing: 'content-box',
        //         border: '3px solid transparent'
        //     }
        // }

        // if ((status === 'error') && ((id <= index))) {
        //     return {
        //         backgroundColor: 'red',
        //         boxSizing: 'content-box',
        //         border: '3px solid #1e90ff'
        //     }
        // }else{
        //     return {
        //         backgroundColor: 'red',
        //         boxSizing: 'content-box',
        //         border: '3px solid transparent'
        //     }
        // }
    }

    function activeMicro(frequency) {
        if (isRecord) {
            let num = 0
            if (frequency > 100) {
                num = 100
            } else {
                num = frequency
            }

            return {
                color: '#ff4757',
                background: 'radial-gradient(' + String(num) + '% ' + String(num) + '%, #1e90ff, #1e90ff, #1e90ff, #1e90ff, white)',
            }
        }
    }

    return (
        <div className="controlsContainer">
            <p className="micro" onClick={() => clickRecordButton()} style={activeMicro(frequency)}><FontAwesomeIcon icon={faMicrophone} /></p>
            <div className="breadCrumbs">
                {dots.map((item) => (
                    <div className="crumb" key={item.id} style={dotStyle(item.status, index, item.id)}></div>
                ))}
            </div>
        </div>
    )
}

export default Controls
import React from 'react'

const Modalpermission  = ({errorPermission, refreshErrors}) =>{

    function visibleError(errorPermission){
        if(errorPermission === ''){
            return{
                display: 'none'
            }
        }

        if(errorPermission === 'wait'){
            return{
                display: 'flex'
            }
        }

        if(errorPermission === 'denied'){
            return{
                display: 'flex'
            }
        }
    }

    return(
        <div className = "modalPermissionWrapper" style = { visibleError(
            errorPermission.error)}>
            <div className = "modalBody">
                <p>{errorPermission.text}</p>
                <a onClick = {refreshErrors}>OK</a>
            </div>
        </div>
    )
}

export default Modalpermission
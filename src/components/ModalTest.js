import React, { useState } from 'react'
import axios from 'axios'

const ModalTest = ({ isTest, SetModalTestClose, getTestString}) =>{

    const [audioFile, setAudionFile] = useState(null)

    function isModalVision(){
        if(isTest !== true){
            return{
                display: 'none'
            }
        }else{
            return{
                display: 'flex'
            }
        }
    }

    function closeModalTest(){
        SetModalTestClose(false)
    }

    const setAudioFile = (e) =>{
        const file = e.target.files[0]
        setAudionFile(file)
    }

    async function sendTestAudio(){
        if(audioFile !==null){
            const fileString = await readFile(audioFile)
            closeModalTest()
            getTestString(fileString)
        }
    }

    function readFile(audioFile){
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsDataURL(audioFile)
          })
    }


    return(
        <div className = "modalPermissionWrapper" style = { isModalVision(isTest) }>
            <div className = "modalBody">
                <input type="file" onChange = { setAudioFile }/>
                <p className = "sendModalTest" onClick = {() => sendTestAudio()}>Отправить</p>
                <p onClick = {() => closeModalTest()} className ="closeModalTest">Закрыть</p>
            </div>
        </div>
    )
}

export default ModalTest
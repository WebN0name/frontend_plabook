import React, { useState, useContext } from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import nextOff from '../assets/img/next_off.svg'
import nextOn from '../assets/img/next_on.svg'
import Context from '../Context'

export default function Login({ history }){
    let location = useLocation()

    const {userDispatch, userBooksDispatch} = useContext(Context)
    const [error, setError] = useState(false)

    const [password, setPassword] = useState('')
    const [next, setNext] = useState(nextOn)

    function sendPassword(){
        let urlParams = location.pathname.split('/')
        console.log(urlParams)
        axios.post('https://boomd.ru:3000/' + urlParams[2] + '/' + urlParams[3] + '/auth',{
            pin: password,
        }).then(r => {
            console.log(r)
            if(!r.data.error){
                console.log(r)
                // let firstName = []
                // let count = 0
                // for(let i = 0; i< urlParams[3].length; i++){
                //     if((urlParams[3][i] !== urlParams[3][i].toUpperCase()) || (i === 0)){
                //         firstName.push(urlParams[3][i])
                //     }else{
                //         count = i
                //         break;
                //     }
                // }

                // let lastName = []

                // for(let i = count; i < urlParams[3].length; i++){
                //     lastName.push(urlParams[3][i])
                // }

                // firstName = firstName.join('')
                // lastName = lastName.join('')
                // const userName = firstName + ' ' + lastName
                // userDispatch({
                //     type: 'setUser',
                //     payload: userName
                // })

                if(urlParams[2] === 'teacher'){
                    setNext(nextOff)
                    setTimeout(() => {
                        history.push('/Teacher')
                    }, 200);
                }else{
                    userBooksDispatch({
                        type: 'setUserBooks',
                        payload: r.data
                    })

                    userDispatch({
                        type: 'setUser',
                        payload: urlParams[3]
                    })
                    
                    setNext(nextOff)
                    setTimeout(() => {
                        history.push('/BookPick')
                    }, 200);
                }

                // setNext(nextOff)
                // setTimeout(() => {
                //     history.push('/BookPick')
                // }, 200)
            }else{
                setError(true)
            }
        })
    }

    const handleInput = event => {
        setPassword(event.target.value)
    }

    function errorLoginVisible(error){
        if(error === false){
            return{
                visibility: 'hidden'
            }
        }
    }

    return(
        <div className = "loginWrapper">
            <h1 style= { errorLoginVisible(error) }>Invalid personal URL or PIN code, please try again</h1>
            <input type = "password" onChange={handleInput} placeholder = "Enter pin code"/>
            <img src = {next} onClick = { () =>sendPassword() } />
        </div>
    )

}

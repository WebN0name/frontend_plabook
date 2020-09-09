import React, { useState, useContext, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import nextOff from '../assets/img/next_off.svg'
import nextOn from '../assets/img/next_on.svg'
import Context from '../Context'

export default function Login({ history }){
    let location = useLocation()

    const {userDispatch, userBooksDispatch, adminDispatch, booksDispatch} = useContext(Context)
    const [error, setError] = useState(false)

    const [password, setPassword] = useState('')
    const [next, setNext] = useState(nextOn)

    useEffect(() =>{
        let urlParams = location.pathname.split('/')

        if(urlParams[2] === 'teacher'){
            history.push(`/TeacherLogin/${urlParams[2]}/${urlParams[3]}`)
        }
    }, [])

    function sendPassword(){
        let urlParams = location.pathname.split('/')
        axios.post('https://plabookeducation.com/auth/' + urlParams[2] + '/' + urlParams[3],{
            pin: password,
        }).then(r => {
            if(!r.data.error){
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
                    let firstName = []
                    let count = 0
                    for(let i = 0; i< urlParams[3].length; i++){
                        if((urlParams[3][i] !== urlParams[3][i].toUpperCase()) || (i === 0)){
                            firstName.push(urlParams[3][i])
                        }else{
                            count = i
                            break;
                        }
                    }

                    let lastName = []

                    for(let i = count; i < urlParams[3].length; i++){
                        lastName.push(urlParams[3][i])
                    }

                    firstName = firstName.join('')
                    lastName = lastName.join('')
                    const userName = firstName + ' ' + lastName
                    const tmp = {
                        adminId: urlParams[3],
                        adminName: userName
                    }
                    adminDispatch({
                        type: 'setAdmin',
                        payload: tmp
                    })
                    setNext(nextOff)
                    setTimeout(() => {
                        history.push('/Admin')
                    }, 200);
                }else{
                    console.log(r.data)
                    // userBooksDispatch({
                    //     type: 'setUserBooks',
                    //     payload: r.data
                    // })

                    userDispatch({
                        type: 'setUser',
                        payload: urlParams[3]
                    })

                    let allTexts = []

                    for(let i=0; i<r.data.length; i++){
                        let tmp = {
                            id: i,
                            author:r.data[i].author,
                            name: r.data[i].name,
                            image: r.data[i].image,
                            bookPages: r.data[i].pages
                        }

                        allTexts.push(tmp)
                    }

                    booksDispatch({
                        type: 'setBooks',
                        payload: allTexts
                    })
                    
                    setNext(nextOff)
                    setTimeout(() => {
                        history.push('/BookPick')
                    }, 200)
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

    const handleKeyPress = e =>{
        if (e.key === 'Enter') {
            sendPassword()
        }
    }

    //for commit

    return(
        <div className = "loginWrapper">
            <h1 style= { errorLoginVisible(error) }>Invalid personal URL or PIN code, please try again</h1>
            <input type = "password" onChange={handleInput} placeholder = "Enter pin code" onKeyPress={handleKeyPress}/>
            <img src = {next} onClick = { () =>sendPassword() } />
        </div>
    )

}

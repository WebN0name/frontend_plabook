import React from 'react'
import BookPickIcon from '../assets/img/BookPick.svg'
import Rubii from '../assets/img/Rubii.svg'

const HeaderReadingBlock = ({ bookImage, bookPick, wrongWord}) =>{

    function setStyle(){
        if(wrongWord === ''){
            return{
                visibility: 'hidden'
            }
        }
    }

    return(
        <div className = "headerContainer">
            <div className = "images">
                <img src = { `https://dev.plabookeducation.com/${bookImage}` } alt="BookImage" className = "headerBookImage"/>
                <img  src = { BookPickIcon } alt="SelectBookIcon" className="selctBookIcon" onClick = { () => bookPick()  }/>
            </div>
            <div className = "rubiiBlock">
                <div className = "wrongWordBlock" style = {setStyle()}>
                    <p>{wrongWord}</p>
                </div>
                <img src = { Rubii } alt="Rubii" className = "rubii"/>
            </div>
        </div>
    )

}

export default HeaderReadingBlock
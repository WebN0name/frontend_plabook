import React, {useState, useEffect} from 'react'
import BookPick from '../assets/img/BookPick.svg'
import DisBookPick from '../assets/img/no_book.svg'
import Rubii from '../assets/img/Rubii.svg'

const HeaderReadingBlock = ({ bookImage, bookPick, wrongWord, bookStatus}) =>{

    const [bookPickIcon, setBookPickIcon] = useState(BookPick)

    useEffect(() =>{
        if(bookStatus === 'false'){
            setBookPickIcon(BookPick)
        }else{
            setBookPickIcon(DisBookPick)
        }
    },[bookStatus])

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
                <img  src = { bookPickIcon } alt="SelectBookIcon" className="selctBookIcon" onClick = { () => bookPick()  }/>
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
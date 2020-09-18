import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const BooksSlider = ({books, setBook}) =>{

    const [booksSlideIndex, setIndex] = useState(3)
    const [currentBook, setCurrentBook] = useState(null)

    useEffect(() =>{
        console.log(books[0])
    },[])

    function booksVision(id, index){
        if((id <= index - 4) || (id > index)){
            return{
                display: 'none'
            }
        }
    }

    function leftArrowVision(index){
        if(index === 3){
            return{
                display: 'none'
            }
        }
    }

    function rightArrowVision(index, books){
        if(index >= books - 1){
            return{
                display: 'none'
            }
        }
    }

    function clickRightArrow(index){
        setIndex( index + 4 )
    }

    function clickLeftArrow(index){
        setIndex( index - 4 )
    }

    function BookPick(id){
        setCurrentBook(id)
        setBook(id)
    }

    function currentBookStyle(cuttentBook, id){
        if(id === cuttentBook){
            return{
                borderColor: '#569efb'
            }
        }
    }


    return(
        <div className = "BooksSliderContainer">
            <div className = "ArrowContainer leftArrow">
                <p style = { leftArrowVision(booksSlideIndex) } onClick = {() => clickLeftArrow(booksSlideIndex)}><FontAwesomeIcon icon = {faChevronLeft}/></p>
            </div>
            <div className = "books">
                {books.map((book) => (
                    <div className = "book" key ={ book.id } style = { booksVision(book.id, booksSlideIndex) }>
                        <p className = "bookName">{book.name}</p>
                        <div>
                            <img src = { `https://demo.plabookeducation.com/${book.image}` } alt = { 'book' } onClick = {() => BookPick(book.id)} style = { currentBookStyle(currentBook, book.id) }/>
                            <p className = "author">{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className = "ArrowContainer rightArrow">
                <p style = { rightArrowVision(booksSlideIndex, books.length) } onClick = {() => clickRightArrow(booksSlideIndex)}><FontAwesomeIcon icon = {faChevronRight}/></p>
            </div>
        </div>
    )
}

export default BooksSlider
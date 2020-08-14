import React, { useEffect, useContext, useState } from 'react'
import Preloader from '../components/Preloader'
import BookSlider from '../components/BooksSlider'
import Context from '../Context'
import axios from 'axios'
import Go_off from '../assets/img/go_off.svg'
import Go_on from '../assets/img/go_on.svg'

export default function BookPick({ history }){

    const {loaderState, loaderDispatch, books, booksDispatch, stopWordsDispatch, bookForReadingDispatch, userBooks} = useContext(Context)
    const [buttonGo, setButtonGo] = useState(Go_on)
    const [currentBook, setCurrentBook] = useState(null)

    useEffect(() => {
        getAllBooks()
    }, [])

    function getAllBooks(){
        if(localStorage.getItem('allBooks') !== null){
            let Allbooks = localStorage.getItem('allBooks')
            Allbooks = JSON.parse(Allbooks)
            stopWordsDispatch({
                type: 'setStopWords',
                payload: Allbooks.stopWords
            })
            let allTexts = []
            let _id = 0
                for(let i = 0; i< Allbooks.resultBooks.length; i++){
                    for(let j = 0; j <userBooks.length; j++){
                        if(Allbooks.resultBooks[i].name === userBooks[j]){
                            let tmp = {
                                id: _id,
                                author: Allbooks.resultBooks[i].author,
                                name: Allbooks.resultBooks[i].name,
                                image: Allbooks.resultBooks[i].image,
                                bookPages: Allbooks.resultBooks[i].bookPages
                            }
                            _id++
                            allTexts.push(tmp)
                        }
                    }
                }
            // for(let i = 0; i< Allbooks.resultBooks.length; i++){
            //     let tmp = {
            //         id: i,
            //         author: Allbooks.resultBooks[i].author,
            //         name: Allbooks.resultBooks[i].name,
            //         image: Allbooks.resultBooks[i].image,
            //         bookPages: Allbooks.resultBooks[i].bookPages
            //     }
            //     allTexts.push(tmp)
            // }
            booksDispatch({
                type: 'setBooks',
                payload: allTexts
            })
            
        }else{
            loaderDispatch({
                type: 'isLoading',
            })
            axios.get('https://boomd.ru:3000/getAllBooks').then(r => {
            if(r.data){
                // localStorage.setItem('allBooks', JSON.stringify(r.data))
                let allTexts = []
                let _id = 0
                for(let i = 0; i< r.data.resultBooks.length; i++){
                    for(let j = 0; j <userBooks.length; j++){
                        if(r.data.resultBooks[i].name === userBooks[j]){
                            let tmp = {
                                id: _id,
                                author: r.data.resultBooks[i].author,
                                name: r.data.resultBooks[i].name,
                                image: r.data.resultBooks[i].image,
                                bookPages: r.data.resultBooks[i].bookPages
                            }
                            _id++
                            allTexts.push(tmp)
                        }
                    }
                }
                booksDispatch({
                    type: 'setBooks',
                    payload: allTexts
                })
                booksDispatch({
                    type: 'setStopWords',
                    payload: r.data.stopWords
                })
                loaderDispatch({
                    type: 'isLoading',
                })
            }else{
                loaderDispatch({
                    type: 'isLoading',
                })
            }
        })
        }
    }

    const setBook = (value) =>{
        setCurrentBook(value)
    }

    function goToReading(currentBook){
        if(currentBook !== null){
            setButtonGo(Go_off)
            setTimeout(() => {
                books.forEach(element => {
                    if(element.id === currentBook){
                        let textsArrays = []
                        element.bookPages.forEach(page => {
                            let tmp = getWordsArray(page)
                            textsArrays.push(tmp)
                        })
                        let bookForReading = {
                            image: element.image,
                            textsForSale: element.bookPages,
                            texts: textsArrays,
                            name: element.name
                        }
                        bookForReadingDispatch({
                            type: 'setBookFroReading',
                            payload: bookForReading
                        })
                        const url = element.name.split(' ').join('_')
                        history.push('/ReadingPage/' + url)
                    }
                });
            }, 500)
        }
    }

    function getWordsArray(text){
        let regex  = new RegExp("[a-zA-Z-’]")
        let word  = []
        let finalText = []
        let symbol = []
        let _id = 0
        for(let i=0; i< text.length; i++){
            if(text[i].match(regex) !== null){
                if((text[i] === '-') && (text[i-1] === ' ')){
                    symbol.push(text[i])
                    let oneWord = {
                        id: _id,
                        text: symbol.join(''),
                        style: 'default', 
                        type: 'symbol',
                        isPretext: false
                    }
                    
                    symbol = []

                    finalText.push(oneWord)
                    _id++

                }else{
                    word.push(text[i])
                }

            }else{

                if(word.length !== 0){
                    let oneWord = {
                        id: _id,
                        text: word.join(''),
                        style: 'default', 
                        type: 'word',
                        isPretext: false
                    }
                    finalText.push(oneWord)
                    _id++
                    word = []  
                }

                symbol.push(text[i])
                let oneWord = {
                    id: _id,
                    text: symbol.join(''),
                    style: 'default', 
                    type: 'symbol',
                    isPretext: false
                }
                finalText.push(oneWord)
                _id++
                symbol = []
            }
        }

        return finalText
    }

    if(userBooks){
        return(
            <>
            <Preloader loader = {loaderState}/>
            <div className = "BookPickContainer">
                <h1>Choose a book</h1>
                <BookSlider books = { books } setBook = { setBook }/>
                <img src = { buttonGo } alt = "Go" onClick = {() => goToReading(currentBook) }/>
            </div>
            </>
        )
    }else{
        history.push('/Login')
        return null
    }

    
}
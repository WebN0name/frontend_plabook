import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Text = ({pages, index, nextPage, previousPage, setWrongWord}) =>{

    function leftArrowVision(index){
        if(index === 0){
            return{
                display: 'none'
            }
        }
    }

    function rightArrowVision(index, pageCount){
        if(index === pageCount - 1){
            return{
                display: 'none'
            }
        }
    }

    function clickRightArrow(index){
        nextPage(index)
    }

    function clickLeftArrow(index){
        previousPage(index)
    }
    
    function setAnswerColor(style){
        if(style === 'wrong'){
            return{
                fontFamily: 'Gotham Pro',
                fontWeight: 900,
                color: '#f96e88',
                cursor: 'pointer'
            }
        }

        if(style === 'right'){
            return{
                fontFamily: 'Gotham Pro',
                fontWeight: 300,
                color: '#aeaeae'
            }
        }

        if(style === 'readed'){
            return{
                fontFamily: 'Gotham Pro',
                fontWeight: 300,
                color: '#aeaeae'
            }
        }
    }

    function setWord(text, style){
        if(style === 'wrong'){
            setWrongWord(text)
        }
    }

    return(
        <div className = "textContainer">
            <div className = "textArrowLeft">
                <p style = {leftArrowVision(index)} onClick = {() => clickLeftArrow(index)}><FontAwesomeIcon icon = {faChevronLeft}/></p>
            </div>
            <div className = "textBlock">
                <pre>
                    {pages[index].map((page) => (
                        <span key={page.id} style = {setAnswerColor(page.style)} onClick = {() => setWord(page.text, page.style)}>{page.text}</span>
                    ))}
                </pre>
            </div>
            <div className = "textArrowRight rightArrow">
                <p style = { rightArrowVision(index, pages.length)} onClick = {() => clickRightArrow(index)}><FontAwesomeIcon icon = {faChevronRight}/></p>
            </div>
        </div>
    )
}

export default Text
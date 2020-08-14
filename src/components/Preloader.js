import React from 'react'
import Loader from '../assets/img/Preloader.svg'

 const Preloader = (props) => {


    const isLoader = (loader) =>{
        if(loader === true){
            return{
                display: 'flex'
            }
        }

        if(loader === false){
            return{
                display: 'none'
            }
        }
    }

    return(
        <div className = "PreloaderContainer" style = { isLoader(props.loader) }>
            <img  src={ Loader } alt = "spiner"/>
            {props.loader}
        </div>
    )
}

export default Preloader
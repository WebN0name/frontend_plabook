import React from 'react'
import Teachers from '../assets/img/teachers.jpg'

export default function TeacherPage(){

    function imgTeacher(){
        return{
            backgroundImage:`url(${Teachers})`,
            backgroundSize: '100% 100%',
        }
    }

    return(
        <div className = "teacherPageContainer" style = { imgTeacher() }>
        </div>
    )
} 
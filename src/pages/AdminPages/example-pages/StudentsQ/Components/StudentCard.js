import React, { useState, Fragment, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Grid,
    Checkbox,
    Card,
    Button,
    List,
    ListItem,
    Tooltip,
    Divider, Avatar, IconButton
} from '@material-ui/core';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';

import avatar3 from '../../../assets/images/avatars/avatar3.jpg';

import { Settings, Briefcase, Users, Layers, ChevronRight } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Context from '../../../../../Context'


export default function StudentCard(props) {
    const { student } = props

    const history = useHistory()
    const { studentDispatch } = useContext(Context)


    const useStyles = makeStyles({

    });

    const classes = useStyles();

    const ex = {
        "id": "JaneDoe",
        "name": "Jane Doe",
        "pin": "5495",
        "personalLink": "https://dev.plabookeducation.com/Login/student/JaneDoe",
        "readingLevel": "4",
        "stage": "Comprehension",
        "bookRead": "4",
        "avatar": "asjf;as"
    }

    const fluencyLevel = Math.floor(Math.random() * Math.floor(100));


    let color = ""
    if(fluencyLevel <= 100) color = "100"
    if(fluencyLevel <= 94) color = "75"
    if(fluencyLevel <= 79) color = "50"
    if(fluencyLevel <= 64) color = "25"

    const handleClick = () =>
    {
        studentDispatch({ type: "setStudent", payload: { id: student.id, name: student.name } });
        history.push(`StudentStatistic/${student.name}`) 
    }

    return (
        <Fragment>
            <Card className="card-box m-2 student-card">
                <div className="p-2 d-flex justify-content-between align-items-center">
                    <div className="fs-rem-7">
                        {student.name}
                    </div>
                    <IconButton size="small" onClick={handleClick}>
                        <ChevronRight />
                    </IconButton>
                </div>
                <div className="d-flex w-100">
                    <div
                        xs={10}
                        className={`mr-1 pl-1 pt-3 pr-3 pb-3 w-percent-70 bg-plabook-fluency-${color} d-flex justify-content-center align-items-center`}
                    >
                        <div className="d-flex align-items-end">
                            <div className="p-1 pr-2">
                                <img src={student.avatar} className="avatar-rem-8" />
                            </div>
                            <div className="p-1">
                                <div className="fw-550 fs-rem-5">
                                    {student.readingLevel}
                                </div>
                                <div className="fw-400 fs-rem-3">
                                    Reading Level
                                </div>
                            </div>
                            <div className="p-1">
                                <div className="fw-550 fs-rem-5">
                                    {student.bookRead}
                                </div>
                                <div className="fw-400 fs-rem-3">
                                    Books Read
                                </div>
                            </div>
                            <div className="p-1">
                                <div className="fw-550 fs-rem-5">
                                    {student.assesments}
                                </div>
                                <div className="fw-400 fs-rem-3">
                                    Assessments Taken
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        xs={2}
                        className="w-percent-30 p-3 bg-plabook-gray-1 d-flex flex-column justify-content-center align-items-center"
                    >
                        <div className={`avatar-rem-6 fw-500 fs-rem-10 br-100 p-3 bg-white t-color-plabook-fluency-text-${color} d-flex justify-content-center align-items-center`}>
                            {fluencyLevel}
                        </div>
                        <div className="pt-2 text-center fs-rem-4">
                            FLUENCY LEVEL
                        </div>
                    </div>
                </div>
                <div className="p-3 fs-rem-4">
                    Joinded
                </div>
            </Card>
        </Fragment>
    );
}

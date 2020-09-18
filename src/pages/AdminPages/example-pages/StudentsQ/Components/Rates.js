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
            <Card className="card-box card-box-border-bottom border-plabook-success card-shadow-plabook-success mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="p-3">
                                <div className=" text-uppercase pb-2 font-size-sm">
                                    Proficiency
                                </div>
                                <h3 className="font-weight-bold display-4 mb-0 text-black">
                                    <CountUp start={0} end={attempt.Proficiency.replace("%", "")} />
                                    <small className="opacity-6 pl-1 text-black-50">%</small>
                                </h3>
                            </div>
                        </div>
                    </Card>
        </Fragment>
    );
}

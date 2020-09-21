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


export default function StatsCard(props) {
    const { header } = props
    const { icon } = props
    const { text } = props
    const { color } = props

    const useStyles = makeStyles({

    });

    const classes = useStyles();

    return (
        <Card className="card-box mb-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="p-3">
                    <div className="fs-rem-6 text-uppercase pb-2 font-size-sm fw-500">
                        {header}
                    </div>
                    <div className="d-flex align-items-center">
                        <div className={`${color ? `bg-${color}`:""} br-20 p-1 mr-2`}>
                        {icon}
                        </div>
                        <h3 className={`font-weight-bold display-4 mb-0 ${color ? `text-${color}`:""}`} >
                            {text}
                        </h3>
                    </div>
                </div>
            </div>
        </Card>
    );
}

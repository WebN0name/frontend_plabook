import React, { useState, useEffect } from 'react'
import theme from "../theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, Box, Typography, Divider, ListItem
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import {
    mdiAccountMultipleOutline,
} from '@mdi/js';


export default function SelectSearchItem(props) {

    const { multiple } = props
    const { linesCount } = props

    const useStyles = makeStyles({
        container: {
            padding: 5,
            cursor: "pointer",
            backgroundColor: "transparent",
        }
    });
    const classes = useStyles();



    useEffect(() => {
    }, []);




    return (
            <Typography {...props} >{props.children}</Typography>
    );
} 
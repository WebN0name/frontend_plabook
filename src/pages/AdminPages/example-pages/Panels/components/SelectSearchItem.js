import React, { useState, useEffect } from 'react'
import theme from "../theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, Box, Typography, Divider
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import {
    mdiAccountMultipleOutline,
    } from '@mdi/js';

import Context from '../../../Context'

export default function SelectSearchItem(props) {

    const {multiple} = props
    const {linesCount} = props    



    const useStyles = makeStyles({
        container: {
            padding:5,
            cursor: "pointer",
            backgroundColor:"#fff",
            "& :hover":{
                backgroundColor:"#f3f3f3"
            }
        }
    });
    const classes = useStyles();



    useEffect(() => {
    }, []);




    return (
        <Box {...props} className={classes.container}>
            <Typography>{props.children}</Typography>
        </Box>
    );
} 
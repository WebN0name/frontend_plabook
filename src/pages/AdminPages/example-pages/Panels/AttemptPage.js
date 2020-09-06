import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import theme from "./theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    Avatar, Box, colors, Paper, isWidthDown, Typography, Divider, BottomNavigation, Grid,
} from '@material-ui/core';

import { display } from '@material-ui/system';

import TopBar from "./components/TopBar"
import NavBar from "./components/NavBar"

import Icon from '@mdi/react'
import { mdiChevronLeft } from '@mdi/js';


export default function AttemptPage() {

    const { id } = useParams();


    const attempt = {
        timeStamp: "2020-08-09T23:14:44.388Z",
        rate: 88,
        accuracy: 97,
        comprehension: 40,
        audio: "https://zvukipro.com/uploads/files/2019-07/1563804077_1c19c224f420159.mp3",
        bookRows: [
            {
                text: "One day, Nad said to Tom",
                errors: 5,
                scM: 1,
                scS: 0,
                scV: 1
            },
            {
                text: '"Today we will go to meet the plane',
                errors: 10,
                scM: 0,
                scS: 0,
                scV: 1
            },
            {
                text: "Pat the pilot will fly over the sea",
                errors: 1,
                scM: 0,
                scS: 1,
                scV: 0
            },
            {
                text: "to brign things for everyone",
                errors: 0,
                scM: 1,
                scS: 1,
                scV: 1
            }
        ]
    }


    //#region Audio Visualisation

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();

    analyser.fftSize = 2048;
   

    //#endregion

    useEffect(() => {
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        const info = analyser.getByteTimeDomainData(dataArray);
        console.log("Audion CHRENY")
        console.log(bufferLength)
        console.log(dataArray)
        console.log(info)
    }, [])




    const useStyles = makeStyles({
        flexRow: {
            display: 'flex',
            alignItems: 'center',
            "& p": {
                marginRight: "10px"
            }
        },
        buttonRow: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10,
            "& button": {
                marginRight: "10px"
            }
        },
        TabHead:
        {
        },
        timeStamp: {
            color: theme.palette.color.primary,
        },
        paper:
        {
            padding: 20,
            marginBottom: theme.margin.main
        },
        stats:
        {
            display: 'flex',
            alignItems: 'left',
            "& *": {
                marginRight: "10px"
            }
        },
        audio:
        {
            outline: "none"
        },
        audioContainer:
        {
            display: "flex",
            justifyContent: "flex-end"
        }
    });

    const labels = [
        { name: "Time Stamp", align: "center" },
        { name: "Book ID", align: "left" },
        { name: "Page", align: "left" },
        { name: "Proficiency", align: "left" },
        { name: "Running records", align: "left" },
        { name: "Number of running", align: "left" },
        { name: "Errors", align: "left" },
        { name: "Self correction", align: "left" },
        { name: "Err M", align: "left" },
        { name: "Err S", align: "left" },
        { name: "Err V", align: "left" },
        { name: "SC M", align: "left" },
        { name: "SC S", align: "left" },
        { name: "SC V", align: "left" },
    ]

    const classes = useStyles();

    const LineWord = (props) => {
        return (
            <></>
        )
    }
    const convertStamp = (stamp) => {
        const date = new Date(Date.parse(stamp))
        return ({
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            full: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        })
    }

    const marksToString = (row) => {
        return (`${row.scM ? "M" : ""}${row.scV ? "V" : ""}${row.scS ? "S" : ""}`)
    }

    return (
        <>
            <Button startIcon={<Icon size={1} path={mdiChevronLeft} />} onClick={() => window.history.back()}>Back</Button>
            <Paper className={classes.paper} elevation={1}>
                <Box className={classes.buttonRow}>
                    <Button variant="outlined" onClick={() => window.history.back()}>Student overview</Button>
                    <Button variant="outlined" onClick={() => window.history.back()}>Print</Button>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <Box className={classes.TabHead}>
                            <Typography gutterBottom variant="h3" >{id}</Typography>
                            <Box className={classes.timeStamp}   ><Typography gutterBottom variant="h5" >{convertStamp(attempt.timeStamp).full}</Typography></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={classes.audioContainer}>
                            <audio className={classes.audio} controls src={attempt.audio} />
                        </Box>
                    </Grid>
                </Grid>

                <Box className={classes.stats}>
                    <Typography variant="h6">Rate:{attempt.rate} wcpm</Typography>
                    <Typography variant="h6">Accuracy:{attempt.accuracy}%</Typography>
                    <Typography variant="h6">Comprehension:{attempt.comprehension}%</Typography>
                    <Typography variant="h6">Level:</Typography>
                </Box>
            </Paper>
            <Paper className={classes.paper} elevation={1}>
                <Grid direction="column" container spacing={1}>
                    {attempt.bookRows.map(row =>
                        <Grid direction="row" container spacing={1}>
                            <Grid item xs>
                                <Typography>{row.text}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography color={"textSecondary"}>{row.errors}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                {marksToString(row)}
                            </Grid>
                        </Grid>)}
                </Grid>
            </Paper>

        </>
    );
}


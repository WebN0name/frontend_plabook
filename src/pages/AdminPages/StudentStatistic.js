import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import theme from "./theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    Avatar, Box, colors, Paper, isWidthDown, Typography, Divider,
} from '@material-ui/core';

import { display } from '@material-ui/system';

import TopBar from "./components/TopBar"
import NavBar from "./components/NavBar"

import Icon from '@mdi/react'
import {mdiChevronLeft} from '@mdi/js';
 
export default function StudentStatistic() {

    const { id } = useParams();

    const rowsPerPageArray = [5, 10, 25]
    const rowMaxHeight = 80
    const [staticstic, setStatistic] = useState([]);
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)

    useEffect(() => {
        fetchDate()
    }, [])


    const quareData =
    {
        method: "POST",
        body: JSON.stringify({ studentId : id.replace(" ","") }),
        headers: {
            'Content-Type': 'application/json'
        }
    }


    const fetchDate = async () => {
        const response = await fetch(`https://boomd.ru:3000/studentStatistics`, quareData)
        const result = await response.json()
        result.map(item => item.Date = new Date(Date.parse(item["Time Stamp"])))
        result.reverse()       
        setStatistic(result)
    }
    

    const useStyles = makeStyles({
        flexRow: {
            display: 'flex',
            alignItems: 'center',
            "& div": {
                marginRight: "10px"
            }
        },
        studentInfo: {
            display: 'flex',
            alignItems: 'stretch',
            marginBottom: 15,
            marginRight: -15,
            "& div": {
                marginRight: 15
            }
        },
        root: {
            backgroundColor: theme.palette.background.dark,
            display: 'flex',
            height: '100%',
            overflow: 'hidden',
            width: '100%',
            fontFamily: "Gotham Pro !important"

        },
        wrapper: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            paddingBottom: 5,
            paddingTop: 64,
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 256
            },
            // minWidth: 815
        },
        contentContainer: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden'
        },
        content: {
            flex: '1 1 auto',
            overflow: 'auto',
            padding: theme.margin.main,
            "& button":
            {
                marginBottom:theme.margin.main
            }
        },
        studentAvatar: {
            width: 150,
            height: 150,
            color: theme.palette.text.primary,
            fontSize: 35
        },
        cell:
        {
            width: 150,
        },
        box:
        {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": 4,
            "max-height": rowMaxHeight,
        },
        paper:
        {
            width: "100%",
            padding: 10,
        },
        TabHead:
        {
            padding: 10
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

    const handelRowsPerPageChanges = (amount) => {
        setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
        setRowsPerPage(amount)
        setPage(0)
    }

    const emptyRows = Math.abs(staticstic.slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage).length - _rowsPerPage);

    return (
        <div className={classes.root}>
            <TopBar />
            <NavBar />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <div id="content" className={classes.content}>
                        <Button startIcon={<Icon size={1} path={mdiChevronLeft}/>} onClick={()=>window.history.back()}>Back</Button>
                        <Paper style={{marginBottom:30}} elevation={1}>
                            <Box className={classes.TabHead}   ><Typography gutterBottom variant="h5" >{id} statistic</Typography></Box>
                            <Divider />
                            <TableContainer>
                                <Table title="Statistic">
                                    <TableHead>
                                        <TableRow>{labels.map(label => <TableCell key={label.name} align={label.align}>{label.name}</TableCell>)}</TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            staticstic !== [] && staticstic.slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage).map((attempt, index) =>
                                                <TableRow hover key={index}>
                                                    <TableCell className={classes.cell} align="left">{attempt.Date.toLocaleDateString()} {attempt.Date.toLocaleTimeString()}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["Book ID"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt.Page}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt.Proficiency}</TableCell>
                                                    <TableCell className={classes.cell} align="left"><Box className={classes.box}>{attempt["Running Records"]}</Box></TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["Number of Running Words"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt.Errors}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["Self Correction"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["Err M"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["Err S"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["Err V"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["SC M"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["SC S"]}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{attempt["SC V"]}</TableCell>
                                                </TableRow>)
                                        }
                                        {
                                            staticstic.length === 0 && (<TableRow>
                                                <TableCell align="center" colSpan={14}>There's nothing here yet</TableCell>
                                            </TableRow>)
                                        }
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: rowMaxHeight * emptyRows }} >

                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={rowsPerPageArray}
                                component="div"
                                count={staticstic.length}
                                rowsPerPage={_rowsPerPage}
                                page={_page}
                                onChangePage={(e, newPage) => { setPage(newPage) }}
                                onChangeRowsPerPage={(e) => { handelRowsPerPageChanges(e.target.value) }}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </div>

    );
} 
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    TableSortLabel, Box, colors, Paper, isWidthDown, Typography, Divider,
} from '@material-ui/core';

import { display } from '@material-ui/system';

import TopBar from "./components/TopBar"
import NavBar from "./components/NavBar"

import Icon from '@mdi/react'
import { mdiChevronLeft } from '@mdi/js';

export default function StudentStatistic() {

    const { id } = useParams();
    const history = useHistory();

    const rowsPerPageArray = [5, 10, 25]
    const rowMaxHeight = 80
    const [staticstic, setStatistic] = useState([]);
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    //#region sorting
    function descendingComparator(a, b, orderBy) {
        const isNumber = Boolean(parseFloat(a[orderBy]))
        let valA = a[orderBy]
        let valB = b[orderBy]
        if (isNumber) {
            valA = parseFloat(a[orderBy])
            valB = parseFloat(b[orderBy])
        }
        if (valB < valA) {
            return -1;
        }
        if (valB > valA) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    //#endregion



    useEffect(() => {
        fetchDate()
    }, [])


    const quareData =
    {
        method: "POST",
        body: JSON.stringify({ studentId: id.replace(" ", "") }),
        headers: {
            'Content-Type': 'application/json'
        }
    }


    const fetchDate = async () => {
        const response = await fetch(`https://plabookeducation.com/studentStatistics`, quareData)
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
        { name: "Time Stamp", align: "center", isSortable: true, propertyName: "Date" },
        { name: "Book ID", align: "left", isSortable: true, propertyName: "Book ID" },
        { name: "Page", align: "left", isSortable: true, propertyName: "Page" },
        { name: "Proficiency", align: "left", isSortable: true, propertyName: "Proficiency" },
        { name: "Running records", align: "left", isSortable: false, propertyName: "id" },
        { name: "Number of running", align: "left", isSortable: true, propertyName: "Number of Running Words" },
        { name: "Errors", align: "left", isSortable: true, propertyName: "Errors" },
        { name: "Self correction", align: "left", isSortable: true, propertyName: "Self Correction" },
        { name: "Err M", align: "left", isSortable: true, propertyName: "Err M" },
        { name: "Err S", align: "left", isSortable: true, propertyName: "Err S" },
        { name: "Err V", align: "left", isSortable: true, propertyName: "Err V" },
        { name: "SC M", align: "left", isSortable: true, propertyName: "SC M" },
        { name: "SC S", align: "left", isSortable: true, propertyName: "SC S" },
        { name: "SC V", align: "left", isSortable: true, propertyName: "iSC V" },
    ]

    const classes = useStyles();

    const handelRowsPerPageChanges = (amount) => {
        setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
        setRowsPerPage(amount)
        setPage(0)
    }

    const emptyRows = Math.abs(staticstic.slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage).length - _rowsPerPage);

    return (
        <>
            <Button startIcon={<Icon size={1} path={mdiChevronLeft} />} onClick={() => window.history.back()}>Back</Button>
            <Paper style={{ marginBottom: 30 }} elevation={1}>
                <Box className={classes.TabHead}   ><Typography gutterBottom variant="h5" >{id} Statistic</Typography></Box>
                <Divider />
                <TableContainer>
                    <Table title="Statistic">
                        <TableHead>
                            <TableRow>
                                {labels.map(label =>
                                    <TableCell key={label.name} align={label.align}>
                                        <TableSortLabel
                                            active={orderBy === label.propertyName}
                                            direction={orderBy === label.propertyName ? order : 'asc'}
                                            onClick={(event) => { handleRequestSort(event, label.propertyName) }}
                                        >
                                            {label.name}
                                        </TableSortLabel>
                                    </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                staticstic !== [] && stableSort(staticstic, getComparator(order, orderBy)).slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage).map((attempt, index) =>
                                    <TableRow hover key={index}>
                                        <TableCell className={classes.cell} align="left">{attempt.Date.toLocaleDateString()} {attempt.Date.toLocaleTimeString()}</TableCell>
                                        <TableCell className={classes.cell} align="left">{attempt["Book ID"]}</TableCell>
                                        <TableCell className={classes.cell} align="left">{attempt.Page}</TableCell>
                                        <TableCell className={classes.cell} align="left">{attempt.Proficiency}</TableCell>
                                        <TableCell className={classes.cell} align="left">
                                            <Button variant="outlined" onClick={() => { history.push(`/Admin/Attempt/Demo`) }}>More details</Button>
                                        </TableCell>
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
        </>
    );
} 
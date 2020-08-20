import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


import {
    TableHead, TableRow,
    TableCell, Typography, Divider,
    TableBody, Table,
    TableContainer, TablePagination,
    Avatar, Box, Paper,TextField
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import theme from "./theme"

import TopBar from "./components/TopBar"
import NavBar from "./components/NavBar"

export default function TeacherPage() {

    const teacherNames = ["JohnBell", "MariSiemens"]    
    const rowsPerPageArray = [5, 10, 25]
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)
    const [fillter, setFillter] = useState("")
    const [_students, setStudents] = useState([]);
    const history = useHistory();
    const quareData =
    {
        method: "POST",
        body: JSON.stringify({ teacherId: teacherNames[0] }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        fetchDate();
    }, [])

    const fetchDate = async () => {
        const response = await fetch(`https://boomd.ru:3000/studentList`, quareData)
        const result = await response.json();  
        setStudents(result);
    }


    const HandelRowCountChange = (count) => {
        setRowsPerPage(count);
        setPage(0)
        setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
    }

    const GetPageRows = () => {
        return _students.filter((student) => {if (student !== null && student.name.toLowerCase().includes(fillter.toLowerCase())) return student }).slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage)
    }


    const useStyles = makeStyles({
        flexRow: {
            display: 'flex',
            alignItems: 'center',
            "& div": {
                marginRight: "10px"
            }
        },
        root: {
            backgroundColor: theme.palette.background.dark,
            display: 'flex',
            height: '100%',
            overflow: 'hidden',
            width: '100%'
        },
        wrapper: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            paddingTop: 64,
            paddingBottom: 20,
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 256
            },
            // minWidth:815
        },
        contentContainer: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden'
        },
        content: {
            flex: '1 1 auto',
            height: '100%',
            overflow: 'auto',
            padding: theme.margin.main
        },        
        top: {},
        cell:
        {
            width: 150
        },
        nameCell:
        {
            width: 150,
            cursor: "pointer"
        },
        TabHead:
        {
            padding: 10
        },
        search:
        {
            marginBottom:theme.margin.main,    
            padding:15,
            "& input":
            {
                width:"100%"
            }
        }
    });

    const labels = [
        { name: "Name", align: "left" },
        { name: "Pin code", align: "left" },
        { name: "Link", align: "left" },
        { name: "Reading level", align: "left" },
        { name: "Stage", align: "left" },
        { name: "Book read", align: "left" },
        { name: "Fluency", align: "left" },
    ]

    const classes = useStyles();

    const emptyRows = Math.abs(GetPageRows().length - _rowsPerPage);

    return (
        <div className={classes.root}>
            <TopBar />
            <NavBar />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <div id="content" className={classes.content}>
                        <Paper className={classes.search} elevation={1}>
                        <TextField onChange={(e)=>{setFillter(e.target.value)}} id="search" fullWidth type="search" label="Search" />
                        </Paper>
                        <Paper style={{marginBottom:30}} elevation={1}>
                            <Box className={classes.TabHead}><Typography gutterBottom variant="h5" >Students</Typography></Box>
                            <Divider />
                            <TableContainer>
                                <Table title="Students">
                                    <TableHead>
                                        <TableRow>{labels.map((label) => (<TableCell key={label.name} align={label.align}>{label.name}</TableCell>))}</TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            GetPageRows().map((student, index) =>
                                                <TableRow hover key={student.name + index}>
                                                    <TableCell onClick={() => { history.push(`/StudentStatistic/${student.name}`) }} className={classes.nameCell} align="left"><Box className={classes.flexRow}><Avatar alt={student.name} src="" />{student.name}</Box></TableCell>
                                                    <TableCell className={classes.cell} align="left">{student.pin}</TableCell>
                                                    <TableCell className={classes.cell} align="left"><a>{student.personalLink}</a></TableCell>
                                                    <TableCell className={classes.cell} align="left">{student.readingLevel}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{student.stage}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{student.bookRead}</TableCell>
                                                    <TableCell className={classes.cell} align="left">{student.fluency}</TableCell>
                                                </TableRow>)
                                        }
                                        {
                                            GetPageRows().length === 0 && (<TableRow>
                                                <TableCell align="center" colSpan={14}>There's nothing here yet</TableCell>
                                            </TableRow>)
                                        }
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 75 * emptyRows }} >

                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={rowsPerPageArray}
                                component="div"
                                count={GetPageRows().length}
                                rowsPerPage={_rowsPerPage}
                                page={_page}
                                onChangePage={(e, newPage) => { setPage(newPage) }}
                                onChangeRowsPerPage={(e) => { HandelRowCountChange(e.target.value)}}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </div>

    )
} 
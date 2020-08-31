import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import theme from "./theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    TableSortLabel, MenuItem, Box, Popover, Input, Paper, TextField, Typography, Divider,
} from '@material-ui/core';

import { display } from '@material-ui/system';

import TopBar from "./components/TopBar"
import NavBar from "./components/NavBar"

import Icon from '@mdi/react'
import { mdiChevronLeft } from '@mdi/js';

import SelectSearch from "./components/SelectSearch"
import SelectSearchItem from "./components/SelectSearchItem"

export default function SchoolPage() {

    const { id } = useParams();

    const schoolClass = {
        id: "",
        room: "",
        grade: "",
        teacher: "",
        students: [],
        books: [],
    }

    const schoolClasses = [
        {
            id: "1",
            room: "A",
            grade: "1",
            teacher: "",
            students: [],
            books: [],
        },
        {
            id: "2",
            room: "B",
            grade: "1",
            teacher: "",
            students: [],
            books: [],
        }
    ]

    const books = [
        "1984",
        "A Doll's House",
        "Absalom, Absalom!",
        "The Aeneid",
        "The Adventures of Huckleberry Finn",
        "The Book of Job",
        "The Brothers Karamazov",
        "The Castle "
    ]

    const students = [
        "Jane Boel",
        "Hans Bern",
        "Cood Brown",
        "Alice Akwee",
        "Fin Vive",
        "Brook Maxvel",
        "Harry Grotter",
        "Marry Noise"
    ]

    const teachers = [
        "JohnBell",
        "MariSiemens"
    ]

    const rowsPerPageArray = [5, 10, 25]
    const rowMaxHeight = 80
    const [staticstic, setStatistic] = useState([]);
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const [fillter, setFillter] = useState("")
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');


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
        p10:
        {
            padding: 10
        },
        teacherPop:
        {
            padding: 10,
            display: "flex",
            flexDirection: "column",
        },
        clickable:
        {
            cursor: "pointer",
        }

    });

    const labels = [
        { name: "Class id", align: "center", width: 50, isSortable: true, propertyName: "id" },
        { name: "Class room", align: "center", width: 50, isSortable: true, propertyName: "room" },
        { name: "Grade", align: "center", width: 50, isSortable: true, propertyName: "grade" },
        { name: "Teacher", align: "left", width: 100, isSortable: false, propertyName: "teacher" },
        { name: "Students", align: "left", width: 200, isSortable: false, propertyName: "students" },
        { name: "Books", align: "left", width: 200, isSortable: false, propertyName: "books" },
    ]

    const classes = useStyles();

    const handelRowsPerPageChanges = (amount) => {
        setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
        setRowsPerPage(amount)
        setPage(0)
    }

    const emptyRows = Math.abs(staticstic.slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage).length - _rowsPerPage);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <Paper style={{ marginBottom: 30 }} elevation={1}>
                <Box className={classes.p10}   ><Typography gutterBottom variant="h5" >School</Typography></Box>
                <Divider />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {labels.map(label => <TableCell style={{ width: label.width }} key={label.name} align={label.align}>
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
                                schoolClasses !== [] && stableSort(schoolClasses, getComparator(order, orderBy)).slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage).map((item, index) =>
                                    <TableRow hover key={index}>
                                        <TableCell className={classes.cell} align="center">{item.id}</TableCell>
                                        <TableCell className={classes.cell} onClick={() => {
                                            console.log(document.getElementById("popsq").getAttribute("value"));
                                        }} align="center">{item.room}</TableCell>
                                        <TableCell className={classes.cell} align="center">{item.grade}</TableCell>
                                        <TableCell className={classes.cell} align="left">
                                            <SelectSearch multiple={false} id={`teacher-${index}`} name={item.id + "teach"} onChange={() => { console.log(document.getElementById(`teacher-${index}`).getAttribute("value")) }}>
                                                {teachers.map((item, index) =>
                                                    <SelectSearchItem key={index} value={item}>
                                                        {item}
                                                    </SelectSearchItem>
                                                )}
                                            </SelectSearch></TableCell>
                                        <TableCell className={classes.cell} align="left">
                                            <SelectSearch multiple={true} id={`students-${index}`} name={item.id + "teach"} onChange={() => { console.log(document.getElementById(`students-${index}`).getAttribute("value")) }}>
                                                {students.map((item, index) =>
                                                    <SelectSearchItem key={index} value={item}>
                                                        {item}
                                                    </SelectSearchItem>
                                                )}
                                            </SelectSearch>
                                        </TableCell>
                                        <TableCell className={classes.cell} align="left">
                                            <SelectSearch multiple={true} id={`books-${index}`} name={item.id} onChange={() => { console.log(document.getElementById(`books-${index}`).getAttribute("value")) }}>
                                                {books.map((item, index) =>
                                                    <SelectSearchItem key={index} value={item}>
                                                        {item}
                                                    </SelectSearchItem>
                                                )}
                                            </SelectSearch>
                                        </TableCell>
                                    </TableRow>)
                            }
                            {
                                <Popover
                                    open={Boolean(anchorEl)}
                                    onClose={() => { setAnchorEl(null) }}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Box className={classes.teacherPop}>
                                        <Input placeholder="none" type="text" inputProps={{ list: "mycoollist", onChange: (e) => { console.log(e.currentTarget.value) } }} />
                                        <datalist id="mycoollist">
                                            {teachers.map(
                                                item =>
                                                    <option value={item} >{item}</option>
                                            )}
                                        </datalist>
                                    </Box>
                                </Popover>
                            }
                            {
                                schoolClasses.length === 0 && (<TableRow>
                                    <TableCell align="center" colSpan={12}>There's nothing here yet</TableCell>
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
                    count={schoolClasses.length}
                    rowsPerPage={_rowsPerPage}
                    page={_page}
                    onChangePage={(e, newPage) => { setPage(newPage) }}
                    onChangeRowsPerPage={(e) => { handelRowsPerPageChanges(e.target.value) }}
                />
            </Paper>
        </>
    );
} 
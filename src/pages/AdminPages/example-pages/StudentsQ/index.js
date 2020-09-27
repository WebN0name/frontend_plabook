import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    Avatar, Box, TextField, Paper, Typography, Divider, TableSortLabel, Card, Tooltip, Snackbar, Portal, IconButton, Grid
} from '@material-ui/core';


import { PageTitle } from '../../layout-components';
import Context from '../../../../Context';
import axios from 'axios'

import {
    Clipboard,
    MessageSquare,
    MousePointer,
    Square,
    UserPlus
} from 'react-feather';

import AvatarPicker from '../../../../components/AvatarPicker';
import NewStudentDialog from '../AdminModals/NewStudentDialog';
import StudentCard from './Components/StudentCard';
import StudentCard2 from './Components/StudentCard2';
import StatsCard from './Components/StatsCard';


export default function Students() {

    const rowsPerPageArray = [5, 10, 25]
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)
    const [searchFillter, setSearchFillter] = useState("")
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [snackOpen, setSnackOpen] = useState(false);
    const [pervTimeout, setPervTimeout] = useState(null);
    const history = useHistory();

    const { students, admin, studentsDispatch, studentDispatch } = useContext(Context)

    const teacherId = admin.adminId ? admin.adminId : "John Bell"

    useEffect(() => {
        if (!Boolean(students) || students === [] || students.length === 0) fetchStudentsList();
    }, [])

    const quareData =
    {
        students: {
            url: "https://dev.plabookeducation.com/studentList",
            options: (id) => {
                return ({
                    method: "POST",
                    body: JSON.stringify({ teacherId: id.replace(" ", "") }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
        },
        studentStatistic: {
            url: "https://dev.plabookeducation.com/studentStatistics",
            options: (id) => {
                return ({
                    method: "POST",
                    body: JSON.stringify({ studentId: id.replace(" ", "") }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
        }
    }



    const fetchStudentsList = async () => {
        const response = await fetch(quareData.students.url, quareData.students.options(teacherId))
        const result = await response.json()
        result.map((elem, index) => {
            elem["avatar"] = AvatarPicker().GetAvatar(elem.id);
            // elem["assessments"] = Math.floor(Math.random() * Math.floor(10));
            // elem["fluency"] = Math.floor(Math.random() * Math.floor(100));
        })
        console.log(result)
        studentsDispatch({
            type: 'setStudents',
            payload: result
        })
    }


    const fake = [
        {
            name: 'Jane Die',
            pin: '42069',
            personalLink: 'xxx.StyleStar.com',
            readingLevel: '5',
            stage: 'Comprehensiv',
            bookRead: '2',
            fluency: '89%'
        },
        {
            name: 'Big Mark',
            pin: '191409',
            personalLink: 'www.WWI.com',
            readingLevel: '99',
            stage: 'CHECKMATE READERS',
            bookRead: '9999',
            fluency: '420%'
        }
    ]



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


    const HandelRowCountChange = (count) => {
        setRowsPerPage(count);
        setPage(0)
        // setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
    }

    const GetPageRows = () => {
        return SearchTrough().slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage)
    }

    const SearchTrough = () => {
        //ЗДЕСЬ УКАЗЫВАЕШЬ МАССИВ С ПОЛУЧЕНЫМИ ДАННЫМИ!!!!!!!!!!!!
        return stableSort(students, getComparator(order, orderBy)).filter(searchRequest)
    }

    const searchRequest = (student) => {
        if (student !== null && student.name.toLowerCase().includes(searchFillter.toLowerCase()))
            return student
    }

    const useStyles = makeStyles({
        flexRow: {
            display: 'flex',
            alignItems: 'center',
            "& div": {
                marginRight: "10px"
            }
        },
        bgColor:
        {
            backgroundColor: "#3d4977"
        },
        pointer:
        {
            cursor: 'pointer'
        },
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
            display: "flex",
            alignItems: "flex-end",
            marginBottom: theme.margin.main,
            padding: 15,
            "& input":
            {
                width: "100%"
            }
        },
        paper:
        {
            marginBottom: theme.margin.main,
        }
    });

    const labels = [
        { name: "Name", align: "left", isSortable: true, propertyName: "name" },
        { name: "Pin code", align: "left", isSortable: false, propertyName: "pin" },
        { name: "Login link", align: "left", isSortable: true, propertyName: "personalLink" },
        { name: "Reading level", align: "left", isSortable: true, propertyName: "readingLevel" },
        { name: "Stage", align: "left", isSortable: true, propertyName: "stage" },
        { name: "Book read", align: "left", isSortable: true, propertyName: "bookRead" },
        { name: "Fluency", align: "left", isSortable: true, propertyName: "fluency" },
    ]

    const classes = useStyles();

    const handleCopy = (plink) => {
        navigator.clipboard.writeText(plink);
        setSnackOpen(true);
        clearTimeout(pervTimeout)
        const id = setTimeout(() => {
            setSnackOpen(false)
        }, 1000);
        setPervTimeout(id)
    }

    const NewBL = () => {

        const [createStudent, setCreateStudent] = useState(false)
        const togleCreate = () => setCreateStudent(!createStudent)
        // строки из примера таблиц 4
        const Row = (props) => {

            const { student } = props
            const { index } = props

            return (
                <tr>
                    {/* <td className="font-weight-bold">#453</td> */}
                    <td>
                        <div className="d-flex align-items-center">
                            <Avatar alt={student.name} className="mr-2" src={student.avatar} />
                            <div className={classes.pointer} onClick={() => { studentDispatch({ type: "setStudent", payload: { id: student.id, name: student.name } }); history.push("/StudentStatistic") }} >{student.name}</div>
                        </div>
                    </td>
                    <td className={`text-${labels[1]}`}>{student.pin}</td>
                    <td className={`text-${labels[2]}`}>
                        <Button onClick={() => { handleCopy(student.personalLink) }} className="m-2">
                            Copy Login Link
                            <Clipboard className="font-size-lg ml-1" />
                        </Button>
                    </td>
                    <td className={`text-${labels[3]}`}>
                        {student.readingLevel}
                        {/* <div className="badge bg-neutral-danger text-danger">
                            High
                        </div> */}
                    </td>
                    <td className={`text-${labels[4]}`}>
                        {/* <div className="text-dark badge badge-neutral-dark">
                            Closed
                        </div> */}
                        {student.stage}
                    </td>
                    {/* <td className="text-center text-muted">12/12/2020</td> */}
                    <td className={`text-${labels[5]}`}>{student.bookRead}</td>
                    <td className={`text-${labels[6]}`}>{student.fluency}</td>
                    {/* <td className="text-center text-muted">08/30/2021</td>
                    <td className="text-center">
                        <Button size="small" color="primary">
                            <FontAwesomeIcon
                                icon={['fas', 'ellipsis-h']}
                                className="font-size-lg"
                            />
                        </Button>
                    </td> */}
                </tr>
            )
        }

        return (
            <Card className="card-box mb-4">
                <NewStudentDialog open={createStudent} onClose={() => { togleCreate() }} />
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">Students</div>
                    <div>
                        <IconButton onClick={() => { togleCreate() }}>
                            <UserPlus />
                        </IconButton>
                    </div>
                    {/* <div className="card-header--actions">
                        <Button size="small" variant="outlined" color="secondary">
                            <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                    icon={['fas', 'plus-circle']}
                                    className="text-success"
                                />
                            </span>
                            <span className="btn-wrapper--label">Add ticket</span>
                        </Button>
                    </div> */}
                </div>

                <div className="table-responsive">
                    <table className="table table-hover text-nowrap mb-0">
                        <thead>
                            <tr>
                                {labels.map(label =>
                                    <th className={`bg-white text-${label.align}`}>
                                        <TableSortLabel
                                            classes={{ root: "tabel" }}
                                            active={orderBy === label.propertyName}
                                            direction={orderBy === label.propertyName ? order : 'asc'}
                                            onClick={(event) => { handleRequestSort(event, label.propertyName) }}
                                        >
                                            <div className={`bg-white tabel text-${label.align}`}>
                                                {label.name}
                                            </div>
                                        </TableSortLabel>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                GetPageRows().map((student, index) =>
                                    <Row index={index} student={student} />)
                            }
                            {
                                students.length === 0 && (<TableRow>
                                    <TableCell align="center" colSpan={14}>There's nothing here yet</TableCell>
                                </TableRow>)
                            }
                        </tbody>
                    </table>
                    <Divider />
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageArray}
                        component="div"
                        count={SearchTrough().length}
                        rowsPerPage={_rowsPerPage}
                        page={_page}
                        onChangePage={(e, newPage) => { setPage(newPage) }}
                        onChangeRowsPerPage={(e) => { HandelRowCountChange(e.target.value) }}
                    />
                </div>
            </Card>
        )
    }

    const toInt = (value) =>
    {
        const result = parseInt(value)
        return isNaN(result) ? 0 : result
    }

    const reduceByProperty = (array, propertyName) =>
    {
       return array.reduce((total,current)=> {
           const output = {};
           output[`${propertyName}`] = toInt(total[`${propertyName}`])+toInt(current[`${propertyName}`]);
           return output;
        })
    }

    const emptyRows = Math.abs(GetPageRows().length - _rowsPerPage);
    return (
        <Fragment>
            <PageTitle
                titleHeading="Students"
            />
            <div className="px-2">
                <Grid container spacing={4} className="mb-2">
                    <Grid item xs={3}>
                        <StatsCard
                            header="Fluency level"
                            color="plabook-info"
                            icon={
                                <Square color="white" className="w-rem-1" />
                            }
                            text={Math.round(reduceByProperty(students,"fluency").fluency/students.length)}
                        />                        
                    </Grid>
                    <Grid item xs={3}>
                        <StatsCard
                            header="Reading grade level"
                            color="plabook-info-light"
                            icon={
                                <MousePointer color="white" className="w-rem-1" />
                            }
                            text={Math.round(reduceByProperty(students,"readingLevel").readingLevel/students.length)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <StatsCard
                            header="Assessments"
                            color="plabook-info"
                            icon={
                                <MessageSquare color="white" className="w-rem-1" />
                            }
                            text={Math.round(reduceByProperty(students,"assessments").assessments/students.length)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <StatsCard header="Something" icon={<UserPlus />} text={2} />
                    </Grid>
                </Grid>
                <Paper className={classes.search} elevation={1}>
                    <TextField onChange={(e) => { setSearchFillter(e.target.value) }} id="search" fullWidth type="search" label="Search" />
                    {/* <Icon path={mdiFilterOutline} size={1.2}></Icon> */}
                </Paper>
            </div>
            <Grid container spacing={2}>
                {students.filter(searchRequest).map((student, index) =>
                    <Grid item xs={4}>
                        <StudentCard key={`${student.id}-${index}`} student={student} />
                    </Grid>
                )}
            </Grid>
            <Portal >
                <Snackbar
                    // classes={{root: classes.bgColor}}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={snackOpen}
                    onClose={() => { }}
                    message="Link copied"
                />
            </Portal>

            {/* <Old/> */}
        </Fragment>

    );
}

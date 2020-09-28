import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card, Grid, CardContent, Popover, Box,
    Tooltip, ClickAwayListener, Portal, IconButton, Tab, Tabs, List, ListItem, TableSortLabel, TableRow, TableCell, Divider, TablePagination
} from '@material-ui/core';

import CountUp from 'react-countup';
import Circle from 'react-circle';

import Icon from '@mdi/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageTitle, ExampleWrapperSimple } from '../../layout-components';


import Context from '../../../../Context'
import { getByText } from '@testing-library/react';
import { withStyles } from '@material-ui/styles';

import { mdiConsoleLine } from '@mdi/js';
import StudentInfoCard from './components/StudentInfoCard';
import Indecator from './components/Indecator';
import StudentGraph from './components/StudentGraph';
import ScrollBox from './components/ScrollBox';

export default function StudentProfile() {

    const { student, attemptDispatch } = useContext(Context)

    console.log(student)

    const history = useHistory();

    const [value, setValue] = React.useState(0);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [statistic, setStatistic] = useState([])
    const rowsPerPageArray = [5, 10, 25]
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const useStyles = makeStyles({

    });


    const quareData =
    {
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

    useEffect(() => {
        if (Boolean(student)) fetchStudentsStatistic();
        // axios.post('https://dev.plabookeducation.com/studentStatistic', {'studentId': student.id}).then(r =>{
        //     console.log('info:')
        //     console.log(r)
        // })

        // if (!Boolean(student)) studentDispatch({type:"setStudent", payload: fallback})
    }, [])

    const fetchStudentsStatistic = async () => {
        const response = await fetch(quareData.studentStatistic.url, quareData.studentStatistic.options(student.id))
        const result = await response.json()
        result.map(item => item.Date = new Date(Date.parse(item["Time Stamp"])))
        result.reverse()
        console.log(result)
        setStatistic(result)
    }

    const classes = useStyles();

    const studentTmp = {
        assessments: student.assessmentsTaken,
        avatar: student.avatar,
        bookRead: student.bookRead,
        fluency: student.fluency,
        id: student.id,
        name: student.name,
        personalLink: "https://dev.plabookeducation.com/Login/student/BelleRobinette",
        pin: "7799",
        readingLevel: student.readingLevel,
        stage: "Phonemic Awareness",
    }

    const activityLog = [
        {
            activity: "Read book title",
            date: "09.20.2000"
        },
        {
            activity: "Read book title",
            date: "02.20.2000"
        },
        {
            activity: "Read book title",
            date: "01.20.2000"
        },
        {
            activity: "Read book title",
            date: "06.20.2000"
        },
        {
            activity: "Read book title",
            date: "09.20.2000"
        }
    ]

    const assessments = [
        {
            name: "Some name",
            fluency: 3,
            comprrehension: 11,
            phonemes: 2,
            vocabulary: 17,
            phoncis: 20,
        },
        {
            name: "Another name",
            fluency: 2,
            comprrehension: 14,
            phonemes: 9,
            vocabulary: 1,
            phoncis: 0,
        },
        {
            name: "Magick name",
            fluency: 4,
            comprrehension: 19,
            phonemes: 18,
            vocabulary: 17,
            phoncis: 15,
        },
        {
            name: "Great name",
            fluency: 1,
            comprrehension: 2,
            phonemes: 4,
            vocabulary: 3,
            phoncis: 6,
        },
        {
            name: "Last name",
            fluency: 2,
            comprrehension: 8,
            phonemes: 5,
            vocabulary: 12,
            phoncis: 16,
        },
    ]


    const problemsWord = [
        {
            word: "Served",
            missed: 8,
        },
        {
            word: "Pretend",
            missed: 12,
        },
        {
            word: "Job",
            missed: 7,
        },
        {
            word: "Created",
            missed: 2,
        },
        {
            word: "Home",
            missed: 10,
        },
        {
            word: "Complete",
            missed: 23,
        },
        {
            word: "Dungeon",
            missed: 16,
        },
        {
            word: "Welcom",
            missed: 5,
        },
    ]

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    const labels = [
        { name: "Book ID", align: "left", isSortable: true, propertyName: "Book ID" },
        { name: "Date/Time", align: "left", isSortable: true, propertyName: "Date" },
        { name: "Page", align: "left", isSortable: true, propertyName: "Page" },
        { name: "Proficiency", align: "left", isSortable: true, propertyName: "Proficiency" },
        { name: "Number of Running Words", align: "left", isSortable: true, propertyName: "Number of Running Words" },
        { name: "Errors", align: "left", isSortable: true, propertyName: "Errors" },
        { name: "Self correction", align: "left", isSortable: true, propertyName: "Self Correction" },
        { name: "Err M/S/V", align: "left", isSortable: true, propertyName: "Err M" },
        // { name: "Err S", align: "left", isSortable: true, propertyName: "Err S" },
        // { name: "Err V", align: "left", isSortable: true, propertyName: "Err V" },
        { name: "SC M/S/V", align: "left", isSortable: true, propertyName: "SC M" },
        // { name: "SC S", align: "left", isSortable: true, propertyName: "SC S" },
        // { name: "SC V", align: "left", isSortable: true, propertyName: "iSC V" },
        { name: "Running records", align: "left", isSortable: false, propertyName: "id" },
    ]

    const handelAttemtClick = (attempt) => {
        attemptDispatch({
            type: "setAttempt",
            payload: attempt
        })
        history.push(`/StudentAttempt`)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const GetPageRows = () => {
        console.log(statistic)
        return stableSort(statistic, getComparator(order, orderBy)).slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage)
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

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

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

    const HandelRowCountChange = (count) => {
        setRowsPerPage(count);
        setPage(0)
        // setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
    }


    const NewBL = () => {
        // строки из примера таблиц 4
        const Row = (props) => {

            const { attempt } = props

            if (!Boolean(attempt)) return <></>

            return (
                <tr>
                    <td className={`text-${labels[1]}`}>{attempt["Book ID"]}</td>
                    <td className={`text-${labels[0]}`}>{attempt.Date.toLocaleDateString()} {attempt.Date.toLocaleTimeString()}</td>
                    <td className={`text-${labels[2]}`}>{attempt.Page}</td>
                    <td className={`text-${labels[3]}`}>{attempt.Proficiency}</td>
                    <td className={`text-${labels[5]}`}>{attempt["Number of Running Words"]}</td>
                    <td className={`text-${labels[6]}`}>{attempt.Errors}</td>
                    <td className={`text-${labels[7]}`}>{attempt["Self Correction"]}</td>
                    <td className={`text-${labels[8]}`}>{String(attempt["Err M"]) + '/' + String(attempt["Err S"]) + '/' + String(attempt["Err V"])}</td>
                    {/* <td className={`text-${labels[9]}`}>{attempt["Err S"]}</td>
                    <td className={`text-${labels[10]}`}>{attempt["Err V"]}</td> */}
                    <td className={`text-${labels[11]}`}>{String(attempt["SC M"]) + '/' + String(attempt["SC S"]) + '/' + String(attempt["SC V"])}</td>
                    {/* <td className={`text-${labels[12]}`}>{attempt["SC S"]}</td>
                    <td className={`text-${labels[13]}`}>{attempt["SC V"]}</td> */}
                    <td className={`text-${labels[4]}`}>
                        <Button
                            variant="outlined"
                            onClick={() => { handelAttemtClick(attempt) }}>
                            More details
                        </Button>
                    </td>
                </tr>
            )
        }

        return (
            <Card className="card-box mb-4">
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">Reading Log</div>
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
                                            classes={{ root: "tabel" }} handleRequestSort
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
                                GetPageRows().map((attempt, index) =>
                                    <Row attempt={attempt} />)
                            }
                            {
                                statistic.length === 0 && (<TableRow>
                                    <TableCell align="center" colSpan={14}>There's nothing here yet</TableCell>
                                </TableRow>)
                            }
                        </tbody>
                    </table>
                    <Divider />
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageArray}
                        component="div"
                        count={statistic.length}
                        rowsPerPage={_rowsPerPage}
                        page={_page}
                        onChangePage={(e, newPage) => { setPage(newPage) }}
                        onChangeRowsPerPage={(e) => { HandelRowCountChange(e.target.value) }}
                    />
                </div>
            </Card>
        )
    }

    return (
        <Fragment>
            <PageTitle
                titleHeading={<>
                    <IconButton
                        className="w-rem-3"
                        onClick={() => window.history.back()}>
                        <FontAwesomeIcon
                            icon={['fa', 'chevron-left']}
                            size="sm"
                            className="font-size-xxl "
                        /></IconButton>
                    {studentTmp.name}
                </>}
            />
            {/* <div className="mb-4" >
                <Button
                    className="m-1"
                    startIcon={<FontAwesomeIcon
                        icon={['fa', 'chevron-left']}
                        size="sm"
                        className="font-size-xxl "
                    />} onClick={() => window.history.back()}/>
            </div> */}
            <div className="w-percent-100 d-flex align-items-start"
            >
                <div className="pr-4">
                    <StudentInfoCard student={studentTmp} />
                    <Card className="mt-4">
                        <div className="p-2 text-center">
                            <h4>
                                {"Problem word & sounds"}
                            </h4>
                        </div>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Words" />
                            <Tab label="Sounds" />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <List>
                                <ScrollBox height={'24.0625rem'}>
                                    {problemsWord.map(item =>
                                        <ListItem>
                                            <div className="fs-rem-6 d-flex w-100" style={{ justifyContent: "space-between" }}>
                                                <div>
                                                    {item.word}
                                                </div>
                                                <div>
                                                    {item.missed}
                                                </div>
                                            </div>
                                        </ListItem>)}
                                </ScrollBox>
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div className="p-2 fs-rem-6 problem-preview-container">
                                Some problem sounds
                            </div>
                        </TabPanel>
                    </Card>
                </div>
                <div className="w-100">
                    <StudentGraph />
                    <Card className="px-4 py-3 mb-4">
                        <div className="fs-rem-14 fw-700">
                            Activity Log
                        </div>
                        <div className="fs-rem-6 mb-1 text-black-50 d-flex w-100" style={{ justifyContent: "space-between" }}>
                            <div>
                                Activity
                            </div>
                            <div>
                                Completion  Date
                            </div>
                        </div>
                        <ScrollBox height={200}>
                            {statistic.length > 0 ? statistic.map((item, index) => {
                                    return (
                                        <div key={`${item.name}-${index}`} className={`p-2 fs-rem-5 d-flex w-100 ${index % 2 === 0 ? "bg-plabook-gray-1" : ""}`} style={{ justifyContent: "space-between" }}>
                                            <div>
                                                {item["Book ID"]}
                                            </div>
                                            <div>
                                                {item.Date.toLocaleDateString()} {item.Date.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    )
                            }) : <div className="text-center fs-rem-5">
                                    There's nothing here yet
                                </div>}
                        </ScrollBox>
                    </Card>
                    {/* <NewBL /> */}
                </div>
            </div>
            <div className="mt-4"  >
                <NewBL />
                <Card className="px-4 py-3">
                        <div className="fs-rem-14 fw-700">
                            Assesments
                        </div>
                        {/* className="fs-rem-6 mb-1 text-black-50 d-flex w-100" */}
                        <Grid container spacing={1} className="fs-rem-6 mb-1 text-black-50 d-flex w-100">
                            <Grid item xs>
                                Assesments name
                            </Grid>
                            <Grid item xs className="text-center">
                                Fluency
                            </Grid>
                            <Grid item xs>
                                Compregension
                            </Grid>
                            <Grid item xs>
                                Phonemes
                            </Grid>
                            <Grid item xs>
                                Vocabulary
                            </Grid>
                            <Grid item xs>
                                Phonics
                            </Grid>
                            <Grid item xs>
                                Assign
                            </Grid>
                        </Grid>
                        <ScrollBox height={200}>
                            {assessments.map((item, index) => {
                                return (
                                    <Grid
                                        container
                                        spacing={1}
                                        className={`p-2 fs-rem-5 d-flex w-100 ${index % 2 === 0 ? "bg-plabook-gray-1" : ""}`}
                                    >
                                        <Grid item xs>
                                            {item.name}
                                        </Grid>
                                        <Grid item xs className="text-center fw-500">
                                            {item.fluency}
                                        </Grid>
                                        <Grid item xs>
                                            <Indecator value={item.comprrehension} maxValue={20} />
                                        </Grid>
                                        <Grid item xs>
                                            <Indecator value={item.phonemes} maxValue={20} />
                                        </Grid>
                                        <Grid item xs>
                                            <Indecator value={item.vocabulary} maxValue={20} />
                                        </Grid>
                                        <Grid item xs>
                                            <Indecator value={item.phoncis} maxValue={20} />
                                        </Grid>
                                        <Grid item xs>
                                            Assign
                                    </Grid>
                                    </Grid>
                                )
                            })}
                        </ScrollBox>
                    </Card>
            </div>
        </Fragment>
    );
}
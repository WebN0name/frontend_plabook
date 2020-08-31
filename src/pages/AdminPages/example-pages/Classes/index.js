import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    Avatar, Box, TextField, Paper, Typography, Divider, TableSortLabel, Card, Tooltip
} from '@material-ui/core';

import Icon from '@mdi/react'
import { mdiFilterOutline } from '@mdi/js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageTitle } from '../../layout-components';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';

import Context from '../../../../Context'

import { SyncLoader } from 'react-spinners';
import SelectSearch from './components/SelectSearch';
import SelectSearchItem from './components/SelectSearchItem';


export default function Classes() {

    // const { name } = useParams();
    // const fallback = {
    //     // id: name.replace(" ",""),
    //     // name: name
    // }
    const { student, attemptDispatch } = useContext(Context)

    const history = useHistory()


    console.log(!Boolean(student))

    console.log(student)

    const teacherNames = ["JohnBell", "MariSiemens"]
    const [statistic, setStatistic] = useState([])
    const rowsPerPageArray = [5, 10, 25]
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');

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

    const quareData =
    {
        studentStatistic: {
            url: "https://boomd.ru:3000/studentStatistics",
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

    const HandelRowCountChange = (count) => {
        setRowsPerPage(count);
        setPage(0)
        // setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
    }

    const GetPageRows = () => {
        return stableSort(schoolClasses, getComparator(order, orderBy)).slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage)
    }

    const useStyles = makeStyles({
        flexRow: {
            display: 'flex',
            alignItems: 'center',
            "& div": {
                marginRight: "10px"
            }
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
        { name: "Class id", align: "center", width: 50, isSortable: true, propertyName: "id" },
        { name: "Class room", align: "center", width: 50, isSortable: true, propertyName: "room" },
        { name: "Grade", align: "center", width: 50, isSortable: true, propertyName: "grade" },
        { name: "Teacher", align: "left", width: 100, isSortable: false, propertyName: "teacher" },
        { name: "Students", align: "left", width: 200, isSortable: false, propertyName: "students" },
        { name: "Books", align: "left", width: 200, isSortable: false, propertyName: "books" },
    ]

    const classes = useStyles();

    const NewBL = () => {
        // строки из примера таблиц 4
        const Row = (props) => {

            const { schoolClass } = props

            if (!Boolean(schoolClass)) return <></>

            return (
                <tr>
                    <td className={`text-${labels[0]}`}>{schoolClass.id}</td>
                    <td className={`text-${labels[1]}`}>{schoolClass.room}</td>
                    <td className={`text-${labels[2]}`}>{schoolClass.grade}</td>
                    <td className={`text-${labels[3]}`}>
                        <SelectSearch multiple={false} id={`teacher-${schoolClass.id}`} name={schoolClass.id + "teacher"}>
                            {teachers.map((item, index) =>
                                <SelectSearchItem key={index} value={item}>
                                    {item}
                                </SelectSearchItem>
                            )}
                        </SelectSearch>
                    </td>
                    <td className={`text-${labels[4]}`}>
                        <SelectSearch multiple={true} id={`students-${schoolClass.id}`} name={schoolClass.id + "students"} onChange={() => { console.log(document.getElementById(`students-${schoolClass.id}`).getAttribute("value")) }}>
                            {students.map((item, index) =>
                                <SelectSearchItem key={index} value={item}>
                                    {item}
                                </SelectSearchItem>
                            )}
                        </SelectSearch>
                    </td>
                    <td className={`text-${labels[5]}`}>
                        <SelectSearch multiple={true} id={`books-${schoolClass.id}`} name={schoolClass.id + "books"} onChange={() => { console.log(document.getElementById(`books-${schoolClass.id}`).getAttribute("value")) }}>
                            {books.map((item, index) =>
                                <SelectSearchItem key={index} value={item}>
                                    {item}
                                </SelectSearchItem>
                            )}
                        </SelectSearch>
                    </td>
                </tr>
            )
        }

        return (
            <Card className="card-box mb-4">
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">Atempts</div>
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
                                GetPageRows().map((schoolClass, index) =>
                                    <Row schoolClass={schoolClass} />)
                            }
                            {
                                schoolClasses.length === 0 && (<TableRow>
                                    <TableCell align="center" colSpan={14}>
                                        <SyncLoader
                                            size={5}
                                            color={'var(--first)'} /></TableCell>
                                </TableRow>)
                            }
                        </tbody>
                    </table>
                    <Divider />
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageArray}
                        component="div"
                        count={schoolClasses.length}
                        rowsPerPage={_rowsPerPage}
                        page={_page}
                        onChangePage={(e, newPage) => { setPage(newPage) }}
                        onChangeRowsPerPage={(e) => { HandelRowCountChange(e.target.value) }}
                    />
                </div>
            </Card>
        )
    }

    const emptyRows = Math.abs(GetPageRows().length - _rowsPerPage);
    return (
        <Fragment>
            <PageTitle
                titleHeading={`Classes`}
            />
            <NewBL />
        </Fragment>

    );
}

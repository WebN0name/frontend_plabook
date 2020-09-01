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


export default function StudentsStatistic() {

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

    const quareData =
    {
        studentStatistic: {
            url: "https://plabookeducation.com/studentStatistics",
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
        return stableSort(statistic, getComparator(order, orderBy)).slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage)
    }

    const handelAttemtClick = (attempt) =>{
        attemptDispatch({
            type:"setAttempt",
            payload: attempt
        })
        history.push(`/StudentAttempt`) 
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
        { name: "Time Stamp", align: "left", isSortable: true, propertyName: "Date" },
        { name: "Book ID", align: "left", isSortable: true, propertyName: "Book ID" },
        { name: "Page", align: "left", isSortable: true, propertyName: "Page" },
        { name: "Proficiency", align: "left", isSortable: true, propertyName: "Proficiency" },
        { name: "Running records", align: "left", isSortable: false, propertyName: "id" },
        { name: "Number of running", align: "left", isSortable: true, propertyName: "Number of Running Words" },
        { name: "Errors", align: "left", isSortable: true, propertyName: "Errors" },
        { name: "Self correction", align: "left", isSortable: true, propertyName: "Self Correction" },
        { name: "Err M/S/V", align: "left", isSortable: true, propertyName: "Err M" },
        // { name: "Err S", align: "left", isSortable: true, propertyName: "Err S" },
        // { name: "Err V", align: "left", isSortable: true, propertyName: "Err V" },
        { name: "SC M/S/V", align: "left", isSortable: true, propertyName: "SC M" },
        // { name: "SC S", align: "left", isSortable: true, propertyName: "SC S" },
        // { name: "SC V", align: "left", isSortable: true, propertyName: "iSC V" },
    ]

    const classes = useStyles();

    const NewBL = () => {
        // строки из примера таблиц 4
        const Row = (props) => {

            const { attempt } = props

            if (!Boolean(attempt)) return <></>
            
            return (
                <tr>
                    <td className={`text-${labels[0]}`}>{attempt.Date.toLocaleDateString()} {attempt.Date.toLocaleTimeString()}</td>
                    <td className={`text-${labels[1]}`}>{attempt["Book ID"]}</td>
                    <td className={`text-${labels[2]}`}>{attempt.Page}</td>
                    <td className={`text-${labels[3]}`}>{attempt.Proficiency}</td>
                    <td className={`text-${labels[4]}`}>
                        <Button
                            variant="outlined"
                            onClick={() => { handelAttemtClick(attempt)}}>
                            More details
                        </Button>
                    </td>
                    <td className={`text-${labels[5]}`}>{attempt["Number of Running Words"]}</td>
                    <td className={`text-${labels[6]}`}>{attempt.Errors}</td>
                    <td className={`text-${labels[7]}`}>{attempt["Self Correction"]}</td>
                    <td className={`text-${labels[8]}`}>{String(attempt["Err M"]) + '/' + String(attempt["Err S"]) + '/' + String(attempt["Err V"])}</td>
                    {/* <td className={`text-${labels[9]}`}>{attempt["Err S"]}</td>
                    <td className={`text-${labels[10]}`}>{attempt["Err V"]}</td> */}
                    <td className={`text-${labels[11]}`}>{String(attempt["SC M"]) + '/' + String(attempt["SC S"]) + '/' + String(attempt["SC V"])}</td>
                    {/* <td className={`text-${labels[12]}`}>{attempt["SC S"]}</td>
                    <td className={`text-${labels[13]}`}>{attempt["SC V"]}</td> */}
                </tr>
            )
        }

        return (
            <Card className="card-box mb-4">
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">Attempts</div>
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
  
    const emptyRows = Math.abs(GetPageRows().length - _rowsPerPage);
    return (
        <Fragment>
            <PageTitle
                titleHeading={`${student && student.name} Statistic`}
            /> 
            <Button
                className="m-1"
                startIcon={<FontAwesomeIcon
                icon={['fa', 'chevron-left']}
                size="sm"
                className="font-size-xxl "
            />} onClick={() => window.history.back()}>Back</Button>                      
            <NewBL />
        </Fragment>

    );
}

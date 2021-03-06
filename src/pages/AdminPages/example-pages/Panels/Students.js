import React, { Fragment, useState, useEffect } from 'react';
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

export default function Students() {

    const { id } = useParams();

    const teacherNames = ["JohnBell", "MariSiemens"]
    const rowsPerPageArray = [5, 10, 25]
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)
    const [searchFillter, setSearchFillter] = useState("")
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [_students, setStudents] = useState([]);
    const history = useHistory();

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
        method: "POST",
        body: JSON.stringify({ teacherId: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        fetchDate();
    }, [])

    const fetchDate = async () => {
        const response = await fetch(`https://dev.plabookeducation.com/studentList`, quareData)
        const result = await response.json();
        setStudents(result);
    }


    const HandelRowCountChange = (count) => {
        setRowsPerPage(count);
        setPage(0)
        setTimeout(() => { document.getElementById("content").scrollTop = 0 }, 1)
    }

    const GetPageRows = () => {
        return stableSort(_students, getComparator(order, orderBy)).filter(searchRequest).slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage)
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
        { name: "Link", align: "left", isSortable: true, propertyName: "personalLink" },
        { name: "Reading level", align: "left", isSortable: true, propertyName: "readingLevel" },
        { name: "Stage", align: "left", isSortable: true, propertyName: "stage" },
        { name: "Book read", align: "left", isSortable: true, propertyName: "bookRead" },
        { name: "Fluency", align: "left", isSortable: true, propertyName: "fluency" },
    ]

    const classes = useStyles();

    const NewBL = () => {
        return (
            <Card className="card-box mb-4">
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">Support board</div>
                    <div className="card-header--actions">
                        <Button size="small" variant="outlined" color="secondary">
                            <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                    icon={['fas', 'plus-circle']}
                                    className="text-success"
                                />
                            </span>
                            <span className="btn-wrapper--label">Add ticket</span>
                        </Button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover text-nowrap mb-0">
                        <thead>
                            <tr>
                                <th className="bg-white text-left">ID</th>
                                <th className="bg-white">Requester</th>
                                <th className="bg-white text-left">Subject</th>
                                <th className="bg-white">Assignee</th>
                                <th className="bg-white text-center">Priority</th>
                                <th className="bg-white text-center">Status</th>
                                <th className="bg-white text-center">Created date</th>
                                <th className="bg-white text-center">Due date</th>
                                <th className="bg-white text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-weight-bold">#453</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Avatar alt="..." className="mr-2" src={avatar1} />
                                        <div>Shanelle Wynn</div>
                                    </div>
                                </td>
                                <td>When, while the lovely valley teems</td>
                                <td className="text-center">
                                    <Avatar alt="..." src={avatar2} />
                                </td>
                                <td className="text-center">
                                    <div className="badge bg-neutral-danger text-danger">
                                        High
                  </div>
                                </td>
                                <td className="text-center">
                                    <div className="text-dark badge badge-neutral-dark">
                                        Closed
                  </div>
                                </td>
                                <td className="text-center text-muted">12/12/2020</td>
                                <td className="text-center text-muted">08/30/2021</td>
                                <td className="text-center">
                                    <Button size="small" color="primary">
                                        <FontAwesomeIcon
                                            icon={['fas', 'ellipsis-h']}
                                            className="font-size-lg"
                                        />
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">#584</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Avatar alt="..." className="mr-2" src={avatar3} />
                                        <div>Brody Dixon</div>
                                    </div>
                                </td>
                                <td>I am so happy, my dear friend</td>
                                <td className="text-center">
                                    <Tooltip arrow title="Arvin Weston">
                                        <Avatar alt="Remy Sharp" src={avatar4} />
                                    </Tooltip>
                                </td>
                                <td className="text-center">
                                    <div className="text-warning badge badge-neutral-warning">
                                        Low
                  </div>
                                </td>
                                <td className="text-center">
                                    <div className="text-success badge badge-neutral-success">
                                        Open
                  </div>
                                </td>
                                <td className="text-center text-muted">06/08/2022</td>
                                <td className="text-center text-muted">07/25/2023</td>
                                <td className="text-center">
                                    <Button size="small" color="primary">
                                        <FontAwesomeIcon
                                            icon={['fas', 'ellipsis-h']}
                                            className="font-size-lg"
                                        />
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">#764</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Avatar alt="..." className="mr-2" src={avatar5} />
                                        <div>Milton Ayala</div>
                                    </div>
                                </td>
                                <td>His own image, and the breath</td>
                                <td className="text-center">
                                    <Tooltip arrow title="Mali Rosario">
                                        <Avatar alt="Mali Rosario" src={avatar6} />
                                    </Tooltip>
                                </td>
                                <td className="text-center">
                                    <div className="text-info badge badge-neutral-info">
                                        Medium
                  </div>
                                </td>
                                <td className="text-center">
                                    <div className="text-dark badge badge-neutral-dark">
                                        Closed
                  </div>
                                </td>
                                <td className="text-center text-muted">12/12/2020</td>
                                <td className="text-center text-muted">08/30/2021</td>
                                <td className="text-center">
                                    <Button size="small" color="primary">
                                        <FontAwesomeIcon
                                            icon={['fas', 'ellipsis-h']}
                                            className="font-size-lg"
                                        />
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">#453</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Avatar alt="..." className="mr-2" src={avatar1} />
                                        <div>Kane Gentry</div>
                                    </div>
                                </td>
                                <td>When I hear the buzz</td>
                                <td className="text-center">
                                    <Avatar alt="..." className="mr-2" src={avatar7} />
                                </td>
                                <td className="text-center">
                                    <div className="text-warning badge badge-neutral-warning">
                                        Low
                  </div>
                                </td>
                                <td className="text-center">
                                    <div className="text-success badge badge-neutral-success">
                                        Open
                  </div>
                                </td>
                                <td className="text-center text-muted">12/12/2020</td>
                                <td className="text-center text-muted">08/30/2021</td>
                                <td className="text-center">
                                    <Button size="small" color="primary">
                                        <FontAwesomeIcon
                                            icon={['fas', 'ellipsis-h']}
                                            className="font-size-lg"
                                        />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        )
    }

    const emptyRows = Math.abs(GetPageRows().length - _rowsPerPage);
    return (
        <Fragment>
            <PageTitle
                titleHeading="Students"
            />
            <NewBL />
            <Paper className={classes.search} elevation={1}>
                <TextField onChange={(e) => { setSearchFillter(e.target.value) }} id="search" fullWidth type="search" label="Search" />
                <Icon path={mdiFilterOutline} size={1.2}></Icon>
            </Paper>
            <Paper style={{ marginBottom: 30 }} elevation={1}>
                <Box className={classes.TabHead}><Typography gutterBottom variant="h5" >Students</Typography></Box>
                <Divider />
                <TableContainer>
                    <Table title="Students">
                        <TableHead>
                            <TableRow>
                                {labels.map((label) => (
                                    <TableCell key={label.name} align={label.align}>
                                        <TableSortLabel
                                            active={orderBy === label.propertyName}
                                            direction={orderBy === label.propertyName ? order : 'asc'}
                                            onClick={(event) => { handleRequestSort(event, label.propertyName) }}
                                        >
                                            {label.name}
                                        </TableSortLabel>
                                    </TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                GetPageRows().map((student, index) =>
                                    <TableRow hover key={student.name + index}>
                                        <TableCell onClick={() => { history.push(`/Admin/StudentStatistic/${student.name}`) }} className={classes.nameCell} align="left"><Box className={classes.flexRow}><Avatar alt={student.name} src="" />{student.name}</Box></TableCell>
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
                    onChangeRowsPerPage={(e) => { HandelRowCountChange(e.target.value) }}
                />
            </Paper>
        </Fragment>

    );
}

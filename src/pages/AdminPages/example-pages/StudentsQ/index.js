import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    Avatar, Box, TextField, Paper, Typography, Divider, TableSortLabel, Card, Tooltip, IconButton, Fab, Snackbar,Portal
} from '@material-ui/core';

import Icon from '@mdi/react'
import { mdiFilterOutline } from '@mdi/js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageTitle } from '../../layout-components';
import Context from '../../../../Context'

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';
import { SyncLoader } from 'react-spinners';

import {
    Clipboard,
} from 'react-feather';

import AvatarPicker from '../../../../components/AvatarPicker';


export default function Students() {

    const { id } = useParams();

    const teacherNames = ["JohnBell", "MariSiemens"]
    const rowsPerPageArray = [5, 10, 25]
    const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0])
    const [_page, setPage] = useState(0)
    const [searchFillter, setSearchFillter] = useState("")
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [snackOpen, setSnackOpen] = useState(false);
    const [pervTimeout, setPervTimeout] = useState(null);
    const [_students, setStudents] = useState([]);
    const history = useHistory();

    const { students, admin, studentsDispatch, studentDispatch } = useContext(Context)

    const teacherId = admin.id ? admin.id : "John Bell"

    useEffect(() => {
        if (!Boolean(students) || students === [] || students.length === 0) fetchStudentsList();
    }, [])

    const quareData =
    {
        students: {
            url: "https://plabookeducation.com/studentList",
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


    const fetchStudentsList = async () => {
        const response = await fetch(quareData.students.url, quareData.students.options(teacherId))
        const result = await response.json()
        result.map((elem,index)=>{
            elem["avatar"] = AvatarPicker().GetAvatar(elem.id)
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

    const avatars =[
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
        avatar7,
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
        { name: "Login link", align: "center", isSortable: true, propertyName: "personalLink" },
        { name: "Reading level", align: "left", isSortable: true, propertyName: "readingLevel" },
        { name: "Stage", align: "left", isSortable: true, propertyName: "stage" },
        { name: "Book read", align: "left", isSortable: true, propertyName: "bookRead" },
        { name: "Fluency", align: "left", isSortable: true, propertyName: "fluency" },
    ]

    const classes = useStyles();

    const handleCopy = (plink) =>
    {
        navigator.clipboard.writeText(plink);
        setSnackOpen(true);
        clearTimeout(pervTimeout)
        const id = setTimeout(() => {
            setSnackOpen(false)
        }, 50000);
        setPervTimeout(id)
    }

    const NewBL = () => {
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
                        <Button onClick={() => {handleCopy(student.personalLink)}} className="m-2">
                            Copy Link
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
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">Students</div>
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
                            {/* <tr>
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
                            </tr> */}
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

    const Old = () => {
        return (
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
        )
    }
    const emptyRows = Math.abs(GetPageRows().length - _rowsPerPage);
    return (
        <Fragment>
            <PageTitle
                titleHeading="Students"
            />
            <Paper className={classes.search} elevation={1}>
                <TextField onChange={(e) => { setSearchFillter(e.target.value) }} id="search" fullWidth type="search" label="Search" />
                {/* <Icon path={mdiFilterOutline} size={1.2}></Icon> */}
            </Paper>
            <NewBL />
            <Portal >
            <Snackbar
                // classes={{root: classes.bgColor}}
                anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
                open={snackOpen}
                onClose={()=>{}}
                message="Link copied"
            />
            </Portal>          
            
            {/* <Old/> */}
        </Fragment>

    );
}

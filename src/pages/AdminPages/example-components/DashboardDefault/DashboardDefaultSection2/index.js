import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Avatar,
  Box,
  Typography,
  Tabs,
  Tab,
  LinearProgress,
  Card,
  Button,
  Divider
} from '@material-ui/core';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  IconButton,
  CardContent,
  Tooltip
} from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

import { Line } from 'react-chartjs-2';

import Context from '../../../../../Context'
import { useHistory } from 'react-router-dom';
import NewStudentDialog from '../../../example-pages/AdminModals/NewStudentDialog';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function LivePreviewExample() {

  const serverId = "http://localhost:3000"

  const history = useHistory()

  const data3Dark = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(65, 145, 255, 0.4)',
        borderCapStyle: 'round',
        borderDash: [],
        borderWidth: 3,
        borderColor: '#4191ff',
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: '#4191ff',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 3,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 3,
        pointRadius: 4,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#4191ff',
        data: [65, 59, 80, 81, 56, 55, 40],
        datalabels: {
          display: false
        },
        label: 'Series A'
      },
      {
        backgroundColor: 'rgba(27, 201, 67, 0.3)',
        borderCapStyle: 'round',
        borderDash: [],
        borderWidth: 3,
        borderColor: '#1bc943',
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: '#1bc943',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 3,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 3,
        pointRadius: 4,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#1bc943',
        data: [28, 48, 40, 19, 86, 27, 90],
        datalabels: {
          display: false
        },
        label: 'Series B'
      }
    ]
  };
  const data3DarkOptions = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            display: true,
            beginAtZero: true
          },
          gridLines: {
            display: true,
            color: '#eeeff8',
            drawBorder: true
          }
        }
      ]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const [value, setValue] = useState(0);


  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
  ]

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Old = () => {
    return (
      <Card className="mb-4">
        <div className="card-img-wrapper">
          <div className="card-badges card-badges-bottom">
            <div className="badge badge-warning badge-pill">Warning</div>
          </div>
          <div className="bg-composed-wrapper bg-midnight-bloom border-0">
            <div className="bg-composed-img-2 bg-composed-wrapper--image rounded" />
            <div className="bg-composed-wrapper--content text-light text-center text-xl-left p-5">
              <h4 className="font-size-xl font-weight-bold mb-2">
                Knowledge Base Software
                  </h4>
              <p className="opacity-6 font-size-md mb-3">
                {' '}
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem.{' '}
              </p>
              <Button
                color="default"
                variant="contained"
                className="text-nowrap px-4 text-uppercase font-size-sm mb-4 mb-xl-0">
                <small className="font-weight-bold">Contact us</small>
              </Button>
            </div>
          </div>
        </div>
        <div className="card-body text-center card-body-avatar">
          <div className="avatar-icon-wrapper d-120">
            <div className="avatar-icon rounded-circle">
              <img alt="..." className="img-fluid" src={avatar6} />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table text-nowrap table-borderless table-hover table-alternate text-left mb-0">
              <thead className="thead-light">
                <tr>
                  <th className="pt-0" style={{ width: '40%' }}>
                    Employee
                      </th>
                  <th className="pt-0 text-center">Status</th>
                  <th className="pt-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar alt="..." src={avatar2} className="mr-2" />
                      <div>
                        <a
                          href="#/"
                          onClick={e => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Shanelle Wynn
                            </a>
                        <span className="text-black-50 d-block">
                          UI Engineer, Apple Inc.
                            </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="h-auto py-0 px-3 badge badge-warning">
                      Pending
                        </div>
                  </td>
                  <td className="text-center">
                    <Button size="small" variant="outlined" color="primary">
                      Chat
                        </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar alt="..." src={avatar1} className="mr-2" />
                      <div>
                        <a
                          href="#/"
                          onClick={e => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Beck Simpson
                            </a>
                        <span className="text-black-50 d-block">
                          Frontend Developer
                            </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-success h-auto py-0 px-3">
                      Completed
                        </div>
                  </td>
                  <td className="text-center">
                    <Button size="small" variant="outlined" color="primary">
                      Chat
                        </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar alt="..." src={avatar3} className="mr-2" />
                      <div>
                        <a
                          href="#/"
                          onClick={e => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Regan Norris
                            </a>
                        <span className="text-black-50 d-block">
                          Senior Project Manager
                            </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="h-auto py-0 px-3 badge badge-danger">
                      Declined
                        </div>
                  </td>
                  <td className="text-center">
                    <Button size="small" variant="outlined" color="primary">
                      Chat
                        </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar alt="..." src={avatar4} className="mr-2" />
                      <div>
                        <a
                          href="#/"
                          onClick={e => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Nell Knott
                            </a>
                        <span className="text-black-50 d-block">
                          UX Designer
                            </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="h-auto py-0 px-3 badge badge-success">
                      Accepted
                        </div>
                  </td>
                  <td className="text-center">
                    <Button size="small" variant="outlined" color="primary">
                      Chat
                        </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar alt="..." src={avatar5} className="mr-2" />
                      <div>
                        <a
                          href="#/"
                          onClick={e => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Cathal Anthony
                            </a>
                        <span className="text-black-50 d-block">
                          UI Developer
                            </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-primary h-auto py-0 px-3">
                      On Hold
                        </div>
                  </td>
                  <td className="text-center">
                    <Button size="small" variant="outlined" color="primary">
                      Chat
                        </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    )
  }

  const StudentPreview = () => {

    const { students, student, studentDispatch } = useContext(Context)

  const [createStudent, setCreateStudent] = useState(false)
  const togleCreate = () => setCreateStudent(!createStudent)

    // Отрефакторить  
    const getRandom = (array, amount) => {
      console.log(array)
      if (!Boolean(array)) return []
      let buffer = array.slice(0)
      let output = []
      for (let i = 0; i < amount; i++) {
        const value = buffer[Math.floor(Math.random() * Math.floor(buffer.length))]
        if (Boolean(value)) output.push(value)
        const index = buffer.indexOf(value);
        if (index > -1) {
          buffer.splice(index, 1);
        }
        if (buffer.length <= 0) break
      }
      return output
    }

    const sortByName =(a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    const StudentRow = (props) => {
      const { student } = props
      const { index } = props
      const ex = {
        "id": "JaneDoe",
        "name": "Jane Doe",
        "pin": "5495",
        "personalLink": "https://plabookeducation.com/Login/student/JaneDoe",
        "readingLevel": "4",
        "stage": "Comprehension",
        "bookRead": "4"
      }
      if (!Boolean(student)) return
      return (
        <tr>
          <td>{index}</td>
          <td>
            <div className="d-flex align-items-center">
              <Avatar alt={student.name} src={student.avatar} className="mr-2" />
              <div>
                <a
                  href={`#/`}
                  onClick={(e) => { e.preventDefault(); studentDispatch({ type: "setStudent", payload: { id: student.id, name: student.name } }); history.push(`/StudentStatistic/${student.name}`) }}
                  className="font-weight-bold text-black"
                  title="...">
                  {student.name}
                </a>
                {/* <span className="text-black-50 d-block">
                  Student
                        </span> */}
              </div>
            </div>
          </td>
          <td className="text-center">
            {/* <div className="badge badge-warning px-4">{student.bookRead}</div> */}
            {student.bookRead}
          </td>
          <td className="text-center">
            {student.readingLevel}
          </td>
          <td className="text-center">
            {student.stage}
            {/* <Tooltip arrow title="View Details">
              <IconButton
                size="small"
                variant="outlined"
                color="primary">
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </IconButton>
            </Tooltip> */}
          </td>
        </tr>
      )
    }

    return (
      <Grid item xs={12} lg={6}>
        <Card className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Students</div>
            {/* <div className="card-header--actions">
              <Tooltip arrow title="Refresh">
                <IconButton size="small" color="primary" className="mr-3">
                  <FontAwesomeIcon icon={['fas', 'cog']} spin />
                </IconButton>
              </Tooltip>
            </div> */}
          </div>
          <CardContent className="p-3">
            <div className="table-responsive">
              <table className="table table-borderless table-hover text-nowrap mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-left">Name</th>
                    <th className="text-center">Books read</th>
                    <th className="text-center">Reading level</th>
                    <th className="text-center">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {/* //ЗДЕСЬ УКАЗЫВАЕШЬ МАССИВ С ПОЛУЧЕНЫМИ ДАННЫМИ!!!!!!!!!!!! */}
                  {students.sort(sortByName).slice(0,5).map((student, index) =>
                    <StudentRow key={index} student={student} index={students.indexOf(student) + 1} />
                  )}
                  {/* <tr>
                    <td>12</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Avatar alt="..." src={avatar7} className="mr-2" />
                        <div>
                          <a
                            href="#/"
                            onClick={e => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Shanelle Wynn
                        </a>
                          <span className="text-black-50 d-block">
                            UI Engineer, Apple Inc.
                        </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="badge badge-warning px-4">Pending</div>
                    </td>
                    <td>
                      <LinearProgress value={55} color="primary" />
                    </td>
                    <td className="text-center">
                      <Tooltip arrow title="View Details">
                        <IconButton
                          size="small"
                          variant="outlined"
                          color="primary">
                          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                   */}
                </tbody>
              </table>
            </div>
          </CardContent>
          <div className="card-footer d-flex alig justify-content-end">
          {/* <div className="card-footer d-flex alig justify-content-between"> */}
            {/* <Button color="primary" size="small">
              Delete student
            </Button> */}
            <div>
              <Button
                size="small"
                variant="contained"
                className="mr-3 bg-plabook-secondary"
                color="primary"
                onClick={() => { history.push("/StudentsQ") }}>
                View all
            </Button>
              <Button
                className="bg-plabook-secondary" 
                size="small" 
                variant="contained" 
                color="secondary">
                Add new student
            </Button>
            <NewStudentDialog onClose={()=>{togleCreate()}} open={createStudent}/>
            </div>
          </div>
        </Card>
      </Grid>
    )
  }

  const GraphStatistic = () => {
    return (
      <Grid item xs={12} lg={6}>
        <Card className="card-box mb-4">
          <div className="card-header-alt px-4 pt-4 pb-0">
            <h6 className="font-size-lg mb-3 text-dark">Progress</h6>
          </div>
          <div className="sparkline-full-wrapper sparkline-full-wrapper--xxl px-4 m-0">
            <Line data={data3Dark} options={data3DarkOptions} />
          </div>
          <div className="bg-neutral-dark mt-4 text-center">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="simple tabs example">
              <Tab label="Last week" />
              <Tab label="Last month" />
              <Tab label="Last year" />
            </Tabs>
          </div>
          {/* <div className="p-4">
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Performance
              </h6>
            <p className="text-black-50 mb-0">
              Portfolio performance for selected period.
              </p>
          </div> */}
          <Divider />
          <TabPanel value={value} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="font-weight-bold">Books read</div>
                    <div className="font-size-lg font-weight-bold text-danger">
                      345
                      </div>
                  </div>
                  <div>
                    <LinearProgress
                      color="primary"
                      variant="determinate"
                      value={65}
                    />
                    <div className="align-box-row progress-bar--label mt-2 text-muted">
                      <div>Target</div>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="font-weight-bold">Attempts</div>
                    <div className="font-size-lg font-weight-bold text-first">
                      585
                      </div>
                  </div>
                  <div>
                    <LinearProgress
                      color="primary"
                      variant="determinate"
                      value={76}
                    />
                    <div className="align-box-row progress-bar--label mt-2 text-muted">
                      <div>Target</div>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="font-weight-bold">Books read</div>
                    <div className="font-size-lg font-weight-bold text-success">
                      936
                      </div>
                  </div>
                  <div>
                    <LinearProgress
                      color="secondary"
                      variant="determinate"
                      value={82}
                    />
                    <div className="align-box-row progress-bar--label mt-2 text-muted">
                      <div>Target</div>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="font-weight-bold">Attempts</div>
                    <div className="font-size-lg font-weight-bold text-warning">
                      435
                      </div>
                  </div>
                  <div>
                    <LinearProgress
                      color="secondary"
                      variant="determinate"
                      value={44}
                    />
                    <div className="align-box-row progress-bar--label mt-2 text-muted">
                      <div>Target</div>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="font-weight-bold">Books read</div>
                    <div className="font-size-lg font-weight-bold text-second">
                      3,494
                      </div>
                  </div>
                  <div>
                    <LinearProgress
                      color="secondary"
                      variant="determinate"
                      value={73}
                    />
                    <div className="align-box-row progress-bar--label mt-2 text-muted">
                      <div>Target</div>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="font-weight-bold">Attempts</div>
                    <div className="font-size-lg font-weight-bold text-primary">
                      57,467
                      </div>
                  </div>
                  <div>
                    <LinearProgress
                      color="primary"
                      variant="determinate"
                      value={91}
                    />
                    <div className="align-box-row progress-bar--label mt-2 text-muted">
                      <div>Target</div>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>
      </Grid>
    )
  }


  return (
    <Fragment>
      <Grid container spacing={4}>
        {/* <Old/> */}
        <StudentPreview />
        <GraphStatistic />
      </Grid>
    </Fragment>
  );
}

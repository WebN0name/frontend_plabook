import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card, Grid, CardContent, Popover, Box,
    Tooltip, ClickAwayListener, Portal, IconButton, Tab, Tabs, List, ListItem
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

    const history = useHistory();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const useStyles = makeStyles({

    });

    const classes = useStyles();

    const student = {
        assessments: 3,
        avatar: "/static/media/avatar4.944a383e.jpg",
        bookRead: "3",
        fluency: 29,
        id: "BelleRobinette",
        name: "Belle Robinette",
        personalLink: "https://dev.plabookeducation.com/Login/student/BelleRobinette",
        pin: "7799",
        readingLevel: "4",
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
                    {student.name}
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
                    <StudentInfoCard student={student}/>
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
                            <ScrollBox height={420}>
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
                            {activityLog.map((item, index) => {
                                return (
                                    <div className={`p-2 fs-rem-5 d-flex w-100 ${index % 2 === 0 ? "bg-plabook-gray-1" : ""}`} style={{ justifyContent: "space-between" }}>
                                        <div>
                                            {item.activity}
                                        </div>
                                        <div>
                                            {item.date}
                                        </div>
                                    </div>
                                )
                            })}
                        </ScrollBox>
                    </Card>
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
            </div>
        </Fragment>
    );
}
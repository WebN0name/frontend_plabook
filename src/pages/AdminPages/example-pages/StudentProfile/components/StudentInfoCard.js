import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Card, Grid
} from '@material-ui/core';

import CountUp from 'react-countup';



export default function StudentInfoCard(props) {
    const { student } = props

    const useStyles = makeStyles({

    });

    const classes = useStyles();

    return (
        <Card {...props} className={`card-box  mb-4 ${props.className}`}>
            <div className="d-flex">
                <div className="p-2">
                    <Avatar variant="square" className="w-rem-10" src={student.avatar} />
                </div>
                <div className="w-100 d-flex p-2 justify-content-center align-items-center bg-plabook-gray-1">
                    <div className="d-flex align-items-center">
                        <div className="bg-white m-2 br-50 w-rem-7 p-2 d-flex  justify-content-center align-items-center">
                            <div className="fs-rem-10">
                                {student.fluency}
                            </div>
                        </div>
                        <div className="text-uppercase">
                            Fluency Level
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex w-100 bg-plabook-fluency-25" style={{justifyContent:"space-evenly"}}>
                    <div className="p-1">
                        <div className="fw-550 fs-rem-5 text-center">
                            {student.readingLevel}
                        </div>
                        <div className="fw-400 fs-rem-3">
                            Reading Level
                                </div>
                    </div>
                    <div className="p-1">
                        <div className="fw-550 fs-rem-5 text-center">
                            {student.bookRead}
                        </div>
                        <div className="fw-400 fs-rem-3">
                            Books Read
                                </div>
                    </div>
                    <div className="p-1">
                        <div className="fw-550 fs-rem-5 text-center">
                            {student.assessments}
                        </div>
                        <div className="fw-400 fs-rem-3">
                            Assessments Taken
                                </div>
                    </div>
            </div>
            <div className="p-2 fs-rem-3">
                Joinded
                </div>
            <Grid container>
                <Grid item>

                </Grid>
                <Grid item>

                </Grid>
                <Grid item>

                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </Card>
    );
} 

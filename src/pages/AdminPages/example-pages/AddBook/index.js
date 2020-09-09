import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card, Grid, CardContent, Paper, Box, TextField, FormControl, Select, MenuItem, InputLabel
} from '@material-ui/core';

import CountUp from 'react-countup';
import Circle from 'react-circle';

import Icon from '@mdi/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageTitle, ExampleWrapperSimple } from '../../layout-components';


import Dropzone from 'react-dropzone';


import Context from '../../../../Context'
import { getByText } from '@testing-library/react';
import { withStyles } from '@material-ui/styles';

import QuareFake from './words'

export default function StudentAttempt() {

    const { attempt, student } = useContext(Context)
    const history = useHistory();

    useEffect(() => {

    }, [])

    const useStyles = makeStyles({
        h100p: {
            height: "100%"
        },
        container: {
            height: "70vh"
        }
    });

    const classes = useStyles();



    const HeadWraper = (props) => {
        return (
            <Card className="card-box mb-4-spacing overflow-visible">
                <div className="card-header">
                    <div className="card-header--title font-size-lg font-weight-bold py-2">
                        {props.sectionHeading}
                    </div>
                </div>
                <CardContent className="p-3">{props.children}</CardContent>
            </Card>
        )
    }

    const size = 6

    return (
        <Fragment>
            <PageTitle
                titleHeading={"Add book"}
            // titleDescription={}
            />
            <div className="mb-4" >
                <Button
                    className="m-1"
                    startIcon={<FontAwesomeIcon
                        icon={['fa', 'chevron-left']}
                        size="sm"
                        className="font-size-xxl "
                    />} onClick={() => window.history.back()}>Back</Button>
            </div>
            <Grid container spacing={4} classes={{ root: classes.container }}>
                <Grid item xs={size} classes={{ root: classes.h100p }}>
                    <Paper elevation={1} classes={{ root: classes.h100p }} className="p-3">
                        <Grid container spacing={2} direction="row">
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    className="m-2"
                                    id="Name"
                                    label="Name"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    className="m-2"
                                    id="Author"
                                    label="Author"
                                    variant="outlined"
                                />
                                <FormControl fullWidth variant="outlined" className="m-2">
                                    <InputLabel id="GradeLabel">Grade</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="GradeLabel"
                                        id="Grade"
                                        value={""}
                                        onChange={() => { }}
                                        label="Grade"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={7}>
                                <div className={`dropzone ${classes.h100p}`} >
                                    <Dropzone
                                        onDrop={() => { }}
                                        onFileDialogCancel={() => { }}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps()} className={`${classes.h100p}`}>
                                                <input {...getInputProps()} />
                                                <div className={`dz-message ${classes.h100p}`}>
                                                    <div className="dx-text">
                                                        Drop Image here or click
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            className={`m-2`}
                            id="outlined-textarea"
                            label="Book text"
                            placeholder="Write book text"
                            multiline
                            rows="15"
                            variant="outlined"
                        />
                        <div className="d-flex justify-content-end">
                        <Button className="m-2 bg-plabook-success-light" >
                            Create Pages
                        </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12 - size} classes={{ root: classes.h100p }}>
                    <Paper elevation={1} classes={{ root: classes.h100p }} className="p-3">
                        s
                </Paper>
                </Grid>
            </Grid>
        </Fragment >
    );
}
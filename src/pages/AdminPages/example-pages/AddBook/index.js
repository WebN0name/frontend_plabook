import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card, Grid, CardContent, Paper, Box, TextField, FormControl, Select, MenuItem, InputLabel, FormHelperText
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

import PageText from './components/PageText'

export default function StudentAttempt() {

    const { attempt, student } = useContext(Context)
    const history = useHistory();

    const [pages, setPages] = useState([])
    const [grade, setGrade] = useState(0)
    const [errors, setErrors] = useState(0)

    const INPUT_NAME = "Name"
    const INPUT_AUTHOR = "Author"
    const INPUT_GRADE = "Grade"

    useEffect(() => {

    }, [])

    const useStyles = makeStyles({
        h100p: {
            height: "100%"
        },
        container: {
            minHeight: "70vh"
        },
        overflowYscroll:
        {
            overflowY: "scroll",
        },
        overflowXhidden:
        {
            overflowX: "hidden",
        }
    });

    const classes = useStyles();

    const maxWordCapacity = 180;

    const BreakToPages = () => {
        const text = document.getElementById("BookText").value
        let start = 0
        const pageText = []
        while (start < text.length) {
            pageText.push(text.slice(start, start + maxWordCapacity))
            start += maxWordCapacity
        }
        console.log(pageText)
        setPages(pageText)
    }

    const CreateBook = () => {
        let errors = {}
        let hasErrors = false;
        const name = document.getElementById("Name").value
        const author = document.getElementById("Author").value
        errors[INPUT_NAME] = name.replace(" ", "").length == 0
        errors[INPUT_AUTHOR] = author.replace(" ", "").length == 0
        errors[INPUT_GRADE] = grade == 0

        setErrors({})

        for(let key in errors)
         if(errors[key]) {
            setErrors(errors)
            return
         }


        let pagesText = []
        pages.map((item, index) => { pagesText.push(document.getElementById(`page-${index}`).value) })

        const output ={
            name: name,
            author: author,
            pages: pagesText,
            image: "",
        }
    }

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
                <Grid item xs={size} classes={{ root: classes.h100p }} >
                    <Paper elevation={1} classes={{ root: classes.h100p }} className="p-3 pr-4">
                        <Grid container spacing={2} direction="row">
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    className="m-2"
                                    id="Name"
                                    label="Name"
                                    variant="outlined"
                                    error={errors[INPUT_NAME]}
                                    helperText={errors[INPUT_NAME] ? "Please enter book name" : ""}
                                />
                                <TextField
                                    fullWidth
                                    className="m-2"
                                    id="Author"
                                    label="Author"
                                    variant="outlined"
                                    error={errors[INPUT_AUTHOR]}
                                    helperText={errors[INPUT_AUTHOR] ? "Please enter author" : ""}
                                />
                                <FormControl fullWidth variant="outlined" className="m-2"  error={errors[INPUT_GRADE]}>
                                    <InputLabel id="GradeLabel">Grade</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="GradeLabel"
                                        id="Grade"
                                        value={grade}
                                        onChange={(event) => { setGrade(event.target.value) }}
                                        label="Grade"
                                    >
                                        <MenuItem value={0}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                    {errors[INPUT_GRADE] && <FormHelperText>Please choose grade</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={7} className="p-3">
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
                            id="BookText"
                            label="Book text"
                            placeholder="Write book text"
                            multiline
                            rows="15"
                            variant="outlined"
                        />
                        <div className="d-flex justify-content-end">
                            <Button className="m-2 bg-plabook-success-light" onClick={BreakToPages}>
                                Create Pages
                        </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid over item xs={12 - size} classes={{ root: classes.h100p }}>
                    <Paper elevation={1} classes={{ root: classes.h100p }} className={`p-3 ${classes.overflowYscroll} ${classes.overflowXhidden}`} >
                        {pages.map((page, index) => <PageText id={`page-${index}`} key={index} text={page} index={index + 1} />)}
                        {pages.length > 0 &&
                            <Button className="m-2 bg-plabook-success-light" onClick={CreateBook}>
                                Add book
                            </Button>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Fragment >
    );
}
import React, { Fragment, useState } from 'react';

import Dropzone from 'react-dropzone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Grid,
    Input,
    InputLabel,
    InputAdornment,
    FormControlLabel,
    TextField,
    Avatar,
    IconButton,
    Box,
    Typography,
    Dialog,
    Checkbox,
    Tabs,
    Tab,
    LinearProgress,
    Badge,
    Card,
    CardContent,
    Button,
    Tooltip,
    FormControl,
    makeStyles,
    Select,
    MenuItem,
    FormHelperText
} from '@material-ui/core';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

import people2 from '../../../assets/images/stock-photos/people-2.jpg';
import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import svgImage1 from '../../../assets/images/illustrations/business_plan.svg';

import hero1 from '../../../assets/images/hero-bg/hero-1.jpg';

import hero3 from '../../../assets/images/hero-bg/hero-3.jpg';

import { Settings, Briefcase, Users, Layers, XCircle } from 'react-feather';
import { height } from '@material-ui/system';

export default function NewStudentDialog(props) {

    const INPUT_FIRSTNAME = "firstname"
    const INPUT_LASTNAME = "lastname"
    const INPUT_READING_LEVEL = "readinglevel"
    const INPUT_STAGE = "stage"

    const { open } = props
    const { onClose } = props

    const [stage, setStage] = useState("None")
    const [files, setFiles] = useState([])
    const [errors, setErrors] = useState({})

    const stages = [
        "Phonemic Awareness",
        "Phonics",
        "Vocabulary",
        "Comprehension",
    ]

    const onStageChange = (e) => {
        setStage(e.target.value);
    }    

    const studentExample =
    {
        name: "Jane Doe",
        id: "JaneDoe",
        link: "url",
        pinCode: 1251,
        readingLevel: 4,
        stage: "Phonemic",
    }

    const createStudent = () =>{
        const firstName = document.getElementById(INPUT_FIRSTNAME).value
        const lastName = document.getElementById(INPUT_LASTNAME).value
        const readingLevel = document.getElementById(INPUT_READING_LEVEL).value        

        let errors = {}

        setErrors({})

        errors[INPUT_FIRSTNAME] = !(firstName.replace(/\s/g,"").length > 0)
        errors[INPUT_LASTNAME] = !(lastName.replace(/\s/g,"").length > 0)
        errors[INPUT_READING_LEVEL] = !(readingLevel.length > 0)
        errors[INPUT_STAGE] = !(stage != "None")

        if(errors[INPUT_FIRSTNAME] || errors[INPUT_LASTNAME] || errors[INPUT_READING_LEVEL] || errors[INPUT_STAGE]) 
        {
            setErrors(errors)
            return
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const student = {
            name: `${firstName} ${lastName}`,
            id: `${firstName}${lastName}`,
            pin: `${getRandomInt(1000,10000)}`,
            link: `https://plabookeducation.com/Login/student/${firstName}${lastName}`,
            readingLevel: readingLevel,
            stage: stage,
        }

        console.log(student)
        onClose && onClose()
    }

    const Uploader = () => {

        const onDrop = (files) => {
            setFiles(files)
            console.log(files)
        }

        const onCancel = () => {
            setFiles([])
        }

        const size = 75

        const useStyles = makeStyles({
            avatar: {
                height: "8rem",
                width: "8rem",
                lineHeight: "8rem",
            },
            message:
            {
                width: "8rem",
                // zIndex: 5,
                // padding: "3rem 1rem",
                // cursor: "pointer",
                // transition: "all 0.2s ease-in-out",
                // textAlign: "center",
                // border: "1px dashed #e6e7f1",
                // borderRadius: "0.65rem",
                // backgroundColor: "#f8f9ff",
                // fontSize: "1.1875rem",
                // order: -1,
                overflow: "hidden"
            },
            text: {

            },
            wFitContent:
            {
                width: "fit-content"
            },
            flexDirRow:
            {
                flexDirection: "row"
            }
        });

        const classes = useStyles();

        // .dz-message {
        //     z-index: 5;
        //     padding: 3rem 1rem;
        //     cursor: pointer;
        //     transition: all 0.2s ease-in-out;
        //     text-align: center;
        //     color: #d1d2db;
        //     border: 1px dashed #e6e7f1;
        //     border-radius: 0.65rem;
        //     background-color: #f8f9ff;
        //     font-size: 1.1875rem;
        //     order: -1;

        return (
            <Fragment>
                <div className={`dropzone d-flex justify-content-center ${classes.flexDirRow}`}>
                    <Tooltip arrow title="Drop file here, or click to select file to upload." >
                        <div className={classes.wFitContent}>
                            <Dropzone
                                onDrop={onDrop}
                                onFileDialogCancel={onCancel}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className={`${classes.message} p-0 dz-message rounded-circle `}>
                                            {/* <div className={`dz-message rounded-circle `}> */}

                                            {files.length > 0
                                                ? <img className={classes.avatar} src={URL.createObjectURL(files[0])}></img>
                                                : <div className={`dx-text ${classes.avatar}`}> Avatar </div>}
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </Tooltip>
                </div>
            </Fragment>
        )
    }

    return (
        <Dialog scroll="body" maxWidth="lg" open={open} onClose={()=>{setErrors({});onClose();}}>
            <div className="card-tr-actions">
                <Tooltip arrow title="Close">
                    <IconButton onClick={()=>{onClose()}} color="primary">
                        <XCircle />
                    </IconButton>
                </Tooltip>
            </div>
            <div className=" pt-4 p-3">
                {/* <div className="avatar-icon-wrapper rounded-circle m-0">
                    <div className="d-block p-0 avatar-icon-wrapper m-0 d-90">
                        <div className="rounded-circle overflow-hidden">
                            
                            <img alt="..." className="img-fluid" src={avatar7} />
                        </div>
                    </div>
                </div>                 */}
                <form autoComplete="off">
                    <h3 className="display-4 mb-2 font-weight-bold mt-1 ">
                        Create student
                    </h3>
                    <div className="mt-2 mb-4">
                        <Uploader />
                    </div>
                    <p className="font-size-lg mb-3 text-black-50">
                        Fill in the fields below and you'll be good to go.
                    </p>
                    <div className="mb-3">
                        <TextField
                            variant="outlined"
                            label="Firstname"
                            error={errors[INPUT_FIRSTNAME] }
                            helperText={errors[INPUT_FIRSTNAME] ? "Please enter student firstname" : ""}
                            id={INPUT_FIRSTNAME}
                            fullWidth
                            placeholder="Enter your firstname"
                            type="text"
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            variant="outlined"
                            label="Lastname"
                            error={errors[INPUT_LASTNAME] }
                            helperText={errors[INPUT_LASTNAME] ? "Please enter student lastname" : ""}
                            id={INPUT_LASTNAME}
                            fullWidth
                            placeholder="Enter your lastname"
                            type="text"
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            variant="outlined"
                            label="Reading level"
                            error={errors[INPUT_READING_LEVEL] }
                            helperText={errors[INPUT_READING_LEVEL] ? "Please enter student reading level" : ""}
                            id={INPUT_READING_LEVEL}
                            fullWidth
                            placeholder="Enter your reading level"
                            type="number"
                        />
                    </div>
                    <div className="mb-3">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id={`${INPUT_STAGE}-label`} className={errors[INPUT_STAGE]?"text-danger":""}>Stage</InputLabel>
                            <Select
                                id={INPUT_STAGE}
                                labelId="stage-label"
                                fullWidth
                                error={errors[INPUT_STAGE] }
                                value={stage}
                                label="Stage"
                                onChange={onStageChange}
                            >
                                <MenuItem value={"None"}><em>None</em></MenuItem>
                                {stages.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                            </Select>
                            {errors[INPUT_STAGE] && <FormHelperText className="text-danger">Please choose student stage</FormHelperText>}
                        </FormControl>
                    </div>

                    <Button
                        color="primary"
                        size="large"
                        variant="contained"
                        onClick={()=>{createStudent()}}
                    >
                        Create Student
                    </Button>
                </form>

            </div>

        </Dialog>
    )
}
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
    TableHead, TableRow,
    TableCell, Button,
    TableBody, Table,
    TableContainer, TablePagination,
    Avatar, Box, TextField, Paper, Typography, Divider, TableSortLabel, Card, Tooltip, Grid, CardContent,
} from '@material-ui/core';

import CountUp from 'react-countup';
import Circle from 'react-circle';

import Icon from '@mdi/react'
import { mdiFilterOutline } from '@mdi/js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageTitle, ExampleWrapperSimple } from '../../layout-components';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';

import Context from '../../../../Context'
import { getByText } from '@testing-library/react';


export default function StudentAttempt() {

    const { id } = useParams();
    const { attempt, student } = useContext(Context)
    const [text, setText] = useState('')

    const history = useHistory();

    useEffect(() => {
        axios.get('https://plabookeducation.com/getAllBooks').then(r => {
            r.data.resultBooks.forEach(element => {
                if (element.name === attempt['Book ID']) {
                    getBook(element.bookPages, attempt.Page)
                }
            });
        })
    }, [])

    function getBook(pages, num) {
        setText(pages[num - 1])
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

    const classes = useStyles();

    //#region RegExpresion
    const wordTags = /{{.+?}}/g
    const words = /({{.+?}})*\w+?(-*\w*)+('*\w*)?[.,!?(...)-]?/g // слова и слова с тегами вместе

    const ClearOfTags = (str) => {
        return str.replace(wordTags, "")
    }

    const ConvertToArray = (str) => {
        const devided = str.match(words)
        let effected = []
        for (let dword of devided) {
            effected.push(
                {
                    word: dword.replace(wordTags, ""),
                    isCorrect: !Boolean(dword.match(wordTags)),
                }
            )
        }
        return effected
    }

    //#endregion

    const convertStamp = (stamp) => {
        const date = new Date(Date.parse(stamp))
        return ({
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            full: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        })
    }

    const example = {
        Audiofile: "https://plabookeducation.com/recordFile/5f4509602341a60295c492ee",
        "Book ID": "EARTH DAY BIRTHDAY",
        Date: "Fri Aug 28 2020 16: 06: 23 GMT + 0900(Якутск, стандартное время)",
        "Err M": "7",
        "Err S": "2",
        "Err V": "1",
        Errors: "52",
        "Number of Running Words": "43",
        Page: "12",
        Proficiency: "13.33%",
        "Running Records": " {{O-- }}April {{A-MV-looks}}looked {{A--books}}looked at {{A-M-a}}the {{C-MSV-the}}the {{A--at}}bags {{O-- }}and {{I--in}}smiled {{A--this}}smiled {{I--area}}smiled It {{O-- }}felt {{O-- }}good {{O-- }}to {{O-- }}do {{A-M-didn't}}something {{A-M-take}}something {{A--long}}something {{A--is}}something {{A--the}}something {{A--city}}something {{A-MS-of}}for {{A--prizes}}something for {{I-M-was}}the {{I--graves}}the {{A-M-have}}the {{A--you}}the {{A--bills}}the {{C-MSV-the}}the {{O-- }}earth {{O-- }}And {{O-- }}with {{O-- }}everyone {{O-- }}pitching {{O-- }}in {{O-- }}it {{O-- }}didn't {{O-- }}take {{O-- }}long {{O-- }}Happy {{O-- }}Earth {{O-- }}Day {{O-- }}everyone {{O-- }}said {{O-- }}April {{O-- }}Now {{O-- }}I'm {{O-- }}ready {{O-- }}for {{O-- }}Maze {{O-- }}Craze {{O-- }}Happy {{O-- }}birthday {{S-S-eagle}}April shouted {{O-- }}her friends",
        "SC M": "2",
        "SC S": "2",
        "SC V": "2",
        School: "1293 - Alpha School",
        "Self Correction": "2",
        "Student ID": "JaneDoe",
        "Time Stamp": "2020-08-28T07:06:23.507Z",
        rate: 88,
        accuracy: 97,
        comprehension: 40,
        level: "Intermidate"
    }

    const source = attempt ? attempt : example

    const Rates = (props) => {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        const wcpm = getRandomInt(60,100)
        return (
            <Grid container className="mb-1" spacing={4}>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-danger card-shadow-danger mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="p-3">
                                <div className=" text-uppercase pb-2 font-size-sm">
                                    Rate
                </div>
                                <h3 className="font-weight-bold display-4 mb-0 text-black">
                                    {/* <FontAwesomeIcon
                    icon={['fas', 'chevron-up']}
                    className="font-size-lg mr-2 text-success"
                  /> */}
                                    <span>
                                        <CountUp
                                            start={0}
                                            end={wcpm}
                                            duration={4}
                                            deplay={2}
                                            separator=""
                                            decimals={0}
                                            decimal=","
                                        />
                                    </span>
                                    <small className="opacity-6 pl-1 text-black-50"> wcpm</small>
                                </h3>
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-success card-shadow-success mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="p-3">
                                <div className=" text-uppercase pb-2 font-size-sm">
                                    Proficiency
                </div>
                                <h3 className="font-weight-bold display-4 mb-0 text-black">
                                    {/* <span className="font-size-lg mr-2 text-success font-weight-bold">
                    +
                  </span> */}
                                    <CountUp start={0} end={attempt.Proficiency} />
                                    <small className="opacity-6 pl-1 text-black-50">%</small>
                                </h3>
                            </div>
                            <div className="pr-3">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="3s" //String: Length of animation
                                    responsive={false} // Boolean: Make SVG adapt to parent size
                                    size={60} // Number: Defines the size of the circle.
                                    lineWidth={20} // Number: Defines the thickness of the circle's stroke.
                                    progress={attempt.Proficiency} // Number: Update to change the progress and percentage.
                                    progressColor="#1bc943" // String: Color of "progress" portion of circle.
                                    bgColor="rgba(27, 201, 67, 0.15)" // String: Color of "empty" portion of circle.
                                    textColor="#3b3e66" // String: Color of percentage text color.percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true}
                                    textStyle={{
                                        fontSize: '100px',
                                        fontWeight: 'bold'
                                    }} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                                />
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-warning card-shadow-warning mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="p-3">
                                <div className=" text-uppercase pb-2 font-size-sm">
                                    Comprehension
                </div>
                                <h3 className="font-weight-bold display-4 mb-0 text-black">
                                    {/* <span className="font-size-lg mr-2 text-black-50 font-weight-bold">
                    $
                  </span> */}
                                    <CountUp start={0} end={example.comprehension} />
                                    <small className="opacity-6 pl-1 text-black-50">%</small>

                                </h3>
                            </div>
                            <div className="pr-3">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="3s" //String: Length of animation
                                    responsive={false} // Boolean: Make SVG adapt to parent size
                                    size={60} // Number: Defines the size of the circle.
                                    lineWidth={20} // Number: Defines the thickness of the circle's stroke.
                                    progress={example.comprehension} // Number: Update to change the progress and percentage.
                                    progressColor="#f4772e" // String: Color of "progress" portion of circle.
                                    bgColor="rgba(17, 197, 219, 0.15)" // String: Color of "empty" portion of circle.
                                    textColor="#3b3e66" // String: Color of percentage text color.percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true}
                                    textStyle={{
                                        fontSize: '100px',
                                        fontWeight: 'bold'
                                    }} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                                />
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-info card-shadow-info mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="p-3">
                                <div className=" text-uppercase pb-2 font-size-sm">
                                    Level
                </div>
                                <h3 className="font-weight-bold display-4 mb-0 text-black">
                                    {/* <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="font-size-lg mr-2 text-danger"
                  /> */}
                                    <span>
                                        {/* <CountUp
                      start={0}
                      end={82}
                      duration={6}
                      deplay={2}
                      separator=" "
                      decimals={0}
                      decimal=","
                      prefix=""
                      suffix=""
                    /> */}
                                        {example.level}
                                    </span>
                                    {/* <small className="opacity-6 pl-1 text-black-50">%</small> */}
                                </h3>
                            </div>
                            <div className="pr-3">
                                {/* <Circle
                  animate={true} // Boolean: Animated/Static progress
                  animationDuration="3s" //String: Length of animation
                  responsive={false} // Boolean: Make SVG adapt to parent size
                  size={60} // Number: Defines the size of the circle.
                  lineWidth={20} // Number: Defines the thickness of the circle's stroke.
                  progress={5} // Number: Update to change the progress and percentage.
                  progressColor="#11c5db" // String: Color of "progress" portion of circle.
                  bgColor="rgba(17, 197, 219, 0.15)" // String: Color of "empty" portion of circle.
                  textColor="#3b3e66" // String: Color of percentage text color.percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                  roundedStroke={true}
                  textStyle={{
                    fontSize: '60px',
                    fontWeight: 'bold'
                  }} // Boolean: Rounded/Flat line ends
                  showPercentage={true} // Boolean: Show/hide percentage.
                  showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                /> */}
                            </div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        )
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

    return (
        <Fragment>
            <PageTitle
                titleHeading={attempt && student ? `${student.name} ${attempt["Book ID"]} Attempt` : 'Attempt'}
                titleDescription={attempt ? convertStamp(attempt["Time Stamp"]).full : null}
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
            <Rates />
            <HeadWraper sectionHeading={
                <div className="d-flex align-items-center">
                    <p className="m-2">Play Attempt Recording</p>
                    <audio className="m-0" controls src={source.Audiofile}></audio>
                </div>} className="mb-4">
            </HeadWraper>
            <HeadWraper sectionHeading="Source Text">
                {text}
            </HeadWraper>
            <HeadWraper sectionHeading="Attempt Result ">
                {ConvertToArray(source["Running Records"]).map(word => <div className={`m-1 badge badge-${word.isCorrect ? "success" : "danger"}`}>{word.word}</div>)}
            </HeadWraper>
            {/* <NewBL /> */}
            {/* <Old/> */}
        </Fragment>

    );
}

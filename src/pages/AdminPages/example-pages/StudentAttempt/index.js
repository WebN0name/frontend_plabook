import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom"
import theme from "./theme"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card, Grid, CardContent, Popover, Box, Tooltip, ClickAwayListener, Portal,
} from '@material-ui/core';

import CountUp from 'react-countup';
import Circle from 'react-circle';

import Icon from '@mdi/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageTitle, ExampleWrapperSimple } from '../../layout-components';

import WordInfo from './components/WordInfo'
import PropertyCard from './components/PropertyCard'
import Phonemer from './components/Phonemer'


import Context from '../../../../Context'
import { getByText } from '@testing-library/react';
import { withStyles } from '@material-ui/styles';

import QuareFake from './words'

export default function StudentAttempt() {

    const { id } = useParams();
    const { attempt, student } = useContext(Context)
    const [text, setText] = useState('')

    console.log(attempt)
    console.log(student)


    const audio = QuareFake()
    audio['wordInfo'] = []
    for (let key in audio)
        if (!isNaN(parseInt(key)))
            audio.wordInfo.push(audio[key])
    console.log(audio)


    const history = useHistory();

    useEffect(() => {
        axios.get('https://plabookeducation.com/getAllBooks').then(r => {
            r.data.forEach(element => {
                if (element.name === attempt['Book ID']) {
                    getBook(element.pages, attempt.Page)
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
        },
        pointer:
        {
            cursor: "pointer"
        },
        analysText:
        {
            fontSize: "0.925rem"
        },
        tooltipText: {
            fontSize: "0.825rem"
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
        level: "intermediate"
    }

    const source = attempt ? attempt : example

    const Rates = (props) => {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const wcpm = getRandomInt(60, 100)
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
                                    <CountUp start={0} end={attempt.Proficiency.replace("%", "")} />
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
                                    progress={parseFloat(attempt.Proficiency.replace("%", ""))} // Number: Update to change the progress and percentage.
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

    const AnalyseWord = (props) => {
        const { word } = props
        const { index } = props

        const [anchorEl, setAnchorEl] = useState(null);

        const handlePopoverClick = (event) => {
            // setPhonemes(fromJSON.phonemes)
            setAnchorEl(event.currentTarget);
        };

        const example = {
            state: word.isCorrect ? "Correct" : "Wrong",
            reference: word.word,
            transcription: word.word,
            normolised: word.word,
            confidence: 100,
            start: 1.71,
            end: 2.16

        }
        const fromJSONexample =
        {
            "align": "DELETION",
            "reference": "asked.",
            "normalized": "asked",
            "recognized": "",
            "transcription_index": 28,
            "reference_index": 27,
            "confidence": "-",
            "start": "-",
            "end": "-",
            "wordquality": 39.0,
            "phonemes": {
                "ae": 85.0,
                "s": 89.0,
                "k": 17.0,
                "t": 1.0
            }
        }

        const wordInfo = audio.wordInfo[index]

        const fromJSON = Boolean(wordInfo) ? wordInfo : fromJSONexample

        let color = ""

        switch (fromJSON.align) {
            case "DELETION":color = "danger"
                break;
            case "SUBSTITUTION":color = "warning"
                break;
            case "CORRECT": color = "success"
                break;
            case "INSERTION":color = "warning"
                break;
            default: color = "warning"
                break;
        }
        // danger|warning|info|success


        return (
            <Fragment>
                <Box
                    onClick={handlePopoverClick}
                    className={`m-1 ${classes.analysText} ${classes.pointer} badge badge-${color}`}>
                    {word.word}
                </Box>
                <Popover
                    open={Boolean(anchorEl)}
                    onClose={() => { setAnchorEl(null) }}
                    onEnter={() => { }}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <WordInfo word={fromJSON} />
                </Popover>
            </Fragment>
        )
    }

    
    return (
        <Fragment>
            <PageTitle
                titleHeading={attempt && student ? `${student.name} ${attempt["Book ID"]} Attempt, Page: ${attempt.Page}` : 'Attempt '}
                titleDescription={attempt ? convertStamp(attempt["Time Stamp"]).full : null}
            />
            <div className="mb-4" >
                <Button
                    className="m-1"
                    startIcon={<FontAwesomeIcon
                        icon={['fa', 'chevron-left']}
                        size="sm"
                        className="font-size-xxl "
                    />} onClick={() => window.history.back()}>Back to Student</Button>
            </div>
            <Grid
                container
                direction="row"
                spacing={4}
                className="mb-1">
                <Rates />
                <Grid item xs={11} sm={8}>
                    <HeadWraper sectionHeading={
                        <div className="d-flex align-items-center">
                            <p className="m-2">Recording</p>
                        </div>} className="mb-4">
                        <audio className="m-0" controls src={source.Audiofile}></audio>
                    </HeadWraper>

                    <HeadWraper sectionHeading="Phonemes">
                        <Box id="phonemes-container">
                            <Phonemer phonemes={audio.wordInfo[0].phonemes}/>
                        </Box>
                    </HeadWraper>
                    <HeadWraper sectionHeading="Reading Analysis">
                        {ConvertToArray(source["Running Records"]).map((word, index) =>
                            <AnalyseWord index={index} word={word} />)}
                    </HeadWraper>
                </Grid>
                <Grid item xs={1} sm={4}>
                    <PropertyCard label="Duration" value={audio.duration} color={"info"} decimals={3} ending="s" />
                    <PropertyCard label="Correct" value={audio.correct} color={"success"} decimals={0} />
                    <PropertyCard label="Insertions" value={audio.insertions} color={"warning"} decimals={0} />
                    <PropertyCard label="Deletions" value={audio.deletions} color={"danger"} decimals={0} />
                    <PropertyCard label="Substitutions" value={audio.substitutions} color={"warning"} decimals={0} />
                    <PropertyCard label="Accuracy" value={audio.accuracy} color={"info"} ending="%" decimals={1} />
                </Grid>
            </Grid>
            {/* <NewBL /> */}
            {/* <Old/> */}
        </Fragment>
    );
}
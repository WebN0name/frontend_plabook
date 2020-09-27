import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
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
import PropertyCard2 from './components/PropertyCard2'
import Phonemer from './components/Phonemer'


import Context from '../../../../Context'
import { getByText } from '@testing-library/react';
import { withStyles } from '@material-ui/styles';

import QuareFake from './words'
import { mdiConsoleLine } from '@mdi/js';
import WordMark from './components/WordMark';

export default function StudentAttempt() {

    const { id } = useParams();
    const { attempt, student } = useContext(Context)
    const [text, setText] = useState('')
    const [audioFile, setAudioFile] = useState('')

    const audio = QuareFake()
    attempt['wordInfo'] = []
    if (attempt.phonic) {
        for (let key in JSON.parse(attempt.phonic))
            if (!isNaN(parseInt(key)))
                attempt.wordInfo.push(JSON.parse(attempt.phonic)[key])
    }


    function colorPercent(value) {
        if (value >= 95) {
            return {
                color: '#65C6DE'
            }
        }

        if ((value >= 80) && (value <= 94)) {
            return {
                color: '#5EAD60'
            }
        }

        if ((value >= 65) && (value <= 79)) {
            return {
                color: '#EDC91B'
            }
        }

        if (value <= 64) {
            return {
                color: '#E25744'
            }
        }
    }


    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.log(attempt)
        getAudio(attempt.Audiofile)
        // console.log(audioFile)
        // if(attempt["Recognizer"] === 'soapbox'){
        //     console.log("JSON с запроса")
        //     console.log(JSON.parse(attempt["JSON"]))
        // }else{

        // }
        // axios.get(attempt.Audiofile).then(r =>{
        //     console.log(r.data)
        // fs.writeFile('./my.wav', r.data, (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        // })
        // })
        // const request = http.get(attempt.Audiofile, function(response){
        //     response.pipe(file)
        // })

        axios.get('https://dev.plabookeducation.com/getAllBooks').then(r => {
            r.data.forEach(element => {
                if (element.name === attempt['Book ID']) {
                    getBook(element.pages, attempt.Page)
                }
            });
        })
    }, [])

    async function getAudio(url) {
        fetch(url).then(r => r.blob()).then(async blob => {
            const audio = await getAudioData(blob)
            setAudioFile(audio)
        })
    }

    function getAudioData(blob) {
        return new Promise((resolve, rejects) => {
            const reader = new FileReader()
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = rejects
            reader.readAsDataURL(blob)
        })
    }

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

    // function getAudioLength(){
    //     var myAudio = document.getElmentById('my-audio')
    //     console.log(myAudio)
    //     return 15.3
    // }

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
        Audiofile: "https://dev.plabookeducation.com/recordFile/5f4509602341a60295c492ee",
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
                <Grid item xs={3} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-plabook-info card-shadow-plabook-info mb-4">
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
                                            end={((JSON.parse(attempt.phonic).correct + JSON.parse(attempt.phonic).insertions + JSON.parse(attempt.phonic).deletions + JSON.parse(attempt.phonic).substitutions) / JSON.parse(attempt.phonic).duration) * 60}
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
                <Grid item xs={3} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-plabook-success card-shadow-plabook-success mb-4">
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
                                    progressColor="#BAD628" // String: Color of "progress" portion of circle.
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
                <Grid item xs={3} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-plabook-info card-shadow-plabook-info mb-4">
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
                                    progressColor="#44AEC9" // String: Color of "progress" portion of circle.
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
                <Grid item xs={3} sm={6} lg={3}>
                    <Card className="card-box card-box-border-bottom border-plabook-info-light card-shadow-plabook-info-light mb-4">
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


    const AnalysePreview = ({ audio }) => {

        const [word, setWord] = useState(null);
        const player = new Audio()
        player.src = audio

        const useStyles = makeStyles({
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
            },
            fs1o05: {
                fontSize: "1.0525rem"
            }
        });

        const classes = useStyles();

        function clickWord(word, player) {
            setWord(word)
            if (word.align !== 'DELETION') {
                player.currentTime = word.start
                player.play()
                setTimeout(() => {
                    player.pause()
                }, ((word.end - word.start) * 1000) + 150)
            }
        }

        function wordStyle() {
            const insertion = {
                color: '#6B1E65',
                display: 'block',
                "::before": {
                    content: '&and'
                }
            }
            return insertion
        }

        return (
            <Fragment>
                <Card className="card-box mb-4-spacing overflow-visible">
                    <div className="card-header">
                        <div className="card-header--title font-size-lg font-weight-bold py-2">
                            {`Assessment text and analysis > ${attempt["Book ID"]}`}
                        </div>
                    </div>
                    <div>
                        <div className="resultText d-flex flex-wrap p-2">
                            {attempt.wordInfo.map((attemptWord, index) => {
                                return (
                                    <WordMark 
                                    selected={JSON.stringify(word) === JSON.stringify(attemptWord)}
                                    key={index+attemptWord.recognized}
                                        onClick={() => {
                                            clickWord(attemptWord, player)
                                        }}
                                        className={`m-1 ${classes.pointer}`}
                                        word={attemptWord}
                                    />
                                )
                            })}
                        </div>
                        {word && <WordInfo word={word} />}
                    </div>
                </Card>
                {/* <HeadWraper sectionHeading={`Assessment text and analysis > ${attempt["Book ID"]}`}>
                    <div classname="resultText">
                        <p>
                            {attempt.wordInfo.map((attemptWord, index) => {
                                return (
                                    <span
                                        className={`m-1 ${classes.analysText} ${classes.pointer}`} style={wordStyle()}
                                        onClick={() => {
                                            clickWord(attemptWord, player)
                                        }}
                                    >{attemptWord.normalized}</span>
                                )
                            })}
                        </p>
                    </div>
                    <div className="wordInformation">
                        {Антон}
                        {word && <WordInfo word={word} />}
                    </div>
                </HeadWraper> */}
                {/* <HeadWraper sectionHeading={
                    'Running records result'}>
                    {ConvertToArray(attempt["Running Records"]).map((item) => {
                        const color = item.isCorrect ? 'plabook-success' : 'plabook-warning'
                        return (
                            <Box
                                className={`m-1 ${classes.analysText} ${classes.pointer} badge badge-${color}`}>
                                {item.word}
                            </Box>
                        )
                    })}
                </HeadWraper>
                <HeadWraper sectionHeading="Reading Analysis">
                    {
                        attempt.wordInfo.map((attemptWord, index) => {

                            let color = ""

                            switch (attemptWord.align) {
                                case "DELETION": color = "danger"
                                    break;
                                case "SUBSTITUTION": color = "plabook-warning-light"
                                    break;
                                case "CORRECT": color = "plabook-success"
                                    break;
                                case "INSERTION": color = "plabook-warning"
                                    break;
                                default: color = "plabook-warning"
                                    break;
                            }

                            if ((attemptWord.align === 'INSERTION') && (attemptWord.normalized === '')) {
                                attemptWord.normalized = '_'
                            }


                            return (
                                <Fragment>
                                    <Box
                                        onClick={() => {
                                            clickWord(attemptWord, index, player)
                                        }}
                                        className={`m-1 ${classes.analysText} ${classes.pointer} badge badge-${color}`}>
                                        {attemptWord.normalized}
                                    </Box>
                                </Fragment>
                            )
                        }
                        )
                    }
                </HeadWraper>
                <HeadWraper sectionHeading="Word information">
                    {word &&
                        <Grid container className={`${classes.tooltipText}`}>
                            <Grid item className="p-2">
                                <Box className="m-1">
                                    <h4>
                                        {word.align}
                                    </h4>
                                </Box>
                                <Box className={`m-2 ${classes.fs1o05}`}>
                                    Reference: {word.reference}
                                </Box>
                                <Box className={`m-2 ${classes.fs1o05}`}>
                                    Recognized: {word.recognized}
                                </Box>
                                <Box className={`m-2 ${classes.fs1o05}`}>
                                    Normalized: {word.normalized}
                                </Box>
                                <Box className={`m-2 ${classes.fs1o05}`}>
                                    Confidence: {isFinite(parseFloat(word.confidence)) ? word.confidence.toFixed(2) + "%" : "-"}
                                </Box>
                                <Box className={`m-2 ${classes.fs1o05}`}>
                                    Word quality: {isFinite(parseFloat(word.wordquality)) ? word.wordquality.toFixed(2) + "%" : "-"}
                                </Box>
                                <Box className={`m-2 ${classes.fs1o05}`}>
                                    Start: {isFinite(parseFloat(word.start)) ? word.start.toFixed(3) + "s" : "-"}
                                </Box>
                                <Box className={`m-2 ${classes.fs1o05}`}>
                                    End: {isFinite(parseFloat(word.end)) ? word.end.toFixed(3) + "s" : "-"}
                                </Box>
                            </Grid>
                            <Grid item className={`${classes.MVSBox} p-2`}>
                                <Box className="m-1">
                                    <h4>
                                        Phonemes
                                    </h4>
                                </Box>
                                <Phonemer phonemes={word.phonemes} />
                            </Grid>
                        </Grid>
                    }
                </HeadWraper> */}
            </Fragment>
        )
    }

    const AnalyseWord = (props) => {
        const { word } = props
        const { index } = props

        const [anchorEl, setAnchorEl] = useState(null);

        const handlePopoverEnter = (event) => {
            setAnchorEl(event.currentTarget)
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
            "confidence": 95.4,
            "start": 0.569,
            "end": 0.785,
            "wordquality": 39.0,
            "phonemes": {
                "ae": 85.0,
                "s": 89.0,
                "k": 17.0,
                "t": 1.0
            }
        }

        const wordInfo = JSON.parse(attempt.phonic).wordInfo[index]

        const fromJSON = Boolean(wordInfo) ? wordInfo : fromJSONexample

        let color = ""

        switch (word.align) {
            case "DELETION": color = "danger"
                break;
            case "SUBSTITUTION": color = "plabook-warning-light"
                break;
            case "CORRECT": color = "plabook-success"
                break;
            case "INSERTION": color = "plabook-warning"
                break;
            default: color = "plabook-warning"
                break;
        }
        // danger|warning|info|success

        if (word.align === 'INSERTION') {

        }


        return (
            <Fragment>
                <Box
                    onClick={handlePopoverEnter}
                    className={`m-1 ${classes.analysText} ${classes.pointer} badge badge-${color}`}>
                    {word.normalized}
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
            <Rates />
            <Grid
                container
                direction="row"
                spacing={4}
                className="mb-1">
                <Grid item xs={11} sm={8}>
                    <HeadWraper sectionHeading={
                        <div className="d-flex align-items-center">
                            <p className="m-2">Recording</p>
                        </div>} className="mb-4">
                        <audio className="m-0" controls src={audioFile}></audio>
                    </HeadWraper>
                    {/* <HeadWraper sectionHeading={
                        <div className="d-flex align-items-center">
                            <p className="m-2">Source text</p>
                        </div>} className="mb-4">
                        <p>{text}</p>
                    </HeadWraper> */}
                    <AnalysePreview audio={audioFile} />
                </Grid>
                <Grid item xs={1} sm={4}>
                    <PropertyCard2
                        label="Duration"
                        value={JSON.parse(attempt.phonic).duration}
                        valuePostfix="s"
                    />
                    <PropertyCard2
                        label="Correct"
                        value={JSON.parse(attempt.phonic).correct}
                    />
                    <PropertyCard2
                        label="Insertions"
                        value={JSON.parse(attempt.phonic).insertions}
                        ending={<WordMark word="Insert" variant="insertion" />}
                    />
                    <PropertyCard2
                        label="Deletions"
                        value={JSON.parse(attempt.phonic).deletions}
                        ending={<WordMark word="Omit" variant="deletion" />}
                    />
                    <PropertyCard2
                        label="Substitutions"
                        value={JSON.parse(attempt.phonic).substitutions}
                        ending={<WordMark word="Substitue" corretion="Substitue" variant="substitution" />}
                    />
                    <PropertyCard2
                        label="Accuracy"
                        value={JSON.parse(attempt.phonic).accuracy}
                        color={"plabook-fluency-text-75"}
                        valuePostfix="%"
                    />
                    <Card className={`mb-4 p-3`}>
                        <div className=" text-uppercase pb-2 fw-500 fs-rem-5">
                            Comprehension error legend
                        </div>
                        <div className="d-flex" style={{ justifyContent: "space-evenly" }}>
                            <WordMark word="Insert" variant="insertion" />
                            <WordMark word="Omit" variant="deletion" />
                            <WordMark word="Substitue" corretion="Substitue" variant="substitution" />
                            <WordMark word="Repeat" variant="repeat" />
                        </div>
                    </Card>

                </Grid>
            </Grid>
            {/* <NewBL /> */}
            {/* <Old/> */}
        </Fragment>
    );
}
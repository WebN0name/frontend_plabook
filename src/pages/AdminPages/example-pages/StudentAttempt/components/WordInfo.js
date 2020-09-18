import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Grid
} from '@material-ui/core';



export default function WordInfo(props) {
    const { word } = props

    const useStyles = makeStyles({

        phonem: {
            width: "4.5rem",
            // color: "white",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            lineHeight: "0.875rem",
            // display: "inline-block",
            // padding: 0 0.7em,
            fontWeight: 700,
            borderWidth: 2.45,
            borderStyle: "solid",
            whiteSpace: "nowrap",
            borderRadius: "0.2rem",
            transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
        }
    });

    const classes = useStyles();

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
            "ae": 95.0,
            "s": 89.0,
            "k": 68.0,
            "t": 32.0
        }
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


    const phonemsInfo = []

    if(word)
    for (let phonem in word.phonemes)
        phonemsInfo.push(
            <Grid
                container
                justify="space-between"
                spacing={1}
                direction="row"
                className={`m-1  ${classes.phonem}`}
                style={{ borderColor: colorPercent(word.phonemes[phonem]).color }}
            >
                <Grid item>
                    {phonem + " "}
                </Grid>
                <Grid item>
                    {word.phonemes[phonem]}%
                </Grid>
            </Grid>
        )



    return (
        <div className="bg-plabook-gray-1 p-3" style={{ minHeight: 150 }}>
            <div className="fs-rem-7 mb-2">
                Word details
            </div>
            {word &&
                <div className="d-flex align-items-start">
                    <div>
                        <div className="text-uppercase mb-1">
                            Overview
                    </div>
                        <div className="d-flex align-items-start">
                            <div>
                                <div className="my-1">
                                    Word: <span className="fw-600">{word.reference}</span>
                                </div>
                                <div className="my-1">
                                    Recognized: <span className="fw-600">{word.recognized}</span>
                                </div>
                                <div className="my-1">
                                    Normalize: <span className="fw-600">{word.normalized}</span>
                                </div>
                            </div>

                            <div>
                                <div className="my-1">
                                    Use: <span className="fw-600">{word.align}</span>
                                </div>
                                <div className="my-1">
                                    Word quality: <span className="fw-600">{isFinite(parseFloat(word.confidence)) ? word.confidence.toFixed(2) + "%" : "-"}</span>
                                </div>
                                <div className="my-1">
                                    Confidence <span className="fw-600">{isFinite(parseFloat(word.wordquality)) ? word.wordquality.toFixed(2) + "%" : "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white mx-4 br-px-1" style={{ width: 5, alignSelf: "stretch" }} />
                    <div>
                        <div className="text-uppercase mb-1">
                            Timing
                    </div>
                        <div className="my-1">
                            Start: <span className="fw-600">{isFinite(parseFloat(word.start)) ? word.start.toFixed(3) + "s" : "-"}</span>
                        </div>
                        <div className="my-1">
                            End: <span className="fw-600">{isFinite(parseFloat(word.end)) ? word.end.toFixed(3) + "s" : "-"}</span>
                        </div>
                    </div>
                    <div className="bg-white mx-4 br-px-5" style={{ width: 5, alignSelf: "stretch" }} />
                    <div>
                        <div className="text-uppercase mb-1">
                            Phonemes
                    </div>
                        <Box className="d-flex justify-content-start">
                            {phonemsInfo.map(item => { return (item) })}
                        </Box>
                    </div>
                </div>}
        </div>
        // <Grid container className={`${classes.tooltipText}`}>
        //     <Grid item className="p-2">
        //         <Box className="m-1">
        //             <h4>
        //                 {word.align}
        //             </h4>
        //         </Box>
        //         <Box className="m-2">
        //             Reference: {word.reference}
        //         </Box>
        //         <Box className="m-2">
        //             Recognized: {word.recognized}
        //         </Box>
        //         <Box className="m-2">
        //             Normalize: {word.normalized}
        //         </Box>
        //         <Box className="m-2">
        //             Confidence: {isFinite(parseFloat(word.confidence)) ? word.confidence.toFixed(2) + "s" : "-"}%
        //                     </Box>
        //         <Box className="m-2">
        //             Word quality: {word.wordquality}%
        //                     </Box>
        //         <Box className="m-2">
        //             Start: {isFinite(parseFloat(word.start)) ? word.start.toFixed(3) + "s" : "-"}
        //         </Box>
        //         <Box className="m-2">
        //             End: {isFinite(parseFloat(word.end)) ? word.end.toFixed(3) + "s" : "-"}
        //         </Box>
        //     </Grid>
        //     <Grid item className={`${classes.MVSBox} p-2`}>
        //         <Box className="m-1">
        //             <h4>
        //                 MVS and other
        //             </h4>
        //         </Box>
        //     </Grid>
        // </Grid>
    );
} 
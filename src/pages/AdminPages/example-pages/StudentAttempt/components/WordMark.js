import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, Grid
} from '@material-ui/core';

import CountUp from 'react-countup';



export default function WordMark(props) {
    let { variant } = props // 'none' | 'insertion' | 'deletion' | 'substitution' | 'repeat'
    variant = variant ? variant : "none";
    const { word } = props
    const { corretion } = props
    const { selected } = props

    const useStyles = makeStyles({

    });

    const classes = useStyles();

    if(word.align){
        switch (word.align) {
            case "DELETION": variant = "deletion"
                break;
            case "SUBSTITUTION": variant = "substitution"
                break;
            case "CORRECT": variant = "none"
                break;
            case "INSERTION": variant = "insertion"
                break;
            default: variant = "none"
                break;
        }
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
            "ae": 95.0,
            "s": 89.0,
            "k": 68.0,
            "t": 32.0
        }
    }


    return (
        <div {...props} className={`my-1 mx-rem-2 fs-rem-6 cursor-pointer w-fit-content ${variant !== "none" ? "t-color-plabook-magenta" : ""}`}>
            <div className={`word-mark-section w-fit-content ${variant === "substitution" ? "word-mark-substitution" : ""}`}>
                {variant === "substitution" ? corretion ? corretion : word.normalized ? word.normalized : "" :""}
            </div>
            <div
                className={`word-mark-content 
                ${selected ? "word-mark-selected" : ""} 
                word-mark-${variant === "repeat" ? "repeat" : ""}${variant === "deletion" ? "deletion" : ""}`}
            >
                {typeof(word) === 'object' ? word.recognized : word}
                {variant === "deletion" ? word.normalized : ""}
            </div>
            <div className="word-mark-center word-mark-section">
                {variant === "insertion" ? "^" : " "}
            </div>
        </div>
    );
} 

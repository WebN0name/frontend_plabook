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

    const useStyles = makeStyles({

    });

    const classes = useStyles();


    return (
        <div class={`${variant !== "none" ? "t-color-plabook-magenta" : ""}`}>
            <div className={`word-mark-section ${variant === "substitution" ? "word-mark-substitution" : ""}`}>
                {corretion ? corretion : ' '}
            </div>
            <div
                class={`word-mark-content 
                word-mark-${variant === "repeat" ? "repeat" : ""}${variant === "deletion" ? "deletion" : ""}`}
            >
                {word}
            </div>
            <div class="word-mark-center word-mark-section">
                {variant === "insertion" ? "^" : " "}
            </div>
        </div>
    );
} 

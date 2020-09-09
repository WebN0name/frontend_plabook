import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Grid
} from '@material-ui/core';



export default function WordInfo(props) {
    const { word } = props

    const useStyles = makeStyles({

        tooltipText: {
            fontSize: "1.125rem"
        },
        MVSBox: {
            // width:100,
            backgroundColor: "#dbdbdb"
        }
    });

    const classes = useStyles();

    return (
        <Grid container className={`${classes.tooltipText}`}>
            <Grid item className="p-2">
                <Box className="m-1">
                    <h4>
                        {word.align}
                    </h4>
                </Box>
                <Box className="m-2">
                    Reference: {word.reference}
                </Box>
                <Box className="m-2">
                    Recognized: {word.recognized}
                </Box>
                <Box className="m-2">
                    Normolised: {word.normalized}
                </Box>
                <Box className="m-2">
                    Confidence: {isFinite(parseFloat(word.confidence)) ? word.confidence.toFixed(2) + "s" : "-"}%
                            </Box>
                <Box className="m-2">
                    Word quality: {word.wordquality}%
                            </Box>
                <Box className="m-2">
                    Start: {isFinite(parseFloat(word.start)) ? word.start.toFixed(3) + "s" : "-"}
                </Box>
                <Box className="m-2">
                    End: {isFinite(parseFloat(word.end)) ? word.end.toFixed(3) + "s" : "-"}
                </Box>
            </Grid>
            <Grid item className={`${classes.MVSBox} p-2`}>
                <Box className="m-1">
                    <h4>
                        MVS and other
                    </h4>
                </Box>
            </Grid>
        </Grid>
    );
} 
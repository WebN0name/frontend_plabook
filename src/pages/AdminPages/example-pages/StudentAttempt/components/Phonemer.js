import React from 'react'
import {
    Grid, Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function Phonemer(props) {
    const { phonemes } = props


    const useStyles = makeStyles({

        phonem: {
            backgroundColor: "#44AEC9",
            color: "white",
            fontSize: "0.8rem",
            width: "max-content",
            textTransform: "uppercase",
            lineHeight: "0.875rem",
            // display: "inline-block",
            // padding: 0 0.7em,
            fontWeight: 700,
            whiteSpace: "nowrap",
            borderRadius: "0.2rem",
            transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
        }
    });

    const classes = useStyles();

    const info = []

    for (let phonem in phonemes)
        info.push(
            <Grid container spacing={1} direction="row" className={`m-1  ${classes.phonem}`}>
                <Grid item>
                    {phonem + " "}
                </Grid>
                <Grid item>
                    {phonemes[phonem]}%
                </Grid>
            </Grid>
        )

    return (
        <Box className="d-flex justify-content-start">
                {info.map(item => { return (item) })}
        </Box>
    )
}

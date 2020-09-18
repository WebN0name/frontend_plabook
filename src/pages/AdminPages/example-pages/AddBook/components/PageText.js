import React, { useState } from 'react'
import {
    Grid, Box, TextField, Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { closestIndexTo } from 'date-fns/esm';


export default function PageText(props) {
    const { text } = props
    const { index } = props

    const [value, setValue] = useState(text);


    const handleChange = event => {
        setValue(event.target.value);
    };

    const useStyles = makeStyles({

    });

    const classes = useStyles();

    return (
        <Box id={props.id} className="p-2" variant="outlined" value={value}>
            <Box className="m-1">
                <h4>
                    Page {index}
                </h4>
            </Box>
            <TextField
                className="m-3"
                id="outlined-multiline-flexible"
                label={`Text`}
                multiline
                fullWidth
                rowsMax="4"
                value={value}
                onChange={handleChange}
                variant="outlined"
            />
        </Box>
    )
}

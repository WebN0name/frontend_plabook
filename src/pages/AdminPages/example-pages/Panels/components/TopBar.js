import React from 'react';
import theme from "../theme"
import { makeStyles } from '@material-ui/core/styles';
import {
     Toolbar, Typography, Box 
} from '@material-ui/core';

import { mdiBellOutline,mdiLoginVariant   } from '@mdi/js';
import Icon from '@mdi/react'


export default function TopBar() {

    const useStyles = makeStyles({
        top: {
            height: 64,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            backgroundColor: theme.palette.secondary.main,
            width: "100%",
            boxSizing: "border-box"
        },
        title:
        {
            color: "white",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "baseline",
            "& *":
            {
                marginRight: 3
            }
        },
        rightSection:
        {
            height:"1.5rem",
            position:"relative",
            right:0,
            marginRight: 0,
            marginLeft: "auto"
        }
    });

    const classes = useStyles();


    return (
        <Toolbar className={classes.top}>
            <Box className={classes.title}>
                <Typography variant="h4">Plabook </Typography>
                <Typography variant="h6">Admin</Typography>
            </Box>
            <Box className={classes.rightSection}>
                <Icon path={mdiBellOutline }
                    title={"notification"}
                    size={1}
                    color="white"
                />
                <Icon path={mdiLoginVariant }
                title={"notification"}
                size={1}
                color="white"
            />
            </Box>
        </Toolbar>
    );
} 
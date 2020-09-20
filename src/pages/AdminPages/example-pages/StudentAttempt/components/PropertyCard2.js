import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, Grid
} from '@material-ui/core';

import CountUp from 'react-countup';



export default function PropertyCard2(props) {
    const { label } = props
    const { value } = props
    const { decimals } = props
    const { color } = props // danger|warning|info|success
    const { valuePostfix } = props
    const { ending } = props

    const useStyles = makeStyles({

    });

    const classes = useStyles();

    const padding = "p-3"

    return (
        // <Card className={`card-box card-box-border-bottom border-${color} card-shadow-${color} mb-4`}>
        <Card className={`${color ? `card-box card-box-border-bottom border-${color} card-shadow-${color}` : ""} mb-4`}>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={5} className={`${padding}`}>
                    <h3 className="mb-0 text-black">
                        {label}
                    </h3>
                </Grid>
                <Grid item xs={3} className={`${padding}`}>
                    <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <span>
                            {isFinite(parseFloat(value))
                                ? <CountUp
                                    start={0}
                                    end={value}
                                    duration={4}
                                    deplay={2}
                                    separator=""
                                    decimals={decimals}
                                    decimal=","
                                />
                                : value}
                        </span>
                        <small className="opacity-6 pl-1 text-black-50">{valuePostfix}</small>
                    </h3>
                </Grid>
                <Grid
                    item
                    xs={4}
                    className={`${ending ? "bg-plabook-gray-1" : ""} ${padding} d-flex`}
                    style={{ justifyContent: "center ", alignItems:"center" }}
                >
                    <div>
                        {ending}
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
} 

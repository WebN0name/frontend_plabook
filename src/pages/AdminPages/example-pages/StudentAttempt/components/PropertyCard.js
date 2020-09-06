import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Card
} from '@material-ui/core';

import CountUp from 'react-countup';



export default function PropertyCard(props) {
    const { label } = props
    const { value } = props
    const { decimals } = props
    const { color } = props // danger|warning|info|success
    const { ending } = props

    const useStyles = makeStyles({

    });

    const classes = useStyles();

    return (
        <Card className={`card-box card-box-border-bottom border-${color} card-shadow-${color} mb-4`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="p-3">
                    <div className=" text-uppercase pb-2 font-size-sm">
                        {label}
                    </div>
                    <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <span>
                            {isFinite(parseFloat(value)) 
                            ?<CountUp
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
                        <small className="opacity-6 pl-1 text-black-50">{ending}</small>
                    </h3>
                </div>
            </div>
        </Card>
    );
} 

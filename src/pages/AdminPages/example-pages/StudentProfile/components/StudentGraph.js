import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Card, Grid
} from '@material-ui/core';

import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';



export default function StudentGraph(props) {
    const { student } = props


    const data3Dark = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                backgroundColor: 'rgba(65, 145, 255, 0.4)',
                borderCapStyle: 'round',
                borderDash: [],
                borderWidth: 3,
                borderColor: '#4191ff',
                borderDashOffset: 0.0,
                borderJoinStyle: 'round',
                pointBorderColor: '#4191ff',
                pointBackgroundColor: '#ffffff',
                pointBorderWidth: 3,
                pointHoverRadius: 6,
                pointHoverBorderWidth: 3,
                pointRadius: 4,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#4191ff',
                data: [65, 59, 80, 81, 56, 55, 40],
                datalabels: {
                    display: false
                },
                label: 'Fluency'
            },
            {
                backgroundColor: 'rgba(27, 201, 67, 0.3)',
                borderCapStyle: 'round',
                borderDash: [],
                borderWidth: 3,
                borderColor: '#1bc943',
                borderDashOffset: 0.0,
                borderJoinStyle: 'round',
                pointBorderColor: '#1bc943',
                pointBackgroundColor: '#ffffff',
                pointBorderWidth: 3,
                pointHoverRadius: 6,
                pointHoverBorderWidth: 3,
                pointRadius: 4,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#1bc943',
                data: [28, 48, 40, 19, 86, 27, 90],
                datalabels: {
                    display: false
                },
                label: 'Reading level'
            }
        ]
    };
    const data3DarkOptions = {
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        display: false,
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            xAxes: [
                {
                    ticks: {
                        display: true,
                        beginAtZero: true
                    },
                    gridLines: {
                        display: true,
                        color: '#eeeff8',
                        drawBorder: true
                    }
                }
            ]
        },
        legend: {
            display: true
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
            <Card className="card-box mb-4">
                <div className="card-header-alt px-4 pt-4 pb-0">
                    <h6 className="font-size-lg mb-3 text-dark">Progress</h6>
                </div>
                <div className="sparkline-full-wrapper sparkline-full-wrapper--xxl px-4 m-0">
                    <Line data={data3Dark} options={data3DarkOptions} />
                </div>
                {/* <div className="p-4">
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Performance
              </h6>
            <p className="text-black-50 mb-0">
              Portfolio performance for selected period.
              </p>
          </div> */}
            </Card>
    );
} 

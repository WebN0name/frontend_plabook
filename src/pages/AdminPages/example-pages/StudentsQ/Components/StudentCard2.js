import React, { useState, Fragment } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Grid,
    Checkbox,
    Card,
    Button,
    List,
    ListItem,
    Tooltip,
    Divider, Avatar, IconButton
} from '@material-ui/core';

import MenuBookIcon from '@material-ui/icons/MenuBook';

import { Book, Briefcase, Users, Layers, ChevronRight } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';


export default function StudentCard2(props) {
    const { student } = props
    const { index } = props


    const useStyles = makeStyles({

    });

    const classes = useStyles();

    const ex = {
        "id": "JaneDoe",
        "name": "Jane Doe",
        "pin": "5495",
        "personalLink": "https://dev.plabookeducation.com/Login/student/JaneDoe",
        "readingLevel": "4",
        "stage": "Comprehension",
        "bookRead": "4",
        "avatar": "asjf;as"
    }

    return (
        <Fragment>
            <Card className="card-box mb-4 pt-4">
            {/* <div className="card-tr-actions">
              <Checkbox />
            </div> */}
            <div className="d-flex align-items-center px-4 mb-3">
              <Avatar src={student.avatar} className="avatar-rem-8 mr-2"/>
              <div className="w-100">
                <a
                  href="#/"
                  onClick={e => e.preventDefault()}
                  className="font-weight-bold font-size-lg"
                  title="...">
                  {student.name}
                </a>
                {/* <span className="text-black-50 d-block pb-1">
                  Project Manager, Apple Inc.
                </span> */}
                <div className="d-flex align-items-center pt-2">
                  {/* <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className="mr-3">
                    Chat
                  </Button> */}
                  <Button size="small" variant="outlined" color="secondary">
                    View
                  </Button>
                </div>
              </div>
            </div>
            <Divider className="my-3" />
            <div className="font-size-sm px-4 rounded-sm">
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Joined:</span>
                <span className="text-black-50">19 September, 2020</span>
              </div>
            </div>
            {/* <div className="divider mt-3 mb-2" /> */}
            <List className="py-0">
              <Divider className="mt-2"/>
              <ListItem className="bg-white border-0 align-box-row">
                <div className="align-box-row w-100">
                  <div>
                    <div className="font-weight-bold d-block">Reading Level</div>
                  </div>
                  <div className="ml-auto  align-self-center">
                    {student.readingLevel}
                  </div>
                </div>
              </ListItem>
              <ListItem className="bg-white border-0 align-box-row">
                <div className="align-box-row w-100">
                  <div>
                    <div className="font-weight-bold d-block">Stage</div>
                  </div>
                  <div className="ml-auto  align-self-center">
                    {student.stage}
                  </div>
                </div>
              </ListItem>
              <ListItem className="bg-white border-0 align-box-row">
                <div className="align-box-row w-100">
                  <div>
                    <div className="font-weight-bold d-block">Book Read</div>
                  </div>
                  <div className="ml-auto  align-self-center">
                    {student.bookRead}
                  </div>
                </div>
              </ListItem>
              <Divider />
              {/* <ListItem button className="bg-white border-0 align-box-row">
                <div className="align-box-row w-100">
                  <div className="mr-3">
                    <div className="bg-neutral-danger text-danger text-center font-size-xl d-50 rounded-circle">
                      <FontAwesomeIcon icon={['far', 'object-group']} />
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold d-block">Income</div>
                    <small className="text-danger">
                      <FontAwesomeIcon
                        icon={['fas', 'arrow-up']}
                        className="text-danger mr-1"
                      />
                      <span>5.2% decrease</span>
                    </small>
                  </div>
                  <div className="ml-auto card-hover-indicator align-self-center">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-lg"
                    />
                  </div>
                </div>
              </ListItem>
              <Divider />
              <ListItem button className="bg-white border-0 align-box-row">
                <div className="align-box-row w-100">
                  <div className="mr-3">
                    <div className="bg-neutral-warning text-warning text-center font-size-xl d-50 rounded-circle">
                      <FontAwesomeIcon icon={['far', 'chart-bar']} />
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold d-block">Expenses</div>
                    <small className="text-warning">
                      <FontAwesomeIcon
                        icon={['fas', 'arrow-down']}
                        className="text-warning mr-1"
                      />
                      <span>5.2% down</span>
                    </small>
                  </div>
                  <div className="ml-auto card-hover-indicator align-self-center">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-lg"
                    />
                  </div>
                </div>
              </ListItem> */}
            </List>
          </Card>
        </Fragment>
    );
}

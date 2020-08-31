import React, { useContext, useEffect } from 'react'
import theme from "../theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar, Box, Typography, Divider, List, ListItem, ListItemText 
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import {
    mdiAccountMultipleOutline,
    mdiAccountOutline,
    mdiCogOutline,
    mdiShoppingOutline,
    mdiAccountPlusOutline,
    mdiAlertCircleOutline,
    mdiLockOutline,
    mdiSignal,

} from '@mdi/js';

import Context from '../../../Context'

export default function NavBar() {

    const history = useHistory();

    const { activePanel, ActivePanelDispatch } = useContext(Context)
    const ACTIVE_PANEL = "activePanel" // ключ для storage


    const id = "John Bell"
    const role = "Treacher"
    const useStyles = makeStyles({
        teacherAvatar: {
            width: 64,
            height: 64,
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
            fontSize: 35
        },
        nav: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 0,
            position: "absolute",
            height: "100%",
            paddingTop: 64,
            visibility: "hidden",
            background: "#fff",
            boxSizing: "border-box",
            [theme.breakpoints.up('lg')]: {
                width: 255,
                visibility: "visible"
            }
        },
        navList: {
            display: "flex",
            flexDirection: "column",
            alignSelf: "baseline",
            padding: 16
        },
        p16:
        {
            width: "100%",
            padding: 16,
            boxSizing: "border-box",
        },
        LabelsBox: {
            marginTop: 16,
            textAlign: "center",
            boxSizing: "border-box",
        },
        avatarBox:
        {
            display: "flex",
            justifyContent: "center",
        }
        ,
        profileLabel:
        {
            fontSize: 16,
            fontWeight: 550,
        },
        profileRole:
        {
            fontSize: "0.875rem",
        },
        divder:
        {
            width: "100%",
        },
        navRow: (props) =>
            ({
                color:
                    props.active
                        ? props.selected
                            ? theme.palette.color.selected
                            : theme.palette.color.primary
                        : theme.palette.color.notClickable,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: 10,
                "& svg":
                {
                    color:
                        props.active
                            ? props.selected
                                ? theme.palette.color.selected
                                : theme.palette.color.primary
                            : theme.palette.color.notClickable,
                    marginRight: 5
                },
                "& p":
                {
                    fontSize: 20,
                }
            }),
    });

    const classes = useStyles();

    const navElem = [
        {
            label: "Classes",
            icon: mdiAccountOutline,
            link: "/Admin/School/JohnBell",
            active: true
        },
        {
            label: "Dashboard",
            icon: mdiSignal,
            link: "",
            active: false
        },
        {
            label: "Students",
            icon: mdiAccountMultipleOutline,
            link: "/Admin/Students/JohnBell",
            active: true
        },
        {
            label: "Books",
            icon: mdiShoppingOutline,
            link: "",
            active: false
        },
        // {
        //     label: "Account",
        //     icon: mdiAccountOutline,
        //     link: "/StudentStatistic/JaneDoe"
        // },
        // {
        //     label: "Settings",
        //     icon: mdiCogOutline ,
        //     link: ""
        // },
        // {
        //     label: "Login",
        //     icon: mdiLockOutline ,
        //     link: ""
        // },
        // {
        //     label: "Register",
        //     icon: mdiAccountPlusOutline ,
        //     link: ""
        // },
        // {
        //     label: "Error",
        //     icon: mdiAlertCircleOutline ,
        //     link: ""
        // },
    ]

    useEffect(() => {
        // const activePanelFromStorage = sessionStorage.getItem(ACTIVE_PANEL)
        // if (activePanelFromStorage === null) {
        //     ActivePanelDispatch({
        //         type: 'setPanel',
        //         payload: navElem[0].label
        //     })
        //     sessionStorage.setItem(ACTIVE_PANEL, navElem[0].label)
        //     history.push(navElem[0].link)
        // }
        // else {
        //     ActivePanelDispatch({
        //         type: 'setPanel',
        //         payload: activePanelFromStorage
        //     })
        //     history.push(navElem.find(item => item.label === activePanelFromStorage).link)
        // }
    }, [])

    const handleNavClick = (row) => {
        ActivePanelDispatch({
            type: 'setPanel',
            payload: row.label
        });
        sessionStorage.setItem(ACTIVE_PANEL, row.label)
        console.log(sessionStorage.getItem(ACTIVE_PANEL))
        history.push(row.link)
    }

    function Row(props) {
        const { row } = props;
        const classes = useStyles(props);
        return (<div className={classes.navRow}>
            <Icon path={row.icon}
                title={row.label}
                size={1}
            />
            <Typography>{row.label}</Typography>
        </div>);
    }

    return (
        <div className={classes.nav}>
            <Box className={classes.p16}>
                <Box className={classes.avatarBox}>
                    <Avatar alt={`${id}`} src={"/"} className={classes.teacherAvatar} />
                </Box>
                <Box className={classes.LabelsBox} >
                    <Typography component={"a"} color="textPrimary" className={classes.profileLabel}>{id}</Typography>
                    <Typography variant="body2" color="textSecondary" >Your role: {role}</Typography>
                </Box>
            </Box>
            <Divider className={classes.divder} variant="fullWidth" />
            <Box className={classes.p16}>
            <List component="nav">
                {
                    navElem.map(row =>
                        <ListItem
                            button={row.active}
                            onClick={row.active ? () => { handleNavClick(row) } : () => { }}
                        >
                            {/* <Row key={row.label} active={row.active} selected={row.label === activePanel} row={row} /> */}
                            
                            <ListItemText primary={row.label}/>
                        </ListItem>)
                }
            </List>
            </Box>
        </div>
    );
} 
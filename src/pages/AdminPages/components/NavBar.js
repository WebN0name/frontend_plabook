import React, {useContext, useEffect} from 'react'
import theme from "../theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar, Box, Typography, Divider
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import {
    mdiAccountMultipleOutline,
    mdiAccountOutline,
    mdiCogOutline ,
    mdiShoppingOutline ,
    mdiAccountPlusOutline ,
    mdiAlertCircleOutline ,
    mdiLockOutline ,
    mdiSignal ,
    
} from '@mdi/js';

import Context from '../../../Context'  

export default function NavBar() {

    const history = useHistory();

    const {activePanel, ActivePanelDispatch} = useContext(Context)


    const id = "JohnBell"
    const useStyles = makeStyles({
        teacherAvatar: {
            width: 75,
            height: 75,
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
            paddingTop: 84,
            visibility: "hidden",
            background: "#fff",
            boxSizing: "border-box",
            [theme.breakpoints.up('lg')]: {
                width: 256,
                visibility: "visible"
            }
        },
        navList: {
            marginTop:16,
            display: "flex",
            flexDirection: "column",
            alignSelf: "baseline",
            paddingLeft: 30
        },
        profileLabel:
        {
            fontSize: 30,
            color: theme.palette.text.secondary,
            paddingTop: 15
        },
        profileRole:
        {
            fontSize: 20,            
        },
        divder:
        {
            width: "90%",
            margin: 2,
            marginBottom: 10
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
                fontSize:20,
            }
        }),        
    });

    const classes = useStyles();

    const navElem = [
        {
            label: "Dashboard",
            icon: mdiSignal ,
            link: "",
            active: false
        },
        {
            label: "Students",
            icon: mdiAccountMultipleOutline,
            link: "/Teacher",
            active: true
        },
        {
            label: "Books",
            icon: mdiShoppingOutline ,
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
    
    useEffect(()=>{
        if(activePanel === undefined)
        {
            ActivePanelDispatch({
                type: 'setPanel',
                payload: navElem[1].label
            })
            history.push(navElem[1].link)
        }
        else
        ActivePanelDispatch({
            type: 'setPanel',
            payload: activePanel
        })
    },[])

    const handleNavClick = (row) =>
    {
        ActivePanelDispatch({
            type: 'setPanel',
            payload: row.label});
        history.push(row.link)
    }
   
    function Row(props)
    {
        const { row } = props;
        const classes = useStyles(props);
        return (<div className={classes.navRow} onClick={row.active ? ()=>{handleNavClick(row)}:()=>{}}>
        <Icon path={row.icon}
            title={row.label}
            size={1} 
        />
        <Typography>{row.label}</Typography>
    </div>);
    }

    return (
        <div className={classes.nav}>
            <Avatar alt={`${id}`} src={"/"} className={classes.teacherAvatar} />
            <Box><Typography color="textPrimary" className={classes.profileLabel}>{id}</Typography></Box>
            <Typography className={classes.profileRole} color="textSecondary" >Teacher</Typography>
            <Divider className={classes.divder} variant="middle" />
            <div className={classes.navList}>                
                {
                    navElem.map(row =><Row key={row.label} active={row.active} selected={row.label === activePanel} row={row} />)
                }
            </div>
        </div>
    );
} 
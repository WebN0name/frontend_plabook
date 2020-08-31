import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom"
import theme from "../theme"
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, Box, Typography, Popover, Checkbox, Grid, List, ListItem
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import {
    mdiChevronDown,
} from '@mdi/js';


export default function SelectSearch(props) {

    const { multiple } = props
    const { onChange } = props
    const linesCount = props.linesCount ? props.linesCount : 5

    const CHILDREN_ID = "select-search-option"
    const [fillter, setFillter] = useState("")
    const [value, setValue] = useState(null)
    const [checked, setChecked] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);


    const childrens = React.Children.toArray(props.children)
    const updated = []
    childrens.map((item, index) =>
        updated.push(React.cloneElement(item, { id: `${props.name}-${CHILDREN_ID}-${index}` })))

    const useStyles = makeStyles({
        flexRow: {
            display: 'flex',
            alignItems: 'center',
            "& div": {
                marginRight: "5px"
            }
        },
        present: {
            display: 'flex',
            width: "fit-content",
            cursor: "pointer",
            "& div": {
                marginRight: "5px"
            }
        },
        container:
        {
            padding: 10,
        },
        previewContainer:
        {
            maxWidth: 375
        },
        wraper:
        {
            maxHeight: 150,
            overflowY: "auto",
        }
    });
    const classes = useStyles();



    useEffect(() => {
        // setClick()
    }, [fillter]);


    const setClick = () => {
        updated.map((item, index) => {
            const elem = document.getElementById(`${props.name}-${CHILDREN_ID}-${index}`)
            if (elem === undefined || elem === null) return
            elem.onclick = multiple ? () => { handleToggle(item.props.value); raiseOnChange() } : () => { setValue(item.props.value); reset(); raiseOnChange() }
        });
    }

    const onMultipleItemClick = (item) => { handleToggle(item.props.value); raiseOnChange() }
    const onItemClick = (item) => { setValue(item.props.value); reset(); raiseOnChange() }

    const raiseOnChange = () => {
        setTimeout(() => { onChange && onChange() }, 10);
    }

    const reset = () => {
        setAnchorEl(null)
        setFillter("")
    }

    const fillterFunc = (item) => {
        if (item.props.children.toLowerCase().includes(fillter.toLowerCase())) return item
    }

    const handlePopoverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        console.log("Togle")
        console.log(currentIndex)
        console.log(checked)
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(newChecked)
        setValue(newChecked);
        setChecked(newChecked);
    };

    return (
        <Box value={value} {...props}  >
            <Box className={classes.present} onClick={handlePopoverClick}>
                <Box className={classes.previewContainer} onClick={handlePopoverClick}>
                    <Typography >{multiple ? checked.length > 0 ? checked.reduce((total, current) => {
                        return `${total}, ${current}`
                    }) : "None" : value ? value : "None"}</Typography>
                </Box>
                <Icon path={mdiChevronDown} size={1} />
            </Box>
            <Popover
                open={Boolean(anchorEl)}
                onClose={() => { reset() }}
                onEnter={() => { setClick() }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box value={value} {...props}>
                    <Box className="pr-3 pl-3 pt-2 pb-0">
                        <TextField onChange={(e) => { setFillter(e.currentTarget.value) }} inputProps={{ autoComplete: "off" }} id="search" fullWidth type="search" label="Search" />
                    </Box>
                    <List className={classes.wraper}>
                        {updated.filter(fillterFunc).map((item,index) => {
                            return (
                                multiple
                                    ? <ListItem key={index} onClick={() => { onMultipleItemClick(item) }} button alignItems="flex-start" className="pl-1">
                                        <Box className={classes.flexRow}>
                                            <Checkbox
                                                checked={checked.indexOf(item.props.value) !== -1}
                                            />
                                            {item}
                                        </Box>
                                    </ListItem>
                                    :
                                    <ListItem key={index} onClick={() => { onItemClick(item) }} button alignItems="flex-start">{item}</ListItem>)
                        })}
                    </List>
                </Box>
            </Popover>

        </Box>
    );
} 
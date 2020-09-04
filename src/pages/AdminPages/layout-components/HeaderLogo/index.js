import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box, makeStyles } from '@material-ui/core';

import { connect } from 'react-redux';

import projectLogo from '../../assets/images/react.svg';
import plabookLogo from '../../../../assets/img/favicon.svg'


const HeaderLogo = props => {

  const useStyles = makeStyles({
    logo: {
        background: "rgb(255 255 255 / 70%) !important",
        "&:hover":{
          background: "rgb(255 255 255 / 95%) !important",
        }
      }
    });

const classes = useStyles();

  const { sidebarToggle, sidebarHover } = props;
  return (
    <Fragment>
      <div
        className={clsx('app-header-logo', {
          'app-header-logo-close': sidebarToggle,
          'app-header-logo-open': sidebarHover
        })}>
        <Box
          className={`header-logo-wrapper`}
          title="Plabook">
          <Link to="/DashboardDefault" className="header-logo-wrapper-link">
            <IconButton
              color="primary"
              size="medium"
              classes={{root: classes.logo}}
              className={`header-logo-wrapper-btn ${classes.logo}`}>
              <img
                className="app-header-logo-img"
                alt="Carolina React Admin Dashboard with Material-UI PRO"
                src={plabookLogo}
              />
            </IconButton>
          </Link>
          <Box className="header-logo-text">Plabook</Box>
        </Box>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarHover: state.ThemeOptions.sidebarHover
});

export default connect(mapStateToProps)(HeaderLogo);

import React, { Fragment, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card } from '@material-ui/core';

import Context from '../../../../../Context'

export default function LivePreviewExample() {

  const { students, studentslDispatch } = useContext(Context)

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className="card-box border-0 card-shadow-plabook-success p-4 mb-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-plabook-success text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['far', 'keyboard']} />
              </div>
              <div className="text-black-50">Average Mark</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-up']}
                className="font-size-sm text-plabook-success mr-2"
              />
              <div>4.485</div>
            </div>
            <div className="text-black-50 text-center opacity-6 pt-3">
              <b>+36%</b> from last month
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className="card-box border-0 card-shadow-plabook-warning p-4 mb-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-plabook-warning text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['far', 'file-excel']} />
              </div>
              <div className="text-black-50">Average error</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['far', 'dot-circle']}
                className="font-size-sm text-plabook-warning mr-2"
              />
              <div>436</div>
            </div>
            <div className="text-black-50 text-center opacity-6 pt-3">
              <b>+65%</b> from last month
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className="card-box border-0 card-shadow-plabook-info p-4 mb-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-plabook-info text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['far', 'user']} />
              </div>
              <div className="text-black-50">Students</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-up']}
                className="font-size-sm text-plabook-success mr-2"
              />
              <div>{students && students.length}</div>
            </div>
            <div className="text-black-50 text-center opacity-6 pt-3">
              <b>+22%</b> from last month
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className="card-box border-0 card-shadow-primary p-4 mb-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-plabook-info-light text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['far', 'user']} />
              </div>
              <div className="text-black-50">Books read</div>
            </div>
            <div className="display-3 text-center line-height-sm text-black-50 text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-down']}
                className="font-size-sm text-plabook-info-light mr-2"
              />
              <div className="text-second">{students && students.length > 0 ? students.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.bookRead),0):0}</div>
            </div>
            <div className="text-black-50 text-center opacity-6 pt-3">
              <b>+32%</b> from last month
            </div>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

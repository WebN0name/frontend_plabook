import React, { Fragment } from 'react';

import ApplicationsChatContent from '../../example-components/ApplicationsChat/ApplicationsChatContent';
import Students from '../Panels/Students'
import { ExampleWrapperSeamless } from '../../layout-components';
export default function ApplicationsChat() {
  return (
    <Fragment>
      <div style={{padding:160}}>
      <Students />
      </div>
    </Fragment>
  );
}

import React, { Fragment, useEffect, useContext } from 'react';

import { PageTitle } from '../../layout-components';

import Context from '../../../../Context'


import DashboardDefaultSection1 from '../../example-components/DashboardDefault/DashboardDefaultSection1';
import DashboardDefaultSection2 from '../../example-components/DashboardDefault/DashboardDefaultSection2';
// import DashboardDefaultSection3 from '../../example-components/DashboardDefault/DashboardDefaultSection3';
// import DashboardDefaultSection4 from '../../example-components/DashboardDefault/DashboardDefaultSection4';
// import DashboardDefaultSection5 from '../../example-components/DashboardDefault/DashboardDefaultSection5';
// import DashboardDefaultSection6 from '../../example-components/DashboardDefault/DashboardDefaultSection6';
// import DashboardDefaultSection7 from '../../example-components/DashboardDefault/DashboardDefaultSection7';
// import DashboardDefaultSection8 from '../../example-components/DashboardDefault/DashboardDefaultSection8';
import AvatarPicker from '../../../../components/AvatarPicker';
export default function DashboardDefault() {

  const { students, admin, studentsDispatch } = useContext(Context)

  const teacherId = admin.adminId ? admin.adminId : "John Bell"
 
  console.log(teacherId)

  useEffect(() => {
    if (!Boolean(students) || students === [] || students.length === 0) fetchStudentsList();
  }, [])

  const quareData =
  {
    students: {
      url: "https://dev.plabookeducation.com/studentList",
      options: (id) => {
        return ({
          method: "POST",
          body: JSON.stringify({ teacherId: id.replace(" ", "") }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    },
    studentStatistic: {
      url: "https://dev.plabookeducation.com/studentStatistics",
      options: (id) => {
        return ({
          method: "POST",
          body: JSON.stringify({ studentId: id.replace(" ", "") }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    }
  }


  const fetchStudentsList = async () => {
    const response = await fetch(quareData.students.url, quareData.students.options(teacherId))
    const result = await response.json()    
    result.map((elem, index) => {
      elem["avatar"] = AvatarPicker().GetAvatar(elem.id)
    })
    console.log("Students")
    console.log(result)
    studentsDispatch({
      type: 'setStudents',
      payload: result
    })
  }


  return (
    <Fragment>
      <PageTitle
        titleHeading="Dashboard"
      />
      <DashboardDefaultSection1 />
      <DashboardDefaultSection2 />
      {/* <DashboardDefaultSection3 />
      <DashboardDefaultSection4 />
      <DashboardDefaultSection5 />
      <DashboardDefaultSection6 />
      <DashboardDefaultSection7 />
      <DashboardDefaultSection8 /> */}
    </Fragment>
  );
}

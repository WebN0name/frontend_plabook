
import avatar1 from '../assets/img/StudentsAvatars/avatar1.jpg';
import avatar2 from '../assets/img/StudentsAvatars/avatar2.jpg';
import avatar3 from '../assets/img/StudentsAvatars/avatar3.jpg';
import avatar4 from '../assets/img/StudentsAvatars/avatar4.jpg';
import avatar5 from '../assets/img/StudentsAvatars/avatar5.jpg';
import avatar6 from '../assets/img/StudentsAvatars/avatar6.jpg';
import avatar7 from '../assets/img/StudentsAvatars/avatar7.jpg';
import avatar8 from '../assets/img/StudentsAvatars/avatar8.jpg';
import avatar9 from '../assets/img/StudentsAvatars/avatar9.jpg';
import avatar10 from '../assets/img/StudentsAvatars/avatar10.jpg';
import avatar11 from '../assets/img/StudentsAvatars/avatar11.jpg';
import avatar12 from '../assets/img/StudentsAvatars/avatar12.jpg';
import avatar13 from '../assets/img/StudentsAvatars/avatar13.jpg';
import avatar14 from '../assets/img/StudentsAvatars/avatar14.jpg';

import tavatar1 from '../assets/img/TeacherAvatars/avatar1.jpg';
import tavatar2 from '../assets/img/TeacherAvatars/avatar2.jpg';
import tavatar3 from '../assets/img/TeacherAvatars/avatar3.jpg';
import tavatar4 from '../assets/img/TeacherAvatars/avatar4.jpg';
import tavatar5 from '../assets/img/TeacherAvatars/avatar5.jpg';
import tavatar6 from '../assets/img/TeacherAvatars/avatar6.jpg';
import tavatar7 from '../assets/img/TeacherAvatars/avatar7.jpg';



export default function AvatarPicker()
{
    const persons=[
        {
            id: 'JaneDoe',
            avatar: avatar3,
        },
        {
            id: 'DannyMalkou',
            avatar: avatar1,
        },
        {
            id: 'MarioRossi',
            avatar: avatar6,
        },
        {
            id: 'SumitKumar',
            avatar: avatar12,
        },
        {
            id: 'AnnyLewis',
            avatar: avatar9,
        },
        {
            id: 'JacksonPhilips',
            avatar: avatar13,
        },
        {
            id: 'BelleRobinette',
            avatar: avatar4,
        },
        {
            id: 'LeonHewitt',
            avatar: avatar7,
        },
        {
            id: 'HaileyMueller',
            avatar: avatar10,
        },
        {
            id: 'IlyaStremovsky',
            avatar: avatar8,
        },
        {
            id: 'HarryPotter',
            avatar: avatar14,
        },
        {
            id: 'HermioneG',
            avatar: avatar11,
        },
        {
            id: 'MariBell',
            avatar: tavatar7,
        },
        {
            id: 'MariSiemens',
            avatar: tavatar1,
        },
        {
            id: 'Teacher1',
            avatar: tavatar1,
        },
        {
            id: 'Teacher2',
            avatar: tavatar1,
        },
        {
            id: 'Student1',
            avatar: avatar1,
        },
        {
            id: 'Student2',
            avatar: avatar2,
        },
        {
            id: 'Student3',
            avatar: avatar3,
        },
        {
            id: 'Student4',
            avatar: avatar4,
        },
        {
            id: 'Student5',
            avatar: avatar5,
        },
        {
            id: 'Student6',
            avatar: avatar6,
        },
        {
            id: 'Student7',
            avatar: avatar7,
        },
        {
            id: 'Student8',
            avatar: avatar8,
        },
        {
            id: 'Student9',
            avatar: avatar9,
        },
        {
            id: 'Student10',
            avatar: avatar10,
        }
    ]

    return{
        GetAvatar: (id) =>{
            const person = persons.find(elem => elem.id == id)
            if(!Boolean(person)) return
            return person.avatar
        }
    }
}
import { Fragment, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { getStudentPlan } from '../services/Students';
import './schedule.css';



function CourseBox({course}) {
    const types = {
        'Takhasosi': 'تخصصی',
        'Asli': 'اصلی',
        'Umumi': 'عمومی',
        'Paaye': 'پایه'
    };

    const getTimeClass = (time) => {
        var splitStart = time.split('-');
        var hDif = splitStart[1].split(':')[0] - splitStart[0].split(':')[0];
        var mDif = splitStart[1].split(':')[1] - splitStart[0].split(':')[1];
        var dif = hDif * 60 + mDif;
        switch(dif) {
            case 120: return 'time-2h';
            case 180: return 'time-3h';
            case 90: return splitStart[0].split(':')[1] == 0 ?  "time-60-30m" : "time-30-60m";
        }
    };

    let divClassName = `${getTimeClass(course.classTime.time)} course-box ${course.type.toLowerCase()}-box`;

    return (
      <div className={divClassName}>
        <div className="course-info">
          <span>{course.classTime.time}</span> 
          <span>{course.name}</span>
          <span>{types[course.type]}</span>
        </div>
      </div>
    );
}

function TableRow({title, courses}) {


    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']; // loop days and create <td>

    return (
      <tr>
        <td>{title}</td> 
        {days.map((day) => (
            <td> {
                courses.find(c => c.classTime.days.includes(day)) &&
                 <CourseBox course={courses.find(c => c.classTime.days.includes(day))} />
                } </td>
        ))}
      </tr>
    );
}

function PlanTable({plan={}, term=0}) {
    const tableHead = (
        <div className="table-header">
          <div className="row plan-title">
            <i className="flaticon-calendar"></i>
            <span>برنامه هفتگی</span>
          </div>
          <span>ترم {term}</span>
        </div>
    );

    const thead = (
        <thead>
            <tr>
                <th></th>
                <th>شنبه</th>
                <th>یکشنبه</th>
                <th>دوشنبه</th>
                <th>سه‌شنبه</th>
                <th>چهارشنبه</th>
                <th>پنج‌شنبه</th> 
            </tr>
        </thead>
    );

    return (
        <div className="main-div">
            {tableHead}
            <div className="table-responsive-sm">
                <table className="table sched-table table-bordered"> 
                    {thead}
                    <tbody>
                        {
                            [...Array(10)].map((e,i) => 
                                <TableRow title={`${i+8}:00-${i+9}:00`} 
                                    courses={plan.filter(c => i+8 == c.classTime.time.split(':')[0])} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Schedule({term=0}) {
    const [plan, setPlan] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        document.title = 'برنامه هفتگی';
        getStudentPlan(localStorage.getItem('username'))
            .then(planResp => {
                setPlan(planResp);
                console.log(planResp);
                setLoaded(true);
            }).catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
    }, []);


    return (
        <Fragment>
        {!loaded ? <Spinner animation="grow" variant="info" className='m-5 p-3'/> : <PlanTable plan={plan} term={term} />}
        </Fragment>
    );
}


export default Schedule;
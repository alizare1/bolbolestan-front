import React from 'react';
import './courses.css';
import '../common/reset.css'
import { Fragment, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {getCourses} from "../services/Courses";
import {addCourse, finalizeSelection, getStudentSchedule, removeFromSchedule, resetSelection} from '../services/Students';
import { getUsername } from '../services/SessionUtils';
import {toast} from "react-toastify";

function SearchForm({setFilter, filter}){

      const [tmpFilter,setTmpFilter] = useState("");

      const handleChange = (event) => {
        setTmpFilter(event.target.value);
      }
      const handleSubmit = (event) =>{
         event.preventDefault();
         setFilter(tmpFilter);
      }
      return(
          <div>
            <form onSubmit={handleSubmit} id="search-form" className="form-container" action="" method="GET">
                <input className="search-input" type="text" value={tmpFilter} onChange={handleChange} placeholder="نام درس" />
                <button className="submit-button" type="submit" >
                    جستجو <i className="flaticon-loupe submit-button"></i>
                </button>

            </form>
          </div>
      );
}

function Courses(props) {

    const [courses, setCourses] = useState([]);
    const [schedule,setSchedule] = useState({'courses': []});
    const [filter,setFilter] = useState("");
    const [type,setType] = useState("");
    const [loaded, setLoaded] = useState(false);

    const handleSubmit = (c) => setCourses(c);

    useEffect(() => {
        document.title = 'انتخاب واحد';
        getCourses()
            .then(c => {
                setCourses(c);
                setLoaded(true);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });

        getStudentSchedule(localStorage.getItem('username'))
            .then(sched => {
                setSchedule(sched);
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    toast.error(error.response.data);
                }
                else
                    toast.error('مشکل در ارتباط با سرور');
            });
    },[]);

    useEffect(() => {
        const interval = setInterval(() => {
            getCourses()
            .then(c => {
                setCourses(c);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
        }, 5000);
        return () => clearInterval(interval);
      }, []);

    return(
        <div className="main courses-div">
            <SelectedCourses schedule={schedule.courses} unitCount={schedule.unitCount} setSchedule={setSchedule}/>
            <SearchForm setFilter={setFilter} filter={filter} />
            <Offerings submitHandler={handleSubmit} courses={courses} type={type} setType={setType}
                        filter={filter} scheduleHandler={setSchedule}/>
        </div>
    );
}

function Offerings({submitHandler,courses,type, setType,filter,scheduleHandler}) {
    const thead = (
        <thead>
            <tr>
                <th></th>
                <th>کد</th>
                <th>ظرفیت</th>
                <th>نوع</th>
                <th>نام درس</th>
                <th>استاد</th>
                <th>واحد</th>
                <th>توضیحات</th>
            </tr>
        </thead>
    );

    const filterCourses = () => {
        let results = courses;
        if (filter)
            results = courses.filter(c => c.name.includes(filter));
        if (type)
            results = results.filter(c => c.type === type);
        return results;
    }

    return(
        <div>
            <div className="caption">
                <label> دروس ارائه شده</label>
            </div>
            <BtnContainer setType={setType} />
                <table className="courses">
                    {thead}
                    <tbody>
                        {filterCourses().map((course) => <OfferingsTR courses={courses} course={course}
                                                                      scheduleHandler={scheduleHandler}/>)}
                    </tbody>
                </table>
        </div>
    );
}

function SelectedCoursesTR({course, setSchedule}){

    const [removeLoading, setRemoveLoading] = useState(false);

    const status = {
        'notFinalized': 'ثبت نهایی نشده',
        'finalized': 'ثبت شده',
        'queue': 'در انتظار'
    };

    const removeBtn = e => {
        e.preventDefault();
        setRemoveLoading(true);
        removeFromSchedule(getUsername(), course.code, course.classCode)
        .then(sched => {
            setRemoveLoading(false);
            setSchedule(sched);
        })
        .catch(e => {
            setRemoveLoading(false);
            console.log(e);
            if (e.response)
                toast.error(e.response.data.error);
            else
                toast.error('مشکل در ارتباط با سرور');
        })
    }

    const trashStyle = {'width': '2.5em', 'height': '2.5em'}

    return (
        <tr>
            <td>
                <form action="" method="DELETE">
                    <input type="hidden" name="action" value="remove" />
                    <button style={trashStyle} onClick={removeBtn} type="submit">
                        { removeLoading ? <Spinner as='span' size='sm-1' role='status' variant='danger' animation="border" /> : <i className="flaticon-trash-bin"></i> }
                    </button>
                </form>

            </td>
            <td><span className={`${course.status}-box box`}>{status[course.status]}</span></td>
            <td>{createClassCode(course.code,course.classCode)}</td>
            <td>{course.name}</td>
            <td>{course.instructor}</td>
            <td>{course.units}</td>
        </tr>
    );
}


function SelectionInfo({unitCount, setSchedule}) {

    const [submitLoading, setSubmitLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const finalize = (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        finalizeSelection(getUsername())
        .then(sched => {
            setSchedule(sched);
            setSubmitLoading(false);
            toast.success('ثبت شد!');
        }).catch(e => {
            setSubmitLoading(false);
            console.log(e);
            if (e.response)
                toast.error(e.response.data.error);
            else
                toast.error('مشکل در ارتباط با سرور');
        });
      };


    const reset = e => {
        e.preventDefault();
        setResetLoading(true);
        resetSelection(getUsername())
        .then(sched => {
            setSchedule(sched);
            setResetLoading(false);
            toast.success('بازگردانی شد!');
        }).catch(e => {
            setResetLoading(false);
            console.log(e);
            if (e.response)
                toast.error(e.response.data.error);
            else
                toast.error('مشکل در ارتباط با سرور');
        });
    }

    const submitStyle = {'width': '7em', 'height': '3em'}
    const labelStyle = {'float': 'right'}
    return (
        <div>
            <form className="submit-form-container">
                <label style={labelStyle}>تعداد واحد ثبت شده: {unitCount}</label>
                <span>
                    <button onClick={reset} className="refresh-btn" type="submit" name="action" value="reset">
                        {resetLoading ? <Spinner as='span' size='sm' role='status' animation="border" /> : <i className="flaticon-refresh-arrow"></i>}
                    </button>
                    <button style={submitStyle} onClick={finalize} className="submit-button" type="submit" name="action" value="submit">
                        {submitLoading ? <Spinner as='p' size='sm-1' role='status' animation="border" /> : 'ثبت نهایی'}
                    </button>
                </span>
            </form>
        </div>
    )
}

function SelectedCourses({schedule, unitCount, setSchedule}){
    const thead = (
        <thead>
            <tr>
                <th></th>
                <th>وضعیت</th>
                <th>کد</th>
                <th>نام درس</th>
                <th>استاد</th>
                <th>واحد</th>
            </tr>
        </thead>
    );
    return(
        <>
            <div className="caption">
                <label> دروس انتخاب شده</label>
            </div>
            <div className="table-container">
                <table className="selected-courses">
                    {thead}
                    <tbody>
                       {schedule.length > 0 && schedule.map((course) => <SelectedCoursesTR course={course} setSchedule={setSchedule} />)}
                    </tbody>
                </table>
            </div>
            <SelectionInfo unitCount={unitCount} setSchedule={setSchedule} />
        </>
    );
}

function OfferingsTR({courses,course,scheduleHandler}) {
    const types = {
        'Takhasosi': 'تخصصی',
        'Asli': 'اصلی',
        'Umumi': 'عمومی',
        'Paaye': 'پایه'
    };

    return (
        <tr>
            <td><Icon course={course} setSchedule={scheduleHandler}/></td>
            <td>{createClassCode(course.code,course.classCode)}</td>

            <td className={course.capacity <= course.participantsCount ? `cap-full` : ``}>
                {`${course.capacity}/ ${course.participantsCount}`}
            </td>
            <td>
                <span className={`type-box box ${course.type}-box`}>{types[course.type]}</span>
            </td>
            <td>{course.name}</td>
            <td>{course.instructor}</td>
            <td className="tool-tip">{course.units}
            <Description courses={courses} prerequisites={course.prerequisites}
                         classTime={course.classTime} examTime={course.examTime}/></td>
            <td></td>
        </tr>
    );
}

function Icon({course,setSchedule}){
    const [loading, setloading] = useState(false);

    const addToSched = e => {
        e.preventDefault();
        setloading(true);
        addCourse(getUsername(), course.code, course.classCode)
        .then(sched => {
            setSchedule(sched);
            toast.success('اضافه شد!')
            setloading(false);
        })
        .catch(error => {
            setloading(false);
            if (error.response) {
               console.log(error.response.data);
               toast.error(error.response.data.error);
            } else
               toast.error('مشکل در ارتباط با سرور');
          });
    }

    const buttonClass = course.capacity <= course.participantsCount ? 'icon-circular-clock' : 'icon-add';
    const iconClass = course.capacity <= course.participantsCount ? 'flaticon-clock-circular-outline' : 'flaticon-add';
    const spinStyle = {'width': '1.25em', 'height': '1.25em'};
    const buttonStyle = {'width': '2.5em', 'height': '2.5em'};

    return (
        <button style={buttonStyle} type='button' className={buttonClass + ' text-center'} onClick={addToSched}>
            {loading ? <Spinner style={spinStyle} as='span' size='sm' role='status' animation="border" /> : <i className={iconClass}></i>}
        </button>
    )
}

const createClassCode = (code,classCode) => {
    return classCode < 10 ? code + '-۰'+ classCode : code + '-' + classCode;
}

function BtnContainer({setType}){

    const [activeBtn,setActiveBtn] = useState('');

    const handleClick = (id) =>{
        setType(id);
        setActiveBtn(id);
    }
    return( <div className="btn-container">
              <FilterBtn id="" isActive={activeBtn === ""} onClick={handleClick}/>
              <FilterBtn id="Takhasosi" isActive={activeBtn === "Takhasosi"} onClick={handleClick}/>
              <FilterBtn id="Asli" isActive={activeBtn === "Asli"} onClick={handleClick}/>
              <FilterBtn id="Paaye" isActive={activeBtn === "Paaye"} onClick={handleClick}/>
              <FilterBtn id="Umumi" isActive={activeBtn === "Umumi"} onClick={handleClick}/>
             </div>
    );

}

function FilterBtn(props){
    const types = {
        '':'همه',
        'Takhasosi': 'تخصصی',
        'Asli': 'اصلی',
        'Umumi': 'عمومی',
        'Paaye': 'پایه'
    };
    const handleClick = (e) => {
        props.onClick(props.id)
        e.preventDefault();
   }
    return(
        <button type='button' className={`filter-btn ${props.isActive ? "active":""}`} onClick={handleClick}>
        {types[props.id]}</button>
    );
}

function Description({courses,prerequisites,classTime,examTime}){

    const days = {
        "Saturday": "شنبه",
        "Sunday": "یک‌شنبه",
        "Monday": "دو‌شنبه",
        "Tuesday": "سه‌شنبه",
        "Wednesday": "چهار‌شنبه",
        "Thursday": "پنج‌شنبه"
    };

    const classTimeDays = (classDays) => classDays.map(day => days[day]).join("-");

    const findPrerequisitesNames = (prerequisites) => {
        const findClassName = (code) => courses.find(course => course.code === code).name;
        const pNames = prerequisites.map(pCode => findClassName(pCode)).join("-");
        return pNames;
    }

    const ExamTime = (start,end) => {
        const [day,startTime] = start.split("T");
        const [y,m,d] = day.split("-");
        const endTime = end.split("T")[1];
        const  getTime = (time) => Number(time.slice(0,2)) + ":" + time.slice(3,5);
        return getTime(startTime) + "-" + getTime(endTime)+ "-" + Number(m) + "/" + Number(d);
    }
    const TimeSpanStyle = {borderBottom:"1px solid #707070",marginBottom:"5px",paddingBottom:"5px"}
    const titleStyle = {fontWeight:"700"};
    return(
        <div className="tooltip-text">
            <span>{classTime.time}</span>
            <span style={TimeSpanStyle}>{classTimeDays(classTime.days)}</span>
            <span style={titleStyle}>پیش نیازی‌ها</span>
            <span>{findPrerequisitesNames(prerequisites)}</span>
            <span style={titleStyle}>امتحان</span>
            <span>{ExamTime(examTime.start,examTime.end)}</span>
        </div>
    );

}
export default Courses;
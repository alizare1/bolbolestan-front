import React from 'react';
import './courses.css';
import '../common/reset.css'
import { Fragment, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {getCourses} from "../services/Courses";
import {addCourse, getStudentSchedule} from '../services/Students';
import {toast} from "react-toastify";

function SearchForm({submitHandler,handleFilter,type}){

      const [filter,setFilter] = useState("");

      const handleChange = (event) => {
          handleFilter(event.target.value);
          setFilter(event.target.value);
      }
      const handleSubmit = (event) =>{
         event.preventDefault();
         getCourses(filter,type).then(c => {
             console.log(c);
            submitHandler(c);
         });
      }
      return(
          <div>
            <form onSubmit={handleSubmit} id="search-form" className="form-container" action="" method="GET">
                <input className="search-input" type="text" value={filter} onChange={handleChange} placeholder="نام درس" />
                <button className="submit-button" type="submit" >
                    جستجو <i className="flaticon-loupe submit-button"></i>
                </button>

            </form>
          </div>
      );
}

function Courses(props) {

    const [courses, setCourses] = useState([]);
    const [schedule,setSchedule] = useState([]);
    const [filter,setFilter] = useState("");
    const [type,setType] = useState("");
    const [loaded, setLoaded] = useState(false);

    const handleSubmit = (c) => setCourses(c);

    useEffect(() => {
        document.title = 'انتخاب واحد';
        getCourses(null,null).then(c => {
            console.log(c);
            setCourses(c);
            setLoaded(true);
        }).then().catch(error => {
            if (error.response)
                console.log(error.response.data);
            else
                console.log(error);
        })},[]);

    return(
        <div className="main courses-div">
            <SelectedCourses schedule={schedule}/>
            <SearchForm submitHandler={handleSubmit} handleFilter={setFilter} type={type}/>
            <Offerings submitHandler={handleSubmit} courses={courses} handleType={setType}
                        filter={filter} scheduleHandler={setSchedule}/>
        </div>
    );
}

function Offerings({submitHandler,courses,handleType,filter,scheduleHandler}) {
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

    return(
        <div>
            <div className="caption">
                <label> دروس ارائه شده</label>
            </div>
            <BtnContainer submitHandler={submitHandler} handleType={handleType} filter={filter} />
                <table className="courses">
                    {thead}
                    <tbody>
                        {courses.map((course) => <OfferingsTR course={course} scheduleHandler={scheduleHandler}/>)}
                    </tbody>
                </table>
        </div>
    );
}

function SelectedCoursesTR(props){
    const status = {
        'notFinalized': 'ثبت نهایی نشده',
        'finalized': 'ثبت شده',
        'queue': 'در انتظار'
    };
    return (
        <tr>
            <td>
                <form action="" method="DELETE">
                    <input type="hidden" name="action" value="remove" />
                    <button type="submit"><i className="flaticon-trash-bin"></i></button>
                </form>

            </td>
            <td><span className={`${props.status}-box box`}>{status[props.status]}</span></td>
            <td>{createClassCode(props.code,props.classCode)}</td>
            <td>{props.name}</td>
            <td>{props.instructor}</td>
            <td>{props.units}</td>
        </tr>
    );
}

function SelectedCourses({schedule}){
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
                    {console.log(schedule)}
                       {schedule.length > 0 ? schedule.map((course) => <SelectedCoursesTR {...course} />): console.log(schedule)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

function OfferingsTR({course,scheduleHandler}) {
    const types = {
        'Takhasosi': 'تخصصی',
        'Asli': 'اصلی',
        'Umumi': 'عمومی',
        'Paaye': 'پایه'
    };
    return (
        <tr>
            <td><Icon course={course} scheduleHandler={scheduleHandler}/></td>
            <td>{createClassCode(course.code,course.classCode)}</td>

            <td className={isFull(course.capacity,course.participantsCount)?`cap-full`:``}>
                {`${course.capacity}/ ${course.participantsCount}`}
            </td>
            <td>
                <span className={`type-box box ${course.type}-box`}>{types[course.type]}</span>
            </td>
            <td>{course.name}</td>
            <td>{course.instructor}</td>
            <td>{course.units}</td>
            <td></td>
        </tr>
    );
}

function Icon({course,scheduleHandler}){

    const getSelectedCourses = () => {
          getStudentSchedule(localStorage.getItem('username'))
            .then(sched => {
                console.log(sched);
                scheduleHandler(sched.courses);
            }).catch(error => {
            if (error.response)
                console.log(error.response.data);
            else
                console.log(error);
        });
    }

    const addToSched = (code,classCode) =>{
        addCourse(localStorage.getItem('username'),code,classCode).then(resp => {
             console.log(resp);
             getSelectedCourses();
        }).catch(error => {
             if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
             } else
                toast.error('مشکل در ارتباط با سرور');
          });
    }

    if(isFull(course.capacity,course.participantsCount)){
        return(
            <button type='button' className="icon-circular-clock" onClick=
                {() => addToSched(course.code,course.classCode)}>
                <i className="flaticon-clock-circular-outline"></i>
            </button>
        );
    }
    else{
        return (
            <button type='button' className="icon-add" onClick={() => addToSched(course.code,course.classCode)}>
                <i className="flaticon-add"></i>
            </button>
        );
    }
}

const createClassCode = (code,classCode) => {
    return classCode < 10 ? code + '-۰'+ classCode : code + '-' + classCode;
}

const isFull = (capacity,participantsCount) => {
    return (capacity <= participantsCount);
}

function BtnContainer({submitHandler,handleType,filter}){

    const [activeBtn,setActiveBtn] = useState('');

    const handleClick = (id) =>{
       // setActiveBtn(event.target.id);
        setActiveBtn(id);
        handleType(id);
        getCourses(filter,id).then(c => {
            console.log(c);
            submitHandler(c); //setCourses
        })
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
    const handleClick = () => {
        console.log(props.id);
        props.onClick(props.id)
        // event.preventDefault();
   }
    return(
        <button type='button' className={`filter-btn ${props.isActive ? "active":""}`} onClick={handleClick}>
        {types[props.id]}</button>
    );
}

export default Courses;
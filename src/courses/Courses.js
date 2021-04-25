import React from 'react';
import './courses.css';
import '../common/reset.css'
import { Fragment, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {getCourses} from "../services/Courses";
import {addCourse, getStudentSchedule} from '../services/Students';

import {getCourse} from "../services/Courses";

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
        })
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
    const [filter,setFilter] = useState("");
    const [type,setType] = useState("");

    const [loaded, setLoaded] = useState(false);

    const handleSubmit = (c) => {
        setCourses(c);
    }

    useEffect(() => {
        document.title = 'انتخاب واحد';
        getCourses(null,null).then(c => {
            console.log(c);
            setCourses(c);
            setLoaded(true);

        }).catch(error => {
            if (error.response)
                console.log(error.response.data);
            else
                console.log(error);
        })},[]);

    return(
        <div className="main courses-div">
            <SelectedCourses />
            <SearchForm submitHandler = {handleSubmit} handleFilter={setFilter} type={type}/>
            <Offerings  submitHandler = {handleSubmit} courses= {courses} handleType={setType} filter={filter}/>
        </div>
    );
}

function Offerings({submitHandler,courses,handleType,filter}) {
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
            <BtnContainer submitHandler={submitHandler} handleType={handleType} filter={filter}/>
                <table className="courses">
                    {thead}
                    <tbody>
                        {courses.map((course) => <OfferingsTR {...course} /> )}
                    </tbody>
                </table>
        </div>

    );
}

function SelectedCoursesTR(props){
    return (
        <tr>
            <td>
                <form action="" method="DELETE">
                    <input type="hidden" name="action" value="remove" />
                    <button type="submit"><i className="flaticon-trash-bin"></i></button>
                </form>

            </td>
            <td></td>
            <td>{createClassCode(props.code,props.classCode)}</td>
            <td>{props.name}</td>
            <td>{props.instructor}</td>
            <td>{props.units}</td>
        </tr>
    );
}

function SelectedCourses(props){

    const selectedCourses = [{"code":"8101021","classCode":"1","name":"گرافیک کامپیوتری","instructor":"رضا ظروفی","units":3,
        "type":"Takhasosi","classTime":{"days":["Saturday","Monday"],"time":"7:30-9:00"},
        "examTime":{"start":"2021-06-17T08:30:00","end":"2021-06-17T11:30:00"},"capacity":0,"prerequisites":[],"participantsCount":0}];
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
                       {selectedCourses.map((course) => <SelectedCoursesTR {...course} />)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

function OfferingsTR(props) {
    const types = {
        'Takhasosi': 'تخصصی',
        'Asli': 'اصلی',
        'Umumi': 'عمومی',
        'Paaye': 'پایه'
    };
    return (
        <tr>
            <td><Icon capacity={props.capacity} participantsCount={props.participantsCount} /></td>
            <td>{createClassCode(props.code,props.classCode)}</td>

            <td className={isFull(props.capacity,props.participantsCount)?`cap-full`:``}>
                {`${props.capacity}/ ${props.participantsCount}`}
            </td>
            <td>
                <span className={`type-box box ${props.type}-box`}>{types[props.type]}</span>
            </td>
            <td>{props.name}</td>
            <td>{props.instructor}</td>
            <td>{props.units}</td>
            <td></td>
        </tr>
    );
}

function Icon({capacity,participantsCount}){
   /* const handleClick = () =>{
        addCourse()
    }*/
    if(isFull(capacity,participantsCount)) {
        return(
                <button type='button' className="icon-circular-clock" /*onClick={handleClick}*/>
                    <i className="flaticon-clock-circular-outline"></i>
                </button>
        );
    }
    else{
        return (
            <form action="" method="POST">
                <input type="hidden" name="action" value="add"/>
                <button className="icon-add"><i className="flaticon-add "></i></button>
            </form>
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
            submitHandler(c);
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

/*const d = () =>{
    getStudentSchedule(localStorage.getItem('username'))
        .then(sched => {
        console.log(sched);

    }).catch(error => {
        if (error.response)
            console.log(error.response.data);
        else
            console.log(error);
    });
}*/

export default Courses;
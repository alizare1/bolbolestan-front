import './home.css';
import logo from '../common/logo.png';
import coverPhoto from '../common/cover_photo.jpg';
import { getStudent } from '../services/Students';
import { Fragment, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function MyCarousel(props) {
    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
            </ol>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={coverPhoto} alt="cover photo" />
                </div>

                <div className="carousel-item">
                    <img src={logo} alt="logo" />
                </div>

            </div>

            <Link className="carousel-control-prev" to="#myCarousel" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </Link>
            <Link className="carousel-control-next" to="#myCarousel" data-slide="next">
                <span className="carousel-control-next-icon"></span>
            </Link>
        </div>
    )
}

function Profile(props) {
    
    return (
        <div className="col-sm-3 ul-container">
            <ul>
                <li><img src={props.student.img} alt="Avatar" /></li>
                <li> نام: <span>{props.student.name} {props.student.secondName}</span></li>
                <li>شماره دانشجویی: <span>{props.student.id}</span></li>
                <li>تاریخ تولد: <span>{props.student.birthDate}</span></li>
                <li>معدل کل <span>{props.student.gpa.toPrecision(4)}</span></li>
                <li>واحد گذرانده: <span>{props.student.passedUnitsCount}</span></li>
                <li>دانشکده: <span>{props.student.faculty}</span></li>
                <li>رشته: <span>{props.student.field}</span></li>
                <li>مقطع: <span>{props.student.level}</span></li>
                <li><label class="box st-status-box">{props.student.status}</label></li>
            </ul>
        </div>
    )
}


function GradeBox(props) {
    const [passText, setPassText] = useState('قبول');
    const [boxClass, setBoxClass] = useState('box passed-box');
    const [gradeClass, setGradeClass] = useState('passed-grade');

    useEffect(() => {
        if (Number(props.grade) < 12) {
            setPassText('مردود');
            setBoxClass('box failed-box');
            setGradeClass('failed-grade');
        }
    }, []);

    return (
        <Fragment>
            <td><span className={boxClass}>{passText}</span></td>
            <td className={gradeClass}>{props.grade}</td> 
        </Fragment>
    )
}

function GradeRow(props) {
    
    return (
        <tr>
            <td>{props.num}</td>
            <td>{props.grade.code}</td>
            <td>{props.grade.name}</td>
            <td>{props.grade.units} واحد</td>
            <GradeBox grade={props.grade.grade} />
        </tr>
    )
}

function GradeReport(props) {
    function calculateGPA(gradeList) {
        let gradeSum = 0;
        let unitSum = 0;
        for (let i in gradeList) {
            gradeSum += Number(gradeList[i].grade) * Number(gradeList[i].units);
            unitSum += Number(gradeList[i].units);
        }
        return (gradeSum / unitSum).toPrecision(4);
    }

    const terms = []
    Object.entries(props.grades).forEach(([key, value]) => {
        let num = 1;
        terms.push((
            <div>
                <div className = "caption">
                    <label> كارنامه-ترم {key}</label>
                </div>
                <div className = "table-container">
                    <table className="home-table">
                        {value.map((val,i) => <GradeRow num={i+1} grade={val} />)}
                    </table>
                    <label class="box avg-box">معدل: {calculateGPA(value)}</label>
                </div>
            </div>
        ))
    });

    return (
        <div className="col-sm-9">
            {terms}
        </div>
    )
}

function HomeBody(props) {

    const getStudentWithGpaUnits = () => {
        let gradeSum = 0;
        let unitSum = 0;
        let passedUnitSum = 0;

        Object.values(props.student.grades).map(term => {
            term.map(c => {
                unitSum += c.units;
                gradeSum += c.units * c.grade;
                if (c.grade >= 10)
                    passedUnitSum += c.units;
            });
        });

        props.student.gpa = gradeSum/unitSum;
        props.student.passedUnitsCount = passedUnitSum;
        return props.student;
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <Profile student={getStudentWithGpaUnits()} />
                <GradeReport grades={props.student.grades}/>
            </div>
        </div>
    )
}


function Home(props) {
    useEffect(() => document.title = 'خانه',[]);

    return (
        <div className="wrapper home-div">
            <MyCarousel />
            <HomeBody student={props.student} />
        </div>
    )
}

export default Home;
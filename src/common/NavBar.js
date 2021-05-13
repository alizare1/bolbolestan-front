import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { userExists } from '../services/SessionUtils';
import LogoutDialog from './LogoutDialog';
import logo from './logo.png';

function HomeLinks(props) {
    return (
        <div>
            <img src={logo} alt="logo" />
            <Link to="/courses">انتخاب واحد</Link>
            <Link to="/schedule">برنامه هفتگی</Link>
        </div>
    )
} 

function ScheduleLinks(props) {
    return (
        <div>
            <img src={logo} alt="logo" />
            <Link to="/home">خانه</Link>
            <Link to="/courses">انتخاب واحد</Link>
        </div>
    )
}

function NonAuthLinks() {
    return (
        <div>
            <img src={logo} alt="logo" />
            <Link to="/login">ورود</Link>
            <Link to="/resetPassword">فراموشی رمز عبور</Link>
        </div>
    )
}

function CoursesLinks(props) {
    return (
        <div>
            <img src={logo} alt="logo" />
            <Link to="/home">خانه</Link>
            <Link to="/schedule">برنامه هفتگی</Link>
        </div>
    )
}

function NavBar(props) {
    return (
        <header>
            <div className="navbar navbar-expand fixed-navbar">
                    <Switch>
                        <Route path='/home/' component={HomeLinks} />
                        <Route path='/schedule/' component={ScheduleLinks} />
                        <Route path='/courses/' component={CoursesLinks} />
                        <Route component={NonAuthLinks} />
                    </Switch>
                <div>
                    { props.loggedIn && <LogoutDialog setLoggedIn={props.setLoggedIn} />}
                </div>
            </div>
        </header>
    )
}



export default NavBar;
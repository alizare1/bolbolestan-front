import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { userExists } from '../services/SessionUtils';
import LogoutDialog from './LogoutDialog';
import logo from './logo.png';

function HomeLinks(props) {
    return (
        <div>
            <img src={logo} alt="logo" />
            <a href="courses">انتخاب واحد</a>
            <a href="schedule">برنامه هفتگی</a>
        </div>
    )
} 

function ScheduleLinks(props) {
    return (
        <div>
            <img src={logo} alt="logo" />
            <a href="home">خانه</a>
            <a href="courses">انتخاب واحد</a>
        </div>
    )
}

function CoursesLinks(props) {
    return (
        <div>
            <img src={logo} alt="logo" />
            <a href="home">خانه</a>
            <a href="schedule">برنامه هفتگی</a>
        </div>
    )
}

function NavBar(props) {
    return (
        <header>
            <div className="navbar navbar-expand fixed-navbar">
                <BrowserRouter>
                    <Switch>
                        <Route path='/home/' component={HomeLinks} />
                        <Route path='/schedule/' component={ScheduleLinks} />
                        <Route path='/courses/' component={CoursesLinks} />
                        <Route component={HomeLinks} />
                    </Switch>
                </BrowserRouter>
                <div>
                    { userExists() && <LogoutDialog />}
                </div>
            </div>
        </header>
    )
}



export default NavBar;
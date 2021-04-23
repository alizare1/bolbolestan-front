import { Fragment, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import { saveUsername, userExists } from "../services/SessionUtils";
import { getStudent } from "../services/Students";
import './login.css';


function Login(props) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => document.title = 'ورود',[]);

    function submitName(e) {
        e.preventDefault();
        setLoading(true);
        getStudent(name)
        .then(st => {
            props.setStudent(st);
            saveUsername(name);
            props.setLoggedIn(true);
            console.log(name);
        }).catch(error => {
            if (error.response)
                console.log(error.response.data);
            else 
                console.log('Login: server down?');
        });
    }

    return (
        <Fragment>
            <div className="form-container">
                {loading && <Spinner animation="grow" variant="info" className='m-5 p-3'/> }
                <div className="sign">ورود</div>
                <form className="form">
                    <input onChange={e => setName(e.target.value)} className="form-input" type="text"  placeholder="ایمیل" />
                    <input className="form-input" type="password"  placeholder="رمز عبور" />
                    <button onClick={e => submitName(e)} type="submit" className="submit-btn" >ورود</button>
                </form>
            </div>
        </Fragment>
    )
}



export default Login;
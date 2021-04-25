import { Fragment, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import { saveUsername, userExists } from "../services/SessionUtils";
import { getStudent } from "../services/Students";
import './login.css';


function Login(props) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => document.title = 'ورود',[]);

    function submitName(e) {
        e.preventDefault();
        if (!name)
            return;
        setLoading(true);
        getStudent(name)
        .then(st => {
            props.setStudent(st);
            saveUsername(name);
            props.setLoggedIn(true);
            console.log(name);
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            }
            else {
                console.log('Login: server down?');
                toast.error('مشکل در ارتباط با سرور');
            }
            setLoading(false);
        });
    }

    const btnStyle = {
        'width': '5em',
        'height': '3.5em'
    };

    return (
        <Fragment>
            <div className="form-container">
                <Fragment>
                <div className="sign">ورود</div>
                <form className="form">
                    <input required={true} onChange={e => setName(e.target.value)} className="form-input" type="text"  placeholder="ایمیل" />
                    <input className="form-input" type="password"  placeholder="رمز عبور" />
                    <button style={btnStyle} onClick={e => submitName(e)} type="submit" className="submit-btn" >
                        {loading ? <Spinner as='span' size='sm-1' role='status' animation="border" /> : 'ورود'}
                    </button>
                </form>
                </Fragment>
            </div>
        </Fragment>
    )
}



export default Login;
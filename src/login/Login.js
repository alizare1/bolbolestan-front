import { Fragment, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/Auth";
import { getUsername, saveToken, saveUsername, userExists } from "../services/SessionUtils";
import { getStudent } from "../services/Students";
import './login.css';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [gotToken, setGotToken] = useState(false);
    const { register, handleSubmit} = useForm({mode: 'onBlur'});
    
    useEffect(() => document.title = 'ورود',[]);

    useEffect(() => {
        if (gotToken) {
            getStudent(getUsername())
            .then(st => {
                props.setStudent(st);
                props.setLoggedIn(true);
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
    }, [gotToken]);

    function submitName(data) {
        if (!email || !password)
            return;
        setLoading(true);
        login(email, password)
        .then(resp => {
            console.log(resp);
            saveToken(resp.token);
            saveUsername(resp.sid);
            setGotToken(true);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            }
            else {
                console.log('Login: server down?');
                toast.error('مشکل در ارتباط با سرور');
            }
            setLoading(false);
            return;
        })
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
                <form className="form" onSubmit={handleSubmit(submitName)}>
                    <input {...register('email', {required: true})} onChange={e => setEmail(e.target.value)} className="form-input" type="email"  placeholder="ایمیل" />
                    <input {...register('password', {required: true})} onChange={e => setPassword(e.target.value)} className="form-input" type="password"  placeholder="رمز عبور" />
                    <button style={btnStyle} type="submit" className="submit-btn" >
                        {loading ? <Spinner as='span' size='sm-1' role='status' animation="border" /> : 'ورود'}
                    </button>
                    <Link to='/resetPassword'>فراموشی رمز عبور</Link>
                </form>
                </Fragment>
            </div>
        </Fragment>
    )
}



export default Login;
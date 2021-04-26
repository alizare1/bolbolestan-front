import {Fragment,useEffect} from "react";

import { Redirect } from "react-router";

import '../login/login.css';


function SignUp(props) {

    useEffect(() => document.title = 'ثبت نام',[]);

    const btnStyle = {
        'width': '6em',
        'height': '3.5em'
    };

    return (
        <Fragment>
            <div className="form-container">
                <Fragment>
                    <div className="sign">ثبت نام</div>
                    <form className="form">
                        <input required={true}  className="form-input" type="text"  placeholder="نام" />
                        <input required={true}  className="form-input" type="text"  placeholder="نام خانوادگی" />
                        <input required={true}  className="form-input" type="text"  placeholder="ایمیل" />
                        <input className="form-input" type="password"  placeholder="رمز عبور" />
                        <button style={btnStyle}  type="submit" className="submit-btn" >
                          ثبت نام
                        </button>
                    </form>
                </Fragment>
            </div>
        </Fragment>
    )
}



export default SignUp;
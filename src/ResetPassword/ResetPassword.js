import { Fragment, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { resetPassword } from "../services/Auth";
import '../login/login.css';


function ResetPassword(props) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => document.title = 'فراموشی رمز',[]);


    function onClick(e) {
        e.preventDefault();
        if (!email)
            return;
        setLoading(true);
        resetPassword(email)
        .then(resp => {
            toast.success('لینک عوض کردن رمز به شما ارسال شد')
            setLoading(false);
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
                <div className="sign">فراموشی رمز عبور</div>
                <form className="form">
                    <input required={true} onChange={e => setEmail(e.target.value)} className="form-input" type="email"  placeholder="ایمیل" />
                    <button style={btnStyle} onClick={onClick} type="submit" className="submit-btn" >
                        {loading ? <Spinner as='span' size='sm-1' role='status' animation="border" /> : 'ارسال'}
                    </button>
                </form>
                </Fragment>
            </div>
        </Fragment>
    )
}



export default ResetPassword;
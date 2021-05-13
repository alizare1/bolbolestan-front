import { Fragment, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { setNewPassword } from "../services/Auth";
import '../login/login.css';


function SetNewPassword(props) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => document.title = 'رمز جدید',[]);

    const pathParams = useParams();
    const history = useHistory();


    function onClick(e) {
        e.preventDefault();
        if (!password)
            return;
        setLoading(true);
        setNewPassword(password, pathParams.token)
        .then(resp => {
            toast.success('رمز تغییر کرد')
            setLoading(false);
            history.push('/login');
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
                <div className="sign">تغییر رمز</div>
                <form className="form">
                    <input required={true} onChange={e => setPassword(e.target.value)} className="form-input" type="text"  placeholder="رمز جدید" />
                    <button style={btnStyle} onClick={onClick} type="submit" className="submit-btn" >
                        {loading ? <Spinner as='span' size='sm-1' role='status' animation="border" /> : 'تغییر'}
                    </button>
                </form>
                </Fragment>
            </div>
        </Fragment>
    )
}



export default SetNewPassword;
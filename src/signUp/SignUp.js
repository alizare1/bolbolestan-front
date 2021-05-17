import {Fragment,useEffect,useState} from "react";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";


import '../login/login.css';
import {getUsername, saveToken, saveUsername} from "../services/SessionUtils";
import {toast} from "react-toastify";
import {signup} from "../services/Auth";


function SignUp(props) {
    useEffect(() => document.title = 'ثبت نام',[]);

    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    const onSubmit = (data) => {
        let a = {...data, status: 'مشغول به تحصیل', img: 'http://138.197.181.131:5200/img/claire_wheeler.jpg'};
        console.log(a);
        signup(a).then(resp => {
            console.log(resp);
            toast.success('ثبت نام با موفقيت انجام شد')
            history.push('/login');
        }
        ).catch(e => {
            console.log(e);
            if (e.response)
                toast.error(e.response.data.error);
            else
                toast.error('مشکل در ارتباط با سرور');
        })
    }

    const btnStyle = {
        'width': '6em',
        'height': '3.5em'
    };

    return (
        <Fragment>
            <div className="form-container">
                <Fragment>
                    <div className="sign">ثبت نام</div>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <label> نام</label>
                        <input {...register('name', {required: true})} name='name' className="form-input" type="text" />

                        <label>نام خانوادگی</label>
                        <input {...register('secondName', {required: true})} name='secondName' className="form-input" type="text" />

                        <label> شماره دانشجویی</label>
                        <input {...register('id', {required: true, minLength:9, maxLength:9})} name='id' className="form-input" type='text' pattern='[0-9]*'   />

                        <label>تاریخ تولد</label>
                        <input {...register('birthDate', {required: true})} name='birthDate' className="form-input" type="text" />

                        <label> رشته</label>
                        <input {...register('field', {required: true})} name='field' className="form-input" type="text"  />

                        <label> دانشکده</label>
                        <input {...register('faculty', {required: true})} name='faculty' className="form-input" type="text" />

                        <label>مقطع</label>
                        <input {...register('level', {required: true})} name='level' className="form-input" type="text"  />

                        <label>ایمیل</label>
                        <input {...register('email', {required: true})} name='email' className="form-input" type="email"  />

                        <label> رمز عبور</label>
                        <input {...register('password', {required: true})} name='password' className="form-input" type="password"  />
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
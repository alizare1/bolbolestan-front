import {Fragment,useEffect,useState} from "react";
import { useForm } from "react-hook-form";


import '../login/login.css';


function SignUp(props) {
    useEffect(() => document.title = 'ثبت نام',[]);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        let a = {...data, status: 'مشغول به تحصیل', img: 'http://138.197.181.131:5200/img/claire_wheeler.jpg'};
        console.log(a);
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
                        <input {...register('name', {required: true})} name='name' className="form-input" type="text"  placeholder="نام" />
                        <input {...register('secondName', {required: true})} name='secondName' className="form-input" type="text"  placeholder="نام خانوادگی" />
                        <input {...register('id', {required: true, minLength:9, maxLength:9})} name='id' className="form-input" type='text' pattern='[0-9]*'  placeholder="شماره دانشجویی" />
                        <input {...register('birthDate', {required: true})} name='birthDate' className="form-input" type="text"  placeholder="تاریخ تولد" />
                        <input {...register('field', {required: true})} name='field' className="form-input" type="text"  placeholder="رشته" />
                        <input {...register('faculty', {required: true})} name='faculty' className="form-input" type="text"  placeholder="دانشکده" />
                        <input {...register('level', {required: true})} name='level' className="form-input" type="text"  placeholder="مقطع" />
                        <input {...register('email', {required: true})} name='email' className="form-input" type="email"  placeholder="ایمیل" />
                        <input {...register('password', {required: true})} name='password' className="form-input" type="password"  placeholder="رمز عبور" />
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
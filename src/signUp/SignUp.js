import {Fragment,useEffect,useState} from "react";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";


import '../login/login.css';
import {getUsername, saveToken, saveUsername} from "../services/SessionUtils";
import {toast} from "react-toastify";
import {signup} from "../services/Auth";


function SignUp(props) {
    useEffect(() => document.title = 'ثبت نام',[]);

    const { register, handleSubmit, formState: { errors } } = useForm({mode: 'onBlur'});

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
                        {errors.name && <span style={{color: 'red'}}>فیلد نمی‌تواند خالی باشد!</span>}
                        <input {...register('name', {required: true})} name='name' placeholder='حمید' className="form-input" type="text" />

                        <label>نام خانوادگی</label>
                        {errors.secondName && <span style={{color: 'red'}}>فیلد نمی‌تواند خالی باشد!</span>}
                        <input {...register('secondName', {required: true})} name='secondName' placeholder='حمیدی' className="form-input" type="text" />

                        <label> شماره دانشجویی</label>
                        {errors.id && <span style={{color: 'red'}}>فرمت شماره دانشجویی صحیح نیست!</span>}
                        <input {...register('id', {required: true, minLength:9, maxLength:9})} name='id' placeholder='810197499' className="form-input" type='text' pattern='[0-9]*'   />

                        <label>تاریخ تولد</label>
                        {errors.birthDate && <span style={{color: 'red'}}>تاریخ درست وارد نشده!</span>}
                        <input {...register('birthDate', {required: true, pattern: {value: /13[5-8][0-9]\/(0[1-9]|(10|11|12))\/(0[1-9]|[1-3][0-9])/i, message: 'Invalid date'}})} name='birthDate' placeholder='1379/07/21' className="form-input" type="text" />

                        <label> رشته</label>
                        {errors.field && <span style={{color: 'red'}}>فیلد نمی‌تواند خالی باشد!</span>}
                        <input {...register('field', {required: true})} name='field' placeholder='مهندسی کامپیوتر' className="form-input" type="text"  />

                        <label> دانشکده</label>
                        {errors.faculty && <span style={{color: 'red'}}>فیلد نمی‌تواند خالی باشد!</span>}
                        <input {...register('faculty', {required: true})} name='faculty' placeholder='برق و کامپیوتر' className="form-input" type="text" />

                        <label>مقطع</label>
                        {errors.level && <span style={{color: 'red'}}>فیلد نمی‌تواند خالی باشد!</span>}
                        <input {...register('level', {required: true})} name='level' placeholder='کارشناسی' className="form-input" type="text"  />

                        <label>ایمیل</label>
                        {errors.name && <span style={{color: 'red'}}>ایمیل صحیح نیست!</span>}
                        <input {...register('email', {required: true})} name='email' placeholder='hamid@ut.ac.ir' className="form-input" type="email"  />

                        <label> رمز عبور</label>
                        {errors.password && <span style={{color: 'red'}}>فیلد نمی‌تواند خالی باشد!</span>}
                        <input {...register('password', {required: true})} name='password' placeholder='****' className="form-input" type="password"  />
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
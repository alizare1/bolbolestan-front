import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import { userExists } from "../services/SessionUtils";
import { getStudent } from "../services/Students";


function Login(props) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    function submitName(e) {
        e.preventDefault();
        setLoading(true);
        getStudent(name)
        .then(st => {
            props.setLoggedIn(true);
            props.setStudent(st);
            localStorage.setItem('username', name);
            console.log(name);
        }).catch(error => {
            if (error.response)
                console.log(error.response.data);
            else 
                console.log('server down?');
        });
    }

    return (
        <div>
            {loading && <Spinner animation="grow" variant="info" className='m-5 p-3'/> }
            <form>
                <label>username</label>
                <input type='text' onChange={e => setName(e.target.value)} />
                <button onClick={e => submitName(e)}>OK</button>
            </form>
        </div>
    )
}



export default Login;
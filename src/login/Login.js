import { useState } from "react";
import { Redirect } from "react-router";
import { userExists } from "../services/SessionUtils";


function Login(props) {
    function submitName(e) {
        e.preventDefault();
        localStorage.setItem('username', name);
        console.log(name);
    }

    const [name, setName] = useState();

    if (userExists())
        return <Redirect to='/home' />

    return (
        <div>
            <form>
                <label>username</label>
                <input type='text' onChange={e => setName(e.target.value)} />
                <button onClick={e => submitName(e)}>OK</button>
            </form>
        </div>
    )
}



export default Login;
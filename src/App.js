import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './common/NavBar';
import Footer from './common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common/font/flaticon.css'
import './common/reset.css';
import './common/style.css';
import Login from './login/Login';
import { getUsername, userExists } from './services/SessionUtils';
import { addCourse, getStudent, getStudentPlan, resetSelection } from './services/Students';
import { getCourse, getCourses } from './services/Courses';
import Home from './home/Home';
import Schedule from './schedule/Schedule';
import Courses from './courses/Courses';
import SignUp from './signUp/SignUp';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import ResetPassword from './ResetPassword/ResetPassword';
import SetNewPassword from './ResetPassword/SetNewPassword';


export function TestHook() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  const [plan, setPlan] = useState([0]);
  
  useEffect( () => {
    console.log('hey ' + count);
    document.title = 'title ' + count;
  }, [count]);


  useEffect(() => {
    console.log('testing did mount');
  }, []);

  const func = () => {
    setCount(count+2);
    getStudent(123).then(d => setData(d)).catch(e => console.log(e.response.data));
    getStudentPlan(123).then(d => setPlan(d));  
    addCourse('123', '8101001', '1')
      .then(d => console.log(d))
      .catch(e => console.log(e.response.data));
    resetSelection('123')
      .then(d => console.log(d))
      .catch(e => console.log(e.response.data));
    getCourses(null, "Asli")
      .then(d => console.log(d))
      .catch(e => console.log(e.response.data));
    getCourse("8101001", "1")
      .then(d => console.log(d))
      .catch(e => console.log(e.response.data));
    
  }

  return (
    <p onClick={func}>
      {count}
      <p>{data.name}</p>
    </p>
  )
}

function App() {
  const [student, setStudent] = useState({});
  const [term, setTerm] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userExists()) {
      setLoggedIn(true);
      setLoading(true);
      getStudent(getUsername())
      .then(st => {
        setStudent(st);
        setTerm(Object.keys(st.grades).length+1)
        setLoggedIn(true);
        setLoading(false);
      })
      .catch(e => {
        if (!e.response)
          toast.error('مشکل در ارتباط با سرور');
        setLoggedIn(false);
        setLoading(false);
      })
    }
  }, []);

  const routes = (
      <Switch>
        <Route path='/' children={<Home student={student} />} exact />
        <Route path='/home' children={<Home student={student} />} />
        <Route path='/schedule' children={<Schedule term={term} />} />
        <Route path='/courses' children={<Courses />} />
        <Route children={<Home student={student} />} /> {/* fallback */}
      </Switch>
  )

  const nonAuthRoutes = (
    <Switch>
        <Route path='/resetPassword' children={<ResetPassword />} exact />
        <Route path='/signup' children={<SignUp/>} />
        <Route path='/setNewPassword/:token' children={<SetNewPassword />} />
        <Route children={<Login setLoggedIn={setLoggedIn} setStudent={setStudent} />} />
      </Switch>
  )

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="wrapper">
        {loading ? <div className='text-center'> <Spinner animation="border" variant='info' /> </div> :
        loggedIn ? routes : nonAuthRoutes
        }
      </div>
      <ToastContainer position='bottom-right' rtl={true} />
      <Footer />
    </div>
  );
}

export default App;

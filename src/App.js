import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './common/NavBar';
import Footer from './common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common/font/flaticon.css'
import './common/reset.css';
import './common/style.css';
import Login from './login/Login';
import { userExists } from './services/SessionUtils';
import { addCourse, getStudent, getStudentPlan, resetSelection } from './services/Students';
import { getCourse, getCourses } from './services/Courses';
import Home from './home/Home';


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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (userExists())
      setLoggedIn(true);
  }, []);

  const routes = (
      <Switch>
        <Route path='/' children={<Home student={student} />} exact />
        <Route path='/home' children={<Home student={student} />} />
        <Route path='/schedule' children={<TestHook />} />
        <Route path='/courses' children={<TestHook />} />
        <Route children={<Home student={student} />} /> {/* fallback */}
      </Switch>
  )

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="wrapper">
        {loggedIn ? routes : <Login setLoggedIn={setLoggedIn} setStudent={setStudent} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;

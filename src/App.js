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


export function TestHook() {
  const [count, setCount] = useState(0);
  useEffect( () => {
    console.log('hey ' + count);
    document.title = 'title ' + count;
  }, [count]);


  useEffect(() => {
    console.log('testing did mount');
  }, []);


  return (
    <p onClick={() => setCount(count+2)}>{count}</p>
  )
}

function App() {

  const routes = (
    <BrowserRouter>
      <Switch>
        <Route path='/' children={<TestHook />} exact />
        <Route path='/login/' children={<Login />} />
        <Route path='/home/' children={<TestHook />} />
        <Route path='/schedule/' children={<TestHook />} />
        <Route path='/courses/' children={<TestHook />} />
        <Route children={<TestHook />} /> {/* fallback */}
      </Switch>
    </BrowserRouter>
  )

  return (
    <div className="App">
      <NavBar />
      {userExists() ? routes : <Login />}
      <Footer />
    </div>
  );
}

export default App;

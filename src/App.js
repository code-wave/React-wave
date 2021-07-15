import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CardDetail from './pages/CardDetail';
import SearchPage from './pages/SearchPage';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import AddPage from './pages/AddPage';
import ErrorPage from './pages/ErrorPage';
import Mypage from './components/user/Mypage';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/detail/:id' component={CardDetail} />
          <Route path='/search' component={SearchPage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/add' component={AddPage} />
          <Route path='/error' component={ErrorPage} />
          <Route path='/mypage' component={Mypage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

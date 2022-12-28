import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Registration from './Components/Registration';
import PostDetails from './Components/PostDetails';
import Profile from './Components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/registration' element={<Registration />} />
        <Route exact path='/post/:id' element={<PostDetails />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

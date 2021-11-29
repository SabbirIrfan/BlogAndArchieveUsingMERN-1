import React, { useState} from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
// import memories from './images/memories.png';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth'
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [userstate, setuserstate] = useState(user)

  const setUserId = (val) => {
    setuserstate(val);
    console.log(userstate);
  }

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar setUserId={setUserId} />
        <Routes>
          <Route path="/" element={<Home userstate={userstate}/>} />
          <Route path="/auth" element={<Auth setUserId={setUserId}/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
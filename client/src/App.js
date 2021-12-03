import React, { useState} from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter,Route, Routes ,Navigate} from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails';
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

          <Route path="/" element={<Navigate to='/posts'/>} />
          
          <Route path="/posts" element={<Home userstate={userstate}/>} />
          <Route path="/posts/search" element={<Home userstate={userstate}/>} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth setUserId={setUserId}/>}/>
          {/* <Route path="/auth" element={ (user ? <Navigate to='/posts'/> : <Auth setUserId={setUserId}/> )}/> */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
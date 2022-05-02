import React from 'react';
import {
  BrowserRouter as Router
}from "react-router-dom";
import Routes from './routes';

const App: React.FC = () => {  

  return (
    <>
      <Router forceRefresh={true}>
        <Routes />
      </Router>
    </>
  )
}

export default App;

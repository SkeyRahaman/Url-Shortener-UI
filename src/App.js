import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  // No more useState or if/else blocks! 
  // The URL bar acts as our state now.
  
  return (
    <BrowserRouter>
      <div className="App">
        {/* NavBar handles its own navigation using <Link> tags internally */}
        <NavBar /> 

        {/* The Routes block acts as our automatic if/else statement */}
      </div>
    </BrowserRouter>
  );
}

export default App;
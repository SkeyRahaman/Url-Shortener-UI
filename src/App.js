import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Profile from './components/Profile';
import Settings from './components/Settings';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'dashboard' // Initial state
    };
  }

  // This function is passed to NavBar -> Sidebar to update the view
  navigateTo = (pageName) => {
    this.setState({ currentPage: pageName });
  };

  render() {
    const { currentPage } = this.state;

    // Logic to pick the component based on state before returning JSX
    let activeComponent;
    if (currentPage === 'dashboard') {
      activeComponent = <Dashboard />;
    } else if (currentPage === 'about') {
      activeComponent = <About />;
    } else if (currentPage === 'profile') {
      activeComponent = <Profile />;
    } else if (currentPage === 'settings') 
      activeComponent = <Settings />;

    return (
      <div className="App">
        {/* We wrap our pages in the NavBar. 
          The activeComponent is passed as 'children' to NavBar.
        */}
        <NavBar onNavigate={this.navigateTo} activePage={currentPage}>
          {activeComponent}
        </NavBar>
      </div>
    );
  }
}

export default App;
import React from 'react';
import WeatherHeader from './WeatherHeader';
import Navbar from './Navbar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component {
  

  render() {
    return (
      <div>
        <Navbar />
        <WeatherHeader />
      </div>
    )  
  }
}

export default App;
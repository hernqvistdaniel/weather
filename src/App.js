import React from 'react';
import WeatherHeader from './WeatherHeader';
import Navbar from './Navbar';
import DayForecast from './DayForecast';
import WeekForecast from './WeekForecast';
import WeeklyBar from './WeeklyBar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component {
  

  render() {
    return (
      <div>
        <Navbar />
        <WeatherHeader />
        <DayForecast />
        <WeeklyBar />
        <WeekForecast />
      </div>
    )  
  }
}

export default App;
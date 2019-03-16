import React from 'react';
import WeatherHeader from './WeatherHeader';
import Navbar from './Navbar';
import DayForecast from './DayForecast';
import WeekForecast from './WeekForecast';
import WeeklyBar from './WeeklyBar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component {
  state = { celsius: true }
  
  

  toggleUnit = () => {
    this.setState({ celsius: !this.state.celsius})
  }
  
  render() {
    return (
      <div id="appDiv">
        <Navbar />
        <button onClick={this.toggleUnit}>celsius/fahrenheit</button>
        <WeatherHeader celsius={this.state.celsius} />
        <DayForecast celsius={this.state.celsius} />
        <WeeklyBar celsius={this.state.celsius} />
        <WeekForecast celsius={this.state.celsius} />
      </div>
    )  
  }
}

export default App;
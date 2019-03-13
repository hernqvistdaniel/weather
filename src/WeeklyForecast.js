import React from "react";

class WeeklyForecast extends React.Component {
  render() {
    const {
      error,
      isLoaded,
      temperature,
      time,
      summary,
    } = this.props.weather;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else {
      return (        
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Time: {time.slice(11, 16)}}</h5>
              <p className="card-text">
                Weather: {summary.main} Temp{temperature.toFixed()} °C
              </p>
              <img className="icon" alt="Icon displaying current weather." src={`http://openweathermap.org/img/w/${summary.icon}.png`} />
            </div>
          </div>      
      );
    }
  }
}

export default WeeklyForecast;

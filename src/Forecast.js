import React from "react";

class Forecast extends React.Component {

  render() {
    const {
      error,
      isLoaded,
      temperature,
      summary,
      time,
      /*id,*/
      name,
      wind
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
        (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Time: {time.slice(0, 16)}</h6>
              <p className="card-text">
                The weather is: {summary.main}
              </p>
              <p className="card-text">
                With a temperature of: {temperature.toFixed()} °C
              </p>
              <p className="card-text">
                And a windspeed of {wind} m/s
              </p>
              <img className="icon" alt="Icon displaying current weather." src={`http://openweathermap.org/img/w/${summary.icon}.png`} />
              <br />
              <a href="#.se" className="card-link">
                somelink
              </a>
            </div>
          </div>
        )
      );
    }
  }
}

export default Forecast;

import React from "react";

class WeekForecast extends React.Component {
  state = {
    isLoaded: false,
    id: null,
    summary: [],
    coords: [],
  };

  celsiusToFahrenheit = (degreesInCelsius) => {
    return degreesInCelsius * (9/5) + 32;
  }

  componentDidMount() {
    const APIkey = "edd839fe6f8824a69560462761ca9d86";

    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        coords: position.coords
      });

      let geoRequestURI = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${APIkey}/${this.state.coords.latitude},${this.state.coords.longitude}?exclude=currently,minutely,hourly,alerts,flags&units=si`;

      fetch(geoRequestURI)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoaded: true,
              summary: result.daily.data
            });
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    });
  }

  render() {
    let days = this.state.summary;
    let result = [];

    for (let i = 0; i < 7; i++) {
      if (days[i]) {
        result.push(days[i]);
      }
    }

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return (
        <div id="spinner">
        <div className="spinner-border" role="status">
        </div>
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else {
    let WeekForecast;
    if (result.length > 0) {
      WeekForecast = result.map((data, index) => {
        return (
          <div id="weekDiv" key={index}>
            <div id="hej">
              {/* <img
                src={`http://openweathermap.org/img/w/${data.icon}.png`}
                className="card-img-top dailyIcon"
                alt="Icon displaying weather"
              /> */}

              <p className="card-title">
                <strong>{new Date(data.time * 1000).toDateString().slice(0, 10)}</strong>
              </p>
              <p className="card-text">
                <strong>{data.summary.slice(0, 30)}...</strong>
              </p>
              <p className="card-text">
                Temp High: <strong>{this.props.celsius ? data.temperatureHigh.toFixed() : this.celsiusToFahrenheit(data.temperatureHigh).toFixed()}{this.props.celsius ? '°C' : '°F'}</strong>
              </p>
              <p className="card-text">
                Temp Low: <strong>{this.props.celsius ? data.temperatureLow.toFixed() : this.celsiusToFahrenheit(data.temperatureLow).toFixed()}{this.props.celsius ? '°C' : '°F'}</strong>
              </p>
              <p className="card-text">
                Wind: <strong>{data.windSpeed.toFixed()} m/s</strong>
              </p>
            </div>
          </div>
        );
      });
    }
    return <div id="weekDivReturn">{WeekForecast}</div>;
  }
}
}

export default WeekForecast;

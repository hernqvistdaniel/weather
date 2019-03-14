import React from "react";

class WeekForecast extends React.Component {
  state = {
    isLoaded: false,
    id: null,
    summary: [],
    coords: []
  };

  componentDidMount() {
    const APIkey = "edd839fe6f8824a69560462761ca9d86";

    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        coords: position.coords
      });

      let geoRequestURI = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${APIkey}/${this.state.coords.longitude},${this.state.coords.latitude}?exclude=currently,minutely,hourly,alerts,flags`;

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

    let WeekForecast;
    if (result.length > 0) {
      WeekForecast = result.map(data => {
        return (
          <div id="weekDiv">
          <div className="miniCard">
            <img
              src={`http://openweathermap.org/img/w/${data.icon}.png`}
              className="card-img-top dailyIcon"
              alt="Icon displaying weather"
            />
            <div className="card-body">
              <p className="card-title"><strong>{data.time}</strong></p>
              <p className="card-text"><strong>{data.summary}</strong></p>
              <p className="card-text"><strong>{data.temperatureHigh} °C</strong></p>
              <p className="card-text"><strong>{data.temperatureLow} °C</strong></p>
              <p className="card-text"><strong>{data.windspeed} m/s</strong></p>


            </div>
          </div>
          </div>
        );
      });
    }
    return (
      <div className="weekDivReturn">
        {WeekForecast}
      </div>
      ) 
  }
}

export default WeekForecast;

import React from "react";

class DayForecast extends React.Component {
  state = {
    isLoaded: false,
    id: null,
    name: "",
    summary: [],
    coords: []
  };

  componentDidMount() {
    const APIkey = "5e158b3eb258eaa205c563444bddb6e2";

    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        coords: position.coords
      });

      let geoRequestURI = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&APPID=${APIkey}&units=metric`;

      fetch(geoRequestURI)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoaded: true,
              name: result.city.name,
              summary: result.list
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
    let hours = this.state.summary;
    let result = [];

    for (let i = 0; i < 8; i++) {
      if (hours[i]) {
        result.push(hours[i]);
      }
    }

    let hoursForecast;
    if (result.length > 0) {
      hoursForecast = result.map(data => {
        return (
          <div id="dayDiv" className="miniCard">
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              className="card-img-top dailyIcon"
              alt="Icon displaying weather"
            />
            <div className="card-body">
              <p className="card-title"><strong>{data.dt_txt.slice(10, 16)}</strong></p>
              <p className="card-text"><strong>{data.main.temp.toFixed()} °C</strong></p>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="dayDivReturn">
        {hoursForecast}
      </div>
      ) 
  }
}

export default DayForecast;

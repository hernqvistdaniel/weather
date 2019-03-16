import React from "react";

class DayForecast extends React.Component {
  state = {
    isLoaded: false,
    id: null,
    name: "",
    summary: [],
    coords: [],
  };

  celsiusToFahrenheit = (degreesInCelsius) => {
    return degreesInCelsius * (9/5) + 32;
  }

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
              summary: result.list,
              id: result.id
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
      hoursForecast = result.map((data, index) => {
        return (
          <div className="dailyMinis" key={index}>
          <div id="iconDiv">
            <img
              id="icon"
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="Icon displaying weather"
            />
              </div>
              <p><strong>{data.dt_txt.slice(10, 16)}</strong></p>
              <p><strong>{this.props.celsius ? data.main.temp.toFixed() : this.celsiusToFahrenheit(data.main.temp).toFixed()}{this.props.celsius ? ' °C' : ' °F'}</strong></p>
          </div>
        );
      });
    }
    return (
      <div id="dayDivReturn">
        {hoursForecast}
      </div>
      ) 
  }
}

export default DayForecast;

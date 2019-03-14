import React from "react";

class WeatherHeader extends React.Component {

  state = {
    isLoaded: false,
    id: null,
    name: '',
    time: '',
    temperature: null,
    summary: '',
    summarySub: '',
    wind: null,
    coords: [],
    sunUp: null,
    sunDown: null,
    icon: ''
  }

  componentDidMount() {
    this.fetchWeather()
  }

  fetchWeather = () => {
    
    const APIkey = '5e158b3eb258eaa205c563444bddb6e2';
    
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coords: position.coords
        })
        
        let geoRequestURI = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&APPID=${APIkey}&units=metric`;
           
      fetch(geoRequestURI)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              id: result.id,
              name: result.name,
              time: result.dt,
              temperature: result.main.temp,
              summary: result.weather[0].main,
              summarySub: result.weather[0].description,
              wind: result.wind.speed,
              sunUp: result.sys.sunrise,
              sunDown: result.sys.sunset,
              icon: result.weather[0].icon
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        }
    )
  }

  render() {
   

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return (
        <div id="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        </div>
      );
    } else {
      return (
        (
          <div id="currentDiv">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{this.state.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Time: <em>{new Date(this.state.time).toLocaleTimeString()}</em></h6>
              <p className="card-text">
                The weather is: {this.state.summary} ({this.state.summarySub})
              </p>
              <img className="icon" alt="Icon displaying current weather." src={`http://openweathermap.org/img/w/${this.state.icon}.png`} />
              <br />
              <p className="card-text">
                With a temperature of: {this.state.temperature.toFixed()} °C
              </p>
              <p className="card-text">
                And a windspeed of {this.state.wind} m/s
              </p>
              <p className="card-text">
                The sun will rise at: {new Date(this.state.sunUp * 1000).toLocaleString().slice(10, 16)}
              </p>
              <p className="card-text">
                And set at: {new Date(this.state.sunDown * 1000).toLocaleString().slice(10, 16)}
              </p>
            </div>
          </div>
          </div>
        )
      );
    }
  }
}

export default WeatherHeader;

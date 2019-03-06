import React from 'react';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      temperature: null,
      coords: [],
      summary: '',
      timezone: null
    };
  }

  
  componentDidMount() {
    
    const APIkey = 'edd839fe6f8824a69560462761ca9d86';
    // const lat = 42.3601;
    // const long = -71.0589;
    
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coords: position.coords
        })
        console.log(this.state.coords);
      
      fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/'+APIkey+'/'+this.state.coords.latitude+','+this.state.coords.longitude+'?units=auto')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              summary: result.currently.summary,
              timezone: result.timezone,
              temperature: result.currently.temperature
            });
            console.log(this.state.currently)
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
    const { error, isLoaded, temperature, timezone, summary } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
            <li key={timezone}>
              {timezone} {summary} {temperature} C
            </li>
        </ul>
      );
    }
  }
}

export default Forecast;
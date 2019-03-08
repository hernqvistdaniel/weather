import React from 'react';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      temperature: null,
      id: null,
      coords: [],
      summary: [],
      time: null
    };
  }

  
  componentDidMount() {
    // https://api.openweathermap.org/data/2.5/weather?lat=42.36&lon=-71.05&APPID=5e158b3eb258eaa205c563444bddb6e2
    
    const APIkey = '5e158b3eb258eaa205c563444bddb6e2';
    // const lat = 42.3601;
    // const long = -71.0589;
    
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coords: position.coords
        })
        // console.log(this.state.coords);
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&APPID=${APIkey}&units=metric`)
        .then(res => res.json())
        .then(
          (result) => {
            // console.log(result)
            this.setState({
              isLoaded: true,
              id: result.id,
              name: result.name,
              time: result.dt,
              temperature: result.main.temp,
              summary: result.weather[0]
            });
            console.log(this.state.summary)
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
    const { error, isLoaded, temperature, time, summary, id, name } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          <p>On your location in: <strong>{name}</strong></p>
            <li key={id}>
              <strong>Time:</strong> {time}  
            </li>
            <li>
            <strong>The weather is:</strong> {summary.main}
            </li>
            <li>
            <strong>With a temperature of:</strong> {temperature}°C
            </li>
        </ul>
      );
    }
  }
}

export default Forecast;
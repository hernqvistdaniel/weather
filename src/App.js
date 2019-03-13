import React from 'react';
import Forecast from './Forecast';
import Navbar from './Navbar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// const Search = (props) => {
//   const handleSearch = (event) => {
//     props.onSearch(event.target.value)
//   }
//   <form onSubmit={handleSearch}>
//     <input type="text" />
//     </form>
// }

class App extends React.Component {
  state = {
    isLoaded: false
  }

  componentDidMount() {
    this.fetchWeather()
  }

  fetchWeather = (location = null) => {
    /* https://api.openweathermap.org/data/2.5/weather?lat=42.36&lon=-71.05&APPID=5e158b3eb258eaa205c563444bddb6e2 */
    
    const APIkey = '5e158b3eb258eaa205c563444bddb6e2';

    
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coords: position.coords
        })
        // console.log(this.state.coords);

        // let searchRequestURI = '';
        let geoRequestURI = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&APPID=${APIkey}&units=metric`;
           
      fetch(geoRequestURI)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              id: result.id,
              name: result.city.name,
              time: result.list[0].dt_txt,
              temperature: result.list[0].main.temp,
              summary: result.list[0].weather[0],
              wind: result.list[0].wind.speed
            });
            // console.log(this.state.summary)
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
    return (
      <div>
        <Navbar />
        {
          this.state.isLoaded ? <Forecast weather={this.state} /> : <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        }
        {/* <Search onSearch={this.fetchWeather} /> */}
      </div>
    )  
  }
}

export default App;
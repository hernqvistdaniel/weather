import React from 'react';

class Forecast extends React.Component {

  render() {
    const { error, isLoaded, temperature, time, summary, id, name } = this.props.weather;

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
            <strong>With a temperature of: </strong> {temperature} °C
            </li>
        </ul>
      );
    }
  }
}

export default Forecast;
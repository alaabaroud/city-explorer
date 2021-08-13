
import React from 'react'
import './App.css';

import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Weather from './Components/Weather';
import Movies from './Components/Movies'

class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        displayName : '',
        lon : '',
        lat : '',
        showMap: false,
        error : 'bad response',
        showError : false,
        
        weather: [],
        movies:[]
       
      }
    }

    getLocation = async(event) => {
        event.preventDefault();
        console.log(process.env.REACT_APP_SERVER_URL);
        let city = event.target.city.value;
        console.log(city);
    
        let URL= `https://us1.locationiq.com/v1/search.php?key=pk.b4047dd2b66352b18ad93e8d78889b18&q=${city}&format=json`
        
    
        try {
          let locResult = await axios.get(URL);
          this.setState({
            displayName : locResult.data[0].display_name,
            lon: locResult.data[0].lon,
            lat: locResult.data[0].lat,      
            showMap : true,
            
          })
    
    
          const urlServer = `${process.env.REACT_APP_SERVER_URL}/getWeather?lat=${this.state.lat}&lon=${this.state.lon}&cityName=${city}`
          let weatherResult = await axios.get(urlServer)
          this.setState({
            weather : weatherResult.data,
          
          })
          console.log(weatherResult, 'data from api')
    
    
          const urlMovies = `${process.env.REACT_APP_SERVER_URL}/movies?city=${city}`
          let moviesResult = await axios.get(urlMovies)
          this.setState({
            movies : moviesResult.data
          })
        }
    
    
      
        catch {
          this.setState({
            showMap : false,
            showerror : true,
          
          }
          )
        }
    
    
       }
    
    
      render() {
    
    
    
        return (
          <>
    
    <h1> City Explorer</h1>
          <Form onSubmit={this.getLocation}>
      <Form.Group>
        <Form.Label className='lable'>City Name</Form.Label>
        <Form.Control type="text" placeholder="Enter City" name='city'/>
      </Form.Group>
      <br>
      </br>
      <Button variant="primary" type="submit">
        Explore !
      </Button>
    </Form>
    <br>
    </br>
    <p> City Name :{this.state.displayName}</p>
    <p> Latitude: {this.state.lat} </p>
    <p> Longitude: {this.state.lon}</p>
    { 
            this.state.showMap &&
            <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}`} alt='map' />
          }
    
    
    
            <Weather weather={this.state.weather} ></Weather>
            <Movies  movies={this.state.movies} ></Movies>
           
          
    
    
           
            
    
           { 
           this.state.showerror && 
           this.state.error 
           }
    
            
          </>
    
    
    
    
    
        )
      }
    }
    
    
    
    export default App;
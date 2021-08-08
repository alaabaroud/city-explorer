import React from "react" ;
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Movies from "./components/Movies";
// import Weather from './components/Weather'

import './index.css';

import "bootstrap/dist/css/bootstrap.min.css";



class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      displayName : '',
      lon : '',
      lat : '',
      showMap: false,
      errorMsg : 'bad response',
      displayErr : false,
      weather : [],

      movie:[]
    }
  }

  getLocation = async (event) =>{
    event.preventDefault();
    let cityName = event.target.city.value;
    console.log(cityName);
    let URL= `https://eu1.locationiq.com/v1/search.php?key=pk.64b92780e3495103586ceb0307468a21&q=${cityName}&format=json`


    try {
    let Results = await axios.get (URL);
    // console.log(Results.data[0].display_name);
    this.setState({
      displayName : Results.data[0].display_name,
      lon: Results.data[0].lon,
      lat: Results.data[0].lat,
      showMap : true,
    })

    const WKey= process.env.WEATHER_API_KEY
    const WURL = `https://api.weatherbit.io/v2.0/forecast/minutely?city=${cityName}&key=${WKey}`
    let weatherResult = await axios.get(WURL)
    this.setState({
      weather : weatherResult.data,
    
    })
  
    // const mKey= process.env.MOVIE_API_KEY
  const mURL = `https://api.themoviedb.org/3/movie/550?api_key=4b557fce5a80bc4685790b5ceb6c8804&query=${cityName}`
  let moviesResult = await axios.get(mURL)
  this.setState({
    movie : moviesResult.data

    
  })
}

catch {
  this.setState({
    displayMap : false,
      displayErr : true
  })
}
}
  






render (){
  return(
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


{/* <Weather weather={this.state.weather} ></Weather> */}
<Movies  movie={this.state.movie} ></Movies>

       { 
       this.state.displayErr && 
       this.state.errorMsg 
       }
   </>
  );
      }
    }

export default App;
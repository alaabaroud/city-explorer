import React from "react" ;
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './index.css';


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      displayName : '',
      lon : '',
      lat : '',
      Results:'',
      searchQuery: '',
      showMap: false,
      errorMsg : 'bad response',
      displayErr : false,
      weather: []
    }
  }

  getLocation = async (event) =>{
    event.preventDefault();
    let cityName = event.target.city.value;
    console.log(cityName);
    let URL= `https://eu1.locationiq.com/v1/search.php?key=pk.64b92780e3495103586ceb0307468a21&q=${cityName}&format=json`
    try {
    let Results = await axios.get (URL);
    console.log(Results.data[0].display_name);
    this.setState({
      displayName : Results.data[0].display_name,
      lon: Results.data[0].lon,
      lat: Results.data[0].lat,
      showMap : true
    })
    this.getWeather(Results.data[0].lat, Results.data[0].lon)
  }
  catch {
    this.setState({
      displayMap : false,
        displayErr : true
    })
  }
  }

  getweather = async (lat, lon) =>{
  
      try{
        const weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather`, { params: {latitude: lat, longitude: lon, searchQuery: this.state.searchQuery}});
        this.setState({
          weather: weather.data
        })
      } catch(error){
        this.setState({
          displayMap: false,
          displayError: true,
          errorMessage: error.response.status + ': ' + error.response.data.error 
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

       { 
       this.state.displayErr && 
       this.state.errorMsg 
       }


       <p> weather={this.state.weather} </p>
   </>
  );
      }
    }

export default App;
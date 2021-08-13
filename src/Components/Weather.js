import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'



class Weather extends React.Component {

    render() {
        return (
            <> {
               this.props.weather.map(element => {
                  return (


  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Weather</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">daily weather</Card.Subtitle>
      <Card.Text>
      <p>
      {' '}
      {element.date}.{' '}
      </p>
      {element.description} 

      </Card.Text>
    
    </Card.Body>
  </Card>
 )
 })
 }


</>
)
}


}

export default Weather;
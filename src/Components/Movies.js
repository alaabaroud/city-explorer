import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Movies extends React.Component {

    render() {
        return (
        <>
          {
            this.props.movies.map(element => {
               return (
<Row xs={1} md={3} className="g-4" style={{ width: '1000px' ,margin:'50px',marginLeft:'150px',marginRight:'50px'}}>
  {Array.from({ length: 2 }).map((_, idx) => (
    <Col>
    
      <Card  style={{ width: '18rem' }}>
    <Card.Img variant="top" src={element.poster_path} />
    <Card.Body>
      <Card.Title> {element.title} </Card.Title>
      <Card.Text className="Card">
      {element.vote_average}
      <br>
      </br>
      {element.vote_count}
      <br>
      </br>
      {element.overview}
      <br>
      </br>
      {element.popularity}
      <br>
      </br>
      {element.release_date}
      </Card.Text>
    </Card.Body>
</Card>
    </Col>
  ))}
</Row>



 )
 })
 }


 </>
)
 }


}

export default Movies
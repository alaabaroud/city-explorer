import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';



class Movies extends React.Component {

    render() {
        return (
            <>
            {
                   
                   this.props.movie.map(element => {
                       return (
                       
                       
                       
                      <Row xs={1} md={3} className="g-4" style={{ width: '1000px' ,margin:'50px',marginLeft:'150px',marginRight:'50px'}}>
 {Array.from({ length: 2 }).map((_, idx) => (
   <Col>
     <Card>
       <Card.Img variant="top" src={element.poster_path}  style={{ border: 'groove', width: '200px' ,marginRight:'50px' ,}}/>
       <Card.Body>
         <Card.Title> {element.title}</Card.Title>
         <Card.Text>
            {element.vote_average}
         </Card.Text>
         <Card.Text>
           {element.vote_count}
         </Card.Text>
         <Card.Text>
             {element.overview} 
         </Card.Text>
          <Card.Text>
               {element.popularity}
         </Card.Text>
          <Card.Text>
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
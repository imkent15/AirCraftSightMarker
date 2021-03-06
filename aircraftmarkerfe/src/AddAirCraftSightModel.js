import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';
import {getCurrentDateAndTime} from './Utils';

export class AddAirCraftSightModel extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadedPhoto = this.handleUploadedPhoto.bind(this);
    }

    photoFileName = "default.jpg";

    refreshList() {
        fetch(process.env.REACT_APP_API + 'aircraftsights')
        .then(response=> response.json())
        .then(data=>{
            this.setState({sights:data});
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'aircraftsights', {
            method : 'POST',
            headers: {
                'accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Make : event.target.Make.value,
                Model : event.target.Model.value,
                Registration : event.target.Registration.value,
                Location : event.target.Location.value,
                DateAndTime : event.target.DateAndTime.value,
                PhotoFileName : this.photoFileName
            })
        })
        .then(res => res.json())
        .then((result)=> {
            alert(result);
            this.photoFileName = "default.jpg";
            this.props.onHide();
        },
        (error) => {
            alert('Failed');
        });
    }

    handleUploadedPhoto(event) {
        event.preventDefault();
        this.photoFileName = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'aircraftsights/saveimage', {
            method : 'POST',
            body : formData
        })
        .then(res => res.json())
        .then((result)=> {
            this.PhotoFileName = result;
            this.refreshList();
            this.render();
        },
        (error) => {
            alert('Upload Failed');
        });
    }


    render(){
        return(
           <div className="container">
               <Modal
               {...this.props}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
                   <Modal.Header closeButton>
                       <Modal.Title id="contained-modal-title-vcenter">
                           Add AirCraftSight
                       </Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <Row>
                           <Col sm={6}>
                               <Form onSubmit={this.handleSubmit}>
                                   <Form.Group controlId="Make">
                                       <Form.Label>Make</Form.Label>
                                       <Form.Control type="text" name="Make" required placeholder="Make"/>
                                   </Form.Group>
                                   <Form.Group controlId="Model">
                                       <Form.Label>Model</Form.Label>
                                       <Form.Control type="text" name="Model" required placeholder="Model"/>
                                   </Form.Group>
                                   <Form.Group controlId="Registration">
                                       <Form.Label>Registration</Form.Label>
                                       <Form.Control type="text" name="Registration" required placeholder="Registration"/>
                                   </Form.Group>
                                   <Form.Group controlId="Location">
                                       <Form.Label>Location</Form.Label>
                                       <Form.Control type="text" name="Location" required placeholder="Location"/>
                                   </Form.Group>
                                   <Form.Group controlId="DateAndTime">
                                       <Form.Label>DateAndTime</Form.Label>
                                       <Form.Control type="datetime-local" name="DateAndTime" required placeholder="DateAndTime" max={getCurrentDateAndTime()} />
                                   </Form.Group>
                                   <Form.Group>
                                       <Button variant="primary" type="submit">
                                           Add AirCraftSight
                                       </Button>
                                   </Form.Group>
                               </Form>
                           </Col>
                           <Col sm={6}>
                               <Image width="200px" height="200px" src ={process.env.REACT_APP_PHOTO_SRC + this.photoFileName} />
                               <input onChange={this.handleUploadedPhoto} type="File" />
                           </Col>
                       </Row>
                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="danger" onClick={this.props.onHide}>
                           Close
                       </Button>
                   </Modal.Footer>
               </Modal>
           </div> 
        )
    }
}
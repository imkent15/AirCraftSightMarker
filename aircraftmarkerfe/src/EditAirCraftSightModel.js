import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';
import {dotenv} from 'dotenv';
import {getCurrentDateAndTime} from './Utils';

export class EditAirCraftSightModel extends Component {

    photoFileName = "";
    photoFileSource = process.env.REACT_APP_PHOTO_SRC + this.photoFileName;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadedPhoto = this.handleUploadedPhoto.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.photoFileName === "")
        {
            this.photoFileName = this.props.photofilename;
        }

        fetch(process.env.REACT_APP_API + 'aircraftsights/' + this.props.visibleid, {
            method : 'PUT',
            headers: {
                'accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                VisibleID : event.target.VisibleID.value,
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
            this.photoFileName = result;
            this.photoFileSource = process.env.REACT_APP_PHOTO_SRC + result;
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
                           Edit AirCraftSight
                       </Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <Row>
                           <Col sm={6}>
                               <Form onSubmit={this.handleSubmit}>
                               <Form.Group controlId="VisibleID">
                                       <Form.Label>VisibleID</Form.Label>
                                       <Form.Control type="text" name="VisibleID" required placeholder="VisibleID" disabled defaultValue={this.props.visibleid}/>
                                   </Form.Group>
                                   <Form.Group controlId="Make">
                                       <Form.Label>Make</Form.Label>
                                       <Form.Control type="text" name="Make" required placeholder="Make" defaultValue={this.props.make}/>
                                   </Form.Group>
                                   <Form.Group controlId="Model">
                                       <Form.Label>Model</Form.Label>
                                       <Form.Control type="text" name="Model" required placeholder="Model" defaultValue={this.props.model}/>
                                   </Form.Group>
                                   <Form.Group controlId="Registration">
                                       <Form.Label>Registration</Form.Label>
                                       <Form.Control type="text" name="Registration" required placeholder="Registration" defaultValue={this.props.registration}/>
                                   </Form.Group>
                                   <Form.Group controlId="Location">
                                       <Form.Label>Location</Form.Label>
                                       <Form.Control type="text" name="Location" required placeholder="Location" defaultValue={this.props.location}/>
                                   </Form.Group>
                                   <Form.Group controlId="DateAndTime">
                                       <Form.Label>DateAndTime</Form.Label>
                                       <Form.Control type="datetime-local" name="DateAndTime" required placeholder="DateAndTime" defaultValue={this.props.dateandtime} max={getCurrentDateAndTime()}/>
                                   </Form.Group>
                                   <Form.Group>
                                       <Button variant="primary" type="submit">
                                           Edit AirCraftSight
                                       </Button>
                                   </Form.Group>
                               </Form>
                           </Col>
                           <Col sm={6}>
                               <Image width="200px" height="200px" src ={(this.photoFileName === "") ? (process.env.REACT_APP_PHOTO_SRC + this.props.photofilename) : (process.env.REACT_APP_PHOTO_SRC + this.photoFileName) } />
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
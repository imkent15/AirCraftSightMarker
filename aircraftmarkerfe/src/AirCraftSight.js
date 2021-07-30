import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddAirCraftSightModel} from './AddAirCraftSightModel'
import {EditAirCraftSightModel} from './EditAirCraftSightModel'

export class AirCraftSight extends Component {

    constructor(props) {
        super(props);
        this.state = {sights:[], addModelShow:false, editModelShow:false}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'aircraftsights')
        .then(response=> response.json())
        .then(data=>{
            this.setState({sights:data});
        });
    }

    componentDidMount () {
        this.refreshList();
    }

    componentDidUpdate () {
         this.refreshList();
    }

    deleteSight (visibleID) {
        if (window.confirm('Are you sure want to delete?')) {
            fetch(process.env.REACT_APP_API + 'aircraftsights/' + visibleID,{
                method:'DELETE',
                header:{'ACCEPT' : 'application/json', 'content-type' : 'application/json'}
            })
        }
    }

    render() {
        const {sights, visibleid, make, model, registration, location, dateandtime, photofilename} = this.state;
        let addModelHide= ()=> this.setState({addModelShow:false});
        let editModelHide= ()=> this.setState({editModelShow:false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>VisibleID</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Registration</th>
                            <th>Location</th>
                            <th>DateAndTime</th>
                            <th>PhotoFileName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sights.map(sight => 
                        <tr key={sight.VisibleID}>
                            <td>{sight.VisibleID}</td>
                            <td>{sight.Make}</td>
                            <td>{sight.Model}</td>
                            <td>{sight.Registration}</td>
                            <td>{sight.Location}</td>
                            <td>{sight.DateAndTime}</td>
                            <td>{sight.PhotoFileName} </td>
                            <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                    onClick = {()=>this.setState({editModelShow:true,
                                        visibleid:sight.VisibleID,
                                        make:sight.Make,
                                        model:sight.Model,
                                        registration:sight.Registration,
                                        location:sight.Location,
                                        dateandtime:sight.DateAndTime,
                                        photofilename:sight.PhotoFileName
                                    })}>
                                    Edit
                                </Button>
                                <EditAirCraftSightModel show={this.state.editModelShow} onHide={editModelHide}
                                    visibleid = {visibleid}
                                    photofilename = {photofilename}
                                    make = {make}
                                    model = {model}
                                    registration = {registration}
                                    location = {location}
                                    dateandtime = {dateandtime}
                                />
                                <Button className="mr-2" variant="danger"
                                    onClick = {()=>this.deleteSight(sight.VisibleID)}>
                                    Delete
                                </Button>
                            </ButtonToolbar>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick = {()=>this.setState({addModelShow:true})}>
                        AddAirCraftSight
                    </Button>
                    <AddAirCraftSightModel show={this.state.addModelShow} onHide={addModelHide}/>
                </ButtonToolbar> 
            </div>
        )
    }
}
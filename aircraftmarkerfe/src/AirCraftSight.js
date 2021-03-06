import React, {Component} from 'react';
import {AddAirCraftSightModel} from './AddAirCraftSightModel'
import {EditAirCraftSightModel} from './EditAirCraftSightModel'

import MaterialTable from 'material-table'

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
       // this.refreshList();
    }

    deleteSight (visibleID) {
        if (window.confirm('Are you sure want to delete?')) {
            fetch(process.env.REACT_APP_API + 'aircraftsights/' + visibleID,{
                method:'DELETE',
                header:{'ACCEPT' : 'application/json', 'content-type' : 'application/json'}
            })
        }

        this.refreshList();
    }
    
    render() {
        const {sights, visibleid, make, model, registration, location, dateandtime, photofilename} = this.state;
        const columns = [
            {title:"Visible ID", field:"VisibleID"},
            {title:"Make", field:"Make"},
            {title:"Model", field:"Model"},
            {title:"Registration", field:"Registration"},
            {title:"Location", field:"Location"},
            {title:"Date And Time", field:"DateAndTime"},
            {title:"Photo File Name", field:"PhotoFileName"}
        ]
        
        
        let addModelHide= ()=> this.setState({addModelShow:false}, this.refreshList());
        let editModelHide= ()=> this.setState({editModelShow:false}, this.refreshList());
        return (
            <div>
                <MaterialTable title="AirCraft Sights" data={sights} columns={columns} 
                options={
                    {
                        search:false,
                        filtering:true,
                        paging: false,
                        refreshList:false
                    } 
                }

                actions={[
                    rowData => ({
                        icon: 'edit',
                        tooltip: 'Edit Air Craft Sight',
                        onClick: (event, rowData) => {
                            this.setState({
                                visibleid:rowData.VisibleID,
                                make:rowData.Make,
                                model:rowData.Model,
                                registration:rowData.Registration,
                                location:rowData.Location,
                                dateandtime:rowData.DateAndTime,
                                photofilename:rowData.PhotoFileName
                                })
                            this.setState({editModelShow:true}) 
                        }
                    }), 

                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete Air Craft Sight',
                        onClick: (event, rowData) => {
                            this.deleteSight(rowData.VisibleID);
                        }
                    }),

                    {
                        icon: 'add',
                        tooltip: 'Add Air Craft Sight',
                        isFreeAction : true,
                        onClick: () => {
                            this.setState({addModelShow:true}) 
                        }
                    }


                ]}
                />
                <AddAirCraftSightModel show={this.state.addModelShow} onHide={addModelHide} />
                <EditAirCraftSightModel show={this.state.editModelShow} onHide={editModelHide}
                                    visibleid = {visibleid}
                                    make = {make}
                                    model = {model}
                                    registration = {registration}
                                    location = {location}
                                    dateandtime = {dateandtime}
                                    photofilename = {photofilename}
                />
            </div>
        )
    }
}
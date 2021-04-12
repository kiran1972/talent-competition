import React from 'react';
import Cookies from 'js-cookie';
import {Icon,Label, Segment,Popup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
         var cookies = Cookies.get('talentAuthToken');
        
        $.ajax({
            url: 'http://talentservicestalent.azurewebsites.net/listing/listing/closeJob',
           //url: 'http://localhost:51689/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            type: "post",
            data: JSON.stringify(id),
            success: function (res) {
                if (res.success == true) {
                    this.props.getEmployerJobsViaAjax();
                    TalentUtil.notification.show(res.message, "success", null, null)
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null)
                }
            }.bind(this)
        })
    }

    render() {
        var j = this.props.job;
        console.log("Value of Job");
        console.log(j);
        return(
        
            <Segment placeholder>
                <h2> {j.title}</h2>
                <Label as='a' color='black' className="user icon" ribbon='right'><Icon name='user' />{j.noOfSuggestions}</Label>
                {/* <a className="ui red right ribbon label">
                            <i className="user icon"></i>{j.noOfSuggestions}
                        </a> */}
                <h3 >{j.location.city + " , "+j.location.country}</h3>
                <h4>Summary</h4>
                {j.summary}
                <br></br>
                {moment(j.expiryDate) < moment() ?
                     <Label color='red' horizontal> Expired</Label>
                     : null}
                <Popup content='Close Job' trigger={<Label as='a' icon='ban' basic color='blue' onClick={() => this.selectJob(j.id)}><Icon name='ban' />Close</Label>}/>
                <Popup content='Edit Job' trigger={<Label as='a' basic color='blue'><Icon name='edit' />Edit</Label>}/>
                <Popup content='Copy Job' trigger={<Label as='a' basic color='blue'><Icon name='users' />Copy</Label>}/>
             </Segment>
             
        
    )
}
}
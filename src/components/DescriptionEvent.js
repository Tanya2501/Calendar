import React, {Component} from 'react';
import {connect} from 'react-redux';

export class DescriptionEvent extends Component {
    _onCloseDescription(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log(event.target.parent);
        let element = event.target.parentElement;
        element.classList.remove('displayDescriptionEvent');
    }
        
    render() {
        const event = this.props.data;
        const nameOfClass = this.props.dataClassName.classNameForDisplay || "none";
        const trainers = [];
        for (let i = 0; i < event['numberOfSpicker']; i ++ ) {
            trainers.push(event['trainer'+i]);
        }
        console.log(trainers);
        let Speakers = trainers.map((item, index) => {
            return (
                <div key = {"speaker" + index} className = {`speakers`}>
                    <img src = {item['avatar']} width = '100px' height = '100px' />
                    <div><span> {item['name']}</span></div>
                </div>
            )
        })

        return (
            <div className = {nameOfClass}>
                <span className = {`closeIcon`} onClick = {this._onCloseDescription}>+</span>
                <div>
                    <span>Date/Time:</span> {event.formattedDateTime}
                </div>
                <div>
                    <span>Duration:</span> ~{Math.round(event.duration / 3600000)}
                </div>
                <div>
                    <span>Type:</span> {event.type}
                </div>
                <div>
                    <span>Title:</span> {event.title}
                </div>
                <div> 
                    <span>Description:</span> {event.description}
                </div>
                <div>
                    <span>Location:</span> {event.location}
                </div>
                <div>
                    <div><span>Spickers:</span></div>
                    {Speakers}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
            calendar: state.calendar,
            events: state.events,
            trainers: state.trainers,
            descriptionEvent: state.descriptionEvent
    })
)(DescriptionEvent);

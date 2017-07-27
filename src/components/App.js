import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import Calendar from './Calendar.js';
import {getEvents} from "../actions/events";
import {getTrainers} from '../actions/trainers';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Calendar {...this.props}/>
			</div>
		);
	}
}

export default connect(
    state => ({
        calendar: state.calendar,
        events: state.events,
        descriptionEvent: state.descriptionEvent
    }),
    dispatch => ({
        onGetEvents: () => {
            dispatch({type: "TOGGLE_CALENDAR_SPINNER", payload: true})
            Promise.all([
                dispatch(getEvents()),
                dispatch(getTrainers())
            ]).then(() => {
                dispatch({type: "TOGGLE_CALENDAR_SPINNER", payload: false})
            });
        },
        onGetTrainers: () => {
             dispatch(getTrainers());
        }
    }) 
)(App);
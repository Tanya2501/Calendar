import React from "react";
import {calendarNavToday, calendarNavPrev, calendarNavNext, calendarSelectDay} from "../actions/calendar";
import {connect} from "react-redux";

export class NavBar extends React.Component {
	constuctor() {
	    this._onToday = this._onToday.bind(this);
	    this._onPrevMonth = this._onPrevMonth.bind(this);
	    this._onNextMonth = this._onNextMonth.bind(this);
	}

	_onToday(event) {
	    event.stopPropagation();
	    event.preventDefault();
	    this.props.dispatch(calendarNavToday());
  	}

  	_onPrevMonth(event) {
	    event.stopPropagation();
	    event.preventDefault();
	    this.props.dispatch(calendarNavPrev());
  	}
  
  	_onNextMonth(event) {
	    event.stopPropagation();
	    event.preventDefault();
	    this.props.dispatch(calendarNavNext());
  	}

	render() {
		let nowShowing = new Date(this.props.calendar.year, this.props.calendar.month, 1);
		let options = {year: 'numeric', month: 'long'};
		return (
			<div className="month-nav-bar">
				<label className="month-nav text-left col-md-2">
				    {nowShowing.toLocaleString("en-US", options)}
				</label>
				<div className="col-md-10 text-right text-uppercase">
		            <button type="button" className="btn btn-default" onClick={this._onPrevMonth}>
		              	<span>Prev</span>
		            </button>
		            <button className="btn btn-default" onClick={this._onToday}>Today</button>
		            <button className="btn btn-default" onClick={this._onNextMonth}>
		              	<span>Next</span>
		            </button>
		        </div>
			</div>
		)
	}
}

export default connect(
    state => ({
            calendar: state.calendar,
    })
)(NavBar);
 
import React from "react";
import {calendarNavToday, calendarNavPrev, calendarNavNext, calendarSelectDay} from "../actions/calendar";
import {getEvents} from "../actions/events";
import {getTrainers} from "../actions/trainers";
import {openDescriptionWindow} from "../actions/descriptionEvent";
import {connect} from "react-redux";
import {DescriptionEvent} from "./DescriptionEvent.js";

export class Calendar extends React.Component {
	constructor() {
	    super();
	    this._onToday = this._onToday.bind(this);
	    this._onPrevMonth = this._onPrevMonth.bind(this);
	    this._onNextMonth = this._onNextMonth.bind(this);
	    this._onDisplayDescription = this._onDisplayDescription.bind(this);
	    this.eventsArray = [];
	    let now = new Date();
	    this.now = {
		    year: now.getFullYear(),
		    month: now.getMonth(),
		    day: now.getDate()
	    }
	}
    componentWillMount() {  
	    this.props.onGetEvents();
	    this.props.onGetTrainers()
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
 
  	_onDisplayDescription(event) {
	    event.stopPropagation();
	    event.preventDefault();
	    let element = event.target.children[0];
	    element.classList.add('displayDescriptionEvent');
	}

	render() {
    let dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let daysInMonth = 32 - (new Date(this.props.calendar.year, this.props.calendar.month, 32)).getDate();
    let currentFistDay = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    let currentLastDay = new Date(this.props.calendar.year, this.props.calendar.month + 1, 0);
    let prevMonthLast = new Date(this.props.calendar.year, this.props.calendar.month, 0);
    let prevMonthLastDay = prevMonthLast.getDate();
    this.firstDayOfMonth = currentFistDay.getDay(); 
    this.lastDayOfMonth = currentLastDay.getDate();
    let monthArray = [];
    let arrayDays = [];
    let firstEvent = {};
    let secondEvent = {};
    let numberRow = Math.ceil((daysInMonth + this.firstDayOfMonth - 1)/7)*7 - this.firstDayOfMonth + 2;
    let numberOfRows = numberRow/7;
    for (let i = this.firstDayOfMonth===0?-5:2-this.firstDayOfMonth; i < numberRow; i++) {
        arrayDays.push(i);
    }
    let trainers = this.props.trainers;
    let trainersLength = trainers.length;
    let arr = this.props.events;
    let arrStart = []; 
    arr.map(item => {
        arrStart.push(item['start'].slice(0,10));
    })
    const arrStartLength = arrStart.length;

    function addSpeakersToEvent(arraySpeakers, event) {
        arraySpeakers.forEach((speaker, number) => {
            trainers.forEach(item => { 
                if (item['id'] === speaker) {
                      event['trainer'+number] = item;
                }
            })
        })
    }

    let numberDays = arrayDays.map((item, index) => {
		let monthEvent = this.props.calendar.month + 1;
		let yearEvent = this.props.calendar.year;
		let month = "current ";
		let dateInCalendar = [];
		let haveEvent = "noEvent ";
		let typeEvent = '';
		let selectedClass =  this.props.calendar.thisMonthSelected && (this.props.calendar.selected.day == this.dayOfMonth) ? " selected" : "";
		let todayClass = this.props.calendar.thisMonthNow && (this.now.day == item) ? " today" : "";
		if (item > daysInMonth) {
            item = item - daysInMonth;
            month = "nextMonth ";
            monthEvent += 1;
            if (monthEvent > 12) {
             	monthEvent = 1;
              	yearEvent += 1;
            }
        }
        else if (item < 1) {
            item = prevMonthLastDay + item;
            month = "prevMonth ";
            monthEvent -= 1;
            if (monthEvent < 1) {
              	monthEvent = 12;
              	yearEvent -= 1;
            }
        }
        dateInCalendar.push(yearEvent);
        monthEvent < 10?monthEvent="0"+monthEvent:monthEvent;
        dateInCalendar.push(monthEvent);
        item < 10?dateInCalendar.push("0" + item):dateInCalendar.push(item);
        let fullDate = dateInCalendar.join('-');
        for (let i = 0; i < arrStartLength; i ++) {
            if (arrStart[i] === fullDate) {
              	haveEvent = "yesEvent ";
              	typeEvent = arr[i]["type"];
              	let arrSpeakers = arr[i]['speakers'];
                addSpeakersToEvent(arrSpeakers, arr[i]);
              	arr[i]['numberOfSpicker'] = arrSpeakers.length;
              	firstEvent = arr[i];
                for (let j = i + 1; j < arrStartLength; j ++) {
                  	if (arrStart[j] === fullDate) {
                      let arrSpeakers = arr[j]['speakers'];
                      addSpeakersToEvent(arrSpeakers, arr[j]);
                      arr[j]['numberOfSpicker'] = arrSpeakers.length;
	                    secondEvent = arr[j];
                      console.log(secondEvent);
	              		typeEvent += " " + arr[j]["type"];
	              		break;
            		}
          		}
            	break;
        	}
        	haveEvent = "noEvents ";
        }

        let arrayEvents = typeEvent.split(' ');
            return (    
                <div key = {"nameOfDay" + item + month} className = {`nameOfDay text-left ${month} ${haveEvent} ${selectedClass} ${todayClass}`}> 
                    <div className = {`day`}>{item}</div>
                    <div key = {this.props.events.id} className = {`firstEvent ${arrayEvents[0]} `} onClick={this._onDisplayDescription}>
                    	{arrayEvents[0]}
                    	<DescriptionEvent data = {firstEvent} dataClassName = {this.props.descriptionEvent.classNameForDisplay}  />  
                  	</div>      
                  	<div key = {"eventSecond" + typeEvent} className = {`secondEvent ${arrayEvents[1]}`} onClick={this._onDisplayDescription}>
	                    {arrayEvents[1]}
	                    <DescriptionEvent data = {secondEvent} dataClassName = {this.props.descriptionEvent.classNameForDisplay}  />
                  	</div>                                     
                </div>
            )  
        })

    	let nameOfDay = dayOfWeek.map(item => {
          	return (
            	<div key = {"nameOfDay" + item} className={'nameOfDay '}> 
                	{item}
            	</div>
          	)
        })

      let nowShowing = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    	let daysInMonthes = 32 - new Date(this.props.calendar.year, this.props.calendar.month, 32).getDate();
    	let options = {year: 'numeric', month: 'long'};

    	return (
      		<div className="month">
      			{this.props.events.fetching?<p>Loading...</p>:<p></p>}
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
        		<div className="container">
        			<div className="row">
          				{nameOfDay}
        			</div>
        			<div className="container">
           				{numberDays}
        			</div>
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
)(Calendar);
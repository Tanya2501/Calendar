import React from "react";
import {connect} from "react-redux";
import {DescriptionEvent} from "./DescriptionEvent.js";
import {openDescriptionWindow} from "../actions/descriptionEvent";
import {Calendar} from "./Calendar.js"

export class NumberDays extends Calendar {
	constuctor() {
		super();
		this._onDisplayDescription = this._onDisplayDescription.bind(this);
	}

	_onDisplayDescription(event) {
	    event.stopPropagation();
	    event.preventDefault(); 
	    let element = event.target.children[0];
	    element.classList.add('displayDescriptionEvent');
	}

	render() {

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
              arr[i]['numberOfSpicker'] = arrSpeakers.length;
             arrSpeakers.forEach((speaker, number) => {
             trainers.forEach(item => { 
                if (item['id'] === speaker) {
                arr[i]['trainer'+number] = item;
                }
              })
             })
              firstEvent = arr[i];

               console.log(arr[i]);

                for (let j = i + 1; j < arrStartLength; j ++) {
                  if (arrStart[j] === fullDate) {
                    secondEvent = arr[j];
              typeEvent += " " + arr[j]["type"];
              break;
            }
          }
              break;
            }
            haveEvent = "noEvents ";
          }
          /*arrStart.map(item => {
          
            item===fullDate?haveEvent = "yesEvent ":haveEvent = "noEvents ";
          })*/
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

		}	
}

let day_of_week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let now = new Date();
console.log(now);
let currentDay = now.getDay();
console.log(currentDay);
let currentMonth = now.getMonth();
console.log(currentMonth);
let currentYear = now.getFullYear();
console.log(currentYear);
let currentMonthNumber = (new Date().getMonth()) +1;
console.log(currentMonthNumber);
let daysInMonth = function() {
    return 32 - new Date(Number(currentYear), currentMonthNumber, 32).getDate();
};

let firstDay = new Date(Number(currentYear), currentMonth, 1).getDay();
console.log(firstDay);

let App = React.createClass({
	render: function() {
		return (
			<div className="app сontainer text-center">
				<h2>Timetable of lectures and tasks</h2>
				<TaskOnWeek />
				<Manage />
				<TableName data = {day_of_week} />  
                <TableDays data = {daysInMonth()} />                                
			</div>
		);
	}
});

let TaskOnWeek = React.createClass({
	render: function() {
		return (
			<h3 className="taskOnWeek">
				This week, you need to attend N lectures and take M tasks
			</h3>
		);
	}
});

let Manage = React.createClass({
    render: function() {
        return (
            <div className="container">
                <CurrentMonth />
            </div>
        );
    }
});

let CurrentMonth = React.createClass({
    getInitialState: function() {
        return {
            currentMonth: {currentMonth},
            year: {currentYear}
        }
    },
    onChangeHandler: function(e) {
        e.preventDefault();
        this.setState({currentMonth: --currentMonth });
        console.log(currentMonth);
    },
    render: function() {
        return (
            <div>
                <div className="col-lg-8 text-left">
                    {months[currentMonth]} {currentYear} 
                </div> 
                <ButtonManage
                    onClick={this.onChangeHandler}
                />  
            </div>  
        );
    }
});

let ButtonManage = React.createClass({
    render: function() {
        return (
            <div className="col-lg-4 text-right">
                <ButtonPrev />
                <ButtonToday />
                <ButtonNext />
            </div>
        );
    }
});


let ButtonPrev = React.createClass({
    getInitialState: function() {
        return {
            month: currentMonth
        }
    },
    changePrevMonth: function(e) {
        e.preventDefault();
        this.setState({month: --currentMonth });
        console.log(currentMonth);
    },
   
    render: function() {
        return (
            <button type="button" onClick={this.changePrevMonth} className="btn btn-info">
                <span className="glyphicon glyphicon-arrow-left"/>
            </button>
        );
    }
});

let ButtonToday = React.createClass({
    getInitialState: function() {
        return {
            disabled: true
        };
    },
	render: function() {
        let disabled = this.state.disabled;
		return (
			<button type="button" className="btn btn-default">
                Today
            </button>
		);
	}
});

let ButtonNext = React.createClass({
    getInitialState: function() {
        return {
            month: currentMonth
        }
    },
    changeNextMonth: function(e) {
        e.preventDefault();
        this.setState({month: ++currentMonth });
        console.log(currentMonth);
    },
    render: function() {
        return (
            <button type="button" onClick={this.changeNextMonth} className="btn btn-info">
                <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
            </button>
        );
    }
});

let TableName = React.createClass({
	render: function() {
        let data = this.props.data;
        let nameOfDay = data.map(function(item, index){
            return (
                <div key = {index} className='nameOfDay text-center'>{item}</div>
            )
        })
        return (
            <div className="container">
                {nameOfDay}
            </div>
        )	
	}
});

let TableDays = React.createClass({
    render: function() {
        let arrayDays = [];
        let data = this.props.data;
        let numberRow = Math.ceil((data + firstDay - 1)/7)*7 - firstDay + 2;
        console.log(numberRow);
        for (let i = 2-firstDay; i < numberRow; i++) {
           arrayDays.push(i);
        }
        let numberDays = arrayDays.map(function(item, index){
            return (
                <div key = {index} className={'nameOfDay ' + 'text-left ' + (item<=data?'':'noneDays ') + (item>0?'':'noneDays')}> 
                {item}
                </div>
            )  
        })
        return (
            <div className="container">
                {numberDays}
            </div>
        )   
    }
});




ReactDOM.render(
	<App />,
	document.getElementById('root')
);

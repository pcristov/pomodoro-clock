import React, {Component} from 'react';
import './Pomodoro.css';

export default class Pomodoro extends Component {

	constructor(props) {
	    super(props)
	    
	    this.state = {
			breakLength: 50,
			sessionLength: 25
	    }
	    
	    this.addToExpression = this.addToExpression.bind(this);
	    this.breakIncrement = this.breakIncrement.bind(this);
	    this.breakDecrement = this.breakDecrement.bind(this);
	    this.sessionIncrement = this.sessionIncrement.bind(this);
	    this.sessionDecrement = this.sessionDecrement.bind(this);
	    this.reset = this.reset.bind(this);
	}
	
	addToExpression(e) {
		let input = e.target.innerHTML;
	}
	
	breakIncrement() {
		this.setState(prevState => ({
			breakLength: (prevState.breakLength < 60) ? prevState.breakLength + 1 : 60
		}))
	}
	
	breakDecrement() {
		this.setState(prevState => ({
			breakLength: (prevState.breakLength > 1) ? prevState.breakLength - 1 : 1
	    }))
	}
	
	sessionIncrement() {
		this.setState(prevState => ({
			sessionLength: (prevState.sessionLength < 60) ? prevState.sessionLength + 1 : 60
		}))
	}
	
	sessionDecrement() {
		this.setState(prevState => ({
			sessionLength: (prevState.sessionLength > 1) ? prevState.sessionLength - 1 : 1
	    }))
	}
	
	reset() {
		this.setState({
			breakLength: 5,
			sessionLength: 25
	    });
	}
	
	render() {
		return (
			<div className="container" id="container">
				<div className="title"><h3>Pomodoro Clock</h3></div>
				
				<div className="break-label" id="break-label">Break</div>
				<div className="session-label" id="session-label">Session</div>
				
				<div className="break-decrement" id="break-decrement" onClick={ this.breakDecrement }><i className="material-icons">remove_circle</i></div>
				<div className="break-length" id="break-length">{ this.state.breakLength }</div>
				<div className="break-increment" id="break-increment" onClick={ this.breakIncrement }><i className="material-icons">add_circle</i></div>
				
				<div className="session-decrement" id="session-decrement" onClick={ this.sessionDecrement }><i className="material-icons">remove_circle</i></div>
				<div className="session-length" id="session-length">{ this.state.sessionLength }</div>
				<div className="session-increment" id="session-increment" onClick={ this.sessionIncrement }><i className="material-icons">add_circle</i></div>
				
				<div className="timer-label" id="timer-label">Session</div>
				<div className="time-left" id="time-left">-</div>
				
				<div className="start_stop" id="start_stop" onClick={ this.start }>
					<i className="material-icons">play_arrow</i>
					<i className="material-icons">pause</i>
				</div>
				<div className="reset" id="reset" onClick={ this.reset }>
					<i className="material-icons">refresh</i>
				</div>
			</div>
	)}
}
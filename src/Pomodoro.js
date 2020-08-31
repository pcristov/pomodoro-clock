import React, {Component} from 'react';
import './Pomodoro.css';

export default class Pomodoro extends Component {

	constructor(props) {
	    super(props)
	    
	    this.state = {

	    }
	    
	    this.addToExpression = this.addToExpression.bind(this);
	    this.reset = this.reset.bind(this);
	}
	
	addToExpression(e) {
		let input = e.target.innerHTML;
	}
	
	reset() {
		this.setState({
			
	    });
	}
	
	render() {
		return (
			<div className="container" id="container">
				<div className="title"><h3>Pomodoro Clock</h3></div>
				
				<div className="break-label" id="break-label">Break</div>
				<div className="session-label" id="session-label">Session</div>
				
				<div className="break-increment" id="break-increment" onClick={ this.reset }>
					<i class="material-icons">add_circle</i>	
				</div>
				<div className="break-length" id="break-length">time</div>
				<div className="break-decrement" id="break-decrement" onClick={ this.reset }>
					<i class="material-icons">remove_circle</i>
				</div>
				
				<div className="session-increment" id="session-increment" onClick={ this.reset }>
					<i class="material-icons">add_circle</i>
				</div>
				<div className="timer-label" id="timer-label">Session</div>
				<div className="time-left" id="time-left">-</div>
				<div className="session-decrement" id="session-decrement" onClick={ this.reset }>
					<i class="material-icons">remove_circle</i>
				</div>
				
				<div className="session" id="session">session</div>
				
				<div className="start_stop" id="start_stop" onClick={ this.start }>
					<i class="material-icons">play_arrow</i>
					<i class="material-icons">pause</i>
				</div>
				<div className="reset" id="reset" onClick={ this.reset }>
					<i class="material-icons">refresh</i>
				</div>
			</div>
	)}
}
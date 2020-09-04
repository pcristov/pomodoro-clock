import React, {Component} from 'react';
import './Pomodoro.css';

let interval;
const TYPE = ['Break', 'Session'];
const BREAK = 0;
const SESSION = 1;
const AUDIO_URL = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"

export default class Pomodoro extends Component {

	constructor(props) {
	    super(props)
	    
	    this.state = {
			breakLength: 1,
			sessionLength: 1,
			minutes: 0,
			seconds: 1,
			pause: 1,
			type: TYPE[SESSION]
	    }
	
	    this.breakIncrement = this.breakIncrement.bind(this);
	    this.breakDecrement = this.breakDecrement.bind(this);
	    this.sessionIncrement = this.sessionIncrement.bind(this);
	    this.sessionDecrement = this.sessionDecrement.bind(this);
	    this.start = this.start.bind(this);
	    this.reset = this.reset.bind(this);
	}
	    
	audio = new Audio(AUDIO_URL)
	
	breakIncrement() {
		this.setState(prevState => ({
			breakLength: (prevState.breakLength < 60) ? prevState.breakLength + 1 : 60
		}), () => {
	        this.setState({
	            minutes: this.state.breakLength,
	            seconds: 0
	        })
	    })
	}
	
	breakDecrement() {
		this.setState(prevState => ({
			breakLength: (prevState.breakLength > 1) ? prevState.breakLength - 1 : 1
		}), () => {
	        this.setState({
	            minutes: this.state.breakLength,
	            seconds: 0
	        })
	    })
	}
	
	sessionIncrement() {
		this.setState(prevState => ({
			sessionLength: (prevState.sessionLength < 60) ? prevState.sessionLength + 1 : 60
		}), () => {
	        this.setState({
	            minutes: this.state.sessionLength,
	            seconds: 0
	        })
	    })
	}
	
	sessionDecrement() {
		this.setState(prevState => ({
			sessionLength: (prevState.sessionLength > 1) ? prevState.sessionLength - 1 : 1
		}), () => {
	        this.setState({
	            minutes: this.state.sessionLength,
	            seconds: 0
	        })
	    })
	}
	
	start(isCycle = 1) {
		this.setState({
			pause: isCycle === 1 ? 0 : !this.state.pause
		}, () => {
			if(this.state.pause) {
				clearInterval(interval)
			}
			else
			{
				interval = setInterval(() => {
					const minutes = this.state.minutes;
					const seconds = this.state.seconds;
					
				    if(seconds > 0) {
				      this.setState({
				        seconds: seconds - 1
				      })
				    }
				    
				    if(seconds === 0) {
				      if(minutes === 0) {
				        this.setState({
					        type: this.state.type === TYPE[BREAK] ? TYPE[SESSION] : TYPE[BREAK],
					        minutes: this.state.type === TYPE[SESSION] ? this.state.sessionLength : this.state.breakLength,
					        seconds: 0
				        },
				        	() => {
					        	this.audio.play();
					        	clearInterval(interval);
					        	this.start(1);
					    	}
					    )
				      } else {
				        this.setState({
				          minutes: minutes - 1,
				          seconds: 59
				        })
				      }
				    }
				}, 1000)
			}
		})
	}
	
	reset() {
		this.setState({
			breakLength: 5,
			sessionLength: 25,
			minutes: 25,
			seconds: 0,
			pause: 1,
			type: TYPE[SESSION]
	    }, () => {
			clearInterval(interval)
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
				
				<div className="timer-label" id="timer-label">{ this.state.type }</div>
				<div className="time-left" id="time-left">{ this.state.minutes }:{ this.state.seconds < 10 ? `0${ this.state.seconds }` : this.state.seconds }</div>
				
				<div className="start_stop" id="start_stop" onClick={ this.start }>
					<i className="material-icons">play_arrow</i>
					<i className="material-icons">pause</i>
				</div>
				<div className="reset" id="reset" onClick={ this.reset }>
					<i className="material-icons">refresh</i>
				</div>
				<audio id="beep" src={ AUDIO_URL }></audio>
			</div>
	)}
}
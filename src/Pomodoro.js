import React, {Component} from 'react';
import './Pomodoro.css';

let interval;
const TYPE_TEXT = ['Break', 'Session'];
const BREAK = 0;
const SESSION = 1;
const BREAK_LENGTH = 5;
const SESSION_LENGTH = 25;
const INCREMENT = 1;
const DECREMENT = 0;
const AUDIO_URL = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";
const AUDIO = new Audio(AUDIO_URL);

export default class Pomodoro extends Component {

	constructor(props) {
	    super(props)
	    
	    this.state = {
			breakLength: BREAK_LENGTH,
			sessionLength: SESSION_LENGTH,
			minutes: SESSION_LENGTH,
			seconds: 0,
			pause: 1,
			type: SESSION
	    }

	    this.update = this.update.bind(this);
	    this.start = this.start.bind(this);
	    this.reset = this.reset.bind(this);
	}
	
	update(e) {
		const operation = parseInt(e.currentTarget.dataset.operation);	// 1 (increment) or 0 (decrement)
		const type =  parseInt(e.currentTarget.dataset.type);	// 1 (session) or 0 (break)
		const typeText =  TYPE_TEXT[type].toLowerCase();	// session or break
		const lengthKey = `${ typeText }Length`;	//sessionLength or breakLength
		
		if(this.state.pause) {
			this.setState(prevState => ({
				[`${ lengthKey }`]: operation === INCREMENT ? prevState[`${ lengthKey }`] < 60 ? prevState[`${ lengthKey }`] + 1 : 60 : prevState[`${ lengthKey }`] > 1 ? prevState[`${ lengthKey }`] - 1 : 1
			}), () => {
				if(this.state.type === type) {
			        this.setState({
			            minutes: this.state[`${ lengthKey }`],
			            seconds: 0
			        })
		        }
		    })
	    }
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
					        type: this.state.type === SESSION ? BREAK : SESSION,
					        minutes: this.state.type === SESSION ? this.state.sessionLength : this.state.breakLength,
					        seconds: 0
				        },
				        	() => {
					        	AUDIO.play();
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
			breakLength: BREAK_LENGTH,
			sessionLength: SESSION_LENGTH,
			minutes: SESSION_LENGTH,
			seconds: 0,
			pause: 1,
			type: SESSION
	    }, () => {
		    AUDIO.pause();	// stop sound
		    AUDIO.currentTime = 0;	// rewound
			clearInterval(interval)
	    });
	}
	
	render() {
		return (
			<div className="container" id="container">
				<div className="title"><h3>Pomodoro Clock</h3></div>
				
				<div className="break-label" id="break-label">Break Length</div>
				<div className="session-label" id="session-label">Session Length</div>
				
				<div className="break-decrement" id="break-decrement" onClick={ this.update } data-type={ BREAK } data-operation={ DECREMENT }><i className="material-icons">remove_circle</i></div>
				<div className="break-length" id="break-length">{ this.state.breakLength }</div>
				<div className="break-increment" id="break-increment" onClick={ this.update } data-type={ BREAK } data-operation={ INCREMENT }><i className="material-icons">add_circle</i></div>
				
				<div className="session-decrement" id="session-decrement" onClick={ this.update } data-type={ SESSION } data-operation={ DECREMENT }><i className="material-icons">remove_circle</i></div>
				<div className="session-length" id="session-length">{ this.state.sessionLength }</div>
				<div className="session-increment" id="session-increment" onClick={ this.update } data-type={ SESSION } data-operation={ INCREMENT }><i className="material-icons">add_circle</i></div>
				
				<div className="timer-label" id="timer-label">{ TYPE_TEXT[this.state.type] }</div>
				<div className="time-left" id="time-left" dangerouslySetInnerHTML={{__html: this.state.minutes + ':' + (this.state.seconds < 10 ? `0${ this.state.seconds }` : this.state.seconds) }}></div>
				
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
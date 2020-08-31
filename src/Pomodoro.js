import React, {Component} from 'react';
import './Pomodoro.css';

export default class Pomodoro extends Component {

	constructor(props) {
	    super(props)
	    
	    this.state = {
		    expression: "",
		    display: "0",
		    decimal: 0
	    }
	    
	    this.addToExpression = this.addToExpression.bind(this);
	    this.equals = this.equals.bind(this);
	    this.clear = this.clear.bind(this);
	}
	
	addToExpression(e) {
		const expression = this.state.expression;
		const operations = ['+', '-', '/', '*'];
		const operationsExceptSubtraction = ['+', '/', '*'];
		let input = e.target.innerHTML;

		// if operation is multiply, convert input to the 'eval' ready asterisk
		if(input === 'x') { input = '*' }
		
		// if input is decimal point
		if(input === '.') {
			// if user previously started entering a decimal number, do nothing
			if(this.state.decimal)	{
				return ;
			}
			else {
				this.setState(prevState => ({
					decimal: 1,	// set decimal flag to true
					expression: expression.concat(input),	// concat input to expression
					display: typeof(Number(prevState.display)) === "number" ? prevState.display + input : "0" + input // update display
		    	}));
		    	
		    	return;
		 	}
		}
		
		// if input is an arithmetic operation and currently there's a decimal number in the display
		if(operations.includes(input) && this.state.decimal) {
			this.setState(prevState => ({
				decimal: 0,	// set decimal flag to false
				expression: expression.concat(input),
				display: input
	    	}));
	    	
	    	return;
		}
		
		// if input is an arithmetic operation except subtraction and expression is empty ( === 0)
		if(operationsExceptSubtraction.includes(input) && expression.length === 0) {
			return ;	// do nothing
		}
		
		// if input is an arithmetic operation
		if(operations.includes(input)) {
			if(operations.includes(expression[expression.length - 1])) {	// if previous input was an operation
				if(operations.includes(expression[expression.length - 2])) {	// if before previous input was also an operation
					this.setState({
						expression: expression.slice(0, -2) + input,	// replace last two operations with newly pressed operation
						display: input
				    });
				    
				    return ;
				}
				
				if(input === "-") {	// if current input was the minus sign
					if(expression[expression.length - 1] !== "-") {	// if previous input was not a minus
						this.setState({
							expression: expression + input,	// concat minus sign to current expression
							display: input	// update display
					    });
					    
					    return ;
					}
					else {	// otherwise do nothing
						return ;
					}
				}
				else {	// if current input was not the minus sign
					this.setState({
						expression: expression.slice(0, -1) + input,	// replace last operation with new input
						display: input	// update display
				    });
				    
				    return ;	
				}
			}
			else {	// if previous input was not an operation
				this.setState({
					expression: expression.concat(input),	// concat input to expression
					display: input	// update display
			    });
			    
			    return ;
			}
		}
		
		if(this.state.display === "0") {	// deal with current display showing 0
			if(input === "0") {
				return ;
			}
			else {
				this.setState({
					expression: expression.concat(input),
					display: input
			    });
			}
			
			return ;
		}
		else {
			if(!operations.includes(this.state.display)) {	// if display currently shows anything but an operation
				this.setState(prevState => ({
					expression: expression.concat(input),	// concat input to expression
					display: prevState.display + input	// update display
			    }));
			    
			    return ;
		    }
		    else {
				this.setState({
					expression: expression.concat(input),
					display: input
			    });
			    
			    return ;
			    
		    }
	    }
	}
	
	equals() {
		const expression = this.state.expression;
		
		this.setState({
			display: eval(expression).toString()
	    }, () => this.setState({ expression: this.state.display.toString() }));
	}
	
	clear() {
		this.setState({
		    expression: "",
		    display: "0",
		    decimal: 0
	    });
	}
	
	render() {
		return (
			<div className="wrapper" id="wrapper">
				<div className="title">Pomodoro Clock</div>
				
				<div className="break-label" id="break-label" onClick={ this.clear }>Break Length</div>
				<div className="session-label" id="session-label" onClick={ this.clear }>Session Length</div>
				
				<div className="up-break" id="up-break" onClick={ this.addToExpression }>up</div>
				<div className="time-break" id="time-break" onClick={ this.addToExpression }>time</div>
				<div className="down-break" id="down-break" onClick={ this.addToExpression }>down</div>
				
				<div className="up-session" id="up-session" onClick={ this.addToExpression }>up</div>
				<div className="time-session" id="time-session" onClick={ this.addToExpression }>time</div>
				<div className="down-session" id="down-session" onClick={ this.addToExpression }>down</div>
				
				<div className="session" id="ession" onClick={ this.addToExpression }>session</div>
				
				<div className="start-pause" id="start-pause" onClick={ this.addToExpression }>start/pause</div>
				<div className="reset" id="reset" onClick={ this.addToExpression }>reset</div>
			</div>
	)}
}
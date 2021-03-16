import { PureComponent } from 'react';
import * as axios from 'axios';

export class Form extends PureComponent {
    constructor() {
        super();
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state;
    }
    state = {
        fromNumber: '',
        toNumber: '',
        fromNumberValid: false,
        toNumberValid: false,
        formValid: false,
        isSubmitted: false,
        timer: 5,
    };
    validateField(fieldName, value) {
        let fromNumberValid = this.state.fromNumberValid;
        let toNumberValid = this.state.toNumberValid;
        if (fieldName === 'fromNumber') fromNumberValid = value.length > 0 ? true : false;
        else if (fieldName === 'toNumber') toNumberValid = value.length > 0 ? true : false;
        this.setState(
            {
                fromNumberValid: fromNumberValid,
                toNumberValid: toNumberValid,
            },
            this.validateForm
        );
    }

    validateForm() {
        this.setState({
            formValid: this.state.fromNumberValid && this.state.toNumberValid,
        });
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    async sendFormData() {
        const formData = {
            toNumber: this.state.toNumber,
            fromNumber: this.state.fromNumber,
            timer: this.state.timer,
        };
        console.log(formData);
        const response = await axios.post('https://e64c73c69799.ngrok.io/call', formData);
        // setTimeout(() => {
        //     this.setState({
        //         message: 'Invitation sent. Thank you, ' + this.refs.firstname.value,
        //     });
        // }, 2000);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isSubmitted: true,
        });
        this.sendFormData();
    }
    handleTimer(event) {
        this.setState({
            timer: event.target.value,
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='number-input'>
                        <label>Enter your number:</label>
                        <input
                            className='form-control'
                            id='fromNumber'
                            type='text'
                            name='fromNumber'
                            ref='fromNumber'
                            value={this.state.fromNumber}
                            onChange={this.handleUserInput}
                            onBlur={this.handleUserInput}
                            placeholder='Enter number without +'
                        />
                    </div>
                    <div className='number-input'>
                        <label>Enter recepeint number:</label>
                        <input
                            className='form-control'
                            id='toNumber'
                            type='text'
                            name='toNumber'
                            ref='toNumber'
                            value={this.state.toNumber}
                            onChange={this.handleUserInput}
                            onBlur={this.handleUserInput}
                            placeholder='Enter number without +'
                        />
                    </div>
                    <div className='timer-input' onChange={this.handleTimer.bind(this)}>
                        <label>Choose call duration in minutes:</label>
                        <input className='form-control' id='callDuration' type='radio' name='callDuration' ref='callDuration' value={5} /> 5
                        mins
                        <input
                            className='form-control'
                            id='callDuration'
                            type='radio'
                            name='callDuration'
                            ref='callDuration'
                            value={10}
                        />{' '}
                        10 mins
                        <input
                            className='form-control'
                            id='callDuration'
                            type='radio'
                            name='callDuration'
                            ref='callDuration'
                            value={15}
                        />{' '}
                        15 mins
                    </div>
                    <div className='form-group'>
                        <button disabled={!this.state.formValid} onClick={this.handleSubmit} className='btn btn-primary mt-3'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

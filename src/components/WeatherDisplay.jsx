import React from 'react';

import './WeatherDisplay.css';

export default class WeatherDisplay extends React.Component {
    static propTypes = {
        masking: React.PropTypes.bool,
        group: React.PropTypes.string,
        description: React.PropTypes.string,
        temp: React.PropTypes.number,
        unit: React.PropTypes.string
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
                <img src={`images/w-${this.props.group}.png`}/>
                <p className='description'>{this.props.description}</p>&nbsp;
                <h1 className='temp'>
                    <span className='display-3'>{this.props.temp.toFixed(0)}&ordm;</span>
                    &nbsp;{(this.props.unit === 'metric')
                        ? 'C'
                        : 'F'}
                </h1>
            </div>
        );
    }
}

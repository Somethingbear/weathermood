import React from 'react';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import {getForecast} from 'api/open-weather-map.js';
import {getLocalForecast} from 'api/open-weather-map.js';

import './Forecast.css';

export default class Forecast extends React.Component {
    static propTypes = {
        masking: React.PropTypes.bool,
        group: React.PropTypes.string,
        description: React.PropTypes.string,
        temp: React.PropTypes.number,
        unit: React.PropTypes.string
    };

    static getInitWeatherState() {
        let newArr = new Array(5);

        for (var i = 0; i < 5; i++) {
                newArr[i] = {
                    city: "N/A",
                    dayOfWeek: "N/A",
                    temp: NaN,
                    date: "N/A",
                    code: -1,
                    group: 'na',
                    description: "N/A"
                };
            }

        return {
            forecastList: newArr,
        }

    }

    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInitWeatherState(),
            coords: {
                lat: 0,
                lng: 0
            },
            map: undefined,
            loading: false,
            masking: false
        };

        this.handleFormQuery = this.handleFormQuery.bind(this);

    }

    componentDidMount() {
        
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                this.setState(
                    {
                        coords: {
                            lat: lat,
                            lng: lng
                        },
                        map: new google.maps.Map(
                            document.getElementById('map'), 
                            {
                                center: {lat: lat, lng: lng},
                                zoom: 8
                            }
                        ),
                    },
                    ()=>{
                        this.getLocalForecast(this.state.coords.lat, this.state.coords.lng, 'metric');
                    }
                )
            },
            (err)=>{
                console.warn('ERROR(' + err.code + '): ' + err.message);
                this.getForecast('Hsinchu', 'metric');
            },
            {
                enableHighAccuracy: false,
                maximumAge: 0
            }
        );

    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelWeather();
        }
    }

    render() {
        return (
            <div>
                <div id="map"></div>
                <div className={`forecast weather-bg ${this.state.forecastList[0].group}`}>
                    <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                        <WeatherDisplay masking={this.state.masking}
                                        group={this.state.forecastList[0].group}
                                        temp={this.state.forecastList[0].temp}
                                        description={this.state.forecastList[0].description}
                                        unit={this.props.unit}/>
                        <WeatherTable forecastInfo={this.state.forecastList} masking={this.state.masking}/>
                        <WeatherForm city={this.state.forecastList[0].city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                    </div>
                </div>
            </div>
        );
    }

    getForecast(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit).then(forecastInfo => {
                this.setState({
                    ...forecastInfo,
                    loading: false,
                    masking: false
                }, () => this.notifyUnitChange(unit));
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({
                    ...Forecast.getInitWeatherState(unit),
                    loading: false
                }, () => this.notifyUnitChange(unit));
            });
        });

        this.maskInterval = setInterval(() => {
            clearInterval(this.maskInterval);
            this.setState({
                masking: false
            });
        }, 600);
    }

    getLocalForecast(lat, lng, unit) {
        this.setState({
            loading: true,
            masking: true,
        }, () => {
            getLocalForecast(lat, lng, unit).then(localForecastInfo => {
                this.setState({
                    ...localForecastInfo,
                    loading: false,
                    masking: false
                }, () => this.notifyUnitChange(unit));
            }).catch(err => {
                console.error('Error getting local forecast', err);

                this.setState({
                    ...Forecast.getInitWeatherState(unit),
                    loading: false
                }, () => this.notifyUnitChange(unit));
            });
        });

        this.maskInterval = setInterval(() => {
            clearInterval(this.maskInterval);
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.getForecast(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }
}

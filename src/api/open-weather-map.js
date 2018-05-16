import axios from 'axios';

// TODO replace the key with yours
const key = 'f05b758245d3b170eb51c779d103da4d';
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}`;

export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

export function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}

let weatherSource = axios.CancelToken.source();

export function getWeather(city, unit) {
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making forecast request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return {
                city: capitalize(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                description: res.data.weather[0].description,
                temp: res.data.main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Request canceled');
}

export function getForecast(city, unit) {
    var url = `${forecastUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${forecastUrl}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.list === undefined) {
            throw new Error(res.data.message);
        } else {
            let rawList = forecastData.list;
            let forecastList = new Array(5);
            console.log(rawList);
            
            for (var i = 0 ; i < 6 ; i++) {
                let dayIndex = i * 8 - 1;
                let day = new Date(rawList[dayIndex].dt *1000)
                let dayOfWeek;

                switch (day.getDay()) {
                    case 0:
                        dayOfWeek = 'SUN';
                        break;
                    case 1:
                        dayOfWeek = 'MON';
                        break;
                    case 2:
                        dayOfWeek = 'TUE';
                        break;
                    case 3:
                        dayOfWeek = 'WED';
                        break;
                    case 4:
                        dayOfWeek = 'THU';
                        break;
                    case 5:
                        dayOfWeek = 'FRI';
                        break;
                    case 6:
                        dayOfWeek = 'SAT';
                        break;
                }

                forecastList[i]={
                    city: capitalize(city),
                    dayOfWeek: dayOfWeek,
                    code: rawList[dayIndex].weather[0].id,
                    group: getWeatherGroup(rawList[dayIndex].weather[0].id),
                    description: rawList[dayIndex].weather[0].description,
                    temp: rawList[dayIndex].main.temp,
                    unit: unit
                }
            }

            return {
                forecastList
            };

        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelForecast() {
    weatherSource.cancel('Request canceled');
}

 Lab5 Assignment - React Weather Forecast

## Grading
There are 40 data in the 5 day / 3 hour api (index 0 ~ 39) <br/>
Here we define： <br/>
First day : list[0] ~ list[7] <br/>
Second day : list[8] ~ list[15]<br/>
...<br/>
Fifth day : list[32] ~list [39]<br/>
You can use one of the data to represent that day.<br/>
<br/>
Or, you can use 16 day / daily forecast data.<br/>
First day : list[0]<br/>
Second day : list[1]<br/>
...<br/>
Fifth day : list[4]<br/>

If you are not using OpenWeatherMap API to get weather data, you will get 0 points.<br/>

1.  (20%) Present weather of the first day on top of the weather table correctly.
2.  Present weather of the second to the fifth day in the weather table component (total 60%)
  - (10%) Using icon from http://websygen.github.io/owfont/
  - (20%) Display weekdays (Mon, Tue, Wed, ...) correctly.
  - (30%) Display temperature correctly.
3. (20%) Responsive : Show only the second to the third day in the weather table component on portrait mobile devices.

## Bonus:
1. (30%) Show weather info using user's current geo-coordinates.
2. (60%) Display forecast data in a modal (dialog window) or on the map directly using pin to query.
3. (10%) Can pin to query on the same page repeatedly.
(You can implement a button to dismiss forecast data of the pinned location.)

## Submission
Open a new merge request to your branch when you finished your homework. <br />
**DEADLINE**: 2018/04/19 23:59 <br />

<b>Note</b>: When you open merge request, `Title` should be : std{your ID} Submission

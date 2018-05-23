import React from 'react';
import { 
    Container,
    Row,
    Col
    } from 'reactstrap';
import './WeatherTable.css';
import './owfont-regular.css';

export default class WeatherTable extends React.Component {
    static propTypes = {
        city: React.PropTypes.string,
        unit: React.PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render(){
        return(
            <Container className={`weather-table text-center ${this.props.masking ? 'masking' : ''}`}>
                    <Row className='names'>
                        <Col>WEEK</Col>
                        <Col>DATE</Col>
                        <Col>WEATHER</Col>
                        <Col>TEMPERATURE</Col>
                    </Row>
                {
                    this.props.forecastInfo.map(
                        (item,index)=>{
                            return(
                                <Row key={index}>
                                    <Col scope="row">{item.dayOfWeek}</Col>
                                    <Col>{item.date}</Col>
                                    <Col>{item.description}<i className={`owf owf-${item.code}`}></i></Col>
                                    <Col>{item.temp.toFixed(0)}&ordm;&nbsp;
                                        {(item.unit === 'metric') ? 'C' : 'F'}
                                    </Col>
                                </Row>
                            )
                        }
                    )
                }
            </Container>
        );
    }



}
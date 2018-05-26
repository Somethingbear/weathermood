import React from 'react';
import { 
    Container,
    Row,
    Col
    } from 'reactstrap';
import './WeatherTable.css';
import './owfont-regular.css';

export default function WeatherTable(props) {

    
    return(
        <Container className={`weather-table text-center ${props.masking ? 'masking' : ''}`}>
                <Row className='names'>
                    <Col>WEEK</Col>
                    <Col>DATE</Col>
                    <Col>WEATHER</Col>
                    <Col>TEMPERATURE</Col>
                </Row>
                {
                    props.forecastInfo.map(
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
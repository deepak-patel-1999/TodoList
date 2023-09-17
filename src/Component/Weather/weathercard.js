import React, { useEffect, useState } from 'react'

const Weathercard = ({ tempInfo }) => {
    const [weatherState, setWeatherState] = useState("")
    const { temp, humidity, pressure, weathermood, name, speed, country, sunset } = tempInfo;

    useEffect(() => {
    })

    const chooseIcon = {
        Clouds: "wi-day-cloudy",
        Haze: "wi-fog",
        Clear: "wi-day-sunny",
        Mist: "wi-dust"
    }[weathermood]

    // if (weathermood) {
    //     switch (weathermood) {
    //         case "Clouds":
    //             setWeatherState("wi-day-cloudy");
    //             break;

    //         case "Haze":
    //             setWeatherState("wi-fog");
    //             break;

    //         case "Clear":
    //             setWeatherState("wi-day-sunny");
    //             break;

    //             case "Mist":
    //             setWeatherState("wi-dust");
    //             break;


    //         default:
    //             setWeatherState("wi-day-sunny");
    //             break;
    //     }
    // }


    // converting sunset timing (given in seconds) to human readable format
    let sec = sunset; // we have got sunset timing in seconds from API
    let date = new Date(sec * 1000); //we converted it into miliseconds
    let timeStr = `${date.getHours()}:${date.getMinutes()}`; // then we extracted exact hour and minute from it
    return (
        <>
            {/* our temp card */}
            <article className='widget'>
                <div className='weatherIcon'>
                    <i className={`wi ${chooseIcon}`}></i>
                </div>
                <div className='weatherInfo'>
                    <div className='temperature'>
                        <span>{temp}°C</span>
                    </div>
                    <div className='description'>
                        <div className='weatherCondition'>{weathermood}</div>
                        <div className='place'>{name}, {country}</div>
                    </div>
                </div>

                <div className='date'>{new Date().toLocaleString()}</div>


                {/* column section */}
                <div className='extra-temp'>
                    <div className='temp-info-minmax'>
                        <div className='two-sided-section'>
                            <p><i className={'wi wi-sunset'}></i></p>
                            <p className='extra-info-leftside'>
                                {timeStr} <br />
                                Sunset
                            </p>
                        </div>

                        <div className='two-sided-section'>
                            <p><i className={'wi wi-humidity'}></i></p>
                            <p className='extra-info-leftside'>
                                {humidity} <br />
                                Humidity
                            </p>
                        </div>
                    </div>

                    <div className='weather-extra-info'>
                        <div className='two-sided-section'>
                            <p><i className={'wi wi-rain'}></i></p>
                            <p className='extra-info-leftside'>
                                {pressure} <br />
                                Pressure
                            </p>
                        </div>

                        <div className='two-sided-section'>
                            <p><i className={'wi wi-strong-wind'}></i></p>
                            <p className='extra-info-leftside'>
                                {speed} <br />
                                Speed
                            </p>
                        </div>

                    </div>
                </div>
            </article>
        </>
    )
}

export default Weathercard

import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { city } from './CityInput';
import axios from 'axios'

function CityWeather() {

    const navigate = useNavigate();

    const navigateToInput = () => {
        navigate('/');
    };

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {

        axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`)
        .then((response) => {
            setWeatherData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const getDay = (i) => {
        let weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';        
        return weekday[((new Date().getDay())+i+1)%7];
      };

    const getdata = () => {
        let j = 0
        let data = new Array(4)
        while (!((weatherData.list[j].dt_txt).includes('12:00:00'))) {
            j++;
        }
        data = [j, j+8, j+16, j+24]
        const weatherdata = data.map((index) => weatherData.list[index])
       return weatherdata
    }

    return (
        <div className="CityWeather">
            <div className="bg-[url('./images/background.jpg')] grid h-screen bg-auto bg-left place-items-center items-start">
                <div className="shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)] h-4/5 w-3/4 rounded-3xl shadow-slate-400 grid place-items-center mt-7">

                    {weatherData ? (
                        <div className='grid place-items-center'>
                            <div className='grid grid-cols-2 place-items-center h-4/5 m-0'>
                                
                                <img src={require(`./images/${weatherData.list[0].weather[0].icon}.png`)} alt="Weather Icon" className='h-4/6 col-span-1'/>
                                <div className='col-span-1'>
                                    <h3 className='text-xl'>Today</h3>
                                    <h1 className='text-4xl font-serif font-extrabold'>{city}</h1>
                                    <h3 className='text-2xl'>Temperature: {Math.round((weatherData.list[0].main.temp)-273.15)}°C</h3>
                                    <h3 className='text-2xl'>{weatherData.list[0].weather[0].description}</h3>
                                    <button className='grid place-items-center bg-sky-800 text-white col-span-2 py-0.5 px-2 mt-2 rounded-xl'
                                     onClick={navigateToInput}>
                                     Change city
                                    </button>
                                </div>
                            </div>
                            <div className='grid-cols-4 flex space-x-5 space-y-0'>
                                {getdata().map((item,index) => (
                                    <div className='shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)] h-44 w-44 rounded-[45px] shadow-slate-400 grid place-items-center'>
                                        <div className='grid place-items-center'>
                                            <p className='text-xl font-bold'>{getDay(index)}</p>
                                            <img src={require(`./images/${item.weather[0].icon}.png`)} alt="Weather Icon" className='h-24 col-span-1'/>
                                            <p className='text-xl'>{Math.round((item.main.temp)-273.15)}°C</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>{navigateToInput()}</>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CityWeather;
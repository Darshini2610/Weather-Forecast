import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import weatherlogo from './images/02d.png';

var city = ''

function App() {

  const [City, setCity] = useState('');

  const navigate = useNavigate();

  const navigateToCity = () => {
    navigate('/CityWeather');
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
        city = City;
        navigateToCity();
    }
  };

  return (
    <div className="App">
      <div className="bg-[url('./images/background.jpg')] grid h-screen bg-auto bg-left place-items-center">
        <div className="shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)] h-4/5 w-3/4 rounded-3xl shadow-slate-400 grid place-items-center">
          <div className='w-4/5 h-full grid grid-cols-5 grid-rows-5 place-items-center'>
            <img src={weatherlogo} alt='weather' className='h-5/6 col-span-2 row-span-3'/>
            <h1 className='text-5xl font-serif font-extrabold col-span-3 text-sky-950 row-span-3'>Weather Forecast</h1>
            <input
              id = 'Input'
              className='w-2/3 h-10 rounded-3xl col-span-full self-start border-t-2 border-l-2 border-sky-950 p-5'
              placeholder='Enter a City . .'
              onChange={handleCityChange}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
  
  export {city};
  export default App;
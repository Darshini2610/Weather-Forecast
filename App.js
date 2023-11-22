import React from "react";
import { Routes, Route } from 'react-router-dom'
import CityInput from "./CityInput";
import CityWeather from "./CityWeather";

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<CityInput />} />
        <Route path = '/CityWeather' element={<CityWeather />} />
      </Routes>
    </div>
  );
}

export default App;
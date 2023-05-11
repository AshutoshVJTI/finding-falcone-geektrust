import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './component/master/header/header';
import Footer from './component/master/footer/footer';
import Falconehideout from './component/falconeKinghideout/falconehideout';
import Planet from './component/Planet/planet';
import Home from './component/Home/home';
import './App.css'

function App() {

  const [body, setBody] = useState({})

  const getAllData = (planet, vehicle, totalDistance, totalSpeed, token) => {
    setBody({
      token,
      planet_names: planet,
      vehicle_names: vehicle,
      totalDistance,
      totalSpeed
    })

    localStorage.setItem('body', JSON.stringify(
      {
        token,
        planet_names: planet,
        vehicle_names: vehicle,
        totalDistance,
        totalSpeed
      }
    ))

  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Planet getAllData={getAllData} />} />
        <Route exact path="/falconehideout" element={<Falconehideout body={body} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

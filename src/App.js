import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './component/master/header/header';
import Footer from './component/master/footer/footer';
import Falconehideout from './component/falconeKinghideout/falconehideout';
import Planet from './component/Planet/planet';

import './App.css';
import Home from './component/Home/home';

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

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/dashboard">
          <Planet getAllData={getAllData} />
        </Route>
        <Route exact path="/falconehideout">
          <Falconehideout body={body} />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;

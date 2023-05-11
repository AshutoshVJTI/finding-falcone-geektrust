import React, { useState, useEffect } from 'react'
import useFetch from '../../customHooks/useFetch'
import Card from '../shared/card/card'
import './planet.css'
import Modal from '../shared/modal/modal'


const Planet = (props) => {


    // TODO:: FINDING_FALCONE_MODULE_PLANETS

    /*
        * Make API call to fetch planet list and store it in the planets variable.
        * 
        * @returns { Array.Planets }
        * 
        * API endpoint : "GET /planets"
        * 
    */

    const [planets] = useFetch(`${process.env.REACT_APP_API}/planets`, 'GET')


    const [selectedPlanets, setSelectedPlanets] = useState({})
    const [counter, setCounter] = useState(0)
    const [totalDistance, setTotalDistance] = useState(0)
    const [disabled, setdisabled] = useState(true)


    /*
        * Function to add or remove the selected planets from the object

        Accepts  - name - @string - Name of the selected planet
        Accepts  - distance - @number - Distance of the selected planet

        Returns - void
    */

    const addRemovePlanets = (name, distance) => {

        if (!selectedPlanets[name]) {
            setSelectedPlanets((prevState) => ({
                ...prevState,
                [name]: distance
            }))
            setTotalDistance(parseInt(totalDistance) + parseInt(distance))
            setCounter(counter + 1)

        } else {
            delete selectedPlanets[name]
            setSelectedPlanets((prevState) => ({
                ...prevState
            }))
            setTotalDistance(parseInt(totalDistance) - parseInt(distance))
            setCounter(counter - 1)
        }
    }

    useEffect(() => {
        if (counter === 4) {
            setdisabled(false)
        } else {
            setdisabled(true)
        }
    }, [counter])


    return (
        <div className='container mb-4'>
            <div className='row justify-content-around'>


                {
                    planets.map((planet) => {
                        return (
                            <div className='col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 mt-5' key={planet.name}>
                                <Card
                                    name={planet.name}
                                    distance={planet.distance}
                                    addRemovePlanets={addRemovePlanets}
                                    selectedPlanets={selectedPlanets}
                                    counter={counter}
                                />


                            </div>
                        )
                    })
                }


            </div>

            <Modal
                disabled={disabled}
                totalDistance={totalDistance}
                getAllData={props.getAllData}
                selectedPlanets={selectedPlanets}
            />

        </div>
    )
}

export default Planet;
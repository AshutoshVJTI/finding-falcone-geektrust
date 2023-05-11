import { useEffect, useState } from 'react'
import useFetch from '../../../customHooks/useFetch'
import Counter from '../counter/counter'
import './modal.css'
import { useHistory } from 'react-router-dom'
import { $ } from 'react-jquery-plugin'
import { useSnackbar } from 'notistack'

const Modal = (props) => {



    // TODO:: FINDING_FALCONE_MODULE_VEHICLES

    /*
        * Make API call to fetch vehicles list and store it in the vehicles variable.
        * 
        * @returns { Array.Vehicles }
        * 
        * API endpoint : "GET /vehicles"
        * 
    */

    const [vehicles] = useFetch(`${process.env.REACT_APP_API}/vehicles`)
    const [shipData, setShipData] = useState({})
    const [vehicle_names, setvehicle_names] = useState([])
    const [shipCapacityDistance, setshipCapacityDistance] = useState(0)
    const [totalSpeed, settotalSpeed] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [token] = useFetch(`${process.env.REACT_APP_API}/token`, 'POST')
    const { enqueueSnackbar } = useSnackbar()

    const history = useHistory()

    /*
        * Snackbar is used to show error message in a pop up faishon
     *  Accepts - msg - @string - Message to be displayed
     *  Accepts -  Variant - @string - color of the snackbar
     * 
     *  returns  - @void
     */

    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    /**
     * Increase the ship data , get selected vehicle name , get total speed 
     * @param {number}  qty  -  number of ships remaining
     * @param {string} name  - name of the ship
     * @param {number} distance - distance covered by the ship
     * @param {number} speed    - speed of the ship
     */
    const incrementCounter = (qty, name, distance, speed) => {
        if (shipData[name] === qty)
            return;

        if (vehicle_names.length === 4) {
            showSnackBar('Cannot select more than 4 vehicle', 'error')
            return;
        }


        if (shipData[name]) {

            setShipData((prevState) => ({
                ...prevState,
                [name]: shipData[name] + 1
            }))
        } else {
            setShipData((prevState) => ({
                ...prevState,
                [name]: 1
            }))
        }
        setvehicle_names([
            ...vehicle_names,
            name
        ])

        let shipCapacityDistanceCalculated = shipCapacityDistance + distance

        setshipCapacityDistance(shipCapacityDistanceCalculated)
        settotalSpeed(totalSpeed + speed)

    }

    /**
     * Decreases the ship data , get selected vehicle name , get total speed 
     * @param {string} name  - name of the ship
     * @param {number} distance - distance covered by the ship
     * @param {number} speed    - speed of the ship
  */

    const decrementCounter = (name, distance, speed) => {
        if (shipData[name] === 0)
            return;

        if (shipData[name]) {

            setShipData((prevState) => ({
                ...prevState,
                [name]: shipData[name] - 1
            }))
            const index = vehicle_names.indexOf(name)
            vehicle_names.splice(index, 1)
            setvehicle_names([...vehicle_names])
        }


        setshipCapacityDistance(shipCapacityDistance - distance)
        settotalSpeed(totalSpeed - speed)
    }

    useEffect(() => {
        if (vehicle_names.length === 4) {
            setDisabled(false)
        }

    }, [vehicle_names])

    /**
     * 
     * Function that will start searching for the hidden queen
     */
    const startJourney = (event) => {
        props.getAllData(
            Object.keys(props.selectedPlanets),
            vehicle_names,
            props.totalDistance,
            totalSpeed,
            token.token
        )

        $("#vehicleModal").modal('hide')
        history.push('/falconehideout')
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12 col-12 mt-5 mb-5 next-step'>
                    <button className={`btn ${props.disabled ? 'disabled' : 'actived'}`}
                        disabled={props.disabled ? true : false}
                        data-bs-toggle="modal" data-bs-target="#vehicleModal"
                    >
                        Select 4 Planets
                        <span>
                            <i className="fa-solid fa-shuttle-space"></i>
                        </span>
                    </button>
                </div>
            </div>

            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="vehicleModal" tabIndex="-1" aria-labelledby="vehicleModal" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">
                                Select Vehicles To Start Your Journey
                            </h1>
                        </div>
                        <div className="modal-body">
                            <h4 className='text-center'>
                                Total Distance Remaining : {props.totalDistance}
                            </h4>

                            <div className='row'>
                                {
                                    vehicles.map((vehicle) => {
                                        return (
                                            <div className='col-lg-3 mb-3 mt-3' key={vehicle.name}>

                                                <Counter
                                                    name={vehicle.name}
                                                    qty={vehicle.total_no}
                                                    max_distance={vehicle.max_distance}
                                                    speed={vehicle.speed}
                                                    shipData={shipData}
                                                    incrementCounter={incrementCounter}
                                                    decrementCounter={decrementCounter}
                                                />
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div className='container centeredButton next-step'>

                                <button className={`btn ${disabled ? 'disabled' : 'actived'}`}
                                    disabled={disabled ? true : false}

                                    onClick={startJourney}
                                >
                                    {
                                        disabled ? 'Select 4 Vehicle' : 'Start Journey'
                                    }
                                    <span>
                                        <i className="fa-solid fa-shuttle-space"></i>
                                    </span>
                                </button>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal
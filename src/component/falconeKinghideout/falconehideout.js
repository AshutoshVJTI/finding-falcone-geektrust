import { useEffect, useState } from "react"
import axios from "axios"
import { useSnackbar } from "notistack"

import './falconehideout.css'
const Falconehideout = (props) => {


    const { enqueueSnackbar } = useSnackbar()

    const [success, setSuccess] = useState(false)
    const [planet, setPlanet] = useState('')
    const [time, setTime] = useState()


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
             * Checks for the hideout of the queen by making API call to the server
             * 
     */

    const checkForHideout = () => {

        const body = JSON.parse(localStorage.getItem('body'))

        const options = {
            url: `${process.env.REACT_APP_API}/find`,
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
                token: body.token,
                planet_names: body.planet_names,
                vehicle_names: body.vehicle_names
            }
        }

        axios(options)
            .then((data) => {

                if (data.status === "success") {
                    setSuccess(true)
                    setPlanet(data.planet_name)
                    let time = Math.floor(body.totalDistance / body.totalSpeed)
                    setTime(time)
                } else {
                    setSuccess(false)
                }

            }).catch((err) => {
                showSnackBar(err.response.data, 'error')
            })
    }

    useEffect(() => {
        checkForHideout()
    }, [])

    return (
        <div className="container mt-5" id="outcome">
            {
                success &&
                <div>

                    <h5 className="success">
                        Congratulation of finding the Falcone King
                        <span>
                            <i class="fa-regular fa-face-smile fa-2x"></i>
                        </span>
                    </h5>

                    <h6 className="success text-center">
                        Found on Planet : {planet}
                    </h6>

                    <h6 className="success text-center">
                        Time Taken : {time}
                    </h6>
                </div>
            }
            {
                !success && <h5 className="failure">
                    You didn't thought it was going to be this easy catching the Queen of Falicornia
                    <span> <i className="fa-solid fa-face-sad-tear fa-2x"></i></span>
                </h5>
            }
        </div>
    )
}

export default Falconehideout
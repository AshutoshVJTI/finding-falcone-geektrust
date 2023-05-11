import { useState, useEffect } from "react"
import axios from "axios"
import { useSnackbar } from "notistack"

const useFetch = (url, method) => {

    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);

    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    const fetchData = () => {
        let options = {
            url,
            method: 'GET'
        }
        if (method === 'POST') {
            options.method = 'POST'
            options.headers = {
                'Accept': 'application/json'
            }
        }
        try {
            axios(options)
                // .then((res) => res.json())
                .then((data) => setData(data.data))
                .catch((err) => {
                    showSnackBar('Cannot connect to backend', 'error')
                })
        } catch (err) {
            showSnackBar('Something went wrong. Please try again', 'error')
        }
    }

    useEffect(() => {
        fetchData()
    }, [url, method])

    return [data]

}

export default useFetch
import './card.css'

/*
    * Card functional component accepts the followiing parameters
    *
    * Note-  Format used is
    * [prop name] - [prop data type] - [prop description]
    *
    * name      - @string  - Name of the planet
    * distance - @string - Distance to the planet
    * addRemovePlanets - @function - Function to add or remove planet from array
    * selectedPlanets  - @object = Stores the list of planet selected
    * counter - @integer - count of total planets selected
*/

const Card = (props) => {

    /*
        * Function to add a planet to the @selectedPlanets object
        
        Accepts - event @object
        Passes - planet name and distance
        Returns - void
    */

    const selectPlanet = (event) => {
        const name = event.target.name.split(';')
        props.addRemovePlanets(name[0], name[1])
    }

    /*
        * Function to check if a card is not present in the @selectedPlanets object
        
        Accepts - value @string
        Returns - boolean
    */

    const checkIfDisabled = (value) => {
        let result = !props.selectedPlanets[value] && props.counter === 4 ? true : false
        return result
    }



    return (
        <div className="card">
            <div className={`image-container ${checkIfDisabled(props.name) ? 'disabled' : ''}`}>
                <img src={`${process.env.REACT_APP_ASSETS_URL}/animated_planet.png`} className="card-img-top" alt={props.name} />
            </div>
            <div className="card-body">
                <h5 className="text-center">{props.name}</h5>
                <p className="text-center">Distance - {props.distance}</p>

                <div className='d-flex justify-content-center'>
                    <button onClick={selectPlanet}
                        name={props.name + ';' + props.distance}

                        className={`btn themebtn ${props.selectedPlanets[props.name] ? 'selected' : ''} `}

                        disabled={checkIfDisabled(props.name)}
                    >
                        {
                            !props.selectedPlanets[props.name] ? 'Select Planet' : 'Planet Selected'
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
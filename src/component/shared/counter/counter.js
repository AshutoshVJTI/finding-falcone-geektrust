import './counter.css'

const Counter = (props) => {

    const totalRemaining = (qty, name) => {
        if (props.shipData[name])
            return qty - props.shipData[name]
        else
            return qty
    }

    return (
        <div className="card">
            <div className="img-container">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/space-ship.png`} alt={props.name} />
            </div>

            <div className="card-body">
                <h5 className="text-center">{props.name}</h5>
                <h5 className="text-center">Total Remaining : {
                    totalRemaining(props.qty, props.name)
                }
                </h5>

                <div className='d-flex justify-content-around mt-3' >
                    <p className="text-left">Distance : {props.max_distance}</p>
                    <p className="text-right">Speed : {props.speed}</p>
                </div>
            </div>

            <div className="card-footer container justify-content-center mb-3">
                <div className="input-group mb-3">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => props.incrementCounter(props.qty, props.name, props.max_distance, props.speed)}
                    >
                        +
                    </button>

                    <input
                        type="text"
                        disabled={true}
                        className="form-control"
                        placeholder=""
                        aria-label="Example text with two button addons"
                        value={!props.shipData[props.name] ? 0 : props.shipData[props.name]
                        }
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => props.decrementCounter(props.name, props.max_distance, props.speed)}
                    >
                        -
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Counter
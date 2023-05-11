import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">

                    <h5 className="mt-5 mb-5">
                        Welcome Soldier
                    </h5>

                    <p className="text-justify">
                        We all are gathered here to join our forces and locate the one and only
                        <span className='text-danger'>
                            Queen of Falicornia
                        </span>
                        so that we can send her to exile for next
                        <span className='text-danger'>
                            15 years
                        </span>
                        .
                    </p>

                    <div className="next-step">
                        <Link to='/dashboard'
                            className="btn themebtn"
                        >
                            Let's get started !!!
                            <span>
                                <i className="fa-solid fa-shuttle-space"></i>
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
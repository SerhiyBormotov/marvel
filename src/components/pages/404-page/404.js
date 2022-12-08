import Error from "../../error/Error";
import {useNavigate } from "react-router-dom";

import './404-page.scss';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="error-page">
            <Error/>
            <p className="error-page__number">404</p>
            <p className="error-page__title">The requested page was not found</p>            
            <p onClick={() => {navigate(-1)}} className="error-page__link">Go Back</p>
        </div>
    )
}

export default ErrorPage;



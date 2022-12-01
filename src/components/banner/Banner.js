import './banner.scss';
import avengersImg from '../../resources/img/Avengers.png';
import avengersLogoImg from '../../resources/img/Avengers_logo.png';

const Banner = () => {
    return (
        <div className="app__banner">
            <img src={avengersImg} alt="Avengers"/>
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img src={avengersLogoImg} alt="Avengers logo"/>
        </div>
    )
}

export default Banner;
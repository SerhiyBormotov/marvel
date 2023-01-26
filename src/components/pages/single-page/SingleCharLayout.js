import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SingleCharLayout = ({data}) => {
    const navigate = useNavigate();
    let {name, description, thumbnail} = data;
    return (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content={name + " - comic books character "}
                    />
                    <title>{name}</title>
                </Helmet>

        
        <div className="single-page">
            <img src={thumbnail} alt={name} className="single-page__img"/>
            <div className="single-page__info">
                <h2 className="single-page__name">{name}</h2>
                <p className="single-page__descr">{description}</p>
            </div>
            <div  onClick={() => {navigate(-1)}} className="single-page__back">Go Back</div>
        </div>
        </>
    )
}

export default SingleCharLayout;
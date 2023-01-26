import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SingleComicLayout = ({data}) => {
    const navigate = useNavigate();
    let {name, description, thumbnail, pageCount, price} = data;
    return (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content={name + " - comic book"}
                    />
                    <title>{name}</title>
                </Helmet>

        
        <div className="single-page">
            <img src={thumbnail} alt={name} className="single-page__img"/>
            <div className="single-page__info">
                <h2 className="single-page__name">{name}</h2>
                <p className="single-page__descr">{description}</p>
                <p className="single-page__descr">{pageCount} pages</p>
                <div className="single-page__price">{price}</div>
            </div>
            <div  onClick={() => {navigate(-1)}} className="single-page__back">Go Back</div>
        </div>
        </>
    )
}

export default SingleComicLayout;
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import Banner from '../banner/Banner';
import { Helmet } from 'react-helmet';
import ComicsList from '../comics-list/ComicsList';

const ComicsPage = () => {

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Comics list - Marvel information portal"
                />
                <title>Comics list - Marvel information portal</title>
            </Helmet>
            <Banner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
};

export default ComicsPage;
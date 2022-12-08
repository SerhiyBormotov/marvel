import ErrorBoundary from '../error-boundary/ErrorBoundary';
import ComicsList from '../comics-list/ComicsList';
import Banner from '../banner/Banner';

const ComicsPage = () => {
    return(
        <>
            <Banner/>
            <ErrorBoundary>
              <ComicsList/>
            </ErrorBoundary>
        </>
    )
};

export default ComicsPage;
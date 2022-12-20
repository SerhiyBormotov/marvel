import ErrorBoundary from '../error-boundary/ErrorBoundary';
import Banner from '../banner/Banner';
import { Outlet } from 'react-router-dom';
// import { SwitchTransition, CSSTransition, TransitionGroup } from 'react-transition-group';

const ComicsPage = () => {
    // const location = useLocation(),
    //       currentOutlet = useOutlet(),
    //       refOutlet = createRef();

    return(
        <>
            <Banner/>
            <ErrorBoundary>
                <Outlet/>
            </ErrorBoundary>
            {/* <SwitchTransition>
                <CSSTransition
                classNames="page"
                timeout={500}
                key={location.pathname}
                unmountOnExit
                nodeRef={refOutlet}
                >
                    <div ref={refOutlet} >
                        {currentOutlet}
                    </div>
                </CSSTransition>                
            </SwitchTransition> */}
        </>
    )
};

export default ComicsPage;
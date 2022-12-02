import { Component } from "react";
import Error from "../error/Error";

class ErrorBoundary extends Component {
    state = {
        error: false
    }


    static getDerivedStateFromError(error) {
        // Оновити стан, щоб наступний рендеринг показав резервний інтерфейс користувача.
        return { error: true };
      }
    
      componentDidCatch(error, info) {
        // Приклад "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.log(error, info.componentStack);
      }

    render() {
        if (this.state.error) {
           return <Error/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
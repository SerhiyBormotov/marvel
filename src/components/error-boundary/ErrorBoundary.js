import { Component } from "react";
import Error from "../error/Error";

class ErrorBoundary extends Component {
  state = {
      error: false
  }


  static getDerivedStateFromError() {
      return { error: true };
    }
  
  componentDidCatch(error, info) {
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
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
if (typeof ResizeObserver !== 'undefined') {
  const resizeObserverLoopErr = () => {
    const observer = new ResizeObserver(() => {});
    observer.observe(document.body);
    observer.disconnect();
  };
  resizeObserverLoopErr();
}
ReactDOM.render(
  <ErrorBoundary>
  <App />
</ErrorBoundary>,
document.getElementById('root')
);

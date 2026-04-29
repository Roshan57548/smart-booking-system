import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/Home";
import "./App.css";

/**
 * Root App Component
 * Wraps entire app with Redux Provider
 */

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
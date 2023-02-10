import './App.css';
import FileNavigator from "./FileNavigator"
import FileViewer from "./FileViewer"

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

const Router = BrowserRouter;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Workout Notebook</h1>
      </header>
      <Router>
      <main className="flex-row">
        <FileNavigator/>
        <FileViewer/>
      </main>
      </Router>
    </div>
  );
}

export default App;

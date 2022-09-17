import './App.css';
import { Route, Switch } from "react-router-dom"
import Landing from './components/Landing.jsx';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Switch >
        <Route exact path='/' component= {Landing} />
        <Route exact path='/home' component= {Home} />
      </Switch>
    </div>
  );
}

export default App;

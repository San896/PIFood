import './App.css';
import { Route, Switch } from "react-router-dom"
import Landing from './components/Landing.jsx';
import Home from './components/Home';
import Creation from './components/Creation';
import Detail from './components/Detail';
import 'normalize.css';

function App() {
  return (
    <div className="App">
      <Switch >
        <Route exact path='/' component= {Landing} />
        <Route exact path='/home' component= {Home} />
        <Route exact path='/createRecipe' component= {Creation} />
        <Route exact path='/detail/:id' component= {Detail} />
      </Switch>
    </div>
  );
}

export default App;

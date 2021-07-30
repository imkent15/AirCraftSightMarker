
import './App.css';

import {Home} from './Home'
import {Navigation} from './Navigation'
import {AirCraftSight} from './AirCraftSight'

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          AirCraftSight Spotter  
        </h3>
        <Navigation/>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/aircraftsights' component={AirCraftSight} />
            </Switch>  
      </div>
    </BrowserRouter>

  );
}

export default App;

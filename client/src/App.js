import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Teacher from './components/Teacher';
import Student from './components/Student';
import Home from './components/Home';

// function App() {
//   const [loadClient, setLoadClient] = useState(true);
//   return (
//     <Teacher />
//     /* <>
//     //   {/* LOAD OR UNLOAD THE CLIENT */}
//     //   <button onClick={() => setLoadClient(prevState => !prevState)}>
//     //     {loadClient ? 'STOP CLIENT' : 'START CLIENT'}
//     //   </button>
//     //   {/* SOCKET IO CLIENT*/}
//     //   {loadClient ? <ClientComponent /> : null}
//     // {/* </> */}
//   );
// }

function App() {
  // const [loadClient, setLoadClient] = useState(true);

  return (
    <Teacher />
  );
}


export default App;


/* <Router>
      <div className="App">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/teacher">
          <button>Interface Professeur</button>
        </Link>
        <Link to="/student">
          <button>Interface Eleve</button>
        </Link>
      </div>
      <Switch>
        <Route path="/teacher">
          <Teacher />
        </Route>
        <Route path="/student">
          <Student />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router> */
    
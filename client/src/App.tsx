import React from 'react';

import './App.css';
import Teacher from './components/Teacher/Teacher';

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

  return <Teacher />;
}

export default App;

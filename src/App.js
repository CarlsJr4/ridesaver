import React from 'react';
import Planner from './routes/planner/Planner';
import GlobalState from './context/GlobalState';
// Eventually, this app will house your many routes

function App() {
  return (
		<GlobalState>
			<Planner />
		</GlobalState>
  );
}

export default App;

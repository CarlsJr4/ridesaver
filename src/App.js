import React from 'react';
import Planner from './components/Planner';
import GlobalState from './components/context/GlobalState';
// Eventually, this app will house your many routes

function App() {
  return (
		<GlobalState>
			<Planner />
		</GlobalState>
  );
}

export default App;

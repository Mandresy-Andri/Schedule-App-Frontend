import './App.css';
import Welcome from './components/Welcome';
import NavigationBar from './components/NavigationBar';
import EventSchedule from './components/EventSchedule';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <NavigationBar/>
    <Routes>
    <Route path='/' exact element={<Welcome/>}/>
    <Route path='event' exact element={<EventSchedule/>}/> 
    </Routes>
  </Router>
  );
}

export default App;

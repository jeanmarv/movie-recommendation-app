import { Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Recommend from './pages/recommend';
import Register from './pages/register';
import Evaluate from './pages/evaluate';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Main /> } />
      <Route path="/recommend" element={ <Recommend /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/evaluate" element={ <Evaluate /> } />
    </Routes>
  )
}

export default App

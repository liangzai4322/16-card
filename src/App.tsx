import { Routes, Route } from 'react-router-dom';
import GridView from './components/GridView';
import DetailView from './components/DetailView';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Routes>
        <Route path="/" element={<GridView />} />
        <Route path="/detail/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
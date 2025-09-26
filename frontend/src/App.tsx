import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SpeciesManagementPage from './pages/SpeciesManagementPage';
import BreedManagementPage from './pages/BreedManagementPage';
import LocationManagementPage from './pages/LocationManagementPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/management/species" element={<SpeciesManagementPage />} />
          <Route path="/management/breeds" element={<BreedManagementPage />} />
          <Route path="/management/locations" element={<LocationManagementPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

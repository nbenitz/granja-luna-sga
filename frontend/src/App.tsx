import { useState, useEffect } from 'react';
import apiClient from './services/api';
import './index.css'; // Asegúrate de que los estilos de Tailwind estén importados

function App() {
  const [backendStatus, setBackendStatus] = useState<string>('Connecting to backend...');

  useEffect(() => {
    // Llama a la API para verificar la conexión
    apiClient.get('/')
      .then(response => {
        setBackendStatus(response.data.message || 'Successfully connected');
      })
      .catch(error => {
        console.error("Error connecting to backend:", error);
        setBackendStatus('ERROR: Could not connect to backend.');
      });
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-teal-400">Granja Luna</h1>
        <p className="text-lg text-gray-300">Sistema de Gestión Avícola</p>
        <div className="mt-6 p-4 border-2 border-dashed border-gray-600 rounded-md">
          <p className="font-mono text-lg">
            <span className="font-bold">Connection Status:</span>
            <span className="ml-2 text-yellow-400">{backendStatus}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
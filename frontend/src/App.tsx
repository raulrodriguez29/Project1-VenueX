import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/auth/Register';
import { useEffect, useState } from 'react'
import apiClient from './services/apiClient'
import './App.css'

function App() {
  const [data, setData] = useState<string>("Waiting for backend...");

  useEffect(() => {
    // This makes a GET request to http://localhost:8080/api/hello
    apiClient.get('/hello')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setData("Backend is not responding. Check CORS and Port 8080.");
      });
  }, []);

  return (
    <Router>
      <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          {/* HOME PAGE - Your existing connection test */}
          <Route path="/" element={
            <div>
              <h1>React + Spring Boot Connection</h1>
              <div style={{ padding: '20px', background: '#050505ff', borderRadius: '8px', color: 'white' }}>
                <strong>Backend Response:</strong> {data}
              </div>
            </div>
          } />

          {/* REGISTER PAGE */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
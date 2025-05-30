import './App.css'
import './index.css'; 
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import SharedPage from './pages/SharedPage';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

function App() {
  
  return <div>
    <Toaster />
    <ThemeProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/' element={<RegisterPage />} />
        <Route path='/share/:id' element={<SharedPage />} />
        <Route path="*" element={<Navigate to="/HomePage" />} />
      </Routes>
    </BrowserRouter> </ThemeProvider>
    
  </div>
  
}

export default App

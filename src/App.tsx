import React from 'react';
import './App.css'
import './assets/sass/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary, Fallback } from './common/error-handlings/errorBoundary';
import NotFound from './common/error-handlings/notFound';
import LoginPage from './features/auth/components/login';
import PrivateRoute from './common/privateRoute';
import Home from './features/home/components';

/**
 * Root component of the RR-EduVerse application
 * 
 * @component
 * @description
 * Main application component that handles routing and error boundaries.
 * Provides the following routes:
 * - "/" : Login page
 * - "/home" : Protected home page (requires authentication)
 * - "*" : 404 Not Found page
 * 
 * @example
 * ```tsx
 * <BrowserRouter>
 *   <App />
 * </BrowserRouter>
 * ```
 * 
 * @returns {JSX.Element} The rendered application with routing and error handling
 */

const App:React.FC = () => {
  return (
    <ErrorBoundary fallback={<Fallback />} >
      <div className='App' >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div> 
    </ErrorBoundary>
  );
}

export default App;
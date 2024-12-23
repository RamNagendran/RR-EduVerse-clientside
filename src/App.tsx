import React, { Suspense, lazy } from 'react';
import './App.css'
import './assets/sass/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary, Fallback } from './common/error-handlings/errorBoundary';
import PrivateRoute from './common/privateRoute';

// Lazy loaded components
const LoginPage = lazy(() => import('./features/auth/components/login'));
const NotFound = lazy(() => import('./common/error-handlings/notFound'));
const Home = lazy(() => import('./features/home/components'));
const Personnel = lazy(() => import('./features/pages/personnels/components'));

// Loading component for Suspense fallback
const Loading = () => (
  <div className="loading-spinner d-flex align-items-center justify-content-center h-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

/**
 * Root component of the RR-EduVerse application
 * 
 * @component
 * @description
 * Main application component that handles routing and error boundaries.
 * Implements code splitting using React.lazy() for better performance.
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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<PrivateRoute component={Home} />} >
              <Route path='dashboard' element={<></>}  />
              <Route path='batch' element={<></>}  />
              <Route path='course' element={<></>} />
              <Route path='personnel' element={<PrivateRoute component={Personnel} />}  />
              <Route path='authorization' element={<></>}  />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div> 
    </ErrorBoundary>
  );
}

export default App;
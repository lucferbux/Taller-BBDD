import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './components/App';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext/AppContext';
import './main.css';
import { HelmetProvider } from 'react-helmet-async';
import { ProjectProvider } from './context/ProjectContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <AppProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </AppProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

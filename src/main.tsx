import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import Admin from './Admin.tsx';

const path = window.location.pathname.substring(1);

createRoot(document.getElementById('root')!).render(
  path === 'admin' ? <Admin /> : <App guestName={path ? decodeURIComponent(path) : null} />,
);

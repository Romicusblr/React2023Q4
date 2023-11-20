import React from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Laureates from './pages/Laureates/Laureates';
import LaureateDetails from './pages/Laureates/LaureateDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Laureates />}>
      <Route path=":id" element={<LaureateDetails />} />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

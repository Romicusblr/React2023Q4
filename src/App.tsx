import React from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Laureates, { laureatesLoader } from './pages/Laureates/Laureates';
import LaureateDetails, {
  laureateDetailsLoader,
} from './pages/Laureates/LaureateDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Laureates />} loader={laureatesLoader}>
      <Route
        path=":id"
        element={<LaureateDetails />}
        loader={laureateDetailsLoader}
      />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

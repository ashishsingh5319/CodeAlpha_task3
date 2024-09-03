import React from 'react'
import SignUp from './Component/Signup/SignUp';
import Inventory from './Component/Inventory'
import Login from './Component/Login/Login';
import { Navigate } from 'react-router-dom';
import { RouterProvider, createBrowserRouter,Route,Routes } from "react-router-dom";



function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/inventory",
      element: <Inventory />,
    },
  ]);
  
  function ProtectedRoute({ children }) {
    const authToken = localStorage.getItem('authToken');
    return authToken ? children : <Navigate to="/login" />;
}
  return (
    <div className="App">
      <RouterProvider router={route}>
      <Routes>
    <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
    <Route path="/login" element={<Login />} />
      </Routes>
      </RouterProvider>
     

    </div>
  );
}

export default App;
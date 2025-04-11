
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Simply redirect to the landing page
  return <Navigate to="/" />;
};

export default Index;

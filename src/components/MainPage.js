import React from 'react';
import { isAdmin, userId } from '../api/auth';

function MainPage() {
  console.log('user id:', userId());
  console.log('Admin:', isAdmin());

  return <div>Main page</div>;
}

export default MainPage;

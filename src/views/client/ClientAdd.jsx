import React from 'react';
import { useLocation } from 'react-router-dom';

import AddForm from '../../components/client/addclientform/AddForm';

export default function ClientAdd() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="navView">
      <AddForm {...(location.state ? { editData: location } : {})} />
    </div>
  );
}

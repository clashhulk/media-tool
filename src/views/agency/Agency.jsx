import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AddForm from '../../components/agency/AddForm';

export default function Agency() {
  const location = useLocation();

  const [agency, setAgency] = useState({
    id: 2,
    agency_name: "ARM",
    agency_brandname: "ARM Media",
    agency_type: "Reatiner",
    agency_category: "ltd",
    email: "armmed90a@arm.com",
    phone: "1439507960",
    agency_code: "ARM002",
    website_address: "www.armworldwi4de.com",
    address: "Gurgaon",
    address1: "Haryana",
    description: "This is description",
    cin: "L21091KA2019OPC141332",
    pan: "ABCTY1235D",
    tan: "PDES03038F",
    gst_number: "23AABCU9603R1ZX",
    country: 1,
    state: 2,
    city: "Gurgaon",
    pincode: 799130,
    status: 1,
    created_at: "2022-10-11T09:52:46.000000Z",
    updated_at: "2022-10-11T10:25:36.000000Z",
    deleted_at: null,
  });

  return (
    <div className="navView">
      <AddForm {...(agency.id ? { editData: agency } : {})} />
    </div>
  );
}

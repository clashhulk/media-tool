import React from 'react'
import { useLocation } from 'react-router-dom';
import EditForm from '../../components/client/editclientform/EditForm';

export default function ClientEdit() {
    const location=useLocation()
    return (
        <div className="navView">
            <EditForm editData={location}/>          
        </div>
    );
}

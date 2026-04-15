import Profile from '@/components/module/shared/Profile';
import { AuthServices } from '@/services/auth.services';
import React from 'react';

const ManagerPage = async() => {
 const {user}= await AuthServices.session()
 
    return (
        <div>
            <Profile user={user}></Profile>
        </div>
    );
};

export default ManagerPage;
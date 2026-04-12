import { getAllUsers } from '@/actions/auth.actions';
import React from 'react';

const UserPage = async() => {
    const {data} = await getAllUsers();

    return (
        <div>
            i am user page
        </div>
    );
};

export default UserPage;
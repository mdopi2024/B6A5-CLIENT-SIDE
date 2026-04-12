import { getAllUsers } from '@/actions/auth.actions';
import UserTable from '@/components/module/users/UserTable';
import { User } from '@/types/auth.interface';
import React from 'react';

const UserPage = async() => {
    const {data} = await getAllUsers();

    return (
        <div>
          <UserTable user={data as User[]} />
        </div>
    );
};

export default UserPage;
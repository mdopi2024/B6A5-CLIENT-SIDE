
import { Navbar } from '@/components/navbar1';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default layout;
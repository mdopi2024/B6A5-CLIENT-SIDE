
import { Navbar } from '@/components/layout/navbar1';
import Footer from '@/components/module/home/Footer';
import React from 'react';



const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <div>
                <Footer></Footer>
            </div>
        </div>

    );
};

export default layout;
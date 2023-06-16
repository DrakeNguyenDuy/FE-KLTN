import React from 'react';
import HeaderEmployer from '~/Layouts/components/HeaderEmployer';
import Footer from '~/Layouts/components/Footer';

function EmployerLayout({ children }) {
    return (
        <div>
            <HeaderEmployer />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default EmployerLayout;

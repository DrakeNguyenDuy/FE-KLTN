import React from 'react';
import HeaderEmployer from '~/Layouts/components/HeaderEmployer';
import Footer from '~/Layouts/components/Footer';
import Auth from '~/components/Auth/Auth';

function EmployerLayout({ children, type, auth }) {
    return (
        <Auth type={type} auth={auth}>
            <HeaderEmployer />
            <div className="content">{children}</div>
            <Footer />
        </Auth>
    );
}

export default EmployerLayout;

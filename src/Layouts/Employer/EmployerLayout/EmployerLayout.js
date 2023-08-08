import React from 'react';
import HeaderEmployer from '~/Layouts/Employer/HeaderEmployer';
import Footer from '~/Layouts/commonComponents/Footer';
import Auth from '~/components/Auth/Auth';

function EmployerLayout({ children, type, auth }) {
    return auth ? (
        <Auth type={type} auth={auth}>
            <HeaderEmployer />
            <div className="content">{children}</div>
            <Footer />
        </Auth>
    ) : (
        <>
            <HeaderEmployer />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}

export default EmployerLayout;

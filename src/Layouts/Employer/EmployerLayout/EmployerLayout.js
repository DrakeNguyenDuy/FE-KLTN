import React from 'react';
import HeaderEmployer from '~/Layouts/Employer/HeaderEmployer';
import Footer from '~/Layouts/common/Footer';
import AuthEmployer from '~/components/employer/Auth';

function EmployerLayout({ children, auth }) {
    return auth ? (
        <AuthEmployer>
            <HeaderEmployer />
            <div className="content">{children}</div>
            <Footer />
        </AuthEmployer>
    ) : (
        <>
            <HeaderEmployer />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}

export default EmployerLayout;

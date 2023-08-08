import React from 'react';
import Header from '~/Layouts/Alumus/Header';
import Footer from '~/Layouts/commonComponents/Footer';
import Auth from '~/components/Auth/Auth';

function AlummusLayout({ children, type, auth }) {
    return auth ? (
        <Auth type={type}>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </Auth>
    ) : (
        <>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}

export default AlummusLayout;

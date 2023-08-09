import React from 'react';
import Header from '~/Layouts/Alumus/Header';
import Footer from '~/Layouts/common/Footer';
import Auth from '~/components/alumus/Auth';

function AlummusLayout({ children, type, auth }) {
    return auth ? (
        <Auth>
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

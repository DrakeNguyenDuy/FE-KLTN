import React from 'react';

import Header from '~/Layouts/components/Header';
import Footer from '~/Layouts/components/Footer';
import Auth from '~/components/Auth/Auth';

function DefaultLayout({ children, type, auth }) {
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

export default DefaultLayout;

import React from 'react';

import Header from '~/Layouts/components/Header';
import Footer from '~/Layouts/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

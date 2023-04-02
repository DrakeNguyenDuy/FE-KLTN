import React from 'react';
import HeaderEmployer from '~/Layouts/components/HeaderEmployer';

function EmployerLayout({ children }) {
    return (
        <div>
            <HeaderEmployer />
            <div className="content">{children}</div>
        </div>
    );
}

export default EmployerLayout;

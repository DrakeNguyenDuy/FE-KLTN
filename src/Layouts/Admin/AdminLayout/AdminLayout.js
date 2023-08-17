import React from 'react';
import Header from '~/Layouts/Admin/Header';
import Auth from '~/components/admin/Auth';
import SideBar from '../Sidebar/Sidebar';
import { Row } from 'react-bootstrap';

function AdminLayout({ children, name, auth }) {
    return auth ? (
        <Auth>
            <Header />
            <div className="wrapper container">
                <Row>
                    <SideBar className={'col-md-3'} name={name} />
                    <div className="content col-md-9">{children}</div>
                </Row>
            </div>
        </Auth>
    ) : (
        <>
            <Header />
            <div className="wrapper container">
                <Row>
                    <SideBar className={'col-md-3'} name={name} />
                    <div className="content col-md-9">{children}</div>
                </Row>
            </div>
        </>
    );
}

export default AdminLayout;

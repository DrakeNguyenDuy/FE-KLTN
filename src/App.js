import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Fragment } from 'react';
import React from 'react';
import DefaultLayout from '~/Layouts/Alumus/AlumusLayout';
import routes from './routes/Route';

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    {routes.alumus.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.layout ? (
                                        <Layout type="alumus" auth={route.auth}>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                    {routes.employer.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.layout ? (
                                        <Layout type="employer" auth={route.auth}>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

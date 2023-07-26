import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Fragment } from 'react';
import React from 'react';
import DefaultLayout from '~/Layouts/DefaultLayout';
import routes from './routes/Route';
import Auth from './components/Auth/Auth';

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
                                    <Auth role={'alumus'}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </Auth>
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
                                    <Auth role={'employer'}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </Auth>
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

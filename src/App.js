import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { LoginPage, NotFoundPage, MainPage, ProtectedRoute} from "./pages";
import {AddProject, Navbar, Projects} from "./components";

function App() {


    return (
        <BrowserRouter>
            <header className='header'>
                <Navbar/>
            </header>
            <main className='main'>
                <div className="container">
                    <Routes>
                        <Route path='/' element={
                            <ProtectedRoute>
                                <MainPage/>
                            </ProtectedRoute>
                        }>
                            <Route index element={<Projects/>}/>
                            <Route path="add-project" element={<AddProject/>}/>
                            <Route path="create-company" element={<div>create-company</div>}/>
                            {/*<Route path="profile" element={<Profile/>}/>*/}
                        </Route>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;


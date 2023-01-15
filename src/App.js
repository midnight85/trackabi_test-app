import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { LoginPage, NotFoundPage, MainPage, ProtectedRoute} from "./pages";
import {AddProject, CreateCompany, Navbar, Projects} from "./components";

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
                            <Route path="create-company" element={<CreateCompany/>}/>
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


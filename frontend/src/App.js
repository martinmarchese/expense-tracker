import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovementList from './components/Movements/MovementList';
import AddMovement from './components/Movements/AddMovement';
import EditMovement from './components/Movements/EditMovement';
import CategoryList from './components/Categories/CategoryList';
import AddCategory from './components/Categories/AddCategory';
import EditCategory from './components/Categories/EditCategory';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/movements/add" element={<AddMovement />} />
                <Route path="/movements/edit/:id" element={<EditMovement />} />
                <Route path="/movements" element={<MovementList />} />
                <Route path="/categories/add" element={<AddCategory />} />
                <Route path="/categories/edit/:id" element={<EditCategory />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/" element={<MovementList />} />
            </Routes>
        </Router>
    );
};

export default App;

import React, { useState } from 'react';
import { createCategory } from '../../api/categoryApi'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate(); // Fixed to use 'navigate' instead of 'history'
    const [category, setCategory] = useState({ name: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Basic validation
        if (!category.name.trim()) {
            setError('Name is required');
            return;
        }

        try {
            const response = await createCategory(category); // Make sure createCategory handles the response correctly
            if (response.status === 201) { // Check for successful response
                navigate('/categories'); // Use navigate to redirect
            } else {
                setError('Failed to create category.'); // Handle non-201 status codes
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError('Error creating category. Please try again.'); // Show error to user
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Category</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="categoryName" // Add id for accessibility
                        value={category.name} // Controlled component
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;

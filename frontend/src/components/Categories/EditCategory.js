import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory, updateCategory } from '../../api/categoryApi'; // Ensure this path is correct

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Changed from history to navigate
    const [category, setCategory] = useState({ name: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const response = await getCategory(id);
                if (response.status === 200) {
                    setCategory(response.data); // Only set category if response is successful
                } else {
                    setError('Failed to load category.'); // Handle non-200 response
                }
            } catch (err) {
                console.error(err); // Log error for debugging
                setError('Error loading category.'); // Show error to user
            }
        };

        loadCategory(); // Call loadCategory function
    }, [id]); // Include id in the dependency array

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages

        // Validate the input
        if (!category.name.trim()) {
            setError('Name is required');
            return;
        }

        try {
            const response = await updateCategory(id, category); // Update the category
            if (response.status === 200) { // Check for successful update
                navigate('/categories'); // Use navigate to redirect
            } else {
                setError('Failed to update category.'); // Handle non-200 status
            }
        } catch (err) {
            console.error(err); // Log the error
            setError('Error updating category. Please try again.'); // Show error message
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Category</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="categoryName" // Added id for accessibility
                        value={category.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Category</button>
            </form>
        </div>
    );
};

export default EditCategory;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovement, updateMovement } from '../../api/movementApi';
import { getCategories } from '../../api/categoryApi';
import { getMovementTypes } from '../../api/movementApi';

const EditMovement = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Changed from history to navigate
    const [categories, setCategories] = useState([]);
    const [movementTypes, setMovementTypes] = useState([]);
    const [movement, setMovement] = useState({
        type: '',
        category: { id: '' }, // Initialize category as an object
        amount: '',
        isCC: false,
        comments: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const loadMovement = async () => {
            try {
                const response = await getMovement(id);
                if (response.status === 200) {
                    setMovement(response.data); // Only set movement if response is successful
                } else {
                    setError('Failed to load movement.'); // Handle non-200 response
                }
            } catch (err) {
                console.error(err); // Log error for debugging
                setError('Error loading movement.'); // Show error to user
            }
        };

        const loadCategories = async () => {
            try {
                const response = await getCategories();
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    setError('Failed to load categories.'); // Handle non-200 response
                }
            } catch (err) {
                console.error(err); // Log error for debugging
                setError('Error loading categories.'); // Show error to user
            }
        };

        const loadMovementTypes = async () => {
            try {
                const response = await getMovementTypes();
                if (response.status === 200) {
                    setMovementTypes(response.data);
                } else {
                    setError('Failed to load movement types.'); // Handle non-200 response
                }
            } catch (err) {
                console.error(err); // Log error for debugging
                setError('Error loading movement types.'); // Show error to user
            }
        };

        loadMovement();
        loadCategories();
        loadMovementTypes();
    }, [id]); // Include id in the dependency array

    const handleChange = (e) => {
        setMovement({ ...movement, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(cat => cat.id === parseInt(selectedCategoryId));
        setMovement({ ...movement, category: selectedCategory }); // Set the entire category object
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!movement.type || !movement.category.id || !movement.amount) {
            setError('Please fill all required fields');
            return;
        }

        try {
            const response = await updateMovement(id, movement);
            if (response.status === 200) {
                navigate('/movements');
            } else {
                setError('Failed to update movement.'); // Handle non-200 response
            }
        } catch (err) {
            console.error(err); // Log the error
            setError('Error updating movement. Please try again.'); // Show error message
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Movement</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Type</label>
                    <select className="form-control" name="type" value={movement.type} onChange={handleChange} required>
                        <option value="">Select Type</option>
                        {movementTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" name="category" value={movement.category.id} onChange={handleCategoryChange} required>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={movement.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <input
                        type="text"
                        className="form-control"
                        name="comments"
                        value={movement.comments}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isCC"
                            checked={movement.isCC}
                            onChange={(e) => setMovement({ ...movement, isCC: e.target.checked })}
                        />
                        Is Credit Card?
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Update Movement</button>
            </form>
        </div>
    );
};

export default EditMovement;

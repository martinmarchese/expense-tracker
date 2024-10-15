import React, { useEffect, useState } from 'react';
import { createMovement, getMovementTypes } from '../../api/movementApi';
import { getCategories } from '../../api/categoryApi';
import { useNavigate } from 'react-router-dom';

const AddMovement = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [movementTypes, setMovementTypes] = useState([]);
    const [movement, setMovement] = useState({
        type: '', // Directly holds the enum value
        category: { id: '' },
        amount: '',
        isCC: false,
        comments: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
        loadMovementTypes();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (err) {
            setError('Error loading categories');
            console.error(err);
        }
    };

    const loadMovementTypes = async () => {
        try {
            const response = await getMovementTypes();
            console.log('Movement Types:', response.data); // Log response for debugging
            if (Array.isArray(response.data)) {
                setMovementTypes(response.data); // Ensure this is an array of strings
            } else {
                setError('Invalid response format for movement types');
            }
        } catch (err) {
            setError('Error loading movement types');
            console.error('Error details:', err.response ? err.response.data : err); // Log detailed error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovement({ ...movement, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(cat => cat.id === parseInt(selectedCategoryId));
        setMovement({ ...movement, category: selectedCategory });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!movement.type || !movement.category.id || !movement.amount) {
            setError('Please fill all required fields');
            return;
        }

        try {
            const movementData = {
                type: movement.type, // Directly use the enum value
                category: { id: parseInt(movement.category.id) }, // Ensure category ID is a number
                amount: movement.amount,
                isCC: movement.isCC,
                comments: movement.comments,
            };

            await createMovement(movementData);
            navigate('/movements');
        } catch (err) {
            console.error('Error creating movement:', err);
            setError('Error creating movement');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Movement</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Type</label>
                    <select className="form-control" name="type" onChange={handleChange} required>
                        <option value="">Select Type</option>
                        {movementTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option> // Use the enum value directly
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" name="category" onChange={handleCategoryChange} required>
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
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isCC"
                            onChange={(e) => setMovement({ ...movement, isCC: e.target.checked })}
                        />
                        Is Credit Card?
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Add Movement</button>
            </form>
        </div>
    );
};

export default AddMovement;

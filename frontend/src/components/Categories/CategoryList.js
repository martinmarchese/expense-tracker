import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, getMovementsByCategoryId } from '../../api/categoryApi';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
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

    const handleDelete = async (id, e) => {
        e.preventDefault(); // Prevent default action

        try {
            // Fetch movements associated with the category
            const movements = await getMovementsByCategoryId(id);
            if (movements.length > 0) {
                setError('Cannot delete category. It is used by existing movements.');
                return;
            }

            // Proceed to delete the category
            await deleteCategory(id);
            loadCategories(); // Reload categories after deletion
            setError(''); // Clear any previous errors
        } catch (err) {
            setError('Error deleting category');
            console.error('Error during category deletion:', err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Categories</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Link className="btn btn-primary mb-3" to="/categories/add">Add Category</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link className="btn btn-warning" to={`/categories/edit/${category.id}`}>Edit</Link>
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={(e) => handleDelete(category.id, e)} // Pass event to prevent default
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;

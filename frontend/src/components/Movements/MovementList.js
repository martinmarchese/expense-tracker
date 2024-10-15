import React, { useEffect, useState } from 'react';
import { getMovements, deleteMovement } from '../../api/movementApi';
import { Link } from 'react-router-dom';

const MovementList = () => {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        loadMovements();
    }, []);

    const loadMovements = async () => {
        const response = await getMovements();
        setMovements(response.data);
    };

    const handleDelete = async (id) => {
        await deleteMovement(id);
        loadMovements();
    };

    return (
        <div className="container mt-4">
            <h2>Movements</h2>
            <Link className="btn btn-primary mb-3" to="/movements/add">Add Movement</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map(movement => (
                        <tr key={movement.id}>
                            <td>{movement.id}</td>
                            <td>{movement.type}</td>
                            <td>{movement.category?.name}</td>
                            <td>{movement.amount}</td>
                            <td>{movement.comments}</td>
                            <td>
                                <Link className="btn btn-warning" to={`/movements/edit/${movement.id}`}>Edit</Link>
                                <button className="btn btn-danger ml-2" onClick={() => handleDelete(movement.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovementList;

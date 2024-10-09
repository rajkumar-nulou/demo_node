
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/users/get-all-users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result.data)

            if (response.ok) {
                setData(result.data);
            } else {
                setErrorMessage(result.message || 'Failed to load data');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during data loading.');
        }
    };

    return (
        <>
            <div>
                <h1>Home</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.user_id}>
                                    <td>{item.id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;

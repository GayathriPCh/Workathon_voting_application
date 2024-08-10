import React, { useState } from 'react';
import { registerUser } from './contractUtils';

const UserRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await registerUser(name, email);
            alert('User registered successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to register user.');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>User Registration</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleRegister} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </div>
    );
};

export default UserRegistration;

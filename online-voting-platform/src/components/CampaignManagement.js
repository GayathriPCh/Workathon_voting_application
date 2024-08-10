import React, { useState } from 'react';
import { createCampaign } from './contractUtils';

const CampaignManagement = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateCampaign = async () => {
        setLoading(true);
        try {
            await createCampaign(title, description);
            alert('Campaign created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create campaign.');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Campaign Management</h2>
            <input
                type="text"
                placeholder="Campaign Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Campaign Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={handleCreateCampaign} disabled={loading}>
                {loading ? 'Creating...' : 'Create Campaign'}
            </button>
        </div>
    );
};

export default CampaignManagement;

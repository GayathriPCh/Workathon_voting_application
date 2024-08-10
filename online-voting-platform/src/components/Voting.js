import React, { useState, useEffect } from 'react';
import { getBallots, castVote } from './contractUtils';

const Voting = () => {
    const [ballots, setBallots] = useState([]);
    const [selectedBallot, setSelectedBallot] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadBallots = async () => {
            const ballotList = await getBallots();
            setBallots(ballotList);
        };

        loadBallots();
    }, []);

    const handleVote = async () => {
        if (!selectedBallot) return alert('Please select a ballot option.');
        setLoading(true);
        try {
            await castVote(selectedBallot);
            alert('Vote cast successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to cast vote.');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Voting</h2>
            {ballots.length === 0 ? (
                <p>No ballots available</p>
            ) : (
                <div>
                    <h3>Select an option:</h3>
                    {ballots.map((ballot, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name="ballot"
                                value={ballot.id}
                                onChange={() => setSelectedBallot(ballot.id)}
                            />
                            {ballot.option}
                        </div>
                    ))}
                    <button onClick={handleVote} disabled={loading}>
                        {loading ? 'Voting...' : 'Vote'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Voting;

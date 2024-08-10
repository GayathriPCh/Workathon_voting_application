// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingPlatform {
    struct Election {
        string title;
        string description;
        uint startTime;
        uint endTime;
        address[] candidates;
        mapping(address => bool) hasVoted;
    }

    mapping(uint => Election) public elections;
    uint public electionCount;

    function createElection(string memory _title, string memory _description, uint _startTime, uint _endTime, address[] memory _candidates) public {
        Election storage election = elections[electionCount];
        election.title = _title;
        election.description = _description;
        election.startTime = _startTime;
        election.endTime = _endTime;
        election.candidates = _candidates;
        electionCount++;
    }

    function vote(uint _electionId, address _candidate) public {
        Election storage election = elections[_electionId];
        require(block.timestamp >= election.startTime && block.timestamp <= election.endTime, "Election is not active");
        require(!election.hasVoted[msg.sender], "You have already voted");
        require(_isCandidateValid(_electionId, _candidate), "Invalid candidate");

        election.hasVoted[msg.sender] = true;
        // Logic to record the vote
    }

    function _isCandidateValid(uint _electionId, address _candidate) private view returns (bool) {
        Election storage election = elections[_electionId];
        for (uint i = 0; i < election.candidates.length; i++) {
            if (election.candidates[i] == _candidate) {
                return true;
            }
        }
        return false;
    }
}

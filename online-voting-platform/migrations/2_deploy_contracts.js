const artifacts = require("truffle-artifacts");
const VotingPlatform = artifacts.require("VotingPlatform");

module.exports = function (deployer) {
  deployer.deploy(VotingPlatform);
};

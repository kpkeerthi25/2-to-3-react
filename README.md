2-to-3 can ramp up more public to migrate their data from centralised cloud to filcoin network. create an migration ad with bounty and chill.  No need for huge temporary disk space or high network bandwidth, just outsource!!!

Nowadays centralized cloud providers are becoming monopolies because it is highly impossible for a regular user to migrate from one provider to another due to a lack of temporary disk space/ network bandwidth. 

2-to-3 provides a simpler solution to outsource the migration effort to a third-party / filcoin actor for a bounty. By this way many normal users can easily onboard to filcoin network. This gives end-user a seamless migration from web-2 to web3 storage space.

2-to-3 consists of three major components:

1. https://github.com/kpkeerthi25/2-to-3-react (frontend)
2. https://github.com/kpkeerthi25/2-to-3-node (off-chain computation unit)
3. https://github.com/kpkeerthi25/2-to-3-hardhat (hardhat for testing and for service provider interaction)

Thus the MigrationAd contract(https://hyperspace.filfox.info/en/address/0xe7500654f949D1e5C0254f1DE04fdb5863A14f91) takes care of all the ads with bounty management.  I deployed the solidity contract on hyperspace and used react for the front-end. 
The node application is the off-chain computation unit where it gets the google drive authCode and downloads the files. The uploading and deal creation via lotus is mocked for simplicity by using existing an existing deal.

push protocol is integrated to send notification to the end-user when migration is completed.

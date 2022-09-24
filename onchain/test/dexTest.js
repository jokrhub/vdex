const { networks } = require("../truffle-config");


const v1 = artifacts.require("v1.sol");
const dex = artifacts.require("VDex.sol");

contract("dex", async (deployer) => {
    

    it("Checking initialization", async () => {
        const VDex = await v1.at(dex.address);
        assert(await VDex.initalized() === true);
    });

    it("Verify Owner", async () => {
        const VDex = await v1.at(dex.address);
        if (networks == "ropsten") {
            assert(await VDex.owner() == "0xC009215b0c94debc7656502B015DFB9E51529A2D")
        } else {
            assert(await VDex.owner() == deployer[0])
        }
    });

    // scope for future tests
    


});
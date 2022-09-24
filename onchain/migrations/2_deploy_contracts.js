var vdex = artifacts.require("VDex");
var v1 = artifacts.require("v1");



module.exports = function(deployer) {
  deployer.deploy(v1).then(async ()=> {
    await deployer.deploy(vdex, "0x8129fc1c", v1.address).then(_ => {
        console.log("--------------------------------");
        console.log("DeX: " + vdex.address);
        console.log("v1: " + v1.address);
        console.log("--------------------------------");
    });
  });
};
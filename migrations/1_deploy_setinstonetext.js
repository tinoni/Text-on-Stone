const TextOnStone = artifacts.require("TextOnStone");
const Strings = artifacts.require("Strings");
const SVGStrings = artifacts.require("SVGStrings");
const Appearance = artifacts.require("Appearance");

module.exports = async function(deployer) {
    await deployer.deploy(Strings);
    await deployer.deploy(Appearance);
    await deployer.link(Appearance, SVGStrings);
    await deployer.link(Strings, SVGStrings);
    await deployer.deploy(SVGStrings);
    await deployer.link(SVGStrings, TextOnStone);
    await deployer.link(Appearance, TextOnStone);
    await deployer.deploy(TextOnStone);
};

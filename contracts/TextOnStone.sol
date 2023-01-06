//SPDX-License-Identifier: NONE
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./SVGStrings.sol";
import "./Appearance.sol";

/**
Contract inspired by:
    https://chaintext.net
    https://gist.github.com/Chmarusso/045ee79fa9a1fae55928a613044c9067
 */
contract TextOnStone is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint256 public constant MIN_COST = 1 ether;
    uint256 public constant MAX_COST = 7777 ether;

    uint8 public constant TEXTS_PER_PRICE_LEVEL = 7;

    uint256 public constant MAX_SUPPLY = 777777;

    uint16 public constant MAX_LENGTH = 300;

    uint8 public constant PRICE_INCREASE_FACTOR = 2;

    mapping(uint256 => string) private _textContents;
    mapping(uint256 => Appearance.AppearanceStruct) private _appearance;
    mapping(uint256 => uint256) private _mintTimestamp;
    uint256 private currentCost;

    event ContentAdded(address indexed owner, uint256 indexed tokenId, string text);

    modifier existingToken(uint256 token) {
        require(_exists(token), "Nonexistent token");
        _;
    }

    constructor() ERC721("Text on Stone", "STXT") {
        _safeMint(msg.sender, 0);
        string memory firstMessage = "Text on Stone Genesis";
        _addText(0, firstMessage);
        _setAppearance(0, Appearance.AppearanceStruct(1, 0, 1, 99, 0, 2, 6, 3, 3));
        _mintTimestamp[0] = block.timestamp;
        currentCost = MIN_COST;
        _tokenIds.increment();
        emit ContentAdded(msg.sender, 0, firstMessage);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function textsPerPriceLevel() internal pure virtual returns (uint256) {
        return TEXTS_PER_PRICE_LEVEL;
    }

    function currentMintCost() public view returns (uint256) {
        return currentCost;
    }

    function updatePrice() private {
        if (totalSupply() % textsPerPriceLevel() == 0 && currentCost < MAX_COST) {
            currentCost += PRICE_INCREASE_FACTOR;
            if (currentCost > MAX_COST) {
                currentCost = MAX_COST;
            }
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://textonstone.com/";
    }

    function contractURI() public pure returns (string memory) {
        return string(abi.encodePacked(_baseURI(), "contract"));
    }

    function mintText(string memory text, Appearance.AppearanceStruct memory lappearance) public payable {
        uint256 len = bytes(text).length;
        require(len <= MAX_LENGTH, "Length out of bounds");
        uint256 minCost = currentMintCost();
        require(msg.value >= minCost, "Payment too low");
        uint256 totalSupply = totalSupply();
        require(totalSupply < MAX_SUPPLY, "Max supply reached");

        uint256 tokenNumber = _tokenIds.current();
        _safeMint(msg.sender, tokenNumber);
        _tokenIds.increment();
        _addText(tokenNumber, text);
        _setAppearance(tokenNumber, lappearance);
        _mintTimestamp[tokenNumber] = block.timestamp;

        updatePrice();
        emit ContentAdded(msg.sender, tokenNumber, text);
    }

    function claim(uint256 amount) external onlyOwner {
        if (amount == 0) {
            amount = address(this).balance;
        }

        // https://consensys.github.io/smart-contract-best-practices/recommendations/#dont-use-transfer-or-send
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed.");
    }

    /**
    Get the text content of a token.
     */
    function content(uint256 token) public view existingToken(token) returns (string memory) {
        string memory result = _textContents[token];
        //result = string(abi.encodePacked(result, strs[i]));

        return result;
    }

    function appearance(uint256 token) public view existingToken(token) returns (Appearance.AppearanceStruct memory) {
        return _appearance[token];
    }

    function _addText(uint256 tokenId, string memory _tokenURI) private {
        _textContents[tokenId] = _tokenURI;
    }

    function _setAppearance(uint256 tokenId, Appearance.AppearanceStruct memory lAppearance) private {
        _appearance[tokenId] = lAppearance;
    }

    /**
    Get the latest token ID to be minted
     */
    function getTokenId () public view returns (uint256) {
        return _tokenIds.current() - 1;
    }


    function tokenSvgSimulate(string memory text, Appearance.AppearanceStruct memory lappearance) public pure returns (string memory) {
        return SVGStrings.tokenSvgSimulate(text, lappearance);
    }


    /**
    Get NFT SVG url encoded
     */
    function tokenSvg(uint tokenId) public view existingToken(tokenId) returns (string memory) {
        return SVGStrings.tokenSvgSimulate(_textContents[tokenId], _appearance[tokenId]);
    }

    function tokenURI(uint256 tokenId) override(ERC721) public view returns (string memory) {
        string memory svg = tokenSvg(tokenId);
        string memory description = SVGStrings.cleanContents(_textContents[tokenId]);

        // return json with attributes
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "', description, '",',
                    '"description": "', description, '",',
                    '"image": "', svg, '",',
                    '"tokenId": "', Strings.toString(tokenId), '",',
                    '"external_url": "', _baseURI(), Strings.toString(tokenId), '"',
                    '}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    /**
    Get token data: text and svg
    */
    function tokenData(uint256 tokenId) public view existingToken(tokenId) returns (string memory, string memory, string memory, address, string memory) {
        return (
            Strings.toString(tokenId),
            _textContents[tokenId],
            this.tokenSvg(tokenId),
            this.ownerOf(tokenId),
            Strings.toString(_mintTimestamp[tokenId])
        );
    }


}
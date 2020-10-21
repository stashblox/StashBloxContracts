// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './interfaces/IERC1155Metadata.sol';
import './utils/StringUtils.sol';
import './lib/Callable.sol';
import './lib/Withdrawable.sol';

contract StashBlox is Callable, Withdrawable, IERC1155Metadata, StringUtils {

    using SafeMath for uint256;

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        _config.callbackAutoExecuteMaxAddresses = 50;
        _config.baseURI = "http://stashblox.com/tokens/";
        _transferOwnership(msg.sender);
    }

    /**
     * @param id Token ID
     * @return URI string
     */
    function uri(uint256 id) external view override returns (string memory) {
        return _strConcat(_config.baseURI, _toHexString(id));
    }


}

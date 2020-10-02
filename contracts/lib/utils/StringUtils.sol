// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

contract StringUtils {

    function _strConcat(string memory a, string memory b) internal pure returns (string memory) {
        bytes memory _ba = bytes(a);
        bytes memory _bb = bytes(b);
        string memory ab = new string(_ba.length + _bb.length);
        bytes memory _bab = bytes(ab);
        uint k = 0;
        uint i = 0;
        for (i = 0; i < _ba.length; i++) {
            _bab[k++] = _ba[i];
        }
        for (i = 0; i < _bb.length; i++) {
            _bab[k++] = _bb[i];
        }
        return string(_bab);
    }

    function _toHexDigit(uint8 d) internal pure returns (byte) {
        if (0 <= d && d <= 9) {
            return byte(uint8(byte('0')) + d);
        } else if (10 <= uint8(d) && uint8(d) <= 15) {
            return byte(uint8(byte('a')) + d - 10);
        }
        // revert("Invalid hex digit");
        revert();
    }

    function _toHexString(uint a) internal pure returns (string memory) {
        uint count = 0;
        uint b = a;
        while (b != 0) {
            count++;
            b /= 16;
        }
        bytes memory res = new bytes(count);
        for (uint i=0; i<count; ++i) {
            b = a % 16;
            res[count - i - 1] = _toHexDigit(uint8(b));
            a /= 16;
        }
        return string(res);
    }

    function _strContains(string memory what, string memory where) internal pure returns (bool) {
        bytes memory whatBytes = bytes (what);
        bytes memory whereBytes = bytes (where);

        for (uint i = 0; i < whereBytes.length - whatBytes.length; i++) {
            bool flag = true;
            for (uint j = 0; j < whatBytes.length; j++)
                if (whereBytes [i + j] != whatBytes [j]) {
                    flag = false;
                    break;
                }
            if (flag) return true;
        }
        return false;
    }

}

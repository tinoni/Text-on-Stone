//SPDX-License-Identifier: NONE

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Strings.sol";

library Appearance {

    struct AppearanceStruct {
        uint8 backgroundIndex;
        uint8 color0Index;
        uint8 color1Index;
        uint8 opacity;
        uint8 rotation;
        uint8 scale;
        uint8 fontIndex;
        uint8 fontColorIndex;
        uint8 fontSize;
    }

    function getColor(uint8 i) public pure returns (string memory) {
        string[95] memory colors = [
            "#b71c1c",
            "#d32f2f",
            "#f44336",
            "#e57373",
            "#ffcdd2",

            "#880e4f",
            "#c2185b",
            "#e91e63",
            "#f06292",
            "#f8bbd0",

            "#4a148c",
            "#7b1fa2",
            "#9c27b0",
            "#ba68c8",
            "#e1bee7",

            "#311b92",
            "#512da8",
            "#673ab7",
            "#9575cd",
            "#d1c4e9",

            "#1a237e",
            "#303f9f",
            "#3f51b5",
            "#7986cb",
            "#c5cae9",

            "#0d47a1",
            "#1976d2",
            "#2196f3",
            "#64b5f6",
            "#bbdefb",

            "#01579b",
            "#0288d1",
            "#03a9f4",
            "#4fc3f7",
            "#b3e5fc",

            "#006064",
            "#0097a7",
            "#00bcd4",
            "#4dd0e1",
            "#b2ebf2",

            "#004d40",
            "#00796b",
            "#009688",
            "#4db6ac",
            "#b2dfdb",

            "#194D33",
            "#388e3c",
            "#4caf50",
            "#81c784",
            "#c8e6c9",

            "#33691e",
            "#689f38",
            "#8bc34a",
            "#aed581",
            "#dcedc8",

            "#827717",
            "#afb42b",
            "#cddc39",
            "#dce775",
            "#f0f4c3",

            "#f57f17",
            "#fbc02d",
            "#ffeb3b",
            "#fff176",
            "#fff9c4",

            "#ff6f00",
            "#ffa000",
            "#ffc107",
            "#ffd54f",
            "#ffecb3",

            "#e65100",
            "#f57c00",
            "#ff9800",
            "#ffb74d",
            "#ffe0b2",

            "#bf360c",
            "#e64a19",
            "#ff5722",
            "#ff8a65",
            "#ffccbc",

            "#3e2723",
            "#5d4037",
            "#795548",
            "#a1887f",
            "#d7ccc8",

            "#263238",
            "#455a64",
            "#607d8b",
            "#90a4ae",
            "#cfd8dc",

            "#000000",
            "#525252",
            "#969696",
            "#d9d9Dd",
            "#ffffff"
        ];

        if (i >= colors.length) {
            i = uint8(colors.length - 1);
        }

        return colors[i];
    }

    function getFontName(uint8 i) public pure returns (string memory) {
        string[17] memory fonts = [
            "Arial, Helvetica Neue, Helvetica, sans-serif",
            "Arial Black, Arial Bold, Gadget, sans-serif",
            "Century Gothic, CenturyGothic, AppleGothic, sans-serif",
            "Gill Sans, Gill Sans MT, Calibri, sans-serif",
            "Tahoma, Verdana, Segoe, sans-serif",
            "Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
            "Garamond, Baskerville, Baskerville Old Face, Hoefler Text, Times New Roman, serif",
            "Georgia, Times, Times New Roman, serif",
            "Lucida Bright, Georgia, serif",
            "Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, Georgia, serif",
            "Baskerville, Baskerville Old Face, Hoefler Text, Garamond, Times New Roman, serif",
            "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif",
            "Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace",
            "Lucida Sans Typewriter, Lucida Console, monaco, Bitstream Vera Sans Mono, monospace",
            "Copperplate, Copperplate Gothic Light, fantasy",
            "Papyrus, fantasy",
            "Brush Script MT, cursive"
        ];

        if (i >= fonts.length) {
            i = uint8(fonts.length - 1);
        }

        return fonts[i];
    }

}
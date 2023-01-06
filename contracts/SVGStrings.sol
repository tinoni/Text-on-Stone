//SPDX-License-Identifier: NONE

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./Strings.sol";
import "./Appearance.sol";

library SVGStrings {
    using strings for *;

    /**
    Split content into lines
    Line delimiter is '^'
    */
    function contentLines(string memory contents) public pure returns (string[] memory) {
        strings.slice memory s = contents.toSlice();
        strings.slice memory delimiter = "^".toSlice();

        string[] memory lines = new string[](s.count(delimiter) + 1);
        for(uint i = 0; i < lines.length; i++) {
            lines[i] = s.split(delimiter).toString();
        }

        return lines;
    }


    /**
    Get rid of delimiter char '^'
     */
    function cleanContents(string memory contents) public pure returns (string memory) {
        string[] memory lines = contentLines(contents);
        string memory _cleanContents = lines[0];
        for (uint8 i = 1; i < lines.length; i++) {
            _cleanContents = string(abi.encodePacked(
                _cleanContents, ' ',
                lines[i]
            ));
        }

        return _cleanContents;
    }


    function getFontRef(uint8 i) public pure returns (string memory) {
        string memory font = Appearance.getFontName(i);

        return font;
    }


    function getBackround(uint8 i, uint8 icolor0, uint8 icolor1, uint8 iopacity, uint8 irotation, uint8 iscale) public pure returns (string memory) {
        string memory color0 = Appearance.getColor(icolor0);
        string memory color1 = Appearance.getColor(icolor1);
        string memory opacity = string(abi.encodePacked('0.', Strings.toString(iopacity)));
        string memory rotation = Strings.toString(irotation);
        string memory scale = Strings.toString(iscale);

        string memory rect = string(abi.encodePacked("<rect fill='url(#Pattern)' width='100%' height='100%' opacity='", opacity, "'/>"));
        string memory filterDarker = "<filter id='darker'><feColorMatrix in='SourceGraphic' type='matrix' values='0.6 0 0 0 0 0 0.6 0 0 0 0 0 0.6 0 0 0 0 0 1 0'/></filter>";

        // backgrounds
        string[13] memory backgrounds;

        // heart
        backgrounds[0] = string(abi.encodePacked(
            "<g opacity='", opacity, "'>",
                "<rect fill='", color0, "' width='100%' height='100%'/>",
                "<path d='M398.6 223.4C623.4-.4 833.6 331 400 680-33.6 331 176.6-.4 398.6 223.4Z' stroke-linecap='round' stroke-linejoin='round' fill='", color1, "' fill-opacity='0.9' stroke-width='10' stroke='", color1, "'/>",
            "</g>"
        ));

        // pattern like basket
        backgrounds[1] = string(abi.encodePacked(
            "<defs>",
                filterDarker,
                "<linearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'>",
                "<stop offset='0' stop-opacity='0'/>",
                "<stop offset='1'/>",
                "</linearGradient>",
                "<linearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'>",
                "<stop offset='0' stop-opacity='0'/>",
                "<stop offset='1'/>",
                "</linearGradient>",
                "<pattern id='c' x='0' y='0' width='.25' height='.25' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<path fill='", color0, "' d='M100 0h100v100H100zM0 100h100v100H0z' fill-opacity='.6'/>",
                "<g fill-opacity='.5'>",
                    "<path fill='url(#a)' d='M100 30 0 0h200z'/>",
                    "<path fill='url(#b)' d='M100 100 0 130v-30h200v30z'/>",
                "</g>",
                "</pattern>",
            "</defs>",
            "<g opacity='", opacity, "'>",
                "<path fill='", color0, "' d='M0 0h800v800H0z' filter='url(#darker)'/>",
                "<path fill='url(#c)' d='M0 0h800v800H0z'/>",
            "</g>"
        ));


        // pattern zigzag
        backgrounds[2] = string(abi.encodePacked(
            "<defs>",
                "<pattern id='Pattern' x='0' y='0' width='.15' height='.15' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<rect fill='", color0, "' width='120' height='120'/>",
                "<polygon fill='#000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern stripes
        backgrounds[3] = string(abi.encodePacked(
            "<defs>",
                filterDarker,
                "<pattern id='Pattern' x='0' y='0' width='.15' height='.15' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<g transform='scale(6)'>",
                    "<rect fill='", color0, "' width='20' height='20' filter='url(#darker)'/>",
                    "<g fill-opacity='1'>",
                    "<polygon fill='", color0, "' points='20 10 10 0 0 0 20 20'/>",
                    "<polygon fill='", color0, "' points='0 10 0 20 10 20'/>",
                    "</g>",
                "</g>",
                "</pattern>",
            "</defs>",
            rect
        ));

        // pattern arrow tip
        backgrounds[4] = string(abi.encodePacked(
            "<defs>",
                "<pattern id='Pattern' x='0' y='0' width='.25' height='.25' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<rect fill='", color0, "' width='200' height='200'/>",
                "<polygon fill='", color1, "' fill-opacity='1' points='100 0 0 100 100 100 100 200 200 100 200 0'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern fish skin
        backgrounds[5] = string(abi.encodePacked(
            "<defs>",
                "<pattern id='Pattern' width='70' height='70' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<rect width='100%' height='100%' fill='", color0, "'/>",
                "<path d='M20 7.5a 20 20 0 0 1 40 0h5a 5 5 0 0 1-10 0a 15 15 0 0 0-30 0a 5 5 0 0 1-10 0a 15 15 0 0 0-30 0h-5a 20 20 0 0 1 40 0z' fill='", color1, "'/>",
                "<path d='M0 27a 20 20 0 0 1 40 0h6a 6 6 0 0 1-12 0a 14 14 0 0 0-28 0a 6 6 0 0 1-12 0z' fill='", color1, "'/>",
                "<path d='M20 47.5a 20 20 0 0 1 40 0h5a 5 5 0 0 1-10 0a 15 15 0 0 0-30 0a 5 5 0 0 1-10 0a 15 15 0 0 0-30 0h-5a 20 20 0 0 1 40 0z' fill='", color1, "'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern mozaic
        backgrounds[6] = string(abi.encodePacked(
            "<defs>",
                "<pattern id='Pattern' width='200' height='200' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<rect width='100%' height='100%' fill='", color0, "'/>",
                "<path d='M0 0L20 0L20 20L0 20L0 0zM4.2 4.2L6 14L14 14L14 6zM20 20L40 20L40 40L20 40L20 20zM26 26L26 34L35.8 35.8L34 26z' fill='", color1, "'/>",
                "<path d='M26 6L35.8 4.2L34 14L24.5 15.5zM6 26L15.5 24.5L14 34L4.2 35.8z' fill='", color1, "'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern 3d cube
        backgrounds[7] = string(abi.encodePacked(
            "<defs>",
                filterDarker,
                "<pattern id='Pattern' width='56' height='100' viewBox='0 0 56 100' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                    "<rect width='56' height='100' fill='", color0, "' filter='url(#darker)'/>",
                    "<path d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='", color0, "' stroke-width='2' opacity='0.5'/>",
                    "<path d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='", color0, "' stroke-width='2'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern balloon
        backgrounds[8] = string(abi.encodePacked(
            "<defs>",
                "<pattern id='Pattern' width='20' height='20' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                    "<rect width='40' height='40' fill='", color0, "'/>",
                    "<circle r='9.2' stroke-width='2' stroke='", color1, "' fill='none'/>",
                    "<circle cy='18.4' r='9.2' stroke-width='2' stroke='", color1, "' fill='none'/>",
                    "<circle cx='18.4' cy='18.4' r='9.2' stroke-width='2' stroke='", color1, "' fill='none'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern metal dots
        backgrounds[9] = string(abi.encodePacked(
            "<defs>",
                filterDarker,
                "<filter id='sdarker'>",
                "<feColorMatrix in='SourceGraphic' type='matrix' values='0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 1 0'/>",
                "</filter>",
                "<pattern id='Pattern' width='15' height='15' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                    "<rect width='50' height='50' fill='", color0, "' filter='url(#darker)'/>",
                    "<circle cx='3' cy='4.3' r='1.8' fill='", color0, "'/>",
                    "<circle cx='3' cy='3' r='1.8' fill='", color0, "' filter='url(#sdarker)'/>",
                    "<circle cx='10.5' cy='12.5' r='1.8' fill='", color0, "'/>",
                    "<circle cx='10.5' cy='11.3' r='1.8' fill='", color0, "' filter='url(#sdarker)'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern checkered
        backgrounds[10] = string(abi.encodePacked(
            "<defs>",
                "<pattern id='Pattern' width='60' height='60' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<rect width='60' height='60' fill='", color0, "'/>",
                "<rect width='42.42' height='42.42' transform='translate(30 0) rotate(45)' fill='", color1, "'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern floral
        backgrounds[11] = string(abi.encodePacked(
            "<defs>",
                "<pattern id='Pattern' width='80' height='80' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<rect width='80' height='80' fill='", color0, "'/>",
                "<circle cx='40' cy='40' r='40' fill='", color1, "'/>",
                "<path d='M0 40 A40 40 45 0 0 40 0 A40 40 315 0 0 80 40 A40 40 45 0 0 40 80 A40 40 270 0 0 0 40Z' fill='", color0, "'/>",
                "</pattern>",
            "</defs>",
            rect
        ));


        // pattern metal mesh
        backgrounds[12] = string(abi.encodePacked(
            "<defs>",
                filterDarker,
                "<pattern id='Pattern' width='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(", rotation, ") scale(", scale, ")'>",
                "<rect width='8' height='8' fill='", color0, "' filter='url(#darker)'/>",
                "<path d='M0 0L8 8ZM8 0L0 8Z' stroke-width='1' stroke='", color0, "'/>",
                "</pattern>",
            "</defs>",
            rect
        ));

        /*
        // pattern irish kilt
        <defs>
            <pattern id="doodad" width="60" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(0), scale(2)">
            <g transform="scale(1 1.5)">
                <rect width="99" height="99" fill="#6d695c"/>
                <rect width="42.42" height="42.42" transform="translate(30 0) rotate(45)" fill="#625f53"/>
                <rect width="99" height="1" transform="rotate(45)" fill="#716f64"/>
                <rect width="99" height="1" transform="translate(0 60) rotate(-45)" fill="#716f64"/>
            </g>
            </pattern>
        </defs>
        <rect fill="url(#doodad)" height="100%" width="100%"/>
        */

        if (i >= backgrounds.length) {
            i = uint8(backgrounds.length - 1);
        }

        return backgrounds[i];
    }


    /**
    <svg width="300" height="200" style="border:1px solid black" xmlns="http://www.w3.org/2000/svg">
        <text y="50%" dominant-baseline="middle" text-anchor="middle">
            <tspan x="50%" dy="-2.4em">1 line: 0.0em</tspan>
            <tspan x="50%" dy="1.2em">2 lines: -0.6em</tspan>
            <tspan x="50%" dy="1.2em">3 lines: -1.2em</tspan>
            <tspan x="50%" dy="1.2em">4 lines: -1.8em</tspan>
            <tspan x="50%" dy="1.2em">5 lines: -2.4em</tspan>
        </text>
    </svg>
     */
    function tokenSvgSimulate(string memory text, Appearance.AppearanceStruct memory lappearance) public pure returns (string memory) {
        string[] memory texts = contentLines(text);
        uint nlines = texts.length;

        string memory SVGBackground = getBackround(lappearance.backgroundIndex, lappearance.color0Index, lappearance.color1Index, lappearance.opacity, lappearance.rotation, lappearance.scale);
        string memory fontName = getFontRef(lappearance.fontIndex);
        string memory fontColor = Appearance.getColor(lappearance.fontColorIndex);
        string memory fontSize = Strings.toString(lappearance.fontSize);

        uint dy = 1;
        uint dy2 = dy * 2;
        uint first_line_dy = (nlines-1) * dy;

        // first line of text
        string memory svg_texts =  string(abi.encodePacked(
            "<tspan x='50%' dy='",
            "-",
            Strings.toString(first_line_dy),
            "em'>", texts[0], "</tspan>"
        ));
        // remaining lines of text
        for (uint i=1; i < nlines; i++) {
            svg_texts = string(abi.encodePacked(
                svg_texts,
                "<tspan x='50%' dy='",
                Strings.toString(dy2),
                "em'>",
                texts[i],
                "</tspan>"
            ));
        }

        // add the text and svg envelope
        string memory svg = string(abi.encodePacked(
            "<svg width='800' height='800' xmlns='http://www.w3.org/2000/svg'>",
                SVGBackground,
                "<defs>",
                    "<filter id='shadow' x='-20' y='-20' height='150' width='150'>",
                    "<feOffset result='offset' in='SourceAlpha' dx='7' dy='7'/>",
                    "<feGaussianBlur result='blur' in='offset' stdDeviation='4'/>",
                    "<feBlend in='SourceGraphic' in2='blur'/>",
                    "</filter>",
                "</defs>",
                "<text y='50%' dominant-baseline='middle' text-anchor='middle' style='font-size:", fontSize, "em; font-family: ", fontName, "' fill='", fontColor, "' filter='url(#shadow)'>",
                    svg_texts,
                "</text>",
            "</svg>"
        ));

        // base64 encode
        svg = string(abi.encodePacked(
            'data:image/svg+xml;base64,',
            Base64.encode(bytes(svg))
        ));

        return svg;
    }


}
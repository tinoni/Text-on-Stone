import React, { useState, useEffect } from 'react';
import { SwatchesPicker } from 'react-color';
import './ColorPicker.css';

const ColorPicker = (props) => {

    // these are the colors of the smart contract
    const lcolors = [
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
        "#D9D9D9",
        "#FFFFFF"
    ];

    // organize colors into swats of 5 colors
    var colors = [];
    var swat = [];
    var c = 0;
    for (let i=0; i<lcolors.length; i++) {
        swat.push(lcolors[i]);
        c++;
        if (c >= 5) {
            colors.push(swat);
            c = 0;
            swat = [];
        }
    }
    if (swat.length) {
        colors.push(swat);
    }

    /**
     * Given a color returns an index
     * @param {string} _color
     * @returns integer Color index
     */
    const getColorIndex = (_color) => {
        let foundIndex = 0;
        for (let i=0; i<lcolors.length; i++) {
            if ((lcolors[i]).toLowerCase() === _color.toLowerCase()) {
                foundIndex = i;
                break;
            }
        }

        return foundIndex;
    };

    /**
     * Given an index, returns a color
     * @param {integer} _index
     * @returns Color, example '#ff0000'
     */
    const getColor = (_index) => {
        let maxIndex = lcolors.length - 1;
        if (_index > maxIndex) {
            _index = maxIndex;
        }

        return lcolors[_index];
    }

    const [color, setColor] = useState(getColor(props.value));
    const [displayPicker, setDisplayPicker] = useState(false);


    useEffect(() => {
        setColor(getColor(props.value));
    }, [props.value]);


    const handleChangeColor = (color, event) => {
        setColor(color.hex);
        setDisplayPicker(false);
        props.onChange(event, color, getColorIndex(color.hex));
        console.log(color);
    };

    const handleClose = () => {
        setDisplayPicker(false);
    };

    const handleClick = () => {
        setDisplayPicker((prevState) => {
            return !prevState;
        });
    };

    return (
        <div>
            <div className="cp_selectedColor" style={{ 'backgroundColor': color }} onClick={handleClick} title={props.placeholder}></div>
            {
                displayPicker &&
                <div className="cp_popover">
                <div className="cp_cover" onClick={handleClose}/>
                <SwatchesPicker colors={colors} color={color} onChangeComplete={handleChangeColor} className="cp_colorPicker" height={160}/>
                </div>
            }
        </div>
    );

}

export default ColorPicker;

import React, { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import './TextAreaEmoji.css';

const TextAreaEmoji = (props) => {
    const [displayPicker, setDisplayPicker] = useState(false);
    const [text, setText] = useState('');

    const handleChangeEmoji = (event) => {
        setDisplayPicker(false);
        let cursorPos = document.getElementById("textContents").selectionStart;
        setText((prevState) => {
            return prevState.slice(0, cursorPos) + event.native + prevState.slice(cursorPos);
        });

        let e = {target: {value: text.slice(0, cursorPos) + event.native + text.slice(cursorPos)}};
        props.onChange(e);
    };

    const handleChangeText = (event) => {
        let ltext = event.target.value;
        setText((prevState) => {
            return ltext;
        });
        props.onChange(event);
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
            <div className="form-group mr-sm-2 form-floating input_textarea">
            <img src='media/emoji.svg' className="tae_select" onClick={handleClick} alt="Emoji" />
            <textarea
                onChange={handleChangeText}
                id="textContents"
                type="text"
                className="form-control textareaEmoji"
                placeholder={props.placeholder}
                title={props.title}
                value={props.value}
                rows={5}
                required/>
            <label htmlFor="textContents">NFT Text</label>
            </div>
            {
                displayPicker &&
                <div className="tae_popover">
                <div className="tae_cover" onClick={handleClose}/>
                <Picker data={data} onEmojiSelect={handleChangeEmoji} theme="dark"/>
                </div>
            }
        </div>
    );

}

export default TextAreaEmoji;

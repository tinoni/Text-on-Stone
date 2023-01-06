import React, { useState, useEffect } from 'react';
import * as sanitizeHtml from 'sanitize-html';
import ColorPicker from './ColorPicker';
import TextAreaEmoji from './TextAreaEmoji';
import Faq from './Faq';
import Minted from './Minted';
import './Main.css';
import network from './config/config'

const Main = (props) => {

    const fonts = [
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

    const backs = [
        'heart',
        'basket',
        'zigzag',
        'stripes',
        'arrow tip',
        'fish skin',
        'mosaic',
        '3d cube',
        'balloon',
        'metal dots',
        'checkered',
        'floral',
        'metal mesh'
    ];

    const MAX_COLORS = 95;

    const [text, setText] = useState('Say something memorable!');
    const [previewSVG, setPreviewSVG] = useState('');
    const [appearance, setAppearance] = useState({
        // initialize with a random state
        background: Math.floor(Math.random() * backs.length).toString(),
        color0Index: Math.floor(Math.random() * MAX_COLORS).toString(),
        color1Index: Math.floor(Math.random() * MAX_COLORS).toString(),
        opacity: '99',
        rotation: '0',
        scale: '2',
        fontIndex: Math.floor(Math.random() * fonts.length).toString(),
        fontColorIndex: Math.floor(Math.random() * MAX_COLORS).toString(),
        fontSize: '3'
    });


    const sanitizeText = (text) => {
        text = sanitizeHtml(text, {
            allowedTags: [],
            allowedAttributes: {}
        });
         //newline delimiter is '^'
        text = text.replace(/\^/g, ' ');
        text = text.replace(/(?:\r\n|\r|\n)/g, '^');

        return text;
    }


    useEffect(() => {
        const text = localStorage.getItem('text');
        if ( text !== null ) setText(text);

        const appearance = localStorage.getItem('appearance');
        if ( appearance !== null ) setAppearance(JSON.parse(appearance));
    }, []);


    // debounce preview
    useEffect(() => {
        localStorage.setItem('text', text);
        localStorage.setItem('appearance', JSON.stringify(appearance));

        const preview = async () => {
            let textContents = sanitizeText(text);
            let lAppearance = [
                appearance.background,
                appearance.color0Index,
                appearance.color1Index,
                appearance.opacity,
                appearance.rotation,
                appearance.scale,
                appearance.fontIndex,
                appearance.fontColorIndex,
                appearance.fontSize
            ];
            let svg = await props.preview(textContents, lAppearance);
            setPreviewSVG(svg);
            console.log(svg);
        }

        const tid = setTimeout(() => {
            preview();
        }, 500);

        return () => {
            clearTimeout(tid);
        }

    }, [props, text, appearance]);


    const handleMint = event => {
        event.preventDefault();
        let textContents = text;
        textContents = sanitizeText(textContents);
        let lAppearance = [
            appearance.background,
            appearance.color0Index,
            appearance.color1Index,
            appearance.opacity,
            appearance.rotation,
            appearance.scale,
            appearance.fontIndex,
            appearance.fontColorIndex,
            appearance.fontSize
        ];

        props.mint(textContents, lAppearance);
    }

    const handleChangeText = event => {
        let ltext = event.target.value;
        setText((prevState) => {
            return ltext;
        });
    }

    const handleChangeAppearanceBackground = event => {
        let background = event.target.value;
        setAppearance((prevState) => {
            return {
                ...prevState,
                background: background
            };
        });
    }

    const handleChangeAppearanceColor0Index = (event, color, val) => {
        setAppearance((prevState) => {
            return {
                ...prevState,
                color0Index: val
            };
        });
    }

    const handleChangeAppearanceColor1Index = (event, color, val) => {
        setAppearance((prevState) => {
            return {
                ...prevState,
                color1Index: val
            };
        });
    }

    const handleChangeAppearanceOpacity = event => {
        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setAppearance((prevState) => {
            return {
                ...prevState,
                opacity: value
            };
        });
    }

    const handleChangeAppearanceRotation = event => {
        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setAppearance((prevState) => {
            return {
                ...prevState,
                rotation: value
            };
        });
    }

    const handleChangeAppearanceScale = event => {
        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setAppearance((prevState) => {
            return {
                ...prevState,
                scale: value
            };
        });
    }

    const handleChangeAppearanceFontIndex = event => {
        let val = event.target.value;
        setAppearance((prevState) => {
            return {
                ...prevState,
                fontIndex: val
            };
        });
    }

    const handleChangeAppearanceFontColorIndex = (event, color, val) => {
        setAppearance((prevState) => {
            return {
                ...prevState,
                fontColorIndex: val
            };
        });
    }

    const handleChangeAppearanceFontSize = event => {
        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setAppearance((prevState) => {
            return {
                ...prevState,
                fontSize: value
            };
        });
    }


    return (
        <div id="content">

            <div className="card mb-3 _border-light card--center" id="mint">
                <div className="card-header">
                <h3 className="text-center">Create, personalize and own unique text-based NFTs</h3>
                <p className="text-center"><a href="#faq">What is this?</a></p>
                </div>
                <div className="card-body">
                    <form onSubmit={handleMint}>
                        <div className='row'>
                            <div className="col-sm-8">
                            <div className='row mb-3'><div className="col-sm">
                                <TextAreaEmoji
                                    onChange={handleChangeText}
                                    value={text}
                                    type="text"
                                    className="form-control"
                                    placeholder="NFT Text"
                                    title="NFT Text" />
                            </div></div>
                            <div className='row mb-3'>
                            <div className="col-sm-5">
                                <div className="form-group mr-sm-2 form-floating">
                                    <select
                                    id="appearance_background"
                                    onChange={handleChangeAppearanceBackground}
                                    value={appearance.background}
                                    className="form-control"
                                    placeholder="Background"
                                    title="Background">
                                        {backs.map((val, key) => {
                                            return (
                                                <option value={key} key={key}>{val}</option>
                                            );
                                        })}
                                    </select>
                                    <label htmlFor="appearance_background">Background</label>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="form-group mr-sm-2">
                                    <label htmlFor="appearance_color0Index" className="form-label small">Color 0</label>
                                    <ColorPicker
                                        placeholder="Color 0"
                                        id="appearance_color0Index"
                                        onChange={handleChangeAppearanceColor0Index}
                                        value={appearance.color0Index}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="form-group mr-sm-2">
                                <label htmlFor="appearance_color1Index" className="form-label small">Color 1</label>
                                    <ColorPicker
                                        placeholder="Color 1"
                                        id="appearance_color1Index"
                                        onChange={handleChangeAppearanceColor1Index}
                                        value={appearance.color1Index}
                                    />
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="form-group mr-sm-2">
                                    <label htmlFor="appearance_opacity" className="form-label small">Opacity</label>
                                    <input
                                    type="range"
                                    className="form-range"
                                    min="1" max="99"
                                    id="appearance_opacity"
                                    onChange={handleChangeAppearanceOpacity}
                                    value={appearance.opacity}
                                    title="Opacity"/>
                                </div>

                            </div></div>
                            <div className='row mb-3'>
                            <div className="col-sm">

                                <div className="form-group mr-sm-2">
                                    <label htmlFor="appearance_rotation" className="form-label small">Rotation</label>
                                    <input
                                    type="range"
                                    min="0" max="255"
                                    id="appearance_rotation"
                                    onChange={handleChangeAppearanceRotation}
                                    className="form-range"
                                    title="Rotation"
                                    value={appearance.rotation}/>
                                </div>

                            </div>
                            <div className="col-sm">

                                <div className="form-group mr-sm-2">
                                    <label htmlFor="appearance_scale" className="form-label small">Scale</label>
                                    <input
                                    type="range"
                                    min="1" max="6"
                                    id="appearance_scale"
                                    onChange={handleChangeAppearanceScale}
                                    className="form-range"
                                    title="Scale"
                                    value={appearance.scale}/>
                                </div>

                            </div></div>
                            <div className='row mb-3'>
                            <div className="col-sm-5">

                                <div className="form-group mr-sm-2 form-floating">
                                    <select
                                    id="appearance_fontIndex"
                                    onChange={handleChangeAppearanceFontIndex}
                                    value={appearance.fontIndex}
                                    className="form-control"
                                    placeholder="Font"
                                    title="Font">
                                        {fonts.map((val, key) => {
                                            return (
                                                <option style={{fontFamily: val}} value={key} key={key}>{val}</option>
                                            );
                                        })}
                                    </select>
                                    <label htmlFor="appearance_fontIndex">Font</label>
                                </div>

                            </div>
                            <div className="col-sm-2">

                                <div className="form-group mr-sm-2">
                                    <label htmlFor="appearance_fontColorIndex" className="form-label small">Font color</label>
                                    <ColorPicker
                                        placeholder="Font color"
                                        id="appearance_fontColorIndex"
                                        onChange={handleChangeAppearanceFontColorIndex}
                                        value={appearance.fontColorIndex}
                                    />
                                </div>

                            </div>
                            <div className="col-sm">

                                <div className="form-group mr-sm-2">
                                    <label htmlFor="appearance_fontSize" className="form-label small">Font size</label>
                                    <input
                                    type="range"
                                    min="1" max="10"
                                    id="appearance_fontSize"
                                    onChange={handleChangeAppearanceFontSize}
                                    className="form-range"
                                    title="Font size"
                                    value={appearance.fontSize}/>
                                </div>
                            </div></div>

                            <div className='row mb-3'>
                                <div className="col-sm">
                                <div className="form-group mr-sm-2">
                                    <button type="submit" className="btn btn-primary" title="Mint NFT">Mint for {window.web3.utils.fromWei(props.minCost)} {network.currency}</button>
                                </div>
                            </div></div>
                            </div>
                            <div className="col-sm">
                                { previewSVG
                                    ? <div className="img-hover-zoom rounded"><img className="preview w-100 shadow-1-strong" src={previewSVG} alt="Preview" title="Preview"></img></div>
                                    : <p>Generating preview...</p>
                                }
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            <Minted nfts={props.nfts}/>

            <Faq minCost={window.web3.utils.fromWei(props.minCost) + network.currency}/>

        </div>
    );

}

export default Main;

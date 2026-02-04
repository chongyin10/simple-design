import React, { Component } from 'react';
import './index.less';

function Gen() {
    return (
        <div className='gen-main'>
            <div className="slider">
                <div className="content">
                    <div className="bg-img-div">
                        <img id="bg-img" src="" alt />
                    </div>
                    <div className="slider-img-div" id="slider-img-div">
                        <img id="slider-img" src="" alt />
                    </div>
                </div>
                <div className="slider-move">
                    <div className="slider-move-track">
                        拖动滑块完成拼图
                    </div>
                    <div className="slider-move-btn" id="slider-move-btn"></div>
                </div>
                <div className="bottom">
                    <div className="close-btn" id="slider-close-btn"></div>
                    <div className="refresh-btn" id="slider-refresh-btn"></div>
                </div>
            </div>
        </div>
    )
}

export default Gen;
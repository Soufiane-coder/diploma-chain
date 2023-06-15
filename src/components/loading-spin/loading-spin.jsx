import React from 'react';
import './loading-spin.scss';

const LoadingSpin = () => {
    return (
        <div className="loading-spin">
            <div className="loader">
                <div className="loader-text">Loading...</div>
                <div className="loader-bar"></div>
            </div>
        </div>
    )
}

export default LoadingSpin;
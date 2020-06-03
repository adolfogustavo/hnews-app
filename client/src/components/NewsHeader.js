import React from 'react';
import PropTypes from 'prop-types';

const NewsHeader = ({ title, subtitle }) => {
    return (
        <div className="header-cont">
            <div className="title">{title}</div><br></br>
            <div className="subtitle">{subtitle}</div>
        </div>
    );
};

NewsHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default NewsHeader;
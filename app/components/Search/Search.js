import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import mic from '../../images/SVG/031-mic.svg';
import './Search.scss';

const Search = ({ onChange, className, value }) => (
  <div className={`search-container ${className}`}>
    <input type="text" placeholder="Search" value={value} onChange={onChange} />
    <Icon className="mic-icon" path={mic} />
  </div>
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string
};

Search.defaultProps = {
  value: '',
  className: ''
};

export default Search;

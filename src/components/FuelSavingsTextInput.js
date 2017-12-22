import React from 'react';
import PropTypes from 'prop-types';

/**
 * FuelSavingsTextInput Component
 */
const FuelSavingsTextInput = ({name, value, placeholder, onChange}) => {
  return (
    <input
      className="small"
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}/>
  );
};

const { string, func, number, oneOfType } = PropTypes;

FuelSavingsTextInput.propTypes = {
  /**
   * Holds the name for the input
   * */
  name: string.isRequired,
  /**
   * Holds the change event handler for the input
   * */
  onChange: func.isRequired,
  /**
   * Holds the placeholder for the input
   * */
  placeholder: string,
  /**
   * Holds the value for the input
   * */
  value: oneOfType([
    string,
    number
  ])
};

export default FuelSavingsTextInput;

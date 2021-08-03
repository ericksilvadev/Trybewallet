import React from 'react';
import PropTypes from 'prop-types';

export default class CategorySelect extends React.Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <label htmlFor="category">
        Tag
        <select
          name="tag"
          id="category"
          value={ value }
          onChange={ onChange }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

CategorySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

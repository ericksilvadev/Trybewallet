import React from 'react';
import PropTypes from 'prop-types';

export default class PaymentSelect extends React.Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <label htmlFor="payment">
        Método de Pagamento
        <select
          data-testid="method-input"
          name="method"
          id="payment"
          value={ value }
          onChange={ onChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PaymentSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategorySelect from './CategorySelect';
import PaymentSelect from './PaymentSelect';
import { fetchCurrencies, editExpenseBtn } from '../actions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class EditExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { expenses, total, editExpense, editId } = this.props;
    const { value } = this.state;
    const { exchangeRates } = expenses[Number(editId)];
    const multiplier = exchangeRates.ask;
    const totalValue = value * multiplier;
    editExpense(
      { id: editId, ...this.state, exchangeRates },
      total + totalValue,
    );
    // this.setState(initialState);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    const currencyLength = 3;
    const filteredCurrencies = [...Object.keys(currencies)]
      .filter((curr) => curr.length === currencyLength);
    return (
      <form className="expenses-form" onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            id="value"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            data-testid="currency-input"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {filteredCurrencies.map((curr) => (
              <option key={ curr } value={ curr }>{curr}</option>
            ))}
          </select>
        </label>
        <PaymentSelect onChange={ this.handleChange } value={ method } />
        <CategorySelect onChange={ this.handleChange } value={ tag } />
        <label htmlFor="description">
          Descrição
          <textarea
            data-testid="description-input"
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button type="submit">Editar despesa</button>
      </form>
    );
  }
}

EditExpenseForm.propTypes = {
  editId: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    exchangeRates: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  editExpense: PropTypes.func.isRequired,
  total: PropTypes.number,
  currencies: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object]).isRequired,
};

EditExpenseForm.defaultProps = {
  total: 0,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  editExpense: (payload, total) => dispatch(editExpenseBtn(payload, total)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
  editId: state.wallet.editId,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);

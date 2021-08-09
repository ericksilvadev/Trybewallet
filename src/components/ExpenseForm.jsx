import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategorySelect from './CategorySelect';
import PaymentSelect from './PaymentSelect';
import { fetchCurrencies, actionAddExpense } from '../actions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
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
    const { getCurrencies } = this.props;
    getCurrencies();
    evt.preventDefault();
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    const total = JSON.parse(localStorage.getItem('total'));
    const { currencies, addExpense } = this.props;
    const { value, currency } = this.state;
    const { ask: multiplier } = currencies[currency];
    const totalValue = value * multiplier;
    addExpense(
      { id: expenses.length, ...this.state, exchangeRates: currencies },
      total + totalValue,
    );
    this.setState(initialState);
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
            className="value"
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
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
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button className="add" type="submit">Adicionar</button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (payload, total) => dispatch(actionAddExpense(payload, total)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

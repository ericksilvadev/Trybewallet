import React from 'react';
import PropTypes from 'prop-types';

export default class TableBoby extends React.Component {
  constructor() {
    super();
    this.totalValue = this.totalValue.bind(this);
  }

  totalValue() {
    const { expenses } = this.props;
    return expenses.reduce((acc, cur) => (
      acc + Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask)), 0);
  }

  render() {
    const { removeExpense, toggleEdit, expenses } = this.props;
    return (
      <tbody>
        { expenses.map((expense) => {
          const {
            id, description, tag, method, value, exchangeRates, currency } = expense;
          const currencyName = exchangeRates[currency].name.split('/');
          return (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{currencyName[0]}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  id={ id }
                  type="button"
                  data-testid="edit-btn"
                  name="edit"
                  onClick={ () => toggleEdit(id) }
                >
                  Editar
                </button>
                <button
                  id={ id }
                  type="button"
                  name="delete"
                  data-testid="delete-btn"
                  onClick={ () => removeExpense(id,
                    this.totalValue() - Number(value * exchangeRates[currency].ask)
                      .toFixed(2)) }
                >
                  Excluir
                </button>
              </td>
            </tr>);
        })}
      </tbody>
    );
  }
}

TableBoby.propTypes = {
  removeExpense: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

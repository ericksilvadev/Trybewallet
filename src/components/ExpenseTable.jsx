import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableBoby from './TableBody';
import { actionRemoveExpense, toggleEditBtn } from '../actions';

const tableHeaders = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class ExpenseTable extends React.Component {
  render() {
    const { removeExpense, toggleEdit, expenses } = this.props;
    return (
      <table>
        <thead>
          <tr className="table-header">
            { tableHeaders.map((header) => (<th key={ header }>{ header }</th>)) }
          </tr>
        </thead>
        <TableBoby
          removeExpense={ removeExpense }
          toggleEdit={ toggleEdit }
          expenses={ expenses }
        />
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id, value) => dispatch(actionRemoveExpense(id, value)),
  toggleEdit: (id) => dispatch(toggleEditBtn(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

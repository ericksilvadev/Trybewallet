import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableBoby from './TableBody';
import { actionRemoveExpense, toggleEditBtn } from '../actions';

const tableHeaders = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Moeda',
  'Valor',
  'Câmbio utilizado',
  'Moeda de conversão',
  'Valor convertido',
  'Editar/Excluir',
];

class ExpenseTable extends React.Component {
  render() {
    const { removeExpense, toggleEdit, expenses, editForm } = this.props;
    return (
      <table className="expenses">
        <thead className="table-header">
          <tr>
            { tableHeaders.map((header, index) => (
              <th key={ header } className={ index === 0 ? 'description' : '' }>
                { header }
              </th>
            )) }
          </tr>
        </thead>
        <TableBoby
          editForm={ editForm }
          removeExpense={ removeExpense }
          toggleEdit={ toggleEdit }
          expenses={ expenses }
        />
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  editForm: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editForm: state.wallet.editForm,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id, value) => dispatch(actionRemoveExpense(id, value)),
  toggleEdit: (id) => dispatch(toggleEditBtn(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

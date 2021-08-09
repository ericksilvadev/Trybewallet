import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import EditExpenseForm from './EditExpenseForm';
import ExpenseTable from './ExpenseTable';
import { fetchCurrencies } from '../actions';

class Expenses extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    const { loading, editForm } = this.props;
    if (loading) { return <p> CARREGANDO... </p>; }
    return (
      <>
        { editForm && <EditExpenseForm /> }
        { !editForm && <ExpenseForm /> }
        { expenses.length > 0
          ? <ExpenseTable />
          : <p className="no-expenses-text">Você ainda não possui nenhuma despesa</p> }
      </>
    );
  }
}

Expenses.propTypes = {
  loading: PropTypes.bool,
  getCurrencies: PropTypes.func.isRequired,
  editForm: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Expenses.defaultProps = {
  loading: true,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  loading: state.wallet.isFetching,
  editForm: state.wallet.editForm,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

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
    const { loading, editForm } = this.props;
    if (loading) { return <p> CARREGANDO... </p>; }
    return (
      <>
        { editForm && <EditExpenseForm /> }
        { !editForm && <ExpenseForm /> }
        <ExpenseTable />
      </>
    );
  }
}

Expenses.propTypes = {
  loading: PropTypes.bool,
  getCurrencies: PropTypes.func.isRequired,
  editForm: PropTypes.bool.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

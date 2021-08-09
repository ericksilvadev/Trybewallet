/* eslint-disable max-lines-per-function */
import {
  GET_CURRENCIES,
  FETCH_API,
  FAILED_REQUEST,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  TOGGLE_EDIT,
  EDIT_EXPENSE,
} from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
  total: 0,
  editForm: false,
  editId: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API:
    return { ...state, isFetching: true };
  case GET_CURRENCIES:
    return { ...state, isFetching: false, currencies: action.payload };
  case FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  case ADD_EXPENSE: {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    localStorage.setItem('expenses', JSON.stringify([...expenses, action.payload]));
    localStorage.setItem('total', JSON.stringify(action.total));
    return {
      ...state, expenses: [...state.expenses, action.payload], total: action.total };
  }
  case REMOVE_EXPENSE: {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    const fileredExpenses = [...expenses]
      .filter((expense) => expense.id !== Number(action.id));
    localStorage
      .setItem('expenses', JSON.stringify([...fileredExpenses]));
    localStorage.setItem('total', JSON.stringify(action.value));
    return {
      ...state,
      expenses: fileredExpenses,
      total: action.value,
    };
  }
  case TOGGLE_EDIT:
    return {
      ...state, editForm: true, editId: action.id };
  case EDIT_EXPENSE: {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    const newState = {
      ...state,
      editForm: false,
      expenses: [...expenses
        .filter((expense) => expense.id !== action.payload.id),
      { ...action.payload }].sort((a, b) => a.id - b.id) };
    const total = newState.expenses.reduce((acc, cur) => (
      acc + Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask)), 0);
    localStorage
      .setItem('expenses', JSON.stringify([...newState.expenses]));
    localStorage.setItem('total', JSON.stringify(total));
    return {
      ...state,
      ...state,
      editForm: false,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.payload.id),
      { ...action.payload }].sort((a, b) => a.id - b.id),
      total,
    };
  }
  default: return state;
  }
};

export default wallet;

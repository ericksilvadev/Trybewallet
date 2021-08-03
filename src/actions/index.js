import {
  SAVE_EMAIL,
  GET_CURRENCIES,
  FETCH_API,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  TOGGLE_EDIT,
  EDIT_EXPENSE,
} from './types';

export const actionSaveEmail = (payload) => ({ type: SAVE_EMAIL, payload });

const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

const fetchAPI = () => ({ type: FETCH_API });

// const failedRequest = (payload) => ({ type: FAILED_REQUEST, payload });

export const actionAddExpense = (payload, total) => ({
  type: ADD_EXPENSE, payload, total });

export const actionRemoveExpense = (id, value) => ({ type: REMOVE_EXPENSE, id, value });

export const toggleEditBtn = (id) => ({ type: TOGGLE_EDIT, id });

export const editExpenseBtn = (payload, total) => ({
  type: EDIT_EXPENSE, payload, total });

export const fetchCurrencies = () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(fetchAPI);
    const response = await fetch(endpoint);
    const currencies = await response.json();
    dispatch(getCurrencies(currencies));
  };
};

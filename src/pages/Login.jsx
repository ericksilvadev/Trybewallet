import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSaveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validEmail: true,
      validPassword: true,
      redirect: false,
      activeBtn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (!localStorage.expenses) {
      localStorage.setItem('expenses', JSON.stringify([]));
      localStorage.setItem('total', JSON.stringify(0));
    }
  }

  validate() {
    const { email, password } = this.state;
    const emailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordValidate = /(.+){6,25}/;
    if (!emailValidate.test(email) && email.length > 5) {
      this.setState({ validEmail: false, activeBtn: false });
      return false;
    }
    this.setState({ validEmail: true });
    if (!passwordValidate.test(password) && password.length > 2) {
      this.setState({ validPassword: false, activeBtn: false });
      return false;
    }
    this.setState({ validPassword: true });
    if (passwordValidate.test(password) && emailValidate.test(email)) {
      this.setState({ validPassword: true, activeBtn: true });
      return true;
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.validate());
  }

  handleClick(evt) {
    evt.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    if (this.validate()) {
      saveEmail(email);
      this.setState({ redirect: true });
    }
  }

  render() {
    const {
      email, password, redirect, activeBtn, validEmail, validPassword,
    } = this.state;
    if (redirect) { return <Redirect to="/carteira" />; }
    if (window.matchMedia('(max-width: 768px)').matches) {
      return <p className="mobile">Entre pelo desktop para visualizar esta aplicação</p>
    }
    return (
      <div className="home-page">
        <section className="info-container">
          <img
            src="/images/wallet (1).png"
            alt="default img"
          />
          <p>Tenha controle das suas despesas de forma rápida e prática</p>
        </section>
        <section className="login-container">
          <div className="heading">
            <h1>Bem vindo ao TrybeWallet!</h1>
            <h2 className="login-title">Faça login para acessar sua conta*</h2>
          </div>
          <form action="#" className="login-form">
            <div className="login-inputs-container">
              <label htmlFor="email">
                Email*
                <br />
                <input
                  type="text"
                  placeholder="email@exemplo.com"
                  autoComplete="off"
                  data-testid="email-input"
                  className={ validEmail ? 'login-input' : 'invalid-email login-input' }
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
                { !validEmail
                  && <p className="email-error">
                    Email inválido
                  </p>}
              </label>
              <label htmlFor="password">
                Senha*
                <br />
                <input
                  type="password"
                  data-testid="password-input"
                  className={ validPassword ? 'pass-input' : 'invalid-pass pass-input' }
                  name="password"
                  value={ password }
                  onChange={ this.handleChange }
                />
                { !validPassword
                  && <p className="pass-error">
                    A senha deve conter no mínimo 6 caracteres
                  </p>}
              </label>
              <button
                type="submit"
                className="login-btn"
                onClick={ this.handleClick }
                disabled={ !activeBtn }
              >
                Entrar
              </button>
            </div>
          </form>
          <footer className="footer">
            <p>
              *Todas as informações inseridas NÃO são salvas. Este é um site fictício.
            </p>
          </footer>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (payload) => dispatch(actionSaveEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

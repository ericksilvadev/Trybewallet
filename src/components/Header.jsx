import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    // const { total = 0 } = this.props;
    const total = JSON.parse(localStorage.getItem('total'));
    return (
      <header className="header">
        {/* <Logo className="logo" /> */}
        <div className="total">
          <h2>{total < 0 ? formatter.format(0) : formatter.format(total)}</h2>
          <p data-testid="total-field">
            Despesas totais
          </p>
        </div>
        <div className="currency-container">
          <p data-testid="header-currency-field">Moeda de conversão</p>
          <p className="currency">BRL</p>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  total: 0,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps, null)(Header);

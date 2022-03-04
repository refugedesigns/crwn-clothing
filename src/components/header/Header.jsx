import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { auth } from "../../firebase/firebase.config";

import "./header.styles.scss";
import CartIcon from "../cart-icon/CartIcon";
import CartDropdown from "../cart-dropdown/CartDropdown";

const Header = ({ currentUser, showCart }) => {

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            {" "}
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            {" "}
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      { showCart && <CartDropdown />}
    </div>
  );
};

const mapStateToProps = ({ user, cart }) => ({
  currentUser: user.currentUser,
  showCart: cart.showCart
});

export default connect(mapStateToProps)(Header);

import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { auth } from "../../firebase/firebase.config";

import "./header.styles.scss";
import CartIcon from "../cart-icon/CartIcon";
import CartDropdown from "../cart-dropdown/CartDropdown";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  showCart: selectCartHidden
});

export default connect(mapStateToProps)(Header);

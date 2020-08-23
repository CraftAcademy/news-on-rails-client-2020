import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "semantic-ui-react";
import auth from "../modules/auth";

const LoginButton = (props) => {
  const { t } = useTranslation();
  const clickHandler = () => {
    props.dispatch({
      type: "LOGIN_FORM_VISIBILITY",
      payload: { renderLoginForm: true },
    });
  };

  const logout = () => {
    auth.signOut()
    props.dispatch({
      type: "SIGNOUT",
      payload: {authenticated: false},
    });
    document.location.reload(true)
}

  let login;
  if (props.authenticated) {
    login = (
      <>
        <Button id={props.id} onClick={logout}>
          Logout
        </Button>
      </>
    );
  } else {
    login = (
      <>
        <Button id={props.id} onClick={clickHandler}>
          {t("login-button")}
        </Button>
      </>
    );
  }

  return <div>{ login }</div>;
};

// return <Button id={props.id} onClick={clickHandler}>{t("login-button")}</Button>
// }

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps)(LoginButton);

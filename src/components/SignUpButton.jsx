import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "semantic-ui-react"

const SignUpButton = (props) => {
  const { t } = useTranslation();
  const clickHandler = () => {
    props.dispatch({
      type: "SIGNUP_FORM_VISIBILITY",
      payload: { renderSignUpForm: true },
    });
  };

  return <Button id={props.id} onClick={clickHandler}>{t("signup-button")}</Button>;
};

export default connect()(SignUpButton);
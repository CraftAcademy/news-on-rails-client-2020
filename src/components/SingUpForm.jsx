import React from 'react'
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { useTranslation } from "react-i18next";

const SingUpForm = (props) => {
  const { t } = useTranslation();
  const registration = async (event) => {
    event.preventDefault();

    try {
      let response = await auth.signUp(
        event.target.email.value,
        event.target.password.value,
        event.target.passwordconfirmation.value
      );
      props.dispatch({
        type: "AUTHENTICATE",
        payload: {
          currentUser: { email: response.data.email, role: response.data.role },
        },
      });
    } catch (error) {
      
      props.dispatch({
        type: "FAIL_AUTHENTICATE",
        payload: {
          errorMessage: error.response.data.errors[0],
        },
      });
    }
  };

  return (
    <>
      <Segment placeholder>
        <Grid columns={1} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={registration} id="signup-form">
              <Form.Input
                id="email"
                icon="user"
                iconPosition="left"
                label={t("email-field")}
                placeholder={t("email-field")}
              />
              <Form.Input
                id="password"
                icon="lock"
                iconPosition="left"
                label={t("password-field")}
                placeholder={t("password-field")}
                type="password"
              />
              <Form.Input
                id="password-confirmation"
                icon="lock"
                iconPosition="left"
                label={t("password-confirmation-field")}
                placeholder={t("password-confirmation-field")}
                type="password"
              />
              <Button content={t("signup-button")} id="signup-submit" primary />
              <p>{props.errorMessage}</p>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
  };
};

export default connect(mapStateToProps)(SingUpForm)
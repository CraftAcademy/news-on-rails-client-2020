import React from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { useTranslation } from "react-i18next";

const LoginForm = (props) => {
  const { t } = useTranslation();
  const authenticate = async (event) => {
    event.preventDefault();
    try {
      let response = await auth.signIn(
        event.target.email.value,
        event.target.password.value
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
            <Form onSubmit={authenticate} id="login-form">
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
              <Button content={t("login-button")} id="login-submit" primary />
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

export default connect(mapStateToProps)(LoginForm);

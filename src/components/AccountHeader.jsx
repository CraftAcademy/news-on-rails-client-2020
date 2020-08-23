import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import i18n from "i18next";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AccountHeader = (props) => {
  const { t } = useTranslation();
  let isCurrentUserSubscriber = props.userRole === "subscriber" ? true : false;
  let isUserAuthenticated = props.authenticated;

  let becomeSubscriber;
  let registerUser;

  if (isCurrentUserSubscriber === false && isUserAuthenticated === true) {
    becomeSubscriber = (
      <Menu.Item
        name="subscription"
        as={Link}
        to={{ pathname: "/subscription" }}
        id="become-subscriber"
      >
        {t("become-subscriber-tab")}
      </Menu.Item>
    );
  }

  if (isCurrentUserSubscriber === false && isUserAuthenticated === false) {
    registerUser = (
      <Menu.Item
        name="registration"
        as={Link}
        to={{ pathname: "/registration" }}
        id="become-user"
      >
        <SignUpButton id="header-signup" />
      </Menu.Item>
    );
  }

  return (
    <Menu secondary vertical >
      {registerUser}
      <Menu.Item >
        <LoginButton id="header-login" />
      </Menu.Item>
      {becomeSubscriber}
      <Dropdown id="change-language" item text={t("language-tab")}>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              i18n.changeLanguage("sv");
            }}
          >
            Svenska
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          >
            English
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>

  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    userRole: state.currentUser.role,
  };
};

export default connect(mapStateToProps)(AccountHeader);
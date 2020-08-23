const initialState = {
  currentUser: { email: undefined, role: undefined },
  authenticated: false,
  renderLoginForm: false,
  renderSignUpForm: false,
  errorMessage: "",
  location: undefined,
};

export default initialState;
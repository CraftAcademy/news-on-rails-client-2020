import React, { Component } from "react";
import axios from "axios";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

class Subscription extends Component {
  state = {
    message: null,
  };

  payWithStripe = async (event) => {
    event.preventDefault();
    let stripeResponse = await this.props.stripe.createToken();

    stripeResponse.token && this.performPayment(stripeResponse.token.id);
  };

  performPayment = async (stripeToken) => {
    let headers = await JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.post(
      "/subscriptions",
      {
        stripeToken: stripeToken,
      },
      {
        headers: headers,
      }
    );

    if (response.data.paid === true) {
      this.setState({ message: response.data.message });
    }
  };

  render() {
    let message;

    this.state.message &&
      (message = (
        <>
          <p id="payment-message">{this.state.message}</p>
          <Link id="back-to-root-path" to={{ pathname: "/" }}>
            Go back to reading news
          </Link>
        </>
      ));

    return (
      <div>
        <Segment placeholder>
          <Grid columns={1} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={this.payWithStripe} id="payment-form">
                <label>Card number</label>
                <CardNumberElement />

                <label>Expiry Date</label>
                <CardExpiryElement />

                <label>CVC</label>
                <CardCVCElement />

                <Button id="submit-payment" type="submit">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>

        {message}
      </div>
    );
  }
}

export default injectStripe(Subscription);

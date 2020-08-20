import React, { useState } from "react";
import axios from "axios";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

const Subscription = (props) => {
  const [message, setMessage] = useState(null)

  const payWithStripe = async (event) => {
    event.preventDefault();
    let stripeResponse = await props.stripe.createToken();

    if (stripeResponse.token) {
      stripeResponse.token && performPayment(stripeResponse.token.id);
    } else {
      setMessage("Something went wrong!")
    }
  };

  const performPayment = async (stripeToken) => {
    let headers = await JSON.parse(localStorage.getItem("J-tockAuth-Storage"));

    try {
      let response = await axios.post(
        "/subscriptions",
        { stripeToken: stripeToken },
        { headers: headers }
      );

      if (response.data.paid === true) {
        setMessage(response.data.message)
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  };

  return (
    <>
      {message && (
        <>
          <p id="response-message">{message}</p>
          <Link id="back-to-root-path" to={{ pathname: "/" }}>
            Go back to reading news
          </Link>
        </>
      )}
      <Segment placeholder>
        <Grid columns={1} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={payWithStripe} id="payment-form">
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
    </>
  )
}

export default injectStripe(Subscription);

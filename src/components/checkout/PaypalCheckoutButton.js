import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaypalCheckoutButton = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const handleApprove = (orderId) => {
    // call backend functions to fulfill order
    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status
    // if response is error
    // setError("Your payment was processed successfully.However, we are unable to fulfill your purchase. Please contact us at support@designCode.io for assistance")
  };
  if (paidFor) {
    // Display success message, model or redirect user to success page
    alert("Thank you for your purchase");
    navigate("/buyTicketSuccess");
  }
  if (error) {
    // Display error message, model, redirect error page
    alert(error);
  }
  const convertPrice = (price) => {
    const realPrice = price.split(".000d");
    const changePrice = Math.floor(parseInt(realPrice[0]) / 24);
    return changePrice;
  };
  return (
    <div>
      <PayPalButtons
        style={{
          color: "silver",
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "pill",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `${props.trip.from} - ${props.trip.arrival}`,
                amount: {
                  value: convertPrice(props.trip.fare),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("order:", order);
          handleApprove(data.orderID);
        }}
        onError={(err) => {
          setError(err);
          console.log("PayPal Checkout onError: ");
        }}
        onCancel={() => {
          // Display cancel message, modal or redirect user to cancel page or back to cart page
        }}
        onClick={(data, action) => {
          // Validate on Button Click, client or server site
          const hasAlreadyBoughtCourse = false;
          if (hasAlreadyBoughtCourse) {
            setError(
              "You already bought this course. Go to your account to view your list of courses"
            );
            return action.reject();
          } else {
            return action.resolve();
          }
        }}
      />
    </div>
  );
};

export default PaypalCheckoutButton;

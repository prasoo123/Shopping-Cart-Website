import React from 'react';
import {PayPalScriptProvider , PayPalButtons} from '@paypal/react-paypal-js'
export default class PaypalButton extends React.Component {

   

    render() {
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'IN'; // or you can set this value from your props or state
        let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
        const onSuccess = (payment) => {
          // Congratulation, it came here means everything's fine!
              console.log("The payment was succeeded!", payment);
                  // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
                  this.props.tranSuccess(payment)
      }
        


        return (
          
            <PayPalScriptProvider options={{"client-id" : "Your-sandbox-clientID"}}>
             <PayPalButtons env={{env}} currency={{currency}} 
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total,
                        }
                      },
                    ],
                  });
                }} 

                  onCancel={async (data) => {
                    alert("Transaction Failed !!",data)
                  }}
                  
                  onError = {async(err) => {
                  alert("Error!", err);
                  }}
                  onApprove={onSuccess}
                  />
            </PayPalScriptProvider>
           
        );
    }
}




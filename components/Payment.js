import React, { useEffect } from 'react';
import { View, Text,Pressable} from 'react-native';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';

const App = () => {


  ///This useEffect Block will go to the RazorPay screen.
  useEffect(() => {
    console.log('MOUNTED');
    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        changeResponseText('orderId is :' + orderID);
      },
      onError(error, orderID) {
        changeResponseText(
          'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
        );
      },
    });

    return () => {
      console.log('UNMOUNTED');
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  const changeResponseText = (text) => {
    console.log(text); // Handle the text in your app (e.g., update state)
  };



  ///This function will be inside the payment util where you just import the file and call the function
  const startWebCheckout = async () => {
    try {
      const session = new CFSession(
        'session_7uSYkC-jQOI4lrj5z1k_0hkT0Eb5LCGOfESXnS-J6g5XDxdY-lVyXSriLBkifLKEWXeZsimDVMkF5vGDzPl0vS-XP40y1IBnPTVxO1NNXISV',
        'f2l34ol2',
        CFEnvironment.SANDBOX
      );
      console.log('Session', JSON.stringify(session));
      CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Pressable onPress={startWebCheckout}>
      <Text>Start Web Checkout</Text>
    </Pressable>
    // Add UI components as needed, such as a button to trigger the payment
  );
};

export default App;

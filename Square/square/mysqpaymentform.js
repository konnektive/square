/*
  Copyright 2019 Square Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Set the application ID
const applicationId = {Square-Application-ID};

// onGetCardNonce is triggered when the "Submit" button is clicked
function onGetCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce
  event.preventDefault();
  // Request a nonce from the SqPaymentForm object
  paymentForm.requestCardNonce();
}

// Create and initialize a payment form object
const paymentForm = new SqPaymentForm({
  // Initialize the payment form elements
  applicationId: applicationId,
  inputClass: 'sq-input',

  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [{
    fontSize: '16px',
    lineHeight: '24px',
    padding: '16px',
    placeholderColor: '#a0a0a0',
    backgroundColor: 'transparent',
  }],

  // Initialize the credit card placeholders
  cardNumber: {
    elementId: 'sq-card-number',
    placeholder: 'Card Number'
  },
  cvv: {
    elementId: 'sq-cvv',
    placeholder: 'CVV'
  },
  expirationDate: {
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY'
  },
  postalCode: {
    elementId: 'sq-postal-code',
    placeholder: 'Postal'
  },

  // SqPaymentForm callback functions
  callbacks: {
    /*
    * callback function: cardNonceResponseReceived
    * Triggered when: SqPaymentForm completes a card nonce request
    */
    cardNonceResponseReceived: function (errors, nonce, cardData) {
      if (errors) {
        var newLine = "\r\n";
		var errorMesssage = '';
        errors.forEach(function (error) {
         errorMesssage += error.message;
		 errorMesssage += newLine;
        });
        alert('Encountered errors:'+newLine+errorMesssage);
        return;
      }
	  
	   window.opener.document.getElementById("formCardNonce").value = nonce;
	   window.opener.document.getElementById("formCardNoncePostalCode").value = cardData.billing_postal_code;
	   // PS: This line can be ignored, If the customer needs to click the checkout form submit button again. 
	   // Trigger the checkout form submit button
	   // example script
	   // window.opener.document.getElementById("formSubmit").click();	   
	   window.close();
    },
	// PS: Ignore this "paymentFormLoaded" block, If the customer needs to re-enter the billing postal code in the square credit card form
	paymentFormLoaded: function() {
	  var billingPostalCode = '';
	  // Set billing postal code in the Square credit card form
	  // example script
	  // billingPostalCode = window.opener.document.getElementById("shipPostalCode").value;	  
      paymentForm.setPostalCode(billingPostalCode);
    }
  }
});

<script lang="ts">
        import { fade } from "svelte/transition";
        import { baseImageRoute, dictionary } from "../stores";
    
        type PaymentMethod = 'card' | 'netbanking' | 'emi' | 'googlepay' | 'cod';
        type CartItem = { name: string; price: number; quantity: number; img:string};
    
        let shippingAddress: string = 'B-101, Kingston Road, New Town Kingham, MarsPlanet 456123';
        let phoneNumber: string = '+1 (029) 979-2458';
        let selectedPaymentMethod: PaymentMethod | null = null;
        let cartItems: CartItem[] = [
    { name: 'Aero Dynamic Cycling Jersey', price: 59.99, quantity: 1, img: `${baseImageRoute}/Resources/Jersey2024RedBig.webp` },
    { name: 'Pro-Fit Padded Cycling Shorts', price: 45.50, quantity: 2, img: `${baseImageRoute}/Resources/RadaSocks.webp` },
    { name: 'High-Visibility Waterproof Jacket', price: 89.95, quantity: 1, img: `${baseImageRoute}/Resources/Jersey2024BlueFace.webp` },
    { name: 'Performance Cycling Gloves', price: 25.99, quantity: 1, img: `${baseImageRoute}/Resources/CyclingBib2024.webp` },
    { name: 'Ergonomic Bike Saddle', price: 75.00, quantity: 1, img: `${baseImageRoute}/Resources/1BibPlus2Jerseys.webp` }
];
        let taxRate: number = 0.1; // 10% tax rate
    
        let fullName: string = '';
    let email: string = '';
    let city: string = '';
    let postalCode: string = '';
    let country: string = '';
        
        // Function to handle form submission
        function submitForm() {
          // Add validation logic for the new fields
        if (!selectedPaymentMethod || !fullName || !email || !shippingAddress || !city || !postalCode || !country || !phoneNumber) {
            console.error('Please fill in all the fields');
            return;
        }

        // Logging for demonstration purposes
        console.log('Form submitted with following details:', {
            fullName,
            email,
            shippingAddress,
            city,
            postalCode,
            country,
            phoneNumber,
            selectedPaymentMethod
        });
          
            if (!selectedPaymentMethod) {
                console.error('Please select a payment method');
                return;
            }
    
            if (!validatePhoneNumber(phoneNumber)) {
                console.error('Invalid phone number');
                return;
            }
    
            console.log('Form submitted with shipping address:', shippingAddress);
            console.log('Selected payment method:', selectedPaymentMethod);
        }
    
        // Calculate the total price of the cart
        const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
        // Calculate the total tax
        const getTotalTax = () => getTotalPrice() * taxRate;
    
        // Function to validate phone number
        function validatePhoneNumber(phone: string): boolean {
            // Add your phone number validation logic here
            return true;
        }


        let mcDo:boolean = false;
    </script>
    
    <div class="checkout" in:fade>
        <div class="checkout-header">
            <h1>Checkout</h1>
        </div>
    
        {#if mcDo}
          <div class="mcDo">
            <h2>You might be interested in:</h2>
            <div class="extra">
              <img src={`${baseImageRoute}/Resources/Jersey2024RedBig.webp`} alt="Hola lola">

              <button>
                I want it!
                <ion-icon name="add"></ion-icon>
              </button>
            </div>

            <div class="extra">
              <img src={`${baseImageRoute}/Resources/Jersey2024RedBig.webp`} alt="Hola lola">

              <button>
                I want it!
                <ion-icon name="add"></ion-icon>
              </button>
            </div>

            <button on:click={() => mcDo = false}>Skip</button>
          </div>
        {:else}
          <form on:submit|preventDefault={submitForm}>
            <div class="user-info">
              <input type="text" bind:value={fullName} placeholder="Full Name">
              <input type="email" bind:value={email} placeholder="Email Address">
              <input type="text" bind:value={shippingAddress} placeholder="Shipping Address">
              <input type="text" bind:value={city} placeholder="City">
              <input type="text" bind:value={postalCode} placeholder="Postal Code">
              <input type="text" bind:value={country} placeholder="Country">
              <input type="tel" bind:value={phoneNumber} placeholder="Phone Number">
            </div>
            
            <div class="payment-methods">
              <label>
                <input type="radio" bind:group={selectedPaymentMethod} value="card">
                <span class="checkmark"></span>
                Debit/Credit/ATM Card
              </label>
              <label>
                <input type="radio" bind:group={selectedPaymentMethod} value="netbanking">
                <span class="checkmark"></span>
                Net Banking
              </label>
              <label>
                <input type="radio" bind:group={selectedPaymentMethod} value="emi">
                <span class="checkmark"></span>
                EMI
              </label>
              <label>
                <input type="radio" bind:group={selectedPaymentMethod} value="googlepay">
                <span class="checkmark"></span>
                UPI/Google Pay
              </label>
              <label class="disabled">
                <input type="radio" bind:group={selectedPaymentMethod} value="cod" disabled>
                <span class="checkmark"></span>
                Cash on Delivery (Unavailable)
              </label>
            </div>
      
            <div class="cart-items">
              {#each cartItems as item}
              <div class="cart-item">
                  <img src={item.img} alt={item.name} />
                  <div class="item-details">
                      <p>{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
              </div>
              {/each}
          </div>
          
            
              <div class="totals">
                  <div>
                      <h2>Sub Total</h2>
                      <span class="value">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div>
                      <h2>Tax</h2>
                      <span class="value">${getTotalTax().toFixed(2)}</span>
                  </div>
                  <div>
                      <h2>Total Amount</h2>
                      <span class="value">${(getTotalPrice() + getTotalTax()).toFixed(2)}</span>
                  </div>
              </div>
      
              <button type="submit" class="continue-btn">Continue</button>
          </form>
        {/if}
    </div>
    

<style>
    /* Base styles for the checkout form */
    .checkout {
      max-width: 400px;
      margin: 20px auto;
      margin-top: 5rem;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  
    /* Header style */
    .checkout-header {
      margin-bottom: 30px;
      text-align: left;
      border-bottom: 1px solid var(--content-8);
      padding-bottom: 10px;
    }

    /* User Information Form Styles */
.user-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 20px;
}

.user-info input[type="text"],
.user-info input[type="email"],
.user-info input[type="tel"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.user-info input[type="text"]:focus,
.user-info input[type="email"]:focus,
.user-info input[type="tel"]:focus {
    outline: none;
    border-color: var(--content);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.user-info input::placeholder {
    color: var(--content-8);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
    .user-info {
        grid-template-columns: 1fr;
    }
}
  
    /* Style for the payment methods section */
    .payment-methods {
      margin: 30px 0;
    }
  
    /* Custom radio button styling */
    .payment-methods label {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  
    /* Hide the browser's default radio button */
    .payment-methods label input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
  
    /* Create a custom radio button */
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: var(--content);
      border-radius: 50%;
      border: 1px solid var(--content-8);
    }
  
    /* When the radio button is checked, add a blue background */
    .payment-methods label input:checked ~ .checkmark {
      background-color: var(--interactive);
    }
  
    /* Create the indicator (the dot/circle) - when checked */
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
  
    /* Show the indicator (dot/circle) when checked */
    .payment-methods label input:checked ~ .checkmark:after {
      display: block;
    }
  
    /* Style the indicator (dot/circle) */
    .payment-methods label .checkmark:after {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--content);
    }
  
    /* Style for the totals section */
    .totals {
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .totals div {
        display: grid;
        grid-auto-flow: column;
    }
  
    /* Bold style for total labels */
    .totals h2 {
        font-size: medium;
        font-weight: bold;
    }
  
    /* Style for total values */
    .totals .value {
        justify-self: end;
    }
  
    /* Clear float */
    .totals:after {
      content: "";
      display: table;
      clear: both;
    }
  
    /* Style for the continue button */
    .continue-btn {
      width: 100%;
      padding: 10px;
      background-color: var(--interactive);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: filter .3s ease;
    }
  
    .continue-btn:hover {
      filter: brightness(200%);
    }
  
    /* Disabled style for unavailable options */
    .disabled {
      color: var(--content-5);
    }
  
    .disabled .checkmark {
      background-color: var(--content-6);
      border-color: var(--content-5);
    }

    /* Styles for Cart Items */
.cart-items {
    display: flex;
    flex-direction: column;
    margin: 3rem 0;
}

.cart-item {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 2rem .5rem;
}

.cart-item img {
    width: 100px; /* Adjust as needed */
    height: auto;
    border-radius: 4px;
    margin-right: 15px;
}

.item-details p {
    margin: 5px 0;
    font-size: 14px;
}



.mcDo div.extra {
    padding: 20px; /* Spacing inside the container */
    margin: 2rem auto;
    border-radius: 8px; /* Rounded corners */
    display: grid; /* Aligns the image and button side by side */
    justify-items: center;
    background-color: white;
    box-shadow: 0 0 1rem var(--content-2);
    width: fit-content;
    align-items: center; /* Centers items vertically */
    gap: 20px; /* Spacing between items */
  }

  .mcDo div.extra img {
    max-width: 100px; /* Limit image size */
    border-radius: 4px; /* Optional: rounded corners for the image */
  }

  .mcDo button {
    background-color: var(--interactive); /* Button background color */
    border: none; /* Remove default border */
    padding: 10px 20px; /* Padding inside the button */
    border-radius: 4px; /* Rounded corners for the button */
    cursor: pointer; /* Hand cursor on hover */
    margin: auto;
    display: flex; /* To align the text and icon */
    align-items: center; /* Center the text and icon vertically */
    gap: 5px; /* Spacing between text and icon */
  }

  .mcDo button:hover {
    filter: brightness(200%);
  }

  .mcDo button ion-icon {
    --ionicon-stroke-width: 48px; /* Adjusts the stroke width of the icon */
  }

  </style>
  
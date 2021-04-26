import axios from 'axios';
import { popAlert } from './alert';

const stripe = Stripe(
  'pk_test_51IhBWuDIZKozduyXk1W591tdkgL2vSaPxZANJTi4UTPIDgDCEU53H7ZV5BeX1bGnv0H43xbRWi8xJPxwekODSILA00SxfgtoLj'
);

export const orderProduct = async (productId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/orders/checkout-session/${productId}`
    );
    console.log(session);

    // 2)  Create checkout form and charge through card.
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    popAlert('error', err);
  }
};

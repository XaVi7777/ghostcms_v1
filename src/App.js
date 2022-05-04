import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { string } from 'prop-types';

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, nearConfig, wallet }) => {

  useEffect(() => {
    contract.isSubscriber({ currentUserID: 'ikursakov.testnet' }).then((result => {
      console.log('result', result)
    }));
  }, []);

  const subscribe = () => {
    contract.addSubscriber({
      id: 'ikursakov.testnet', expirationDate: String(Date.now()),
    }, BOATLOAD_OF_GAS, Big('1').times(10 ** 24).toFixed())
  }

  const signIn = () => {
    wallet.requestSignIn(
      { contractId: nearConfig.contractName, }, //contract requesting access
      'NEAR Guest Book', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const onRemoveHandler = async () => {
    console.log('contract', contract)
    contract.removeSubscriber({
      id: 'ikursakov.testnet'
    })
  }

  return (
    <main>
      <button onClick={subscribe}>Subscribe</button>
      <button onClick={onRemoveHandler}>Remove</button>
    </main>
  );
};

App.propTypes = {
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;

import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import '@ethersproject/shims';

// IMP START - Quick Start
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import Web3Auth, {
  ChainNamespace,
  LOGIN_PROVIDER,
  WEB3AUTH_NETWORK,
  OPENLOGIN_NETWORK
} from '@web3auth/react-native-sdk';
import { ethers } from 'ethers';
import EncryptedStorage from 'react-native-encrypted-storage';

// IMP END - Quick Start

// const scheme = 'web3authrnexample'; // Or your desired app redirection scheme
const scheme = 'loot8auth'; // Or your desired app redirection scheme

// IMP START - Whitelist bundle ID
const redirectUrl = `${scheme}://openlogin`;
// IMP END - Whitelist bundle ID

// IMP START - Dashboard Registration
// loot8 clientid
// const clientId = BMScPSvGpV7MT6YhLsz3PfBhViMtHGnwjrMivLi6Pt1nmAF6xwjkIe2DvBQSY544SC4k39idA8rWd_hD5RKG8x0
const clientId =
  'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ'; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

// IMP START - SDK Initialization
const chainConfig = {
  chainId: '0xaa36a7',
  chainNamespace: ChainNamespace.EIP155,
  rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  blockExplorerUrl: 'https://sepolia.etherscan.io',
  decimals: 18,
  displayName: 'Ethereum Sepolia Testnet',
  logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  ticker: 'ETH',
  tickerName: 'Ethereum',
};

const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
});

const web3auth = new Web3Auth(WebBrowser, EncryptedStorage, {
  clientId,
  network: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // or other networks
  privateKeyProvider: ethereumPrivateKeyProvider,
  redirectUrl,
});

console.log("🚀 ~ web3auth:", web3auth)
// IMP END - SDK Initialization

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // @ts-ignore
  const [provider, setProvider] = useState(null);
  const [console, setConsole] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      // IMP START - SDK Initialization
      await web3auth.init();
      // @ts-ignore
      if (web3auth.privKey) {
        // @ts-ignore
        await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
        // IMP END - SDK Initialization
        // @ts-ignore
        setProvider(ethereumPrivateKeyProvider);
        setLoggedIn(true);
      }
    };
    init();
  }, []);

  const login = async () => {
    // @ts-ignore
    try {
      if (!web3auth.ready) {
        setConsole('Web3auth not initialized');
        return;
      }
      if (!email) {
        setConsole('Enter email first');
        return;
      }

      setConsole('Logging in');
      await web3auth.login({
        extraLoginOptions: {
          login_hint: email,
        },
        loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
      });
      // @ts-ignore

      if (web3auth.privKey) {
        // @ts-ignore

        await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
        // @ts-ignore

        setProvider(ethereumPrivateKeyProvider);
        uiConsole('Logged In');
        setLoggedIn(true);
      }
    } catch (error: unknown) {
      // @ts-ignore
      setConsole(error.message);
    }
  };

  const logout = async () => {
    if (!web3auth.ready) {
      setConsole('Web3auth not initialized');
      return;
    }

    setConsole('Logging out');
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout

    // @ts-ignore
    if (!web3auth.privKey) {
      setProvider(null);
      uiConsole('Logged out');
      setLoggedIn(false);
    }
  };

  // IMP START - Blockchain Calls
  const getAccounts = async () => {
    if (!provider) {
      uiConsole('provider not set');
      return;
    }
    setConsole('Getting account');
    // For ethers v5
    // const ethersProvider = new ethers.providers.Web3Provider(this.provider);
    const ethersProvider = new ethers.BrowserProvider(provider!);

    // For ethers v5
    // const signer = ethersProvider.getSigner();
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole('provider not set');
      return;
    }
    setConsole('Fetching balance');
    // For ethers v5
    // const ethersProvider = new ethers.providers.Web3Provider(this.provider);
    const ethersProvider = new ethers.BrowserProvider(provider!);

    // For ethers v5
    // const signer = ethersProvider.getSigner();
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();

    // Get user's balance in ether
    // For ethers v5
    // const balance = ethers.utils.formatEther(
    // await ethersProvider.getBalance(address) // Balance is in wei
    // );
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address), // Balance is in wei
    );
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole('provider not set');
      return;
    }
    setConsole('Signing message');
    // For ethers v5
    // const ethersProvider = new ethers.providers.Web3Provider(this.provider);
    const ethersProvider = new ethers.BrowserProvider(provider!);

    // For ethers v5
    // const signer = ethersProvider.getSigner();
    const signer = await ethersProvider.getSigner();
    const originalMessage = 'YOUR_MESSAGE';

    // Sign the message
    const signedMessage = await signer.signMessage(originalMessage);
    uiConsole(signedMessage);
  };
  // IMP END - Blockchain Calls

  const launchWalletServices = async () => {
    if (!web3auth) {
      setConsole('Web3auth not initialized');
      return;
    }

    setConsole('Launch Wallet Services');
    await web3auth.launchWalletServices(chainConfig);
  };

  const uiConsole = (...args: unknown[]) => {
    setConsole(JSON.stringify(args || {}, null, 2) + '\n\n\n\n' + console);
  };

  const loggedInView = (
    <View style={styles.buttonArea}>
      <Button
        onPress={() => uiConsole(web3auth.userInfo())}
        title="Get User Info"
      />
      <Button onPress={() => getAccounts()} title="Get Accounts" />
      <Button onPress={() => getBalance()} title="Get Balance" />
      <Button onPress={() => signMessage()} title="Sign Message" />
      <Button onPress={() => launchWalletServices()} title="Show Wallet UI" />
      <Button onPress={logout} title="Log Out" />
    </View>
  );

  const unloggedInView = (
    <View style={styles.buttonAreaLogin}>
      <TextInput
        onChangeText={setEmail}
        placeholder="Enter email"
        style={styles.inputEmail}
      />
      <Button onPress={login} title="Login with Web3Auth" />
    </View>
  );

  return (
    <View style={styles.container}>
      {loggedIn ? loggedInView : unloggedInView}
      <View style={styles.consoleArea}>
        <Text style={styles.consoleText}>Console:</Text>
        <ScrollView style={styles.console}>
          <Text>{console}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonArea: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  buttonAreaLogin: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
    paddingBottom: 30,
  },
  console: {
    backgroundColor: '#CCCCCC',
    color: '#ffffff',
    flex: 1,
    padding: 10,
    width: Dimensions.get('window').width - 60,
  },
  consoleArea: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  consoleText: {
    padding: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 50,
  },
  inputEmail: {
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 20,
    padding: 10,
    width: 300,
  },
});

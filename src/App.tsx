import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import "antd/dist/antd.css";
import { POLLING_INTERVAL } from "./screen/wallet/connectors";
import { HomeScreenContainer } from "./screen/home/home-screen.container";

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <HomeScreenContainer />
    </Web3ReactProvider>
  );
}

export default App;

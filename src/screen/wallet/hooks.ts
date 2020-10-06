import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { metamask } from "./connectors";
import { Web3Provider } from "@ethersproject/providers";

export const useAuthorizedMetamask = () => {
  const { active, activate } = useWeb3React<Web3Provider>();
  const [attempted, setAttempted] = useState(false);
  const [attempting, setAttempting] = useState(false);
  useEffect(() => {
    if (attempting) return;
    const attemptToConnect = async () => {
      setAttempting(true);
      try {
        const isAuthorized = await metamask.isAuthorized();
        if (!active && isAuthorized) {
          activate(metamask);
        }
      } catch (err) {
        alert(err);
      }
      setAttempting(false);
      setAttempted(true);
    };
    attemptToConnect();
  }, []);

  return { attempting, attempted };
};

//subscribe to listener iff metamask exists
export const useSubscribeToEthereum = (subscribe: boolean) => {
  const { activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && subscribe) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        // activate(injected);
      };
      const handleChainChanged = (chainId: number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        // activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          // activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        window.location.reload();
        // activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [activate, subscribe]);
};

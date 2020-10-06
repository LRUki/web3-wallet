import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "./connectors";
import React, { FC } from "react";
import { SelectWallet, WalletType } from "./select-wallet.screen";
export const SelectWalletContainer: FC<{}> = () => {
  const { activate, active } = useWeb3React();
  const onClick = (wallet: WalletType) => {
    switch (wallet) {
      case "Metamask":
        activate(injected, (err) => {
          alert(err);
        });
        break;
      case "WalletConnect":
        //throws error, fix needed!
        activate(walletconnect, (err) => {
          alert(err);
        });
        break;
      default:
        alert("wallet not supported yet");
    }
  };
  return <SelectWallet active={active} onClick={onClick} />;
};

import { useWeb3React } from "@web3-react/core";
import React, { FC } from "react";
import { useAuthorizedMetamask, useSubscribeToEthereum } from "../wallet/hooks";
import { HomeScreen } from "./home-screen";
export const HomeScreenContainer: FC<{}> = () => {
  const { active, deactivate, error } = useWeb3React();
  const { attempted, attempting } = useAuthorizedMetamask();

  useSubscribeToEthereum(attempted && active && !error);
  return (
    <HomeScreen
      active={active}
      deactivate={deactivate}
      attempting={attempting}
    />
  );
};

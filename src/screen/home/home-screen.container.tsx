import { useWeb3React } from "@web3-react/core";
import React, { FC } from "react";
import { useAuthorizedMetamask, useSubscribeToEthereum } from "../wallet/hooks";
import { HomeScreen } from "./home-screen";
export const HomeScreenContainer: FC<{}> = () => {
  const { active, deactivate, error } = useWeb3React();
  const { attempted, attempting } = useAuthorizedMetamask();

  const count = useSubscribeToEthereum(attempted && active && !error);
  return (
    <HomeScreen
      active={active}
      deactivate={deactivate}
      attempting={attempting}
      count={count} //this count is just for preventing react-web3 to throw error when network change occurs ... better workarounds?
    />
  );
};

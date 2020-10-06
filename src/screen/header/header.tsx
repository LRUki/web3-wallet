import React, { FC } from "react";
import { Flexbox, View } from "../../components/view";
import { SelectWalletContainer } from "../wallet/select-wallet.container";
export const Header: FC<{}> = () => {
  return (
    <Flexbox
      paddingX="30px"
      paddingY="20px"
      backgroundColor="#49e3b0"
      flexDirection="row"
      justifyContent="space-between"
      fontWeight="bold"
      fontSize="25px"
      alignItems="center"
      color="white"
    >
      <View>MyDapps</View>
      <View>
        <SelectWalletContainer />
      </View>
    </Flexbox>
  );
};

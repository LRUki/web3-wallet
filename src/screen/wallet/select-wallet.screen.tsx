import React, { FC } from "react";
import { View } from "../../components/view";
import { Menu } from "antd";
const { SubMenu } = Menu;

export type WalletType = "Metamask" | "WalletConnect" | undefined;
type Props = {
  active: boolean;
  onClick: (wallet: WalletType) => void;
};
export const SelectWallet: FC<Props> = ({ active, onClick }) => {
  return (
    <View>
      <Menu
        mode="horizontal"
        theme="light"
        onClick={({ key }) => {
          onClick(key as WalletType);
        }}
      >
        <SubMenu
          title={active ? `connected!` : "connect to a wallet!!"}
          key="subMenu"
          style={{
            fontSize: "18px",
            color: "#6d2b94",
          }}
        >
          <Menu.Item key="Metamask">Metamask</Menu.Item>
          <Menu.Item key="WalletConnect">WalletConnect</Menu.Item>
        </SubMenu>
      </Menu>
    </View>
  );
};

import React, { FC } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button } from "antd";
import { formatEther } from "ethers/lib/utils";
import { View } from "../../components/view";
import { Header } from "../header/header";
type Props = {
  active: boolean;
  deactivate: () => void;
  attempting: boolean;
  count: number; //this count is just for preventing react-web3 to throw error... better workarounds?
};
export const HomeScreen: FC<Props> = ({
  active,
  deactivate,
  attempting,
  count,
}) => {
  return (
    <View>
      <Header />

      <View padding="30px" height="900px" fontSize="24px" fontWeight="bold">
        This is a demonstartion of connecting a wallet(Metamask & wallet
        connect)
        <View margin="40px">
          {attempting ? "wallet permitted!" : <Account />}

          <Balance />

          <BlockNumber />

          <ChainId />
        </View>
        <View>Metamask network chage event count :{count}</View>
        {active && (
          <Button
            color="blue"
            onClick={() => {
              deactivate();
            }}
          >
            Deactivate
          </Button>
        )}
      </View>
    </View>
  );
};

const ChainId: FC<{}> = () => {
  const { chainId } = useWeb3React();

  return (
    <>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ""}</span>
    </>
  );
};

const BlockNumber: FC<{}> = () => {
  const { chainId, library } = useWeb3React();

  const [blockNumber, setBlockNumber] = React.useState<number | null>();
  React.useEffect(() => {
    if (!!library) {
      let stale = false;

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        stale = true;
        library.removeListener("block", updateBlockNumber);
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <View>
      <span>Block Number</span>
      <span role="img" aria-label="numbers">
        🔢
      </span>
      <span>{blockNumber === null ? "Error" : blockNumber ?? ""}</span>
    </View>
  );
};

const Account: FC<{}> = () => {
  const { account } = useWeb3React();

  return (
    <View>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ""}
      </span>
    </View>
  );
};

const Balance: FC<{}> = () => {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = React.useState<string | null>();
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: string) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <View>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>
        {balance === null ? "Error" : balance ? `Ξ${formatEther(balance)}` : ""}
      </span>
    </View>
  );
};

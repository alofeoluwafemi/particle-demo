import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { WalletEntryPosition } from "@particle-network/auth";
import { Ethereum, EthereumGoerli } from "@particle-network/chains";
// import { evmWallets } from "@particle-network/connect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ModalProvider
            options={{
                projectId: "6c46b1d9-a22f-4009-b9f7-f2eda7082a88",
                clientKey: "cCGhylyf0C8MfS835sbmwaGnvxZReUQqVhhDgTEz",
                appId: "efc87166-c8b9-487c-9fb0-b74f37e06990",
                chains: [Ethereum, EthereumGoerli],
                particleWalletEntry: {
                    //optional: particle wallet config
                    displayWalletEntry: true, //display wallet button when connect particle success.
                    defaultWalletEntryPosition: WalletEntryPosition.BR,
                    supportChains: [Ethereum, EthereumGoerli],
                    customStyle: {}, //optional: custom wallet style
                },
                securityAccount: {
                    //optional: particle security account config
                    //prompt set payment password. 0: None, 1: Once(default), 2: Always
                    promptSettingWhenSign: 0,
                    //prompt set master password. 0: None(default), 1: Once, 2: Always
                    promptMasterPasswordSettingWhenLogin: 0,
                },
                // wallets: evmWallets({
                //     projectId: "walletconnect projectId", //replace with walletconnect projectId
                //     showQrModal: false,
                // }),
            }}
            theme={"auto"}
            language={"en"} //optional：localize, default en
            //walletSort={["Particle Auth", "Wallet"]} //optional：walelt order
            particleAuthSort={[
                //optional：display particle auth items and order
                "email",
                "phone",
                "google",
                "apple",
                "facebook",
            ]}
        >
            <App />
        </ModalProvider>
        <App />
    </React.StrictMode>
);

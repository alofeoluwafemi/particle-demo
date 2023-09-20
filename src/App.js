import "./App.css";

import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { Ethereum, Mantle, BNBChain, Polygon } from "@particle-network/chains";
// import Web3 from "web3";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

import { SmartAccount } from "@particle-network/aa";

// if you want to custom connet button, you can use ConnectButton.Custom.
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [walletUrl, setWalletUrl] = useState(null);

    const particle = useMemo(() => {
        const particle = new ParticleNetwork({
            projectId: "6c46b1d9-a22f-4009-b9f7-f2eda7082a88",
            clientKey: "cCGhylyf0C8MfS835sbmwaGnvxZReUQqVhhDgTEz",
            appId: "efc87166-c8b9-487c-9fb0-b74f37e06990",
            chains: [Ethereum, Mantle, BNBChain, Polygon],
            chainName: BNBChain.name, //optional: current chain name, default Ethereum.
            chainId: BNBChain.id, //optional: current chain id, default 1.
            wallet: {
                //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
                displayWalletEntry: false, //show wallet entry when connect particle.
                defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
                uiMode: "light", //optional: light or dark, if not set, the default is the same as web auth.
                supportChains: [Ethereum, Mantle, BNBChain, Polygon], // optional: web wallet support chains.
                customStyle: {}, //optional: custom wallet style
            },
            securityAccount: {
                //optional: particle security account config
                //prompt set payment password. 0: None, 1: Once(default), 2: Always
                promptSettingWhenSign: 0,
                //prompt set master password. 0: None(default), 1: Once, 2: Always
                promptMasterPasswordSettingWhenLogin: 0,
            },
        });

        particle.setERC4337(true);

        return particle;
    }, []);

    const login = async () => {
        // const ethersSigner = await ethersProvider.getSigner();
        const userInfo = await particle.auth.login({
            preferredAuthType: "jwt",
            account:
                "eyJraWQiOiJMRll5aHB3VHRnM204VlFMQ25MZytLTitpb05NalYzRjFFZ1BEc3FwSGtjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MjU0MGNkNi1kYzEzLTQ5NjQtOWEwNS02MTE0OWU1ZGFmZWQiLCJjb2duaXRvOmdyb3VwcyI6WyJBZG1pbiJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfeUxwTThWMTVRIiwiY29nbml0bzp1c2VybmFtZSI6Im9sdXdhZmVtaWFsb2ZlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoib2x1d2FmZW1pYWxvZmUiLCJteWNvOnVzZXJpZCI6IjYzYjAyNTY0YTIwYjAwZmRlZmRhMzljZCIsImdpdmVuX25hbWUiOiJPbHV3YWZlbWkiLCJvcmlnaW5fanRpIjoiNWJmNjIwZTAtOTNhMC00YzRiLThiZTYtYTgzNTUxMzY4MjhiIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NjgxNzc5MjU4Mzk3OnJvbGVcL2NvZ25pdG8tYWRtaW4tZ3JvdXAtcm9sZS1kZXZlbG9wbWVudCJdLCJhdWQiOiJ2ajY1czAycnE1Y2gydGwzMzh1N2Z0amZhIiwiZXZlbnRfaWQiOiI1YzEyNjkwZC04ZDNhLTQwNmMtYTgwZC1jMjU4NTdkOTdiZTciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5NTEyNzUxOCwiZXhwIjoxNjk1MTMxMTE3LCJpYXQiOjE2OTUxMjc1MTgsImZhbWlseV9uYW1lIjoiQWxvZmUiLCJqdGkiOiIyZDJhYWJiOC03NmUzLTRiMDAtOWVjOS03NGY0MmU4ZjIwMjYiLCJlbWFpbCI6Im9sdXdhZmVtaWFsb2ZlQGdtYWlsLmNvbSJ9.kLnc8xMP_F4T0SMEaCuD-5A8pxSdbrL0tQlYZhp1_VQHUkjlD1mj323dXeUJeS4aJCpMwf8-br6guhOrp4lBFXL-9wgRo6kKjEKwvVM-rNvKlHWddT9PHnbUewrSkV10khzOQ7_lh3QResBGNlYvtEJbn6EAwxdyge-KvnBbQvmWbUTGYcvujMjvmrucNGl0Em4pm_YlgzZQ-WPc1lHusrwFgqXUrh2nCFoJ4HkPg9aLke4vT1VLDpefMMLUzzjFk-i3yFFkyA_umFBOLcrGdbh6LkTC7cjjza03xPpcgwat1zvmE68ID6G5EKRkljAiTjLXBtPuuw-EVY164loozg",
            hideLoading: true, //optional: hide particle loading when login.
        });

        console.log("userInfo == ", userInfo);
    };

    const getProvider = async () => {
        const particleProvider = new ParticleProvider(particle.auth);

        const userInfo = particle.auth.getUserInfo();

        console.log("userInfo == ", userInfo);

        const ethersProvider = new ethers.BrowserProvider(
            particleProvider,
            "any"
        );

        return ethersProvider;
    };

    const getFullInfo = async () => {
        const provider = await getProvider();
        console.log("provider == ", provider);
        console.log("signer == ", await provider.getSigner());
    };

    //provider: eip1193
    const smartAccount = async () => {
        const provider = await getProvider();

        const sm = new SmartAccount(provider, {
            projectId: "6c46b1d9-a22f-4009-b9f7-f2eda7082a88",
            clientKey: "cCGhylyf0C8MfS835sbmwaGnvxZReUQqVhhDgTEz",
            appId: "efc87166-c8b9-487c-9fb0-b74f37e06990",
            networkConfig: [
                {
                    dappAPIKey:
                        "wSKpCXEpl.5983016c-ff75-44e7-8360-c5fb8c724aff",
                    chainId: 56,
                },
            ],
        });

        console.log("AA == ", sm);
    };

    const openWallet = async () => {
        particle.openWallet("particle-wallet-iframe");
    };

    const openBuy = async () => {
        particle.openBuy({
            fiatCoin: "usd",
        });
    };

    useEffect(() => {
        if (!particle.auth.isLogin()) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);

            //open wallet in iframe.
            const url = particle.buildWalletUrl({
                topMenuType: "close",
            });

            setWalletUrl(url);

            console.log("url == ", url);
        }
    }, [particle]);

    //if topMenuType is "close"
    // window.addEventListener("message", (event) => {
    //     if (event.data === "PARTICLE_WALLET_CLOSE_IFRAME") {
    //         //close click event
    //     }
    // });

    return (
        <>
            {
                <div
                    style={{
                        margin: "20px",
                    }}
                >
                    {isLoggedIn ? (
                        <div>
                            <button onClick={openWallet}>
                                Open Wallet (New Tab)
                            </button>{" "}
                            <button onClick={openBuy}>
                                Open Buy (New Tab)
                            </button>{" "}
                            <button onClick={getFullInfo}>Get Full Info</button>{" "}
                            <button onClick={smartAccount}>
                                Get Smart Account
                            </button>
                        </div>
                    ) : (
                        <button onClick={login}>Login</button>
                    )}
                    {walletUrl && (
                        <iframe
                            id="particle-wallet-iframe"
                            title="particle-wallet-iframe"
                            name="particle-wallet-iframe"
                            src={walletUrl}
                            allow="camera"
                            style={{
                                width: "400px",
                                height: "600px",
                                border: "1px solid #000",
                                marginTop: "20px",
                            }}
                        ></iframe>
                    )}
                </div>
            }
        </>
    );
}

export default App;

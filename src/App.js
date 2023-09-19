import "./App.css";

import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { Ethereum, Mantle, BNBChain } from "@particle-network/chains";
// import Web3 from "web3";
import { ethers } from "ethers";
import { useMemo } from "react";

// if you want to custom connet button, you can use ConnectButton.Custom.
function App() {
    const particle = useMemo(() => {
        const particle = new ParticleNetwork({
            projectId: "6c46b1d9-a22f-4009-b9f7-f2eda7082a88",
            clientKey: "cCGhylyf0C8MfS835sbmwaGnvxZReUQqVhhDgTEz",
            appId: "efc87166-c8b9-487c-9fb0-b74f37e06990",
            chains: [Ethereum, Mantle, BNBChain],
            chainName: Mantle.name, //optional: current chain name, default Ethereum.
            chainId: Mantle.id, //optional: current chain id, default 1.
            wallet: {
                //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
                displayWalletEntry: false, //show wallet entry when connect particle.
                defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
                uiMode: "light", //optional: light or dark, if not set, the default is the same as web auth.
                supportChains: [
                    { id: 1, name: "Ethereum" },
                    { id: 5000, name: "Mantle" },
                    { id: 56, name: "Binance Chain" },
                ], // optional: web wallet support chains.
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

        return particle;
    }, []);

    const login = async () => {
        const particleProvider = new ParticleProvider(particle.auth);
        const ethersProvider = new ethers.BrowserProvider(
            particleProvider,
            "any"
        );
        const ethersSigner = await ethersProvider.getSigner();
        const userInfo = await particle.auth.login({
            preferredAuthType: "jwt",
            account:
                "eyJraWQiOiJMRll5aHB3VHRnM204VlFMQ25MZytLTitpb05NalYzRjFFZ1BEc3FwSGtjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MjU0MGNkNi1kYzEzLTQ5NjQtOWEwNS02MTE0OWU1ZGFmZWQiLCJjb2duaXRvOmdyb3VwcyI6WyJBZG1pbiJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfeUxwTThWMTVRIiwiY29nbml0bzp1c2VybmFtZSI6Im9sdXdhZmVtaWFsb2ZlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoib2x1d2FmZW1pYWxvZmUiLCJteWNvOnVzZXJpZCI6IjYzYjAyNTY0YTIwYjAwZmRlZmRhMzljZCIsImdpdmVuX25hbWUiOiJPbHV3YWZlbWkiLCJvcmlnaW5fanRpIjoiODVjMjEzYzMtNjE5YS00Nzk4LWJmYjItNmI4ZmVmM2Y4Mzg4IiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NjgxNzc5MjU4Mzk3OnJvbGVcL2NvZ25pdG8tYWRtaW4tZ3JvdXAtcm9sZS1kZXZlbG9wbWVudCJdLCJhdWQiOiJ2ajY1czAycnE1Y2gydGwzMzh1N2Z0amZhIiwiZXZlbnRfaWQiOiJkM2U1NmMwMC1hNmI2LTRkMWYtYjdhMC01YzE0YzZmZTY0MTciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5NDQyMzE0MiwiZXhwIjoxNjk0NDI2NzQyLCJpYXQiOjE2OTQ0MjMxNDIsImZhbWlseV9uYW1lIjoiQWxvZmUiLCJqdGkiOiI3ZmI2ZTQ4YS0xYmI4LTQzOGMtYjIwZS0xNDJiNzc1YWY3NzUiLCJlbWFpbCI6Im9sdXdhZmVtaWFsb2ZlQGdtYWlsLmNvbSJ9.MmOiin21Tei52FpCJ3i9aEPf2URg-DPf7uraI82QQ202beAEHtgiz-ZkD29mPHripnYRQWsnav_QaDkVgAJnxfoc1BpM6tPpP-rhN4OEYWgP0VG_0fpXelLV6ULHO59smXKg46wYiTU0i9L7jJRI1kflMfBcPqtBfrxpSFLaEmqqWdwGJBUHFYTrSyvKTTY6s7ffDQDxc5iW7-mqT2OiAMCzdYG55S8gYOnk9UoEejtx3q2bXKuRfxS9mLzYkZOM21Aba4JAGo4gLQhZKiGrAS7-xE1m2MEiQYX_q5tdiESIGOge0j_nCv-8c_vYDlcM1F_pcYzcNPCvSQvf13Hb1w",
            hideLoading: true, //optional: hide particle loading when login.
        });
        console.log("userInfo == ", userInfo);
    };

    return <button onClick={login}>Login</button>;
}

export default App;

// SPDX-FileCopyrightText: 2024 Fondazione LINKS
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ethers } from "ethers";
import { getContractABI, getContractAddress } from "../utils";

async function getAsset (contractAddress: string) {
    // Default: http://localhost:8545
    const httpProvider = new ethers.JsonRpcProvider();

    const nftABI = await getContractABI("ERC721Base");
    const nftInstance = new ethers.Contract(contractAddress, nftABI, httpProvider);
    
    const DTcontractABI = await getContractABI("ERC20Base");
    const [...DTcontractAddress] =  await nftInstance.getDTaddresses();
    const DTcontractIstance = new ethers.Contract(DTcontractAddress[0], DTcontractABI, httpProvider);
    
    const assetInfo = {
        owner: await nftInstance.getNFTowner(),
        NFTaddress: contractAddress,
        NFTname: await nftInstance.name(),
        NFTsymbol: await nftInstance.symbol(),
        NFTmetadataURI: await nftInstance.tokenURI(1),
        DTname: await DTcontractIstance.name(),
        DTsymbol: await DTcontractIstance.symbol(),
        DTcontractAddress: DTcontractAddress[0],
        AssetDownloadURL: await nftInstance.getAssetDownloadURL()
    };
    return assetInfo;
}

async function getAllAssets () {
    // call to SC
    try {
        // Default: http://localhost:8545
        // TODO: this should become a command line param or loaded from a config file
        const httpProvider = new ethers.JsonRpcProvider();


        // To connect to a custom URL:
        // let url = "http://something-else.com:8546";
        // let customHttpProvider = new ethers.providers.JsonRpcProvider(url);

        const contractABI = await getContractABI("ERC721Factory");
        const factoryAddress = getContractAddress("ERC721Factory");
        const factoryInstance = new ethers.Contract(factoryAddress!, contractABI, httpProvider);

        const [...NFTaddresses]: string[] = await factoryInstance.getAllNFTCreatedAddress();
        const assets = [];
        for(let i = 0; i < NFTaddresses.length; i++ ) {
            const assetInfo = await getAsset(NFTaddresses[i]);
            assets.push(assetInfo);
        }
        return assets;
    } catch (error) {
        console.log(error);
    } 
}

const AssetService = { getAllAssets };
export default AssetService;
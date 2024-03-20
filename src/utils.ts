// SPDX-FileCopyrightText: 2024 Fondazione LINKS
//
// SPDX-License-Identifier: GPL-3.0-or-later

import contractAddresses from './addresses/contractAddresses.json' assert { type: "json" };

export const getContractABI = async (contractName: string) => {
    try {
      // dynamic import
      const contractArtifact = await import(`../artifacts/contracts/${contractName}.sol/${contractName}.json`);
      const abi = contractArtifact.abi
  
      return abi
    } catch (e) {
      console.log(`e`, e)
    }
  }
  
  export const getContractAddress = (contractName: string) => {
    try {
      let ret;
      switch (contractName) {
        case "Deployer":
          ret = contractAddresses.addresses.Deployer?.toString()
          break;
        case "ERC721Base":
          ret = contractAddresses.addresses.ERC721Base?.toString()
          break;
        case "ERC20Base":
          ret = contractAddresses.addresses.ERC20Base?.toString()
          break;
        case "ERC721Factory":
          ret = contractAddresses.addresses.ERC721Factory?.toString()
          break;
        case "RouterFactory":
          ret = contractAddresses.addresses.RouterFactory?.toString()
          break;
        case "FixedRateExchange":
          ret = contractAddresses.addresses.FixedRateExchange?.toString()
          break;
        case "IDentity":
            ret = contractAddresses.addresses.IDentityAddress?.toString()
            break;
        default:
          ret = "";
      }
      return ret;
    } catch (e) {
      console.log(`e`, e)
    }
  }
  
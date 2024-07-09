import React, { useState } from "react";
import "../styles/productRegistry.css";
import ProductRegistry from "../artifacts/contracts/ProductRegistry.sol/ProductRegistry.json";
const { ethers } = require("ethers");

function ProductRegistryCmp() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [time, setTime] = useState("");
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [Details, setDetails] = useState({
    id: "",
    name: "",
    description: "",
    origin: "",
  });

  const handleDetails = (_id, _name, _description, _origin) => {
    let details = {
      id: _id,
      name: _name,
      description: _description,
      origin: _origin,
    };
    setDetails(details);
  };

  const handleAddresss = (address) => {
    setManufacturerAddress(address);
  };

  console.log("here are the details :", Details);
  async function requestAccount() {
    //check the existence of metamask
    if (window.ethereum) {
      console.log("MetaMask detected !");
    } else {
      alert(
        "MetaMask isn't detected !! , please install MetaMask Extension First"
      );
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("the Accs:", accounts);
      setWalletAddress(accounts[0]);
      alert(`this account : ${accounts[0]}  is connected`);
    } catch (err) {
      console.error(err);
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //const TheContract = await ProductRegistry.deployed();
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        console.log("contract address: ", contractAddress);
        const contract = new ethers.Contract(
          contractAddress,
          ProductRegistry.abi,
          signer
        );
        return contract;
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function setProductDetails() {
    try {
      const contract = await connectWallet();
      if (contract) {
        console.log("setting details...");
        const setDetails = await contract.setManufacturingDetails(
          Details.id,
          Details.name,
          Details.description,
          Details.origin
        );
        await setDetails.wait(); // Wait for the transaction to be mined
        alert("The Manufacturing Data updated successfully ");
      }
    } catch (err) {
      console.error("the connection to contract error:", err);
      alert(
        "Your address doesn't have access to update the Manufacturing Data !!"
      );
    }
  }

  // adding manufacturers
  async function addManufacturer() {
    try {
      const contract = await connectWallet();
      if (contract) {
        console.log("sadding Manufacturer...");
        const addManufacturer = await contract.addManufacturer(
          manufacturerAddress
        );
        await addManufacturer.wait(); // Wait for the transaction to be mined
        alert("The Manufacturer has been added successfully ");
      }
    } catch (err) {
      console.error("the connection to contract error:", err);
      alert(
        "Your address doesn't have access to update the Manufacturing Data !!"
      );
    }
  }

  return (
    <div className="form">
      <h3 className="t1">connnected by: {walletAddress}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setProductDetails();
        }}
      >
        <input
          type="string"
          value={Details.id}
          placeholder="ID"
          onChange={(e) => setDetails({ ...Details, id: e.target.value })}
        />
        <input
          type="string"
          value={Details.name}
          placeholder="Product Name"
          onChange={(e) => setDetails({ ...Details, name: e.target.value })}
        />
        <input
          type="string"
          value={Details.description}
          placeholder="Description of the product"
          onChange={(e) =>
            setDetails({ ...Details, description: e.target.value })
          }
        />
        <input
          type="string"
          value={Details.origin}
          placeholder="Manufacturer"
          onChange={(e) => setDetails({ ...Details, origin: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setManufacturerAddress();
        }}
      >
        <input
          type="string"
          value={manufacturerAddress}
          placeholder="Manufacturer Address"
          onChange={(e) =>
            setManufacturerAddress({ manufacturerAddress, id: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductRegistryCmp;

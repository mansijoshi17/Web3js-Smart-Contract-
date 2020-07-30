import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

// http://127.0.0.1:




function App() {

  const [state, setstate] = useState({
    name: '',
    age: 0
  })

  const [getname, setgetname] = useState("");
  const [getage, setgetage] = useState(0);

  const [ account, setaccount] = useState(null);

  const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
 web3.eth.getAccounts().then((result) => {
     setaccount(result[0]);
 })


  var coursetroContract = new web3.eth.Contract([
    {
      "constant": false,
      "inputs": [
        {
          "name": "_fname",
          "type": "string"
        },
        {
          "name": "_age",
          "type": "uint256"
        }
      ],
      "name": "setInstructor",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getInstructor",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ], "0x71a8761D8578bAF4af2871793F72DBa755D98767");

  console.log(account);

  onchange = (event) => {
    setstate(({ ...state, [event.target.name]: event.target.value }));
  }



  useEffect(() => {
    coursetroContract.methods.getInstructor().call().then((result) => {
        setgetname(result[0]);
        setgetage(result[1]);
        console.log(result);
    })
  })



  const setInstructor = () => {

    coursetroContract.methods.setInstructor(state.name, state.age).send({from:account});
   
  }





  return (
    <div className="App">
      <div class="container">
        <h2>Ethereum Blockchain</h2>
        <div class="form-group">
          <label for="email">Name:</label>
          <input placeholder="Enter name" name="name" onChange={(event) => onchange(event)} value={state.name} />
        </div>
        <div class="form-group">
          <label for="pwd">Age:</label>
          <input placeholder="Enter age" name="age" onChange={(event) => onchange(event)} value={state.age} />
        </div>
        <button type="submit" class="btn btn-primary" onClick={() => setInstructor()}>Update Data</button>

        <div>{getname + ' ' + 'is' + ' ' + getage + ' ' + 'years old'}</div>
      </div>
    </div>
  );
}

export default App;

import React, { Component, useEffect, useState } from 'react';
// import logo from './logo.svg';
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

  const [account, setaccount] = useState(null);

  const [Loading, setLoading] = useState(false);

  // const web3 = new Web3(Web3.providers.HttpProvider("http://127.0.0.1:8545"));

  var web3 = new Web3();
  web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));


  web3.eth.getAccounts().then((result) => {
    setaccount(result[0]);
  })


  var coursetroContract = new web3.eth.Contract([
    {
      "constant": false,
      "inputs": [],
      "name": "Coursetro",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "age",
          "type": "uint256"
        }
      ],
      "name": "Instructor",
      "type": "event"
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
  ], "0x57f85143ed7CA5026D22c7fBf5B45F0FF20DdbFe");



  onchange = (event) => {
    setstate(({ ...state, [event.target.name]: event.target.value }));
  }


  coursetroContract.getPastEvents('Instructor', {
    fromBlock: 0,
    toBlock: 'latest'
  }, () => { })
    .then(function (events) {
      setLoading(false);
      // console.log(events);
      var getname = events[events.length - 1].returnValues['name'];
      var getage = events[events.length - 1].returnValues['age']
      setgetname(getname);
      setgetage(getage);
    });




  useEffect(() => {
    // coursetroContract.methods.getInstructor().call().then((result) => {
    //   setgetname(result[0]);
    //   setgetage(result[1]);
    // })
  })



  const setInstructor = () => {
    coursetroContract.methods.setInstructor(state.name, state.age).send({ from: account }, (err, res) => {
      setLoading(true);
      if (err) {
        setLoading(false);
        console.log('oh no');
      }
    });
  }





  return (
    <div className="App">
      <div className="container">
        <h2>Ethereum Blockchain</h2>
        {/* <form> */}
        <div className="form-group">
          <label htmlFor="email">Name:</label>
          <input placeholder="Enter name" name="name" onChange={(event) => onchange(event)} value={state.name} />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Age:</label>
          <input placeholder="Enter age" name="age" onChange={(event) => onchange(event)} value={state.age} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => setInstructor()}>Update Data</button>

        {/* </form> */}
        <div>{Loading ? "Loading..." : getname + ' ' + 'is' + ' ' + getage + ' ' + 'years old'}</div>
      </div>
    </div>
  );
}

export default App;

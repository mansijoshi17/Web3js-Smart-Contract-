import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

// http://127.0.0.1:8545



function App() {

  const [state, setstate] = useState({
    name: '',
    age: 0
  })//For input values.

  const [getname, setgetname] = useState("");
  const [getage, setgetage] = useState(0);



  const [account, setaccount] = useState(null); //account address

  const [Loading, setLoading] = useState(false); //Loader..



  var web3 = new Web3();
  web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));//Set http provider


  web3.eth.getAccounts().then((result) => {
    setaccount(result[0]);
  })// This getAccounts will get all the accounts but we need first one.


  // To get your particular account's smart contract you need to pass ABI and Address of your account.

  // ABI = The Application Binary Interface (ABI) is a data encoding scheme used in Ethereum for working with smart contracts
  // Address = Contract address.

  //This two things you need to copy from IDE and change here everytime when you change something in smart contract

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
    },
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
    }
  ], "0x45f2BC0fccF0CA53D64dC3A37ba5612586033061");  //This both value you will get from your IDE.





  onchange = (event) => {
    setstate(({ ...state, [event.target.name]: event.target.value }));
  }//Input values.


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
    }); //This will get all the events which get called. I get the last one (updated one) and then get returnvalues of that event.




  useEffect(() => {
    // coursetroContract.methods.getInstructor().call().then((result) => {
    //   setgetname(result[0]);
    //   setgetage(result[1]);
    // })   //This is get method need to use call().
  })



  const setInstructor = () => {
    coursetroContract.methods.setInstructor(state.name, state.age).send({ from: account }, (err, res) => {
      setLoading(true);
      if (err) {
        setLoading(false);
        console.log('Not allowed except owner');
      } //This is for error when owner and msg sender are not same.
    });
  }
  //This is set method when you are set something you need to use send() with address of account.




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

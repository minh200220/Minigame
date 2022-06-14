$(document).ready(function () {
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_wallet",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_id",
          type: "string",
        },
      ],
      name: "SM_send_data",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_id",
          type: "string",
        },
      ],
      name: "SignUp",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "arrPlayer",
      outputs: [
        {
          internalType: "string",
          name: "_ID",
          type: "string",
        },
        {
          internalType: "address",
          name: "_WALLET",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const addressSM = "0xf287b7C0a57216df0A21f71D30F5De26671D9705";

  const web3 = new Web3(window.ethereum);
  window.ethereum.enable();

  // create contract for MM
  var contract_MM = new web3.eth.Contract(abi, addressSM);
  console.log(contract_MM);

  // create contract for Infura
  var provider = new Web3.providers.WebsocketProvider(
    "wss://rinkeby.infura.io/ws/v3/92169c5601a04830bca9a4df361656aa"
  );
  var web3_infura = new Web3(provider);
  var contract_Infura = web3_infura.eth.Contract(abi, addressSM);
  console.log(contract_Infura);
  contract_Infura.events.SM_send_data(
    { filter: {}, fromBlock: "latest" },
    function (error, event) {
      if (error) {
        console.log(error);
      } else {
        console.log(event);
        $("#listTB").append(
          `
        <tr id="line1">
          <td>` +
            event.returnValues[0] +
            `</td>
          <td>` +
            event.returnValues[1] +
            `</td>
        </tr>
        `
        );
      }
    }
  );

  var currentAccount = "";
  checkMM();

  $("#connectMM").click(function () {
    connectMM()
      .then((data) => {
        currentAccount = data[0];
        console.log(currentAccount);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  $("#btnSignUp").click(function () {
    if (currentAccount.length == 0) {
      alert("Please connect to your MetaMask");
    } else {
      $.post(
        "./signup",
        {
          email: $("#txtEmail").val(),
          fullName: $("#txtFullName").val(),
          phone: $("#txtPhone").val(),
        },
        function (data) {
          if (data.result == 1) {
            contract_MM.methods.SignUp(data.error._id).send({
              from: currentAccount,
            });
          }
        }
      );
    }
  });

  async function connectMM() {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    return accounts;
  }

  function checkMM() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      console.log("MetaMask is not installed!");
    }
  }
});

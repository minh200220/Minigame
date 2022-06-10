$(document).ready(function () {
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
    $.post(
      "./signup",
      {
        email: $("#txtEmail").val(),
        fullName: $("#txtFullName").val(),
        phone: $("#txtPhone").val(),
      },
      function (data) {
        console.log(data);
      }
    );
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

$(document).ready(function () {
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
});

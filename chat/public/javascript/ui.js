
$(document).ready(function() {
    $('#messageInput').keyup(function(event) {
        console.log("Enter Key Attemping to submit chat message");
        if (event.keyCode == 13) {
            $('button#submit.btn').click();
            return false;
         }
    });
});

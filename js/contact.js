$(document).ready(function() {
	// Test for placeholder support
    $.support.placeholder = (function(){
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // Hide labels by default if placeholders are supported
    if($.support.placeholder) {
        $('.form-label').each(function(){
            $(this).addClass('js-hide-label');
        });  

        // Code for adding/removing classes here
        $('.form-group').find('input, textarea').on('keyup blur focus', function(e){
            
            // Cache our selectors
            var $this = $(this),
                $parent = $this.parent().find("label");
					
						switch(e.type) {
							case 'keyup': {
								 $parent.toggleClass('js-hide-label', $this.val() == '');
							} break;
							case 'blur': {
								if( $this.val() == '' ) {
                    $parent.addClass('js-hide-label');
                } else {
                    $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
                }
							} break;
							case 'focus': {
								if( $this.val() !== '' ) {
                    $parent.removeClass('js-unhighlight-label');
                }
							} break;
							default: break;
						}

        });
    } 


    let name= document.getElementById("name");
    let emailAddress = document.getElementById("email");
    let subject = document.getElementById("subject");
    let message = document.getElementById("message");

document.getElementById("sendEmail").addEventListener("click", function(){

    Email.send({
        Host : "smtp.gmail.com",
        Username : "mailsimbio@gmail.com",
        Password : ",S<~-g3r#aG]45ev",
        To : 'mailsimbio@gmail.com',
        From : "mailsimbio@gmail.com",
        Subject : "SIMBIO: "+ subject.value,
        Body : "Interestants name: " + name.value +"<br>"+
        "Message : <br>" + message.value +
        "<br>Answer to: " + emailAddress.value
        }).then(
      message => console.log(message)
    ).then(
            document.getElementById("sentEmail").innerHTML = "Message sent!"


    );
        name.value="";
        emailAddress.value="";      ///clearing up all text fields in email form after sending email
        subject.value="";
        message.value="";
     
})



});
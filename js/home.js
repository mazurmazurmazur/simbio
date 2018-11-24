$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

////////////////////////ABOVE CODE THAT I DONT UNDERSTAND, NECESSARY FOR THE SUBSCRIPTION SYSTEM TO WORK




$(document).ready(function() {
    jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000  // 2 seconds is how long the slide switch takes in carousel


///////VALIDATION IF EMAIL ADDRESS IS CORRECT PLUS INFO TO USER
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validate() {
        var $result = $("#result");
        var email = $("#email").val();
        $result.text("");
      
        if (validateEmail(email)) {
        sendToSheet();
          $result.text("Thank you for subscribing!");
        } else {
          $result.text(email + " is not valid email.");
        }
        return false;
      }
      
      $("#subscribeButton").bind("click", validate);


      ///////END VALIDATION IF EMAIL ADDRESS IS CORRECT PLUS INFO TO USER


  ////SEND NEWSLETTER DATA TO GOOGLE SPREADSHEET FUNCTION BELOW



  let $form = $('form#newsletter-form'),
    url = 'https://script.google.com/macros/s/AKfycbzV2oQPNSKIpLlVhKxxY5LeKk6LfzDJWh8w4J3CyCdQ6k-SVDFb/exec'

 function sendToSheet() {

  
  let jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  });
}

////END OF NEWSLETTER DATA



  });




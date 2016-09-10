//VARIABLES AND INITIAL SETUP


//Creat the JAVA PUN select element, clone the options,  and append it to the page
var $PunsSelect=$('<select id="puns"></select>');
$('#color').children().eq(0).clone().appendTo($PunsSelect);
$('#color').children().eq(1).clone().appendTo($PunsSelect);
$('#color').children().eq(2).clone().appendTo($PunsSelect);
$PunsSelect.addClass('selectpicker');
$('#colors-js-puns').append($PunsSelect);
$PunsSelect.hide();

//Create the I HEART JAVA select element, clone the options, and append it to the page
var $LoveSelect=$('<select id="love"></select>');
$('#color').children().eq(3).clone().appendTo($LoveSelect);
$('#color').children().eq(4).clone().appendTo($LoveSelect);
$('#color').children().eq(5).clone().appendTo($LoveSelect);
$LoveSelect.addClass('selectpicker');
$('#colors-js-puns').append($LoveSelect);
$LoveSelect.hide();

//DECLARING ERRORS AS JQUERY OBJECTS
var $nameError=$('<h3 class="error">Please enter a valid Name!</h3>');
var $emailError=$('<h3 class="error">Please enter a valid Email!</h3>');
var $checkboxError=$('<h3 class="error">Please select an activity!</h3>');
var $paymentError=$('<h3 class="error">Please select a valid Payment!</h3>');
var $creditCardError=$('<h3 class="error">Please enter a valid credit card number!</h3>');
var $cvvError=$('<h3 class="error">Please enter a valid CVV number!</h3>');
var $zipError=$('<h3 class="error">Please enter a valid ZIP number!</h3>');





//FUNCTIONS

//APPENDING AND HIDING THE ER
function HideErrors(){
    $nameError.appendTo($('#name').prev()).hide();
    $emailError.appendTo($('#mail').prev()).hide();
    $checkboxError.prependTo($('.activities')).hide();
    $paymentError.appendTo($('#payment').prev()).hide();
    $creditCardError.prependTo($('#credit-card')).hide();
    $cvvError.prependTo($('#credit-card')).hide();
    $zipError.prependTo($('#credit-card')).hide();
}
//Checks if the email is valid or not
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
//function that takes in a string and shows/hides appropriate information depending on the argument given to it
function showHidePayment(string){
    switch(string){
        case "select":
            $('#credit-card').hide();
            $('#pay-pal').hide();
            $('#bit-coin').hide();
            break;
        case "credit":
            $('#credit-card').show();
            $('#pay-pal').hide();
            $('#bit-coin').hide();
            break;
        case "bit":
            $('#credit-card').hide();
            $('#pay-pal').hide();
            $('#bit-coin').show();
            break;
        case "pay":
            $('#credit-card').hide();
            $('#pay-pal').show();
            $('#bit-coin').hide();
            break;
    }
}
//Function ran when the form submit button is pressed
function validateMyForm(){ //THIS FUNCTION IS RUN FROM THE HTML (SEE LINE 21 IN INDEX.HTML) (JSHINT GIVES ERROR BUT ITS FINE!)
    //hide all errors
    HideErrors();
    if($('input#name').val()===''){ //if the name text field is empty
        event.preventDefault();//prevent the browser from submitting the form
        $('html, body').animate({ scrollTop: 0 }, 'fast'); //animate scroll to the top of the page
        $nameError.fadeIn(1300);
    }
    if(!isEmail($('#mail').val())){ //if the email address entered is not true
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $emailError.fadeIn(1300);
    }
    if($('.activities input:checked').length <=0){ //if there are no checked activities
       //check if the name and email are valid
        if($('input#name').val()!=='' && isEmail($('#mail').val())){
             event.preventDefault();
             $('html, body').animate({ scrollTop: 700 }, 'fast');
             $checkboxError.fadeIn(1300);
        }
    }
    if($('#payment').val()==="select_method"){ //if the payment method is not selected
        event.preventDefault();
        $paymentError.fadeIn(1300);  
    }
    var result= $('#cc-num').validateCreditCard(); //store the validateCreditCard return object in result
    if(!result.length_valid || !result.luhn_valid){ //if either the length of creditcard number is invalid or the luhn check fails
        //check if the name, email are valid and an activity has been selected
        if($('input#name').val()!=='' && isEmail($('#mail').val()) && $('.activities input:checked').length >0){ 
            event.preventDefault();
            $creditCardError.fadeIn(1300);
        }
    }
    if($('#cvv').val().length!==3){ //if the cvv value is not equal to 3
        //check if the credit card number was valid
        if(result.length_valid && result.luhn_valid){
            event.preventDefault();
            $cvvError.fadeIn(1300);
        }
        
    }
    if($('#zip').val().length<=0){ //if the zip value is empty
        //check if the credit card number was valid
        if(result.length_valid && result.luhn_valid){
            event.preventDefault();
            $zipError.fadeIn(1300);
        }
    }
}


//EVENT LISTENERS
//THE CHECKBOX EVENT LISTENERS ARE IN THE checkboxes.js FILE

//Allow only numbers to be entered in the zip field
$('#zip').on('keypress', function(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
});
//Allow only numbers to be entered in the cvv field
$('#cvv').on('keypress', function(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
});


//if job role of 'other' is selected, show a text field
$('#title').on("change",function(){ //when there is change in the select element
   if($(this).val()==="other"){ //if the value of the option selected is 'other'
    $("#other-title").show().focus(); //show the text field and put focus on it
}
    else{ //if the value of the option is not selected as 'other'
        $("#other-title").hide(); //hide the text field
    }
});

//if the design select changes, display the appropriate color select to the user
$("#design").on("change",function(){ //when there is change on this select element
    
    if($(this).val()==="js puns"){ //if the value of the option selected is 'js puns'
        //SHOW THE JS PUNS SELECT MENU AND HIDE THE I LOVE JS SELECT MENU
        $("select#puns").parent().show();
        $('#colors-js-puns').show();
        $("select#love").parent().hide();//show the $PunsSelect select element
    }
    if($(this).val()==="heart js"){ //if the value of the option selected is 'heart js'
        //SHOW THE I LOVE JS SELECT MENU AND HIDE THE JS PUNS SELECT MENU
        $("select#love").parent().show();
        $('#colors-js-puns').show();
        $("select#puns").parent().hide();//show the $LoveSelect select element
    }
    if ($(this).val()=="Select Theme"){ //if the value of the option selected is 'Select Theme'
        //HIDE ALL THE SELECT MENUS
        $('#colors-js-puns').hide();
    }
});
///PAYMENT INFO
$('#payment').on("change",function(){
   if($(this).val()==="select_method") {
       showHidePayment("select");
   }
   if($(this).val()==="credit card") {
       showHidePayment("credit");
   }
   if($(this).val()==="paypal") {
       showHidePayment("pay");
   }
   if($(this).val()==="bitcoin") {
       showHidePayment("bit");
   }
   
});



//EXECUTION
//focus on input (id=name) when page loads
$('#name').focus();
//hide the color label and the color select element in the beginning of the program
$('#colors-js-puns .mainSelect').parent().hide();
$('#colors-js-puns .mainSelect').hide();
//hide the textfield in the beginning of the program
$("#other-title").hide();
//Give the attribute to the credit card option so that it is displayed as default
$('#payment option[value="credit card"]').attr("selected","selected");
showHidePayment("credit");
 
//HIDE ALL ERRORS WHEN THE PROGRAM RUNS
HideErrors();


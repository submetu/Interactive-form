var checkedAll=false;
var checkedFram=false;
var checkedExp=false;
var checkedLib=false;
var checkedNode=false;
var checkedBuilTools=false;
var checkedNpm=false;
var Total=0;
var valid;
var $TotalPara=$('<p>$</p>');
//Creat the JAVA PUN select element, clone the options,  and append it to the page
var $PunsSelect=$('<select id="puns"></select>');
var $PunsOpt1=$('#color').children().eq(0).clone().appendTo($PunsSelect);
var $PunsOpt2=$('#color').children().eq(1).clone().appendTo($PunsSelect);
var $PunsOpt3=$('#color').children().eq(2).clone().appendTo($PunsSelect);
$PunsSelect.addClass('selectpicker');
$('#colors-js-puns').append($PunsSelect);
$PunsSelect.hide();

//Create the I HEART JAVA select element, clone the options, and append it to the page
var $LoveSelect=$('<select id="love"></select>');
var $LoveOpt1=$('#color').children().eq(3).clone().appendTo($LoveSelect);
var $LoveOpt2=$('#color').children().eq(4).clone().appendTo($LoveSelect);
var $LoveOpt3=$('#color').children().eq(5).clone().appendTo($LoveSelect);
$LoveSelect.addClass('selectpicker');
$('#colors-js-puns').append($LoveSelect);
$LoveSelect.hide();

//CREATING and APPENDING ERRORS
var $nameError=$('<h3 class="error">Please enter a valid Name!</h3>');
var $emailError=$('<h3 class="error">Please enter a valid Email!</h3>');
var $checkboxError=$('<h3 class="error">Please select an activity!</h3>');
var $paymentError=$('<h3 class="error">Please select a valid Payment!</h3>');
var $creditCardError=$('<h3 class="error">Please enter a valid credit card number!</h3>');

//FUNCTIONS

//hide errors
function HideErrors(){
    $nameError.appendTo($('#name').prev()).hide();
    $emailError.appendTo($('#mail').prev()).hide();
    $checkboxError.prependTo($('.activities')).hide();
    $paymentError.appendTo($('#payment').prev()).hide();
    $creditCardError.prependTo($('#credit-card')).hide();
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function showHideTotal(){
    $('fieldset.activities p').remove();
    var $TotalPara=$('<p>$</p>');
    $TotalPara.append(Total);
    $('fieldset.activities').append($TotalPara);
    console.log(Total);
}
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
//function ran when the form submit button is pressed
function validateMyForm(){
    //hide all errors
    HideErrors();
    if($('input#name').val()===''){ //if the name text field is empty
        event.preventDefault();//prevent the browser from submitting the form
        $('html, body').animate({ scrollTop: 0 }, 'fast'); //animate to the top of the page
        $nameError.show();
        console.log("name is empty");
    }
    if(!isEmail($('#mail').val())){ //if the email address entered is not true
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $emailError.show();
        console.log("email address is false");
    }
    if($('.activities input:checked').length <=0){ //if there are no checked activities
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $checkboxError.show();
        console.log('no acitivities selected');
    }
    if($('#payment').val()==="select_method"){
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $paymentError.show();  
        console.log('no payment method selected');
    }
    var result= $('#cc-num').validateCreditCard();
    if(!result.length_valid || !result.luhn_valid){
        event.preventDefault();
        $creditCardError.show();
        console.log('wrong credit card');
    }
    if($('#cvv').val().length!==3){
        event.preventDefault();
        $creditCardError.show();
        
    }
    if($('#zip').val().length<=0){
        event.preventDefault();
        $creditCardError.show();
        
    }
    
}


//EVENT LISTENERS

//Allow only numbers to be entered
$('#zip').on('keypress', function(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
});
//Allow only numbers to be entered
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
        $("select#puns").parent().show();
        $('#colors-js-puns').show();
        $("select#love").parent().hide();//show the $PunsSelect select element
    }
    if($(this).val()==="heart js"){ //if the value of the option selected is 'heart js'
        $("select#love").parent().show();
        $('#colors-js-puns').show();
        $("select#puns").parent().hide();//show the $LoveSelect select element
    }
    if ($(this).val()=="Select Theme"){ //if the value of the option selected is 'Select Theme'
        $('#colors-js-puns').hide();
    }
});



///////////////ALL
$('.activities input[name="all"]').on("change",function(){ //if there is a change in the checkox with name=all
    
    if($('input[name="all"]').is(':checked')){ //if the checkbox is checked
            Total+=200;//increment the total price by 200
            showHideTotal();//run the showHideTotal function
            checkedAll=true;//set this boolean to true
    } 
    if($('input[name="all"]:checkbox'). prop("checked") != true){//if the checkbox is unchecked
        if(checkedAll){ //check if the checkbox went from a checked to an unchecked state
            Total-=200; //decrement by 200
            showHideTotal();//run the showHideTotal function
        }
        checkedAll=false;//set this boolean to false to know that the checkbox has no longer changed state anymore
    }
});


///////////////FRAMEWORKS
$('.activities input[name="js-frameworks"]').on("change",function(){//if there is a change in the checkox with name=js-frameworks
    if($('input[name="js-frameworks"]').is(':checked')){    //if the checkbox is checked
        $('input[name="express"]').prop("disabled",true); //set the property on input[name="express"] to disabled
        $('input[name="express"]').parent().addClass("disabled"); //give the parent of input[name="express"] a class of disabled
        Total+=100;//increment by 100
        showHideTotal();//run the showHideTotal function
        checkedFram=true;//set this boolean to True
    }
    if($('input[name="js-frameworks"]:checkbox'). prop("checked") != true){ //if the checkbox is unchecked
        if(checkedFram){    //check if the checkbox went from a checked to an unchecked state
            $('input[name="express"]').prop("disabled",false);  //remove the disabled property on input[name="express"] 
            //remove the class disabled from the parent of input[name="express"]
            $('input[name="express"]').parent().removeClass("disabled"); 
            Total-=100;//decrement by 100
            showHideTotal();
        }
        checkedFram=false;//set this boolean to false to know that the checkbox has no longer changed state anymore
    }
});

    
/////////////LIBRARIES
$('.activities input[name="js-libs"]').on("change",function(){
    if($('input[name="js-libs"]').is(':checked')){
        console.log("js-libs");
        $('input[name="node"]').prop("disabled",true);
        $('input[name="node"]').parent().addClass("disabled");
        Total+=100;
        showHideTotal();
        checkedLib=true;
    }
    if($('input[name="js-libs"]:checkbox'). prop("checked") != true){
        if(checkedLib){
            $('input[name="node"]').prop("disabled",false);
            $('input[name="node"]').parent().removeClass("disabled");
            Total-=100;
            showHideTotal();
        }
        checkedLib=false;
    }
});

/////////////EXPRESS
$('.activities input[name="express"]').on("change",function(){
    if($('input[name="express"]').is(':checked')){
        $('input[name="js-frameworks"]').prop("disabled",true);
        $('input[name="js-frameworks"]').parent().addClass("disabled");
        Total+=100;
        showHideTotal();
        checkedExp=true;
    } 
    if($('input[name="express"]:checkbox'). prop("checked") != true){
        if(checkedExp){
            $('input[name="js-frameworks"]').prop("disabled",false);
            $('input[name="js-frameworks"]').parent().removeClass("disabled");
            Total-=100;
            showHideTotal();
        }
        checkedExp=false;
    }
});
    
///////////////NODE
$('.activities input[name="node"]').on("change",function(){    
    if($('input[name="node"]').is(':checked')){
        console.log("node");
        $('input[name="js-libs"]').prop("disabled",true);
        $('input[name="js-libs"]').parent().addClass("disabled");
        Total+=100;
        showHideTotal();
        checkedNode=true;
    } 
    if($('input[name="node"]'). prop("checked") != true){
        if(checkedNode){
            $('input[name="js-libs"]').prop("disabled",false);
            $('input[name="js-libs"]').parent().removeClass("disabled");
            Total-=100;
            showHideTotal();
        }
        checkedNode=false;
    }
});


//////////BUILDTOOLS    
$('.activities input[name="build-tools"]').on("change",function(){
    if($('input[name="build-tools"]').is(':checked')){
            Total+=100;
            showHideTotal();
            checkedBuilTools=true;
    }
    if($('input[name="build-tools"]:checkbox'). prop("checked") != true){
        if(checkedBuilTools){
            Total-=100;
            showHideTotal();
        }
        checkedBuilTools=false;
    }
});
    
    
    
/////////NPM
$('.activities input[name="npm"]').on("change",function(){
    if($('input[name="npm"]').is(':checked')){
        Total+=100;
        showHideTotal();
        checkedNpm=true;
        console.log("npm check");
    }
    if($('input[name="npm"]:checkbox'). prop("checked") != true){
        if(checkedNpm){
            Total-=100;
            showHideTotal();
            console.log("npm uncheck");
        }
        checkedNpm=false;
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
//run the showHideTotal function when the program starts
showHideTotal();
//hide the textfield in the beginning of the program
$("#other-title").hide();
//Give the attribute to the credit card option so that it is displayed as default
$('#payment option[value="credit card"]').attr("selected","selected");
showHidePayment("credit");
 
//HIDE ALL ERRORS WHEN THE PROGRAM RUNS
HideErrors();


var checkedAll=false;
var checkedFram=false;
var checkedExp=false;
var checkedLib=false;
var checkedNode=false;
var checkedBuilTools=false;
var checkedNpm=false;
var Total=0;
var TotalString=Total.toString();
var $TotalPara=$('<p>$</p>');
//Creat the JAVA PUN select element, clone the options,  and append it to the page
var $PunsSelect=$('<select id="color"></select>');
var $PunsOpt1=$('#color').children().eq(0).clone().appendTo($PunsSelect);
var $PunsOpt2=$('#color').children().eq(1).clone().appendTo($PunsSelect);
var $PunsOpt3=$('#color').children().eq(2).clone().appendTo($PunsSelect);
$('#colors-js-puns').append($PunsSelect);
$PunsSelect.hide();

//Create the I HEART JAVA select element, clone the options, and append it to the page
var $LoveSelect=$('<select id="color"></select>');
var $LoveOpt1=$('#color').children().eq(3).clone().appendTo($LoveSelect);
var $LoveOpt2=$('#color').children().eq(4).clone().appendTo($LoveSelect);
var $LoveOpt3=$('#color').children().eq(5).clone().appendTo($LoveSelect);
$('#colors-js-puns').append($LoveSelect);
$LoveSelect.hide();



//FUNCTIONS

function showHideTotal(){
    $('fieldset.activities p').remove();
    var $TotalPara=$('<p>$</p>');
    $TotalPara.append(Total);
    $('fieldset.activities').append($TotalPara);
    console.log(Total);
}



//EVENT LISTENERS

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
       $('#colors-js-puns #color').hide(); //hide the #elements with the id of #color
       $PunsSelect.show(); //show the $PunsSelect select element
    }
    if($(this).val()==="heart js"){ //if the value of the option selected is 'heart js'
       $('#colors-js-puns #color').hide();//hide the #elements with the id of #color
       $LoveSelect.show();//show the $LoveSelect select element
    }
    if ($(this).val()=="Select Theme"){ //if the value of the option selected is 'Select Theme'
       $('#colors-js-puns #color').hide(); //hide the elements with the id of #color
       $('#colors-js-puns .mainSelect').show(); //show the select element with the class of 'mainSelect'
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
//EXECUTION
//focus on input (id=name) when page loads
$('#name').focus();
//run the showHideTotal function when the program starts
showHideTotal();
//hide the textfield in the beginning of the program
$("#other-title").hide();

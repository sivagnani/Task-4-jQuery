class Contact{
    constructor(name,email,mobile,landline,website,address){
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.landline=landline;
        this.website=website;
        this.address=address;
    }
}
let counter=0;
let list = [];
let variable = "eachContactSummary";
var newcontact = new Contact("Chandermani Arora","chandermani@technovert.com","+91 9292929292","040301231211","http://www.technovert.com","123 now here\nSome street\nMadhapur, Hyderabad 500033");
list.push(newcontact);
var newcontact = new Contact("Sashi Pagadala","sashi@technovert.com","+91 9985528844","040301231211","http://www.technovert.com","123 now here\nSome street\nMadhapur, Hyderabad 500033");
list.push(newcontact);
var newcontact = new Contact("Praveen Battula","praveen@technovert.com","+91 9985016232","040301231211","http://www.technovert.com","123 now here\nSome street\nMadhapur, Hyderabad 500033");
list.push(newcontact);
var newcontact = new Contact("Vijay Yalamanchili","vijay@technovert.com","+91 9885071216","040301231211","http://www.technovert.com","123 now here\nSome street\nMadhapur, Hyderabad 500033");
list.push(newcontact);
function load(){
    for(let i=0;i<list.length;i++){
        displaySummary(list[i],i);
    }
}
function displaySummary(contact,i){
    let div = "<div class='eachContactSummary'></div>";
    $("#summary").append(div);
    $("#summary div").last().attr("id",variable+i);
    $("#summary div").last().attr("onclick","displayDetails(this.id)");
    $("#summary div").last().html("<h1 class='Name'>"+contact.name+"</h1><p class='Mail'>"+contact.email+"</p><p class='Mobile'>"+contact.mobile+"</p>");
}
function displayDetails(id){
    $("#"+id).addClass("active");
    $('.contactInfo').css({display:"block"});
    $('#addDetails').css({display:"none"});
    var i = id[id.length-1];
    for(let j in list){
        if(j!=i && list[j].name!=null){
            $("#"+variable+j).removeClass("active");
        }
    }
    counter=i;
    $('#detailedName').text(list[i].name);
    $('#detailedEmail').text(list[i].email);
    $('#detailedMobile').text(list[i].mobile);
    $('#detailedLandline').text(list[i].landline);
    $('#detailedWebsite').text(list[i].website);
    $('#detailedAddress').text(list[i].address);
}
function require(text){
    if(text==""){
        return false;
    }
    else{
        return true;
    }
}
function deleteDetails(){
    let delname=$('#detailedName').text();
    if(confirm("Are you sure you want to delete "+delname+"'s details")==true){
        for(let i=0;i<list.length;i++){
            if(list[i].name==delname){
                $("#"+variable+i).remove();
                $(".contactInfo").css({display:"none"});
            }
        }
    }
}
function openForm(){
    $('#newName').val("");
    $('#newEmail').val("");
    $('#newMobile').val("");
    $('#newLandline').val("");
    $('#newWebsite').val("");
    $('#newAddress').val("");
    $('#addDetails').css({display:"block"});
    $('.contactInfo').css({display:"none"});
    $('#createButton').val('Add');
    $('#createButton').attr('onclick','createContact()');
    for(let j in list){
        $("#"+variable+j).removeClass("active");
    }
}
function createContact(){
    if(validateForm()){
        if(confirm("Are you sure you want to new contact details")){
            var name = $('#newName').val();
            var email = $('#newEmail').val();
            var mobile = $('#newMobile').val();
            var landline = $('#newLandline').val();
            var website = $('#newWebsite').val();
            var address = $('#newAddress').val();
            contact = new Contact(name,email,mobile,landline,website,address);
            list.push(contact);
            displaySummary(contact,list.length-1);
            $("#createForm").trigger("reset");
            displayDetails(variable+(list.length-1));
        }
    }
}
function editDetails(){
    $('#addDetails').css({display:"block"});
    $('.contactInfo').css({display:"none"});
    $('#createButton').val('Edit');
    $('#createButton').attr('onclick','editContact()');
    $('#newName').val($('#detailedName').text());
    $('#newEmail').val($('#detailedEmail').text());
    $('#newMobile').val($('#detailedMobile').text());
    $('#newLandline').val($('#detailedLandline').text());
    $('#newWebsite').val($('#detailedWebsite').text());
    $('#newAddress').val($('#detailedAddress').text());
}
function editContact(){
    if(validateForm()){
        if(confirm("Are you sure you want to edit "+list[counter].name+"'s details")){
            list[counter].name = $('#newName').val();
            list[counter].email = $('#newEmail').val();
            list[counter].mobile = $('#newMobile').val();
            list[counter].landline = $('#newLandline').val();
            list[counter].website = $('#newWebsite').val();
            list[counter].address = $('#newAddress').val();
            $("#"+variable+counter).find(".Name").text(list[counter].name);
            $("#"+variable+counter).find('.Mail').text(list[counter].email);
            $("#"+variable+counter).find('.Mobile').text(list[counter].mobile);
            displayDetails(variable+counter)
        }
    }
}
function validateName(){
    let name = $('#newName').val();
    const validname =/^[a-zA-Z\s]{4,256}$/;
    if(require(name)){
        if(validname.test(name)){
            $('#nameError').html("&nbsp;");
            return true;
        }
        else{
            $('#nameError').html("Enter valid Name");
            return false;
        }
    }
    else{
        $('#nameError').html("Name is required");
        return false;
    }
}
function validateEmail(){
    let email = $("#newEmail").val();
    const mail = /^[a-zA-Z0-9.$_*]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,}$/;
    if(require(email)){
        if(mail.test(email)){
            $('#emailError').html("&nbsp;");
            return true;
        }
        else{
            $('#emailError').html("Enter valid Email");
            return false;
        }
    }
    else{
        $("#emailError").html("Please enter Email");
        return false;
    }
}
function validateMobile(){
    let mobile = $('#newMobile').val();
    const valid =/^[\+]+[0-9]{2,3}[\s]?[0-9]{3}[\s]?[0-9]{5,7}$/;
    if(require(mobile)){
        if(valid.test(mobile)){
            $('#mobileError').html("&nbsp;");
            return true;
        }
        else{
            $('#mobileError').html("Enter valid Mobile Number");
            return false;
        }
    }
    else{
        $('#mobileError').html("Mobile Number is required");
        return false;
    }
}
function validateLandline(){
    let landline = $('#newLandline').val();
    const valid =/^[0][0-9]{2,3}[\s]?[0-9]{3,4}[\s]?[0-9]{4}$/;
    if(require(landline)){
        if(valid.test(landline)){
            $('#landlineError').html("&nbsp;");
            return true;
        }
        else{
            $('#landlineError').html("Enter valid Telephone Number");
            return false;
        }
    }
    else{
        $('#landlineError').html("Telephone Number is required");
        return false;
    }
}
function validateWebsite(){
    let website = $('#newWebsite').val();
    const valid =/^(http(s)?:\/\/)?((www.)?)+[a-zA-Z0-9#!:?+=&%!.\-\/]+\.[a-zA-Z\/]{2,}$/;
    if(require(website)){
        if(valid.test(website)){
            $('#websiteError').html("&nbsp;");
            return true;
        }
        else{
            $('#websiteError').html("Enter valid Website");
            return false;
        }
    }
    else{
        $('#websiteError').html("Website is required");
        return false;
    }
}
function validateAddress(){
    let address = $('#newAddress').val();
    if(require(address)){
        $('#addressError').html("&nbsp;");
        return true;
    }
    else{
        $('#addressError').html("Address is required");
        return false;
    }
}
function validateForm(){
    let name = validateName();
    let email = validateEmail();
    let mobile = validateMobile();
    let landline = validateLandline();
    let website = validateWebsite();
    let address = validateAddress();
    return(name && email && mobile && landline && website && address);    
}
$(function(){
    $('#home').click(function(){
        $('#home').addClass('activePage');
        $('#add').removeClass('activePage');
        $('.contactInfo').hide();
        $('#addDetails').hide();
    });
    $('#add').click(function(){
        $('#add').addClass('activePage');
        $('#home').removeClass('activePage');
        openForm();
    });
    $('#edit').click(function(){editDetails();});
    $('#delete').click(function(){deleteDetails();});
    $('#newName').keyup(function(){validateName();});
    $('#newEmail').keyup(function(){validateEmail();});
    $('#newMobile').keyup(function(){validateMobile();});
    $('#newLandline').keyup(function(){validateLandline();});
    $('#newWebsite').keyup(function(){validateWebsite();});
    $('#newAddress').keyup(function(){validateAddress();});
});
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
    $('#home').addClass('activePage');
    $('#add').removeClass('activePage');
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
    removeError();
    $('#addDetails').css({display:"block"});
    $('.contactInfo').css({display:"none"});
    $('#createButton').val('Add');
    $('#createButton').removeAttr('onclick');
    $('#createButton').attr('onclick','createContact()');
    for(let j in list){
        $("#"+variable+j).removeClass("active");
    }
}
function removeError(){
    $('#nameError').html("&nbsp;");
    $('#emailError').html("&nbsp;");
    $('#mobileError').html("&nbsp;");
    $('#landlineError').html("&nbsp;");
    $('#websiteError').html("&nbsp;");
    $('#addressError').html("&nbsp;");
}
function createContact(){
    if(validateForm()){
        if(confirm("Are you sure you want to add new contact details")){
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
    removeError();
    $('#addDetails').css({display:"block"});
    $('.contactInfo').css({display:"none"});
    $('#createButton').val('Edit');
    $('#createButton').removeAttr('onclick');
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
function validate(input,regex,type){
    if(require(input)){
        if(regex.test(input)){
            $('#'+type+"Error").html("&nbsp;");
            return true;
        }
        else{
            $('#'+type+"Error").html("Enter valid "+type);
            return false;
        }
    }
    else{
        $('#'+type+"Error").html(type+" is required");
        return false;
    }
}
function validateName(){
    let name = $('#newName').val();
    const validname =/^[a-zA-Z\s]{4,256}$/;
    validate(name,validname,"name");
}
function validateEmail(){
    let email = $("#newEmail").val();
    const mail = /^[a-zA-Z0-9.$_*]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,}$/;
    validate(email,mail,"email");
}
function validateMobile(){
    let mobile = $('#newMobile').val();
    const valid =/^[\+]+[0-9]{2,3}[\s]?[0-9]{3}[\s]?[0-9]{5,7}$/;
    validate(mobile,valid,"mobile");
}
function validateLandline(){
    let landline = $('#newLandline').val();
    const valid =/^[0][0-9]{2,3}[\s]?[0-9]{3,4}[\s]?[0-9]{4}$/;
    validate(landline,valid,"landline");
}
function validateWebsite(){
    let website = $('#newWebsite').val();
    const valid =/^(http(s)?:\/\/)?((www.)?)+[a-zA-Z0-9#!:?+=&%!.\-\/]+\.[a-zA-Z\/]{2,}$/;
    validate(website,valid,"website");
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
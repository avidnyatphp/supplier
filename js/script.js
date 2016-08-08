$(document).ready(function(){
    $('.dropdown .dropdown-menu li').click(function(){
        var selected = $(this).text();
       // alert(selected);
        console.log(selected);
        $(this).closest('.btn').text(selected);
    });
    
});
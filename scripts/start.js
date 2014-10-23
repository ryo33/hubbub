var is_auth = false;
var token = localStorage.getItem('token');//remove when logout
if(token !== null){
    if(token === false){
        localStorage.clear();
    }else{
        is_auth = true;
    }
}

authbutton = $("input");
if(is_auth){
    authbutton.attr("value", "logout");
}else{
    authbutton.attr("value", "login");
}

authbutton.on("click",
        function(){
            if(is_auth){
                is_auth = false;
                localStorage.clear();
            }else{
                location.href = "http://hubbub.giikey.com/login.php";
            }
            return true;
        });

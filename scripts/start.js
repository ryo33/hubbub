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
                location.href = "http://github.com/login/oauth/authorize?client_id=0972d445ad4c4d147ccd";
            }
            return true;
        });

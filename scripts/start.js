var is_auth = false;
var token = localStorage.getItem('token');//remove when logout
if(token !== null){
    if(token === false){
        localStorage.clear();
    }else{
        is_auth = true;
    }
}

authbutton = $("#authbutton");
if(is_auth){
    authbutton.text("logout");
}else{
    authbutton.text("login");
}

authbutton.on("click",
        function(){
            if(is_auth){
                is_auth = false;
                localStorage.clear();
                authbutton.text("login");
                reload()
            }else{
                location.href = "http://github.com/login/oauth/authorize?client_id=0972d445ad4c4d147ccd";
            }
            return true;
        });
reload()

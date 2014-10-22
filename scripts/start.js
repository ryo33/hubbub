var is_auth = false;
var auth = localStorage.getItem('auth');//remove when logout
if(code !== null){
    var token = auth(code);
    if(token === false){
        localStorage.clear();
    }else{
        is_auth = true;
    }
}

if(is_auth){
    document.authbutton.value = "logout";
}else{
    document.authbutton.value = "login";
}

document.getElementById("authbutton").addEventListener("click",
        function(){
            if(is_auth){
                is_auth = false;
                localStorage.clear();
            }else{
                location.href = "http://github.com/login/oauth/authorize?client_id=" + client_id + "&scope=" + scope + "&state=" + state;
            }
            return true;
        }, false);

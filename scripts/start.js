var is_auth = false;
var token = localStorage.getItem('token');//remove when logout
var user = null;
var modified = "";
if(!token){
    localStorage.clear();
}else{
    is_auth = true;
    user = localStorage.getItem('user');
    if(!user){
        $.ajax({
            type: "GET",
            url: "https://api.github.com/user?access_token=" + token,
            error: function(a){
                localStorage.clear();
            },
            success: function(a){
                user = a.data.login;
                localStorage.setItem('user', user);
                reload();
            },
            dataType: "jsonp"
        });
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
                reload();
            }else{
                location.href = "http://github.com/login/oauth/authorize?client_id=0972d445ad4c4d147ccd&scope=repo, public_repo, user";
            }
            return true;
        });
reload();
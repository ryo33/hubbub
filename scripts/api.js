function auth(code){
    var res = request("https://github.com/login/oauth/access_token",
            "client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code);
    
}

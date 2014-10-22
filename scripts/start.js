var is_auth = false;
var code = localStorage.getItem('code');//remove when logout
if(code !== null){
    var token = auth(code);
    if(token === false){
        localStorage.clear();
    }else{
        is_auth = true;
    }
}

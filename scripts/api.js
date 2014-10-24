function get_timeline(){
    $.ajax({
        type: "GET",
    url: "https://api.github.com/users/" + user + "/received_events?access_token=" + token,
    error: function(xhr){
        localStorage.clear();
    },
    success: function(json){
        console.log(json);
    },
    dataType: "jsonp"
    });
}

function get_feeds(){

}


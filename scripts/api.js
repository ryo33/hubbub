function get(url){
    $.ajax({
        type: "GET",
        url: url,
        error: function(xhr){
            localStorage.clear();
        },
        success: function(json){
            link = json._links.current_user.href.text();
            $.ajax({
                type: "GET",
                url: link,
                error: function(xhr){
                    localStorage.clear();
                },
                success: function(xml){
                    console.log(xml);
                },
                dataType: "xml"
        },
        dataType: "jsonp"
    });
function get_feeds(){
    
}

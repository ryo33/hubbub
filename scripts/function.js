function reload(){
    if(is_auth === true){
        show_timeline();
    }else{
        show_welcome();
    }
}

function show_timeline(){
    get_timeline();
}

function show_welcome(){

}

function create_panel(args){
    icon = args.icon;
    id = args.id;
    name = args.name;
    lines = args.lines;
    commit_id = args.commit_id;
    return "<div class=\"panel panel-default\">" +
        "<div class=\"panel-heading\">"+
        "<a class=\"lead\" href=\"https://github.com/" + id + "\"><img src=\"" + icon + "\" height=30px width=30px />" + id + " <small>" + name + "</small></a>" +
        "</div>"+
        "<div class=\"panel-body\">" +
        "<pre class=\"pre-scrollable\" style=\"max-height150px;\">" +
        lines.map(function(x){return x + "<br />";}).join("") + 
        "</pre>" +
        "<button type=\"button\" class=\"btn btn-default\" onclick=\"comment(\"" + commit_id + "\");\"><span class=\"glyphicon glyphicon-comment\"></span>Comment</button>" +
        "<button type=\"button\" class=\"btn btn-default\" style=\"margin-left:20px\" onclick=\"show_commit(\"" + commit_id + "\");\"><span class=\"glyphicon glyphicon-new-window\"></span>Detail</button>" +
        "</div>" +
        "</div>";}

        function add_to_last(args){
            $("div#panels").append(create_panel(args));
        }

function add_to_first(args){
    $("div#panels").prepend(create_panel(args));
}

function error(){
    localStorage.clear();
}

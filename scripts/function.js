function reload(){
    if(is_auth === true){
        show_timeline();
    }else{
        show_welcome();
    }
}

function show_timeline(){

}

function show_welcome(){

}

function create_panel(args){
    icon = args.icon;
    id = args.id;
    name = args.id;
    lines = args.lines;
    commit_id = args.commit_id;
    return "<div class=\"panel panel-default\">" +
        "<div class=\"panel-heading\">" +
        "<img src=\"" + icon + "\" class=\"icon\" />"+
        "<a class=\"lead\" href=\"https://github.com/" + id + "\">" + id + " <small>" + name + "</small></a>" +
        "</div>" +
        "<div class=\"panel-body\">" +
        lines.map(function(x){return x + "<br />";}).join("") +
        "</div>" +
        "<div class=\"panel-footer\">" + 
        "<button type=\"button\" class=\"btn btn-default\" onclick=\"comment(\"" + commit_id + "\");\"><span class=\"glyphicon glyphicon-comment\"></span>Comment</button>" +
        "<button type=\"button\" class=\"btn btn-default\" onclick=\"show_commit(\"" + commit_id + "\");\"><span class=\"glyphicon glyphicon-new-window\"></span>Detail</button>" +
        "</div>" +
        "</div>";}

function add_to_last(){
    $("div#panels").append(create_panel());
}

function add_to_first(){
    $("div#panels").prepend(create_panel(icon, id, name));
}

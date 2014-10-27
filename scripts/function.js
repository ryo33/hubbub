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
    $("div#panels").append("<div class=\"jumbotron\">" +
        "<h1>Login to see commits<br />and comment on commits!</h1>" +
        "<p><a id=\"authbutton2\" class=\"btn btn-primary btn-lg\">Login</a></p>" +
        "<p><a class=\"text\" href=\"https://github.com/ryo33/hubbub\" target=\"_blank\">See Hubbub in GitHub</a></p></div>"
        );
    $("#authbutton2").on("click", auth_button);
}

function show_loading(){
    $("div#panels").append("<div id=\"loading\" class=\"jumbotron\">" +
        "<h1>Loading</h1><h2>Perhaps you don't follow active repositories.</h2><h2>Would you like to follow the repository of this website.</h2><a href=\"https://github.com/ryo33/hubbub\" target=\"_blank\">See Hubbub in GitHub</a></div>"
        );
}

function create_panel(args){
    var icon = args.icon;
    var id = args.id;
    var name = args.name;
    var lines = args.lines;
    var filename = args.filename;
    var time = new Date(args.time).toLocaleString();
    var comment = args.comment;
    var detail = args.detail;
    var file = args.file;
    var i = args.i;
    var message = args.message;
    var comment_arg = "{i: " + i + ", url: '" + comment + "', filename: '" + filename + "'}";
    var detail_arg = "{url: '" + detail + "'}";
    return "<div class=\"panel panel-default\">" +
        "<div class=\"panel-heading\">"+
        "<a class=\"lead text\" href=\"https://github.com/" + id + "\"><img src=\"" + icon + "\" height=30px width=30px />" + id + "</a><span class=\"text-muted\"> " + name + "</span>" +
        "</div>"+
        "<div id=\"" + i + "\" class=\"panel-body\">" +
        "<a href=\""  + detail + "\" class=\"text\"><h3 style=\"margin: 0px 0px;\">" + message + "</h3></a>"+
        "<a href=\"" + file + "\" target=\"_blank\" class=\"text\">" + filename + "</a><span class=\"text-muted\"> " + time + "</span>" +
        "<pre class=\"pre-scrollable\" style=\"background-color:#eee\">" +
        lines.map(function(x){
            if(x.charAt(0) == "@"){
               return "";//same as continue
            }
            var before = "<span class=\"text-muted\">";
            var after = "</span>";
            if(x.charAt(0) == "+"){
               before = "<span class=\"bg-success\" style=><strong>";
               after = "</strong></span>";
            }else if(x.charAt(0) == "-"){
               before = "<span class=\"bg-danger\">";
               after = "</span>";
            }                
            return before + x + after + "<br />";
        }).join("") + 
        "</pre>" +
        "<button type=\"button\" class=\"comment btn btn-default\" onClick=\"comment(" + comment_arg + ")\"><span class=\"glyphicon glyphicon-comment\"></span>Comment</button>" +
        "<button type=\"button\" class=\"detail btn btn-default\" style=\"margin-left:20px\" onClick=\"new_tab(" + detail_arg + ")\"><span class=\"glyphicon glyphicon-new-window\"></span>Detail</button>" +
        "</div>" +
        "</div>";
}

function add_panel(args){
	var time = new Date(args.time).valueOf();
	var is_added = false;
	for(var i = 0;i < times.length;i++){
		if(times[i] <= time){
			is_added = true;
			$("div#panels").children("div").eq(i).before(create_panel(args));
			times.splice(i, 0, time);
                        break;
		}
	}
	if(!is_added){
		$("div#panels").append(create_panel(args));
		times.push(time);
	}
	window.scrollTo(0,0);
}

function add_to_last(args){
    $("#panels").append(create_panel(args));
}

function add_to_first(args){
    $("#panels").prepend(create_panel(args));
}

function error(){
    localStorage.clear();
}

function comment(args){
    var i = args.i;
    var url = args.url;
    var filename = args.filename;
    var comment_arg = "{i: " + i + ", url: '" + url + "', filename: '" + filename + "'}";
    
    var textarea = $("#" + i + "textarea");
    var pre = $("#" + i + " pre");
    pre.after("<textarea id=\"" + i + "textarea\" class=\"form-control\" rows=\"5\" style=\"margin: 0 0 10px;\"></textarea>");
    $("#" + i + "textarea").after("<div id=\"" + i + "checkbox\"><label>" +
      "<input type=\"checkbox\"> from Hubbub</label></div>");
    $("#" + i + "checkbox input").attr("checked", true);
    var comment_button = $("#" + i + " button.comment");
    comment_button.html(get_icon_submit() + "Submit");
    comment_button.removeAttr("onClick");
    comment_button.on(
        "click",
        function(event){
            if($(event.target).parent().children("textarea").val()){//TODO
              var checkbox = $("#" + i + "checkbox input");
              var after = "\n\nfrom <a href=\"" + domain + "\" target=\"_blank\">Hubbub</a>";
              if(checkbox.prop('checked') != true){
                  after = "";
              }
            $.ajax({
                type: "POST",
                url: url + "?access_token=" + token,
                data: JSON.stringify({"body": $(event.target).parent().children("textarea").val() + after, "path": filename}),
                success: function(res){
                    $(event.target).parent().children("textarea").remove();
                    $(event.target).parent().children("div").remove();
                    $(event.target).html(get_icon_comment() + "Comment");
                    $(event.target).attr('disabled', true);
                },
                dataType: "json",
                contentType: "application/json"
            });
            }
        }
    );
}

function new_tab(args){
    var url = args.url;
    var win = window.open(url, '_blank');
    win.focus();
}

function auth_button(){
    if(is_auth){
        is_auth = false;
        localStorage.clear();
        authbutton.text("login");
         reload();
    }else{
        location.href = "http://github.com/login/oauth/authorize?client_id=0972d445ad4c4d147ccd&scope=repo, public_repo, user";
    }
    return true;
}

function get_icon_comment(){
    return "<span class=\"glyphicon glyphicon-comment\"></span>";
}

function get_icon_submit(){
    return "<span class=\"glyphicon glyphicon-send\"></span>";
}

function get_icon_detail(){
    return "<span class=\"glyphicon glyphicon-new-window\"></span>";
}

function h(text){
    return $('<div>').text(text).html()
}
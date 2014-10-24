function get_timeline(){
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + user + "/received_events?access_token=" + token,
        error: function(xhr){
            error();
        },
        success: function(json){
            modified = json.meta["Last-Modified"];
            if(json.data){
                $.each(json.data, function(i, event){
                    var icon = event.actor.avatar_url;
                    var id = event.actor.login;
                    var name = "";//TODO using /user
                    commits = event.payload.commits;
                    if(commits){
                        $.each(commits, function(j, commit){
                            var commit_id = commit.sha;
                            $.ajax({
                                type: "GET",
                                url: commit.url + "?access_token=" + token,
                                error: function(xhr){
                                    error();
                                },
                                accepts: "application/vnd.github.VERSION.diff",
                                success: function(json){
                                    if(json.data.files){
                                        $.each(json.data.files, function(i, file){
                                            add_to_last({
                                            icon: icon,
                                            id: id,
                                            name: name,
                                            commit_id: commit_id,
                                            lines: file.patch.replace(/@@ [^@]+ @@/g, "").split("\n")
                                            });
                                        });
                                    }
                                },
                                dataType: "jsonp"
                            });
                        });    
                    }
                });
            }
        },
        dataType: "jsonp"
    });
}

function get_feeds(){
    
}

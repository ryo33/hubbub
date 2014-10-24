function get_timeline(){
    var panel_count = 0;
    var users = {};
    show_loading();
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + user + "/received_events?access_token=" + token,
        error: function(xhr){
            error();
        },
        success: function(json){
//-----------------------------------------------------------------------------------------------events
            modified = json.meta["Last-Modified"];
            if(json.data){
                $.each(json.data, function(i, event){
//-----------------------------------------------------------------------------------------------event
                    var icon = event.actor.avatar_url;
                    var id = event.actor.login;
                    if(!(id in users)){
                        $.ajax({
                            type: "GET",
                            url: "https://api.github.com/users/" + id + "?access_token=" + token,
                            dataType: "jsonp",
                            success: function(json){
                                users[id] = json.data.name;
                            },
                            async: false
                        });
                    }
                    commits = event.payload.commits;
                    if(commits){
//-----------------------------------------------------------------------------------------------commits
                        $.each(commits, function(j, commit){
                            $.ajax({
                                type: "GET",
                                url: commit.url + "?access_token=" + token,
                                error: function(xhr){
                                    error();
                                },
                                accepts: "application/vnd.github.VERSION.diff",
                                success: function(json){
//-----------------------------------------------------------------------------------------------commit
                                    var time = json.data.commit.committer.date;
                                    var comment = json.data.comments_url;
//-----------------------------------------------------------------------------------------------files
                                    if(json.data.files){
                                        $.each(json.data.files, function(i, file){
//-----------------------------------------------------------------------------------------------file
                                            var detail = file.blob_url;
                                            var filename = file.filename;
                                            $("#loading").remove();
                                            add_panel({
                                                i: panel_count,
                                                icon: icon,
                                                id: id,
                                                name: users[id],
                                                detail: detail,
                                                comment: comment,
                                                filename: filename,
                                                time: time,
                                                lines: file.patch.replace(/@@ [^@]+ @@/g, "").split("\n")
                                            });
                                            panel_count ++;
                                            if(panel_count == panels_max){
                                                return false;//same as "break;"
                                            }
                                        });
                                    }
                                },
                                dataType: "jsonp",
                            });
                        });
                    }
                });
            }
        },
        dataType: "jsonp"
    });
}
<?php
include 'setting.php';
foreach($includes as $include){
    include 'include/' . $include . '.php';
}
include 'start.php';

include 'template/head.php';

if($maintenance){
    include 'action/maintenance.php';
}else{
    $pathinfo= getPathInfo();
    switch($pathinfo){
    case '/timeline':
        include 'action/timeline.php';
        break;
    case '/login':
        include 'action/login.php';
        break;
    default:
        redirect('http://beans.giikey.com');
        exit();
    }
}

include 'template/foot.php';

include 'last.php';

<?php
include 'setting.php';
foreach($includes as $include){
    include 'include/' . $include . '.php';
}
include 'start.php';

//
if($maintenance){
    include 'action/maintenance.php';
    exit();
}

//
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
include 'last.php';

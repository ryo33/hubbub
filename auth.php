<?php
foreach($_GET  as $key => $value){
    $_GET[$key] = mb_convert_encoding($_GET[$key],'utf8','auto');
}
foreach($_POST as $key => $value){
    $_POST[$key] = mb_convert_encoding($_POST[$key],'utf8','auto');
}
$_GET = delete_null_byte($_GET);
$_POST = delete_null_byte($_POST);
$_COOKIE = delete_null_byte($_COOKIE);
$_REQUEST = delete_null_byte($_REQUEST);
if($_SERVER['REQUEST_METHOD'] !== "POST"){
    Header("http://hubbub.giikey.com", true, 303);
}
if(!isset($_POST['code']) || !isset($_POST['state'])){
    Header("http://hubbub.giikey.com", true, 303);
}
if(strlen($_POST['code']) == 0 || strlen($_POST['state']) == 0){
    Header("http://hubbub.giikey.com", true, 303);
}
?>
<script>
local_state = localStorage.getItem("state");
localStorage.removeItem("state");
if(local_state !== hash(<?php echo $_POST['state'];?>)){
    location.href = "http://hubbub.giikey.com";
}
localStorage.clear();
localStorage.setItem("code", <?php echo $_POST['code'];?>);
</script>

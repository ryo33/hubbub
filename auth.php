<!DOCTYPE html>
<html>
<head>
<?php
include "setting.php";

$url = 'https://github.com/login/oauth/access_token';
$request = array('client_id' => $client_id, 'client_secret' => $client_secret, 'code' => $_GET['code']);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($request),
    ),
);
$con = stream_context_create($options);
$res = file_get_contents($url, false, $con);

preg_match("/access_token=(\w*)&/", $res, $token);
$token = $token[1]
?>
<script>
localStorage.setItem("token", "<?php echo $token;?>");
location.href = "http://hubbub.giikey.com";
</script>
</head>
</html>
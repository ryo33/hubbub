<?php

function isPost()
{
	if($_SERVER['REQUEST_METHOD']==='POST'){
		return true;
	}
	return false;
}

function getGet($name,$default = null)
{
	if(isset($_GET[$name])){
		return $_GET[$name];
	}
	return $default;
}

function getPost($name,$default = null)
{
	if(isset($_POST[$name])){
		return $_POST[$name];
	}
	return $default;
}

function getHost()
{
	if(!empty($_SERVER['HTTP_HOST'])){
		return $_SERVER['HTTP_HOST'];
	}
	return $_SERVER['SERVER_NAME'];
}

function isSsl()
{
	if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']==='on'){
		return true;
	}
	return false;
}

function getRequestUri()
{
	return $_SERVER['REQUEST_URI'];
}

function getBaseUrl()
{
	$script_name = $_SERVER['SCRIPT_NAME'];

	$request_uri = getRequestUri();

	if(0 === strpos($request_uri , $script_name)){
		return $script_name;
	}else if(0 === strpos($request_uri , dirname($script_name))){
		return rtrim(dirname($script_name) , '/');
	}
	
	return '';
}

function getPathInfo()
{
	$base_url = getBaseUrl();
	$request_uri = getRequestUri();

	if(false !== ($pos = strpos($request_uri , '?'))){
		$request_uri = substr($request_uri , 0 , $pos);
	}

	$path_info = (string)substr($request_uri , strlen($base_url));

	return $path_info;
}

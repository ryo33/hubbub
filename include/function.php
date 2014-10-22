<?php

function h($text){
	return htmlspecialchars($text, ENT_QUOTES, 'EUC-JP');
}

function stremp($text){
	if(is_array($text)){
		foreach($text as $t){
			if(stremp($t)){
				return true;
			}
		}
		return false;
	}else{
		return $text === null || strlen($text) === 0;
	}
}

function tag($text, $tag = 'p'){
	return '<' . $tag . '>' . h($text) . '</' . $tag . '>' . "\n";
}

function debug($text){
	echo tag($text);
}

function echoh($text){
	echo h($text);
}

function redirect($url){
	header("Location: " . $url);
	exit();
}

function getToken($form_name){
	$key = 'csrf_tokens/' . $form_name;
	$tokens = isset($_SESSION[$key]) ?$_SESSION[$key]:array();
	if(count($tokens) >= 10){
		array_shift($tokens);
	}

	$token = sha1(microtime() . $form_name . session_id() . microtime());
	$tokens[] = $token;

	$_SESSION[$key]=$tokens;

	return $token;
}

function checkToken($form_name, $token){

	$key = 'csrf_tokens/' . $form_name;
	$tokens = isset($_SESSION[$key])?$_SESSION[$key]:array();

	if(false !== ($pos = array_search($token, $tokens, true))){
		unset($tokens[$pos]);
		$_SESSION[$key] = $tokens;

		return true;
	}

	return false;
}

function sha256($target) {
  return hash('sha256', $target);
}

function randomstr($length = 8)
{
	$chars = '\abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()-=^~|,./:]@[`{+*}><?_';
	$str = '';
	for($i = 0;$i < $length; $i++){
		$str .= $chars[mt_rAND(0, strlen($chars) - 1)];
	}
	return $str;
}

function now($format=false, $option = null){
	if($option === null){
		$datetime = new DateTime('now',new DateTimeZone('GMT'));
		return $format?$datetime->format('U'):$datetime;
	}else{
		$datetime = new DateTime($option,new DateTimeZone('GMT'));
		return $format?$datetime->format('U'):$datetime;
	}
}

function delete_null_byte($value){
	if(is_string($value) === true){
		$value = str_replace("\0","",$value);
	}else if(is_array($value) === true){
		$value = array_map('delete_null_byte',$value);
	}
	return $value;
}

function debuglog($text){
	if($text === true){
		$text = "true";
	}else if($text === false){
		$text = "false";
	}
	$text = "[" . now()->format("Y-m-d H:i:s") . "]" . $text . "\n";
	$file = $dir . 'save/debug.log';
	if(!file_exists($dir . 'save/debug.log')){
		$fp = fopen($file, 'a');
		chmod($file, PERMISSION);
	}
	$fp = fopen($file, 'a');
	
	if($fp){
		if(flock($fp,LOCK_SH)){
			fwrite($fp,$text);
			fflush($fp);
			flock($fp,LOCK_UN);
		}
	}

	fclose($fp);
	return $text;
}

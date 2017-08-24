<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);

$dId = $_POST['dId'];
$apiKey = $_POST['apiKey'];
$reqType=$_POST['reqType'];
$dContent=$_POST['dContent'];
$silo=$_POST['silo'];

$dId = preg_replace('/\s+/', '', $dId);
$apiKey = preg_replace('/\s+/', '', $apiKey);
$result = array();

if ($reqType=="create"){
	$output = CreateD($apiKey,$dId,$silo);
}
else{
	$output = UpdateD($apiKey,$dId,$silo,$dContent);
}
echo $output;




function postMyStuff($url,$payload){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");  
		curl_setopt($ch, CURLOPT_POSTFIELDS,$payload);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
		    'Content-Type: application/json',                                                                                
		    'Content-Length: ' . strlen($payload))                                                                       
		);
		$result=curl_exec($ch);
		curl_close($ch);
		return $result;
 }

 function putMyStuff($url,$payload){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");  
		curl_setopt($ch, CURLOPT_POSTFIELDS,$payload);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
		    'Content-Type: application/json',                                                                                
		    'Content-Length: ' . strlen($payload))                                                                       
		);
		$result=curl_exec($ch);
		curl_close($ch);
		return $result;
 }



function CreateD($apiKey,$dId,$silo){		
	$dc="{dictionary_key:'".$dId."',dictionary:{sampleKey:'sampleValue'},description:'Description goes here'}";
 	$url = "https://api-wpm".$silo.".apicasystem.com/v3/scenarios/proxysniffer/dictionaries/?auth_ticket=".$apiKey;
 	$result = postMyStuff($url,$dc);
 	//$json_array = json_decode($result,true); // convert to object array
	return $result;

 }


function UpdateD($apiKey,$dId,$silo,$dContent){		
 $someArray = json_decode($dContent, true);
 $kk="";
 $count=0;
 foreach ($someArray as $key => $value) {
 	$count++;
 	if($count!=1){$kk.=",";}
	$kk.= "".$value["dkey"] . ":" . "'".$value["dvalue"]."'";

 }
	$dc="{dictionary:{".$kk."},description:'Description goes here'}";
	echo $dc;
 	$url = "https://api-wpm".$silo.".apicasystem.com/v3/scenarios/proxysniffer/dictionaries/".$dId."?auth_ticket=".$apiKey;
 	$result = putMyStuff($url,$dc);
 	//$json_array = json_decode($result,true); // convert to object array
	return "success";

 }



?>
<?php

// URL needs to have direct link to the video file
$url = "https://scontent-sjc3-1.cdninstagram.com/v/t50.2886-16/333350818_605316164744103_3047548513347287896_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjQ4MC5jYXJvdXNlbF9pdGVtLmJhc2VsaW5lIiwicWVfZ3JvdXBzIjoiW1wiaWdfd2ViX2RlbGl2ZXJ5X3Z0c19vdGZcIl0ifQ&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=FXz0A4TXm0gAX-65SS6&edm=ALQROFkBAAAA&vs=5918845071542470_3199349661&_nc_vs=HBkcFQAYJEdLS0gzaE9uOC1rbWlDWUNBRmk3MWUwNUVVc3Fia1lMQUFBRhUAAsgBACgAGAAbAYgHdXNlX29pbAEwFQAAJqb%2FjJfGlZhBFQIoAkMzLBdAHMzMzMzMzRgSZGFzaF9iYXNlbGluZV8yX3YxEQB17gcA&ccb=7-5&oh=00_AfBrngzf4hbCCisKevWZm7CZlTGtDNHP7nwwddwEY8KAbQ&oe=64019EAC&_nc_sid=30a2ef";

$curl = curl_init();
$timeout = 30;
$ret = "";
curl_setopt ($curl, CURLOPT_URL, $url);
curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.5) Gecko/2008120122 Firefox/3.0.5");
curl_setopt ($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
$data = curl_exec($curl);
// echo $data;


// Test 1
// header('Content-Transfer-Encoding: binary');
// header('Content-Type: video/mp4');
// header('Expires: 0');
// header('Cache-Control: must-revalidate');
// header('Content-Length: ' . $contentLength);
// ob_clean();
// flush();
// echo $data;
// exit;

// Test 2
// header('Content-Description: File Transfer');
// header('Content-Type: application/octet-stream');
// // header('Content-Disposition: attachment; filename='.basename($newfile));
// header('Expires: 0');
// header('Cache-Control: must-revalidate');
// header('Pragma: public');
// // header('Content-Length: ' . filesize($file));
// ob_clean();
// flush();
// readfile($data);


// Test 3
echo '<div content="Content-Type: video/mp4">
<video width="366" height="455" controls="controls" poster="image" preload="metadata">
<source src="data:video/mp4;base64,'.base64_encode($data).'"/>;
</video>
</div>';

?>
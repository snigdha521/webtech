<?php

$name = isset($_GET['name']) ? $_GET['name'] : "Guest";


$marks = [78,82,93, 60, 30];


echo "Marks:<br>";
foreach ($marks as $m) {
    echo $m . "<br>";
}


$total = 0;
foreach ($marks as $m) {
    $total += $m;
}


function avg($total, $count) {
    return $total / $count;
}

$average = avg((float)$total, count($marks)); 


$max = max($marks);
$min = min($marks);


$pass = 0;
$fail = 0;

foreach ($marks as $m) {
    if ($m >= 50)
        $pass++;
    else
        $fail++;
}


$student = [
    "name" => "Snigdha",
    "id" => "567",
    "cgpa" => 3.78
];


$upper = strtoupper($student["name"]);
$length = strlen($student["name"]);


echo "<br>Total: $total";
echo "<br>Average: $average";
echo "<br>Max: $max";
echo "<br>Min: $min";
echo "<br>Pass: $pass";
echo "<br>Fail: $fail";

echo "<br><br>Student Info:<br>";
foreach ($student as $key => $value) {
    echo "$key : $value<br>";
}

echo "<br>Upper Name: $upper";
echo "<br>Name Length: $length";

echo "<br><br>Hello, $name";
?>


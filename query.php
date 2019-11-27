<?php
    require_once '../../../../../opt/composer/vendor/autoload.php';
    
    $lat = (float)$_GET['lat'];
    $lon = (float)$_GET['lon'];

    $conn = new MongoDB\Client();
    $coll = $conn->geolocation->restaurants;
    $query = [
        'location' => [
            '$near' => [$lat, $lon]
        ]
    ];
    $cursor = $coll->findMany($query);
    $response = [];
    foreach($cursor as $doc) {
        $obj = [
            'name' => $doc['name'],
            'serves' => $doc['serves'],
            'latitude' => $doc['location'][0],
            'longitude' => $doc['location'][1]
        ];
        array_push($response, $obj);
    }

    // convert the array in JSON and send back to client
    echo json_encode($response);

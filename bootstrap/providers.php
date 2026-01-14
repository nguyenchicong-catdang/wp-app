<?php

$wpArrProviders = require __DIR__ . '/../wp-ssr/arrServiceProvide.php';

return [
    App\Providers\AppServiceProvider::class,
    Corcel\Laravel\CorcelServiceProvider::class,
    ...$wpArrProviders,
];

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Index</title>

    <!-- Styles / Scripts -->
        {{-- @php
        $buildDir = 'vite-ssr-dist';
    @endphp

    @if (file_exists(public_path($buildDir . '/manifest.json')) || file_exists(public_path('hot')))
        @vite(['scss/main.scss', 'js/main.js'], $buildDir)
    @endif --}}

    @vite(['scss/main.scss', 'js/main.js'], 'vite-ssr-dist')
</head>
<body>
    <x-wp-layout::header />
    <main>
        <x-wp-layout::breadcrumbs />
        <x-wp-layout::sidebar />
    </main>
</body>
</html>
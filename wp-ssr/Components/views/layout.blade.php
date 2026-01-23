@props(['title' => 'Tên Website', 'breadcrumbs' => []])
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title }}</title>
    {{-- Import CSS/JS tập trung tại đây --}}
    {{-- @vite(['main.scss', 'main.js'], 'vite-ssr-dist') --}}
        @vite(['main.js'], 'vite-ssr-dist')

    @stack('styles')
</head>
<body>
    <x-wp-views::headers.header />
    <main>
        <x-wp-namespace::sidebar />
        <div class="content">
            {{ $slot }}
        </div>
    </main>
</body>
</html>
@props(['title' => 'Tên Website', 'breadcrumbs' => []])
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title }}</title>
    {{-- Import CSS/JS tập trung tại đây --}}
    @vite(['scss/main.scss', 'js/main.js'], 'vite-ssr-dist')
    @stack('styles')
</head>
<body>
    <x-wp-layout::header />
    {{-- Truyền Breadcrumbs vào --}}
    <x-wp-layout::breadcrumbs :data="$breadcrumbs" />
    <main class="container">
        <div class="row">
            
            {{-- Vùng Sidebar dùng chung --}}
                <x-wp-layout::sidebar />
            {{-- Vùng hiển thị nội dung chính --}}
                {{ $slot }}
        </div>
    </main>

    @stack('scripts')
</body>
</html>
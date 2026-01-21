<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Post</title>
</head>
<body>
    <x-wp-layout::header />
    <main>
        <x-wp-layout::sidebar />
        <div class="content">
            @php debug($post); @endphp
            @if ($post)
                <h1>{{ $post->title }}</h1>
                <div>{{$post->excerpt}}</div>
                    @if ($post->thumbnail_url)
                        <img src="{{ $post->thumbnail_url }}" alt="{{ $post->thumbnail_alt }}">
                    @endif
                <div>{!! $post->content !!}</div>
            @endif
        </div>
    </main>
</body>
</html>
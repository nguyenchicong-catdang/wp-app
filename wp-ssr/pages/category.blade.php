<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Category</title>
</head>
<body>
    <x-wp-layout::header />
    <main>
        <x-wp-layout::sidebar />
        <div>
            {{-- @dd($cat) --}}
            @php debug($cat) @endphp
            @if(isset($cat))
                <h1>{{ $cat->name }}</h1>
                <div>{{ $cat->description }}</div>
                {{-- posts-content --}}
                @if(isset($cat->posts) && count($cat->posts) > 0)
                    <h2>Posts in this category:</h2>
                    <ul>
                        @foreach($cat->posts as $post)
                            <li>
                                <a href="{{ route('wp-post', $post->slug) }}">{{ $post->title }}</a>
                                <p>{{ $post->excerpt }}</p>
                                @if($post->thumbnail)
                                    <img src="{{ $post->thumbnail->url }}" alt="{{ $post->thumbnail->alt }}">
                                @endif
                            </li>
                        @endforeach
                    </ul>
                @endif
            @endif
        </div>
    </main>
</body>
</html>
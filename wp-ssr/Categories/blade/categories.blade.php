
<p>categories</p>

@foreach ($cats as $cat)
    <a href="{{route('wp-category', $cat->slug)}}">{{ $cat->name }}</a>
    {{-- <a href="{{ route('wp-category', ['slug' => $cat->slug]) }}">
    {{ $cat->name }}
</a> --}}
    <p>{{ $cat->name }}</p>
    <div>{{ $cat->description }}</div>
    <hr>
    <br>
@endforeach
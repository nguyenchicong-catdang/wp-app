<x-wp-layout::layout title="{{ $post->title }}" :breadcrumbs="$post->breadcrumbs">
    {{-- title --}}
    {{-- <x-slot:title>{{ $post->title }}</x-slot:title> --}}
    {{-- Laravel sẽ lấy mảng từ hàm getBreadcrumbsAttribute ở trên --}}
    {{-- <x-slot:breadcrumbs>{{ $post->breadcrumbs }}</x-slot:breadcrumbs> --}}
    {{-- <x-wp-layout::breadcrumbs :data="$post->breadcrumbs" /> --}}
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
</x-wp-layout::layout>

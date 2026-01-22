@props(['data' => []]) {{-- Khai báo nhận thuộc tính data --}}

<nav aria-label="breadcrumb">
<ol class="breadcrumb">
    <li class="breadcrumb-item">
        <a href="/">Home</a>
    </li>
    @if (!empty($data))
        @foreach ($data as $item)
            <li class="breadcrumb-item">
                <a href="{{ $item['url'] }}">{{ $item['title'] }}</a>
            </li>
        @endforeach
    @endif
    </ol>
</nav>
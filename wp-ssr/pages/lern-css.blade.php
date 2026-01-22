<x-wp-layout::master :title="'Danh mục ' . $category->name">

    @push('styles')
        {{-- File này sẽ được đẩy lên @stack('styles') ở <head> --}}
        @vite(['scss/category.scss'], 'vite-ssr-dist')
    @endpush

    @push('scripts')
        {{-- File này sẽ được đẩy xuống @stack('scripts') trước khi đóng thẻ <body> --}}
        @vite(['js/category.js'], 'vite-ssr-dist')
    @endpush

    {{-- Nội dung chính của trang Category --}}
    <div class="category-list">
        <h1>{{ $category->name }}</h1>
        {{-- ... --}}
    </div>

</x-wp-layout::master>
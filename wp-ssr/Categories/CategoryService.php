<?php

namespace Wp\Categories;

use Illuminate\Support\Collection;

class CategoryService
{
    public function index()
    {
        // $categories = Category::all();
        
        return Category::with('term')->get();
        // return $categories;
    }

    public function show($slug)
    {
        // $category = Category::slug($slug)->firstOrFail();
        // dd($category);
        // $category = Category::with('term')->slug($slug)->with('posts')->firstOrFail();
        $category = Category::slug($slug)
            ->with(['term', 'posts']) // Gom chung vào một mảng
            ->firstOrFail();
        // dd($category->posts);
        return $category;
    }

    // public function sidebar(): \Illuminate\Support\Collection
    // {
    //     // return Category::with('term')->get();
    //     $category = app(Category::class);
    //     $action = app(Actions\GetDataSidebarAction::class);
    //     $data = $action->execute($category);
    //     // $data = Resources\SidebarResource::collection($data)->resolve();
    //     // $data = app(Actions\GetDataSidebarAction::class)->execute(new Category());
    //     // $data = collect($data)->map(fn($item) => (object) $item);
    //     return $data;
    // }

    // public function sidebar(): Collection
    // {
    //     // Sử dụng cache()->remember để tự động kiểm tra Redis
    //     return cache()->remember('wp_sidebar_categories', 3600, function () {
    //         $category = app(Category::class);
    //         $action = app(Actions\GetDataSidebarAction::class);

    //         // Bước 1: Lấy dữ liệu từ Action (đang trả về LazyCollection)
    //         $lazyData = $action->execute($category);

    //         // Bước 2: Chuyển LazyCollection thành mảng thuần túy (Array of Objects)
    //         // Đây là lúc dữ liệu thực sự được nạp vào RAM để chuẩn bị gửi sang Redis
    //         return $lazyData->collect();
    //     });
    // }

    public function sidebar(): Collection
    {
        $data = cache()->remember('wp_sidebar_categories', 3600, function () {
            // $category = app(Category::class);
            // $action = app(Actions\GetDataSidebarAction::class);

            // // Trả về mảng để Redis lưu trữ nhẹ nhàng
            // return $action->execute($category)->collect()->all();
            $category = app(Category::class);
            $action = app(Actions\GetDataSidebarAction::class);

            // Bước 1: Lấy dữ liệu từ Action (đang trả về LazyCollection)
            $lazyData = $action->execute($category);
            return $lazyData->collect()->all();
        });

        // Ép kiểu kết quả lấy từ Cache thành Collection trước khi trả về
        return collect($data);
    }
}
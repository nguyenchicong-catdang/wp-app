<?php

namespace Wp\Categories;

use Wp\Categories\Resources\CategoriesResource;

class CategoryController
{
    public function index(CategoryService $service)
    {
        $categories = $service->index();
        // return view('wp-category::categories', ['categories' => $categories]);

        // Resolve trả về một Collection của các mảng
        $data = CategoriesResource::collection($categories)->resolve();

        // Biến từng mảng trong danh sách thành Object để Blade dùng $category->name
        $data = collect($data)->map(fn($item) => (object) $item);
        return view('wp-category::categories', ['cats' => $data]);
    }

    public function show($slug, CategoryService $service)
    {
        // dd($slug);
        $category = $service->show($slug);
        $data = (object) CategoriesResource::make($category)->resolve();
        // $data = (object) $data;
        return view('wp-category::category', ['cat' => $data]);
    }
}
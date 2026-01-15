<?php

namespace Wp\Categories;

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
}
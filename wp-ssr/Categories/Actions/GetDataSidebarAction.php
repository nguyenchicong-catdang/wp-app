<?php

namespace Wp\Categories\Actions;

use Illuminate\Support\Collection;
use Wp\Categories\Category;
// use Illuminate\Support\Collection;
use Illuminate\Support\LazyCollection;

class GetDataSidebarAction
{
    public function execute(Category $category): LazyCollection
    {

        // return $category::with('term')->get();

        // $columns = ['term_id'];
        // return $category::select($columns)
        // ->with('term')->get();

        // $columns = ['term_id'];
        // $columnsTerm = ['term_id', 'name', 'slug'];
        // $uncategorized_term_id = 1;
        // return $category::select($columns)
        //     // https://laravel.com/docs/12.x/eloquent-relationships#querying-relationship-existence
        //     // hoăc háh
        //     // ->where('term_id', '!=', $uncategorized_term_id)
        //     ->whereNot('term_id', $uncategorized_term_id)

        //     ->with(['term' => function ($query) use ($columnsTerm) {
        //         $query->select($columnsTerm);
        //         // loai bỏ category có slug là 'uncategorized'
        //         // ->whereNot('slug', 'uncategorized');
        //     }])
        //     ->get();

        // $columns = ['term_id'];
        // $columnsTerm = ['term_id', 'name', 'slug'];
        // return $category::select($columns)
        //     ->with(['term' => function ($query) use ($columnsTerm) {
        //         $query->select($columnsTerm);
        //         // loai bỏ category có slug là 'uncategorized'
        //         // ->whereNot('slug', 'uncategorized');
        //     }])
        //     ->get();

        $columns = ['term_id'];

        return $category::select($columns)
            ->with('term:term_id,name,slug')
            // ->get()
            // ->cursor() // Dùng cursor thay cho get để xử lý từng dòng một
            ->cursor() // Tiết kiệm RAM tối đa
            ->map(fn($item) => (object) [
                'id'   => $item->term_id,
                'name' => $item->term?->name,
                'slug' => $item->term?->slug,
            ]);
    }
}

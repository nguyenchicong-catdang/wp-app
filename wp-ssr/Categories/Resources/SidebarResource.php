<?php

namespace Wp\Categories\Resources;

class SidebarResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($category)
    {
        return [
            'id'          => $this->term_id,
            // Truy cập thông qua quan hệ term để lấy đúng dữ liệu từ WordPress
            'name'        => $this->term?->name,
            'slug'        => $this->term->slug,
            // 'description' => $this->description,
            // 'count'       => $this->count, // Số bài viết trong category này
        ];

        // Trong GetDataSidebarAction
        // return  (object) [
        //     'id'   => $category->term_id,
        //     'name' => $category->term?->name,
        //     'slug' => $category->term?->slug,
        // ];
    }
}   
<?php

namespace Wp\Categories\Resources;

class CategoriesResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($category): array
    {
        return [
            'id'          => $this->term_id,
            // Truy cập thông qua quan hệ term để lấy đúng dữ liệu từ WordPress
            'name'        => $this->term->name,
            'slug'        => $this->term->slug,
            'description' => $this->description,
            'count'       => $this->count, // Số bài viết trong category này
        ];
    }
}
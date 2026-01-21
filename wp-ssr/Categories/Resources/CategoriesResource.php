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
            'posts'       => $this->posts->map(fn($post) => (object) [
                'id'    => $post->ID,
                'title' => $post->post_title,
                'excerpt' => $post->post_excerpt,
                'thumbnail'=> $post->thumbnail ? (object) [
                    'url'   => $post->thumbnail->attachment->url,
                    'alt'   => $post->thumbnail->attachment->alt,
                ] : null,
                'slug'  => $post->post_name,
            ])->all(),
        ];
    }
}
<?php

namespace Wp\Posts\Resources;

class PostResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($data): array
    {
        return [
            'id' => $this->ID,
            'title' => $this->post_title,
            'content' => $this->post_content,
            'slug' => $this->post_name,
            'created_at' => $this->post_date->format('d-m-Y'),
            'updated_at' => $this->post_modified->format('d-m-Y'),
        ];
    }
}
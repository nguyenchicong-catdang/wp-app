<?php

namespace Wp\Posts;

class PostService
{
    public function show($slug)
    {
        $post = Post::published()->where('post_name', $slug)
            ->with(['thumbnail.attachment', 'meta'])
            ->firstOrFail();
        return $post;
    }
}
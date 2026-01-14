<?php

namespace Wp\Posts;

class PostService
{
    public function show($slug)
    {
        $post = Post::published()->where('post_name', $slug)->firstOrFail();
        return $post;
    }
}
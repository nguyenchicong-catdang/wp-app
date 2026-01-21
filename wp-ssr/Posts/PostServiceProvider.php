<?php

namespace Wp\Posts;

class PostServiceProvider extends \Illuminate\Support\ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/../pages', 'wp-posts');
    }
}
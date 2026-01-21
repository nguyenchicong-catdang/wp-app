<?php
namespace Wp\Categories;

class CategoryServiceProvide extends \Illuminate\Support\ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        //
        $this->loadViewsFrom(__DIR__ . '/../pages', 'wp-category');
    }
}
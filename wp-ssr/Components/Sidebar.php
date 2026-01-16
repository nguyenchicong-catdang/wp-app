<?php

namespace Wp\Components;

class Sidebar extends \Illuminate\View\Component
{
    public function render()
    {
        $services = app(\Wp\Categories\CategoryService::class);
        $categories = $services->sidebar();
        return view('wp-layout::sidebar',['data'=>$categories]);
    }
}
<?php

namespace Wp\Components;

class Breadcrumbs extends \Illuminate\View\Component
{
    public function render()
    {
        return view('wp-layout::breadcrumbs');
    }
}
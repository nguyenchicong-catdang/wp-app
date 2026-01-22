<?php
namespace Wp\Components;

class Layout extends \Illuminate\View\Component
{
    public function render()
    {
        return view('wp-layout::layout');
    }
}
<?php

namespace Wp\Components;

// use Illuminate\Console\View\Components\Component;
use Illuminate\View\Component;
use Illuminate\View\View;

class Header extends Component
{
    public function render(): View
    
    {
        return view('wp-layout::header');
    }
}
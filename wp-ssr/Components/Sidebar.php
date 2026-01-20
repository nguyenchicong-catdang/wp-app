<?php

namespace Wp\Components;

class Sidebar extends \Illuminate\View\Component
{
    public function render()
    {
        // $services = app(\Wp\Sidebars\SidebarService::class);
        // $data = $services->getData();
        // return view('wp-layout::sidebar',['data'=>$data]);
        $data = app(\Wp\Sidebars\SidebarService::class)
        ->getData();
        return view('wp-layout::sidebar',['data'=>(object) $data]);
    }
}
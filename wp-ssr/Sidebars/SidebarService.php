<?php
namespace Wp\Sidebars;

use Wp\Sidebars\Actions\SidebarGetData;

class SidebarService
{
    
    public function getData()
    {
        // $actionData = app(SidebarGetData::class);
        // $data = $actionData::toArray(app(Sidebar::class));
        // return $data;

        return app(SidebarGetData::class)
        ->toArray(app(Sidebar::class));
    }
}
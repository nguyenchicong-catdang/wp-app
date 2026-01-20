<?php

namespace Wp\Sidebars\Actions;

// use Illuminate\Support\Collection;
use Wp\Sidebars\Sidebar;

class SidebarGetData
{
    public static function toArray(Sidebar $sidebar): array
    {
        $optionsName = 'sidebar_html_content';
        //https://github.com/corcel/corcel
        // $siteUrl = Option::get('siteurl');
        $data = $sidebar::get($optionsName);
        return [
            'content' => $data,
        ];
    }
}
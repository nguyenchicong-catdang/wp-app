<?php

namespace Wp\Sidebars;

use Corcel\Model\Option as CorcelOption;
class Sidebar extends CorcelOption
{
    protected $connection = 'wordpress';
    public function getSidebarData(SidebarService $service)
    {
        return $service->getSidebar();
    }
}

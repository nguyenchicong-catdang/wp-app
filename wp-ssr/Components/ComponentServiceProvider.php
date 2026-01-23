<?php

namespace Wp\Components;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class ComponentServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // 1. Đăng ký namespace cho Class
        Blade::componentNamespace('Wp\\Components\\Namespace', 'wp-namespace');

        // // 2. Đăng ký đường dẫn View
        $this->loadViewsFrom(__DIR__ . '/Namespace/views-namespace', 'wp-namespace');

        // Đổi 'wp-layout' thành 'wp-views' để tránh trùng tên với namespace phía trên
        Blade::anonymousComponentPath(__DIR__ . '/views', 'wp-views');
        $this->loadViewsFrom(__DIR__ . '/views', 'wp-views');

        // 3. Đăng ký hàng loạt Anonymous Components
        // $components = [
        //     'layout-header' => __DIR__ . '/Layout/Headers',
        //     // Thêm các component khác tại đây
        // ];

        // foreach ($components as $prefix => $path) {
        //     Blade::anonymousComponentPath($path, $prefix);
        // }
    }
}

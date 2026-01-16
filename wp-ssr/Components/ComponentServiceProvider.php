<?php

namespace Wp\Components;

use Illuminate\Support\Facades\Blade;

class ComponentServiceProvider extends \Illuminate\Support\ServiceProvider
{
    public function boot()
    {
        // Đăng ký namespace cho Class
        Blade::componentNamespace('Wp\\Components', 'wp-layout');

        // Đăng ký đường dẫn View
        // __DIR__ . '/views' sẽ trỏ đúng vào thư mục views nằm cùng cấp với file này
        $this->loadViewsFrom(__DIR__ . '/views', 'wp-layout');

        // // 2. Đăng ký hàng loạt Anonymous Components bằng mảng
        $components = [
            'layout-header' => __DIR__ . '/Layout/Headers',
            // Thêm các component khác tại đây
        ];

        foreach ($components as $prifix => $path) {
            Blade::anonymousComponentPath($path, $prifix);
        }
    }
}
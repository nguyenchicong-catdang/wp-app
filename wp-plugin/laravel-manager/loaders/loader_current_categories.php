<?php
// laravel-manager/loaders/loader_current_categories.php
$config = get_option('laravel_sidebar_config');
$data = json_decode($config, true); // Bây giờ bạn lại có mảng PHP
wp_localize_script('asset_laravel_sidebar_script', 'dataCurrentCategories', [
    'currentCategories' => $data,]);
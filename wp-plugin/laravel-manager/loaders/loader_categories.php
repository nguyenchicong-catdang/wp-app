<?php
// 2. Lấy danh sách Category
$categories = get_categories(array(
    'hide_empty' => 0,
));

$data = [];

foreach($categories as $cat) {
    $data[] = [
        'id' => $cat->term_id,
        'name' => $cat->name,
        'slug' => $cat->slug,
        'parent' => $cat->parent
    ];
}

// Gửi sang JS dưới tên biến window.laravelData
wp_localize_script('asset_laravel_sidebar_script', 'dataCategories', [
    'categories' => $data,
    'nonce' => wp_create_nonce('action_update_laravel_sidebar_nonce')
]);
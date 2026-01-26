<?php
// Learn Bulk Update

require_once('wp-load.php'); // Nạp môi trường WordPress

// Tăng giới hạn thời gian và bộ nhớ cho 100k hàng
set_time_limit(0);
ini_set('memory_limit', '1024M');

$args = [
    'post_type'      => ['post', 'page'],
    'post_status'    => 'publish',
    'posts_per_page' => -1, // Lấy tất cả
    'fields'         => 'ids'
];

$post_ids = get_posts($args);
$total = count($post_ids);

echo "Bắt đầu xử lý $total bài viết...<br>";

foreach ($post_ids as $index => $id) {
    $post = get_post($id);
    
    // Gọi hàm xử lý breadcrumb của bạn
    save_breadcrumb_to_metabox($id, $post);
    
    if (($index + 1) % 100 == 0) {
        echo "Đã xử lý: " . ($index + 1) . " / $total<br>";
        // Giải phóng bộ nhớ đệm của WP
        wp_cache_flush();
    }
}

echo "Hoàn thành toàn bộ!";

// Ví dụ cho Page
$breadcrumbs[] = [
    'title' => get_the_title($ancestor),
    'url'   => wp_make_link_relative(get_permalink($ancestor)) // Chỉ lấy phần sau domain
];

// Ví dụ cho Category
$breadcrumbs[] = [
    'title' => $ancestor->name,
    'url'   => wp_make_link_relative(get_category_link($ancestor))
];

// Ví dụ cho Post hiện tại
$breadcrumbs[] = [
    'title' => get_the_title($post),
    'url'   => wp_make_link_relative(get_permalink($post))
];
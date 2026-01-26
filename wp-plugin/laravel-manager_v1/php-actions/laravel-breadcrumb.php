<?php

/**
 * File: php-actions/laravel-breadcrumb.php
 */

// Đảm bảo hàm chỉ được khai báo một lần
if (!function_exists('save_breadcrumb_to_metabox')) {

    function save_breadcrumb_to_metabox($post_id, $post)
    {
        // 1. Tránh lưu khi autosave hoặc revision
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (wp_is_post_revision($post_id)) return;

        $breadcrumbs = [];

        // 2. Logic lấy Breadcrumb cho Page
        if ($post->post_type === 'page') {
            $ancestors = get_post_ancestors($post_id);
            $ancestors = array_reverse($ancestors);
            foreach ($ancestors as $ancestor_id) {
                $breadcrumbs[] = [
                    'title' => get_the_title($ancestor_id),
                    // 'url' => get_permalink($ancestor_id)
                    'url' => wp_make_link_relative(get_permalink($ancestor_id))];
            }
        }
        // 3. Logic cho Post (Category)
        else {
            $categories = get_the_category($post_id);
            if (!empty($categories)) {
                $category = $categories[0];
                $category_ancestors = get_ancestors($category->term_id, 'category');
                $category_ancestors = array_reverse($category_ancestors);
                foreach ($category_ancestors as $ancestor_id) {
                    $ancestor = get_category($ancestor_id);
                    $breadcrumbs[] = [
                        'title' => $ancestor->name,
                        // 'url' => get_category_link($ancestor)
                        'url' => wp_make_link_relative(get_category_link($ancestor))
                    ];
                }
                $breadcrumbs[] = [
                    'title' => $category->name,
                    // 'url' => get_category_link($category)
                    'url' => wp_make_link_relative(get_category_link($category))];
            }
        }

        // Thêm bài viết/trang hiện tại vào cuối
        $breadcrumbs[] = [
            'title' => get_the_title($post),
            // 'url' => get_permalink($post)
            'url' => wp_make_link_relative(get_permalink($post))];

        // 4. Lưu vào Database dưới dạng JSON
        // Dùng JSON giúp Laravel/Corcel đọc được mảng Title + URL dễ dàng
        $breadcrumb_json = json_encode($breadcrumbs, JSON_UNESCAPED_UNICODE);
        update_post_meta($post_id, 'cached_breadcrumb', $breadcrumb_json);
        // update_post_meta($post_id, 'cached_breadcrumb', $breadcrumbs);
    }

    // Đăng ký hook với độ ưu tiên cao (20) để chạy sau các plugin SEO khác
    add_action('save_post', 'save_breadcrumb_to_metabox', 20, 2);
}

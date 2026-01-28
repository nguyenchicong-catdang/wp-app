<?php
// laravel-manager/renders/render_laravel_sidebar.php
require_once ROOT_LARAVEL_PATH . 'laravel-manager/actions/action_update_laravel_sidebar.php';

if (!function_exists('render_laravel_sidebar')) {
    function render_laravel_sidebar()
    {
        // // load date categories
        // require_once ROOT_LARAVEL_PATH . 'laravel-manager/loaders/loader_categories.php';
        require_once ROOT_LARAVEL_PATH . 'laravel-manager/views/view_laravel_sidebar.php';
        // action
        // require_once ROOT_LARAVEL_PATH . 'laravel-manager/actions/action_update_laravel_sidebar.php';
    }
}

// asset laravel sidebar
if (!function_exists('asset_laravel_sidebar')) {
    function asset_laravel_sidebar($hook)
    {
        //echo $hook;
        if ($hook !== 'laravel-manager_page_laravel-sidebar') return;

        // --- ĐĂNG KÝ CSS ---
        wp_enqueue_style(
            'asset_laravel_sidebar_style',
            ROOT_LARAVEL_URL . 'laravel-manager/views/css/sidebar.css',
            // array(),
            // time(),
            // true
        );

        // --- ĐĂNG KÝ JS ---
        wp_enqueue_script(
            'asset_laravel_sidebar_script',
            ROOT_LARAVEL_URL . 'laravel-manager/views/js/sidebar.js',
            // array(),
            // time(),
            // true
        );

        // load data categories
        require_once ROOT_LARAVEL_PATH . 'laravel-manager/loaders/loader_categories.php';
        // Lấy data để truyền sang JS
        // $categories = get_categories();
        // load data current categories (data laravel sidebar )
        require_once ROOT_LARAVEL_PATH . 'laravel-manager/loaders/loader_current_categories.php';
    }
}

add_action('admin_enqueue_scripts', 'asset_laravel_sidebar');
// $tag = apply_filters( 'script_loader_tag', $tag, $handle, $src );
add_filter('script_loader_tag', function ($tag, $handle, $src) {
    if ('asset_laravel_sidebar_script' === $handle) {
        // Thêm type="module" và giữ đúng ID tiêu chuẩn của WP
        // $tag = '<script type="module" src="' . esc_url($src) . '" id="' . esc_attr($handle) . '-js"></script>';
        // return '<script type="module" src="' . esc_url($src) . '" id="' . esc_attr($handle) . '-js"></script>';
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}, 10, 3);

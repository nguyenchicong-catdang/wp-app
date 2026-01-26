<?php
// laravel-manager/views/render_laravel_manager_index.php
if (!function_exists('render_laravel_manager')) {
    function render_laravel_manager() {
        // echo ROOT_LARAVEL_URL;
        // laravel-manager/views/view_laravel_manager_index.php
        require_once ROOT_LARAVEL_PATH . 'laravel-manager/views/view_laravel_manager.php';
    }
}
// asset laravel manager

if (!function_exists('asset_laravel_manager')) {
    function asset_laravel_manager($hook) {
        // echo WP_PLUGIN_URL;
        // echo ROOT_LARAVEL_URL;
        // echo '<h1 style="margin-left:200px;">Trang này có hook là: ' . $hook . '</h1>';
        // (Tùy chọn) Chỉ load script ở trang plugin của bạn, tránh làm nặng các trang khác
        if ($hook != 'toplevel_page_laravel-manager') {
            return;
        }
        // echo ROOT_LARAVEL_URL . 'laravel-manager/views/js/index.js';
        // --- ĐĂNG KÝ CSS ---
        wp_enqueue_style(
            'asset_laravel_manager_style',
            ROOT_LARAVEL_URL . 'laravel-manager/views/css/manager.css'
        );
        // --- ĐĂNG KÝ JS ---
        wp_enqueue_script(
            'asset_laravel_manager_script',
            ROOT_LARAVEL_URL . 'laravel-manager/views/js/manager.js',
        );
    }
}

add_action('admin_enqueue_scripts', 'asset_laravel_manager');
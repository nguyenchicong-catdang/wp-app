<?php
// laravel-manager/views/render_laravel_manager_index.php
if (!function_exists('render_laravel_manager_index')) {
    function render_laravel_manager_index() {
        // echo ROOT_LARAVEL_URL;
        // laravel-manager/views/view_laravel_manager_index.php
        require_once ROOT_LARAVEL_PATH . 'laravel-manager/views/view_laravel_manager_index.php';
    }
}
// asset laravel index

if (!function_exists('asset_laravel_index')) {
    function asset_laravel_index($hook) {
        // (Tùy chọn) Chỉ load script ở trang plugin của bạn, tránh làm nặng các trang khác
        if ($hook != 'toplevel_page_laravel-manager') {
            return;
        }
        // echo ROOT_LARAVEL_URL . 'laravel-manager/views/js/index.js';
        // --- ĐĂNG KÝ CSS ---
        wp_enqueue_style(
            'asset_laravel_index_style',
            ROOT_LARAVEL_URL . 'laravel-manager/views/css/index.css'
        );
        // --- ĐĂNG KÝ JS ---
        wp_enqueue_script(
            'asset_laravel_index_script',
            ROOT_LARAVEL_URL . 'laravel-manager/views/js/index.js',
        );
    }
}

add_action('admin_enqueue_scripts', 'asset_laravel_index');
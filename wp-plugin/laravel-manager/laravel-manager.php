<?php
/**
 * Plugin Name: Laravel Manager
 * Version: 1.0.1
 */

if (!defined('ABSPATH')) exit;

// Tạo Menu Laravel Manager trong WP-Admin
if (!function_exists('laravel_manager')) {
    define('ROOT_LARAVEL_PATH', plugin_dir_path(__DIR__));
    define('ROOT_LARAVEL_URL', plugin_dir_url(__DIR__));
    function laravel_manager() {
        $parent_slug = 'laravel-manager';
        add_menu_page(
            'Laravel Manager',          // Tiêu đề trang
            'Laravel Manager',          // Tên hiển thị Menu
            'manage_options',           // Quyền admin
            $parent_slug, // Slug
            'render_laravel_manager_index'
        );
    }
}
// Hàm callback để hiển thị nội dung file view

require_once ROOT_LARAVEL_PATH . 'laravel-manager/renders/include_views.php';
// Tạo Menu Laravel Manager trong WP-Admin
add_action('admin_menu', 'laravel_manager');
<?php
/**
* Plugin Name: Laravel Manager
*/

if (!defined('ABSPATH')) exit;

// Tạo Menu Laravel Manager trong WP-Admin
add_action('admin_menu', function () {
$parent_slug = 'laravel-manager';    
add_menu_page(
        'Laravel Manager',          // Tiêu đề trang
        'Laravel Manager',          // Tên hiển thị Menu
        'manage_options',           // Quyền admin
        $parent_slug, // Slug
        'render_laravel_index',  // Hàm hiển thị giao diện
        // 'dashicons-admin-tools',    // Icon
        // 26                          // Vị trí
    );

    // Thêm Laravel Sidebar
    add_submenu_page(
        $parent_slug,
        'Laravel Sidebar',
        'Laravel Sidebar',
        'manage_options',
        'laravel-sidebar',
        'laravel_sidebar_view_callback'
    );
});

// Hàm callback để hiển thị nội dung file view
// Index laravel manager
if (!function_exists('render_laravel_index')) {
    function render_laravel_index()
    {
        $view_path = plugin_dir_path(__FILE__) . 'views/index-laravel-manager.php';

        if (file_exists($view_path)) {
            include $view_path;
        } else {
            echo "Không tìm thấy file giao diện tại: " . $view_path;
        }
    }
}

// laravel_sidebar_view_callback
if (!function_exists('laravel_sidebar_view_callback')) {
    function laravel_sidebar_view_callback()
    {
        $view_path = plugin_dir_path(__FILE__) . 'views/sidebar-laravel.php';

        if (file_exists($view_path)) {
            include $view_path;
        } else {
            echo "Không tìm thấy file giao diện tại: " . $view_path;
        }
    }
}

// Add Script
// add_action('admin_enqueue_scripts', function ($hook) {
//     // Chỉ nạp script trên trang Laravel Sidebar
//     // if ($hook === 'toplevel_page_laravel-manager') {
//     //     wp_enqueue_script(
//     //         'laravel-sidebar-script',
//     //         plugin_dir_url(__FILE__) . 'js/sidebar/sidebar.js',
//     //         [],
//     //         '1.0.0',
//     //         true
//     //     );
//     // }

//     wp_enqueue_script(
//         'laravel-sidebar-script',
//         // Đảm bảo đường dẫn này trỏ đúng vào file js
//         plugin_dir_url(__FILE__) . 'js/sidebar/sidebar.js',
//         array(),
//         time(), // Dùng time() thay cho '1.0.0' để tránh trình duyệt lưu cache cũ
//         true
//     );
// });

// add_action('admin_enqueue_scripts', function ($hook) {
//     // Bước 1: Log ra console của trình duyệt để xem giá trị thực sự của $hook
//     // Nó sẽ hiện ở tab Console như số 1 bạn vừa làm
//     echo "<script>console.log('Hook hiện tại là: " . $hook . "');</script>";

//     // Bước 2: Sau khi biết chính xác giá trị, bạn thay vào đây
//     if ($hook !== 'laravel-manager_page_laravel-sidebar') { // Thay chuỗi này bằng kết quả ở Bước 1
//         return;
//     }

//     wp_enqueue_script(
//         'laravel-sidebar-script',
//         plugin_dir_url(__FILE__) . 'js/sidebar/sidebar.js',
//         array(),
//         time(),
//         true
//     );
// });

// 1. Nạp script như bình thường
add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'laravel-manager_page_laravel-sidebar') return;

    wp_enqueue_script(
        'laravel-sidebar-script',
        plugin_dir_url(__FILE__) . 'js/sidebar/sidebar.js',
        array(),
        time(),
        true
    );
});

// 2. Thêm type="module" cho đúng handle 'laravel-sidebar-script'
add_filter('script_loader_tag', function ($tag, $handle, $src) {
    if ('laravel-sidebar-script' !== $handle) {
        return $tag;
    }
    // Thay đổi thẻ <script> để có type="module"
    return '<script type="module" src="' . esc_url($src) . '"></script>';
}, 10, 3);


// crud sidebar html content
require_once plugin_dir_path(__FILE__) . 'php-actions/laravel-sidebar.php';
// crud breadcrumb
require_once plugin_dir_path(__FILE__) . 'php-actions/laravel-breadcrumb.php';
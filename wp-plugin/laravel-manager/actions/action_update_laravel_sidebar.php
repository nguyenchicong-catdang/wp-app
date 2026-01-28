<?php
// laravel-manager/actions/action_update_laravel_sidebar.php

// Hook này chạy cho user đã đăng nhập: admin_post_{action}
add_action('admin_post_action_update_laravel_sidebar', function () {

    // 1. Kiểm tra quyền
    if (!current_user_can('manage_options')) {
        wp_die('Bạn không có quyền thực hiện hành động này.');
    }

    // 2. Kiểm tra Nonce
    if (!isset($_POST['_wpnonce']) || !wp_verify_nonce($_POST['_wpnonce'], 'action_update_laravel_sidebar_nonce')) {
        wp_die('Lỗi bảo mật Nonce.');
    }

    // 3. Lấy và xử lý dữ liệu
    // if (isset($_POST['sidebar_data'])) {
    //     $data = json_decode(stripslashes($_POST['sidebar_data']), true);

    //     if ($data) {
    //         // Lưu vào bảng wp_options
    //         update_option('laravel_sidebar_config', $data);
    //     }
    // }
    if (isset($_POST['sidebar_data'])) {
        $raw_data = json_decode(stripslashes($_POST['sidebar_data']), true);

        if (is_array($raw_data)) {
            $sanitized_data = [];

            foreach ($raw_data as $item) {
                // Chỉ lấy những gì chúng ta thực sự cần
                $sanitized_data[] = [
                    'id'    => isset($item['id']) ? sanitize_text_field($item['id']) : '',
                    'name'  => isset($item['name']) ? sanitize_text_field($item['name']) : 'Unnamed',
                    'slug'  => isset($item['slug']) ? sanitize_title($item['slug']) : '',
                    'level' => isset($item['level']) ? (int)$item['level'] : 0,
                ];
            }

            // Lưu JSON để Corcel dễ đọc nhất
            update_option('laravel_sidebar_config', json_encode($sanitized_data, JSON_UNESCAPED_UNICODE));
        }
    }

    // 4. Điều hướng quay lại trang cài đặt sau khi lưu xong
    wp_redirect(admin_url('admin.php?page=laravel-sidebar'));
    exit;
});
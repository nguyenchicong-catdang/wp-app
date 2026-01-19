<?php
// Tên action 'save_laravel_sidebar_content' phải khớp với input hidden trong form JS
add_action('admin_post_save_laravel_sidebar_content', function () {

    // 1. Kiểm tra quyền hạn
    if (!current_user_can('manage_options')) {
        wp_die('Bạn không có quyền truy cập.');
    }
    // chống lại các cuộc tấn công giả mạo (CSRF)
    if (!isset($_POST['laravel_sidebar_nonce']) || !wp_verify_nonce($_POST['laravel_sidebar_nonce'], 'save_sidebar_action')) {
        wp_die('Hết phiên làm việc, vui lòng thử lại.');
    }

    // 2. Lấy và xử lý dữ liệu (Upsert)
    if (isset($_POST['laravel_sidebar_html'])) {
        // wp_unslash để tránh việc HTML bị thêm các dấu gạch chéo ngược (\)
        $raw_html = wp_unslash($_POST['laravel_sidebar_html']);
        // Lọc mã độc nhưng vẫn giữ lại HTML an toàn
        $safe_html = wp_kses_post($raw_html);
        update_option('sidebar_html_content', $safe_html);
    }

    // 3. Điều hướng quay lại trang chính kèm tham số thông báo
    wp_redirect(admin_url('admin.php?page=laravel-sidebar&status=updated'));
    exit;
});

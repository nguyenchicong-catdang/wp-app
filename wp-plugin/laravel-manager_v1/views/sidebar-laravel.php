<?php
// laravel-manager/views/sidebar-laravel.php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
// 1. Lấy dữ liệu hiện tại từ Option
$current_html = get_option('sidebar_html_content', '');
// 2. Truyền dữ liệu sang JS qua biến window
echo "<script>
    window.laravelSidebarData = " . json_encode(['htmlContent' => $current_html]) . ";
    window.laravelSidebarNonce = '" . wp_create_nonce('save_sidebar_action') . "';
</script>";
// Kiểm tra nếu trên URL có status=updated
if (isset($_GET['status']) && $_GET['status'] === 'updated') {
?>
    <div class="updated notice is-dismissible">
        <p><strong>Thành công!</strong> Nội dung Sidebar đã được cập nhật.</p>
    </div>
<?php
}
?>

<div style="display: flex; justify-content:space-between; align-items: center; margin-bottom:10px;">
    <h3 style="width:70%; text-align: center;">Laravel Sidebar</h3>
    <button style="margin-right: 50px;" id="BtnEditSidebar">Edit</button>
</div>
<div style="border:1px solid #ccc; padding:10px;">
    <?php //echo $current_html ?: 'Chưa có nội dung.'; 
    ?>
    <?php echo wp_kses_post(get_option('sidebar_html_content', 'Chưa có nội dung.')); ?>
</div>
<div id="editSidebar"></div>
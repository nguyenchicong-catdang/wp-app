// laravel-manager/js/sidebar/edit-render.js

function renderEditSidebar() {
    // Lấy nội dung cũ đã được PHP truyền qua window (xem bước 2)
    const currentData = window.laravelSidebarData || "";
    // console.log("Current Data:", currentData);
    // Đường dẫn xử lý form chuẩn của WordPress
    const actionUrl = window.ajaxurl.replace(
        "admin-ajax.php",
        "admin-post.php",
    );

    return /* html */ `
    <h3>Edit Laravel Sidebar</h3>
    <form action="${actionUrl}" method="POST">
        <input type="hidden" name="action" value="save_laravel_sidebar_content">
        <input type="hidden" name="laravel_sidebar_nonce" value="${window.laravelSidebarNonce}">

        Viet ma HTML cho sidebar: <br>
        <textarea name="laravel_sidebar_html" style="width:100%; height:200px;">${currentData?.htmlContent}</textarea><br>
        
        <button type="submit" class="button button-primary">Update</button>
        <a href="?page=laravel-sidebar" class="button">Cancel</a>
    </form>
    `;
}

function init(editSidebarContainer) {
    const btnEditSidebar = document.getElementById('BtnEditSidebar');
    if (btnEditSidebar) {
        btnEditSidebar.addEventListener('click', function () {
            editSidebarContainer.innerHTML = renderEditSidebar();
        });
    }
}

export { renderEditSidebar, init };
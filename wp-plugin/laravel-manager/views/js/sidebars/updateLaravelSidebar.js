// laravel-manager/views/js/sidebars/updateLaravelSidebar.js
import { getDataCurrentCategories } from "./dataLoaderSidebar.js";

function updateLaravelSidebar() {
    const btnUpdateSidebar = document.getElementById("btnUpdateSidebar");
    if (!btnUpdateSidebar) return;

    btnUpdateSidebar.addEventListener("click", async () => {
        const data = getDataCurrentCategories();
        console.log(window.dataCategories?.nonce);
        // Tạo một form tạm thời để submit lên admin-post.php
        const form = document.createElement("form");
        form.method = "POST";
        form.action = window.ajaxurl.replace(
            "admin-ajax.php",
            "admin-post.php",
        );

        // 1. Thêm action định danh cho WordPress
        const actionInput = document.createElement("input");
        actionInput.type = "hidden";
        actionInput.name = "action";
        actionInput.value = "action_update_laravel_sidebar"; // Khớp với hook trong PHP
        form.appendChild(actionInput);

        // 2. Thêm dữ liệu JSON
        const dataInput = document.createElement("input");
        dataInput.type = "hidden";
        dataInput.name = "sidebar_data";
        dataInput.value = JSON.stringify(data);
        form.appendChild(dataInput);

        // 3. Thêm Nonce để bảo mật (Rất quan trọng)
        const nonceInput = document.createElement("input");
        nonceInput.type = "hidden";
        nonceInput.name = "_wpnonce";
        nonceInput.value = window.dataCategories?.nonce; // Giả sử bạn đã localize nonce vào đây
        form.appendChild(nonceInput);

        document.body.appendChild(form);
        form.submit(); // Gửi form đi và load lại trang
    });
}
export { updateLaravelSidebar };

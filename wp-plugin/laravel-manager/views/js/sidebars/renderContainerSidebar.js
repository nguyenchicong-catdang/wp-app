// laravel-manager/views/js/sidebars/renderContainerSidebar.js
import { dragContainerSidebar } from "./dragContainerSidebar.js";
function renderContainerSidebar(categories) {
    const containerSidebar = document.getElementById("containerSidebar");
    if (!containerSidebar) return;

    // Nếu không có category nào được chọn, xóa trắng container hoặc hiện thông báo
    if (!categories || categories.length === 0) {
        containerSidebar.innerHTML = "<p>Chưa có danh mục nào được chọn.</p>";
        return;
    }
    // Duyệt qua mảng và tạo HTML cho từng item
    // const htmlItems = categories
    //     .map((cat) => {
    //         return /* html */ `
    //         <div style="padding-left:${cat.level * 20}px">
    //             <h4>${cat.name}</h4>
    //         </div>
    //     `;
    //     })
    //     .join(""); // Nối mảng thành chuỗi HTML

    const htmlItems = categories
        .map((cat, index) => {
            return /* html */ `
            <div class="draggable-item" 
                 draggable="true" 
                 data-index="${index}" 
                 style="--indent-level: ${cat.level};"
                 >
                <h4 style="margin: 5px;"> ☰ ${cat.name}</h4>
            </div>
        `;
        })
        .join("");

    // Cập nhật giao diện
    containerSidebar.innerHTML = htmlItems;
    // Sau khi render xong, kích hoạt các sự kiện kéo thả
    dragContainerSidebar(containerSidebar, categories);
}

export { renderContainerSidebar };

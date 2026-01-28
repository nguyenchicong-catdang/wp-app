// laravel-manager/views/js/sidebars/renderContainerSidebar.js
import { dragContainerSidebar } from "./dragContainerSidebar.js";
import { dataCurrentCategories } from "./dataLoaderSidebar.js";
function renderContainerSidebar(categories = dataCurrentCategories) {
    const containerSidebar = document.getElementById("containerSidebar");
    if (!containerSidebar) return;
    // console.log(categories);
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
            // Mỗi level thụt lề 30px
            const padding = cat.level * 30;
            return /* html */ `
            <div class="draggable-item" 
                 draggable="true" 
                 data-index="${index}" 
                 data-level="${cat.level}" 
                 style="padding-left: ${padding}px">
                ${cat.level > 0 ? "↳ " : ""} ${cat.name}
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

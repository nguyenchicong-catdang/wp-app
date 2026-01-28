// laravel-manager/views/js/sidebar.js
import { renderSidebar } from "./sidebars/renderSidebar.js";
import { renderCategoryRows } from "./sidebars/renderCategoryRows.js";
import { editLaravelSidebar } from "./sidebars/editLaravelSidebar.js";
// import { editLaravelSidebar } from "./sidebars/editLaravelSidebar.js";
// import { categoryBuildTree } from "./sidebars/categoryBuildTree.js";
// import { renderCategoryRows } from "./sidebars/renderCategoryRows.js";
// editLaravelSidebar();
// console.log(1)
// Lấy data từ PHP đã localize
//     let cats = window.categoriesData ? window.categoriesData.categories : [];
// if (cats.length > 0) {
//     cats = categoryBuildTree(cats);
//     console.log("Tree đã dựng:", renderCategoryRows(cats));
// }
document.addEventListener("DOMContentLoaded", () => {
    // Chạy các hàm khởi tạo bên trong này
    renderSidebar();
    renderCategoryRows();
    editLaravelSidebar();
});
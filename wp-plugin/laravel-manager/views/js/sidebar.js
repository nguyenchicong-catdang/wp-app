// laravel-manager/views/js/sidebar.js
import { editLaravelSidebar } from "./sidebars/editLaravelSidebar.js";
import { categoryBuildTree } from "./sidebars/categoryBuildTree.js";
// editLaravelSidebar();
// console.log(1)
// Lấy data từ PHP đã localize
    const cats = window.categoriesData.categories;
    console.log("Categories từ WordPress:", cats);
document.addEventListener("DOMContentLoaded", editLaravelSidebar);
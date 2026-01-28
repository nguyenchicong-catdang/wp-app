// laravel-manager/views/js/sidebars/renderCategoryRows.js
import { categoryBuildTree } from "./categoryBuildTree";
let cats = window.categoriesData ? window.categoriesData.categories : [];
if (cats.length > 0) {
    cats = categoryBuildTree(cats);
    //console.log("Tree đã dựng:", renderCategoryRows(cats));
    renderCategoryRows(cats);
}

function renderCategoryRows(categories) {
    let html = ``;
    categories.forEach(cat => {
        // Tạo khoảng trống thụt lề dựa trên level (mỗi level thụt 20px)
        const padding = cat.level * 20;

        html += /* html */ `
        <tr>
            <td>
                <input type="checkbox" name="category_ids[]" value="${cat.id}">
            </td>
            <td>${cat.level > 0 ? "↳ " : ""} <strong>${cat.name}</strong></td>
        </tr>
        `;

        // Nếu có con, tiếp tục render đệ quy các con ngay bên dưới dòng cha
        if (cat.children && cat.children.length > 0) {
            html += renderCategoryRows(cat.children);
        }
    });
    return html;
}

export {renderCategoryRows}
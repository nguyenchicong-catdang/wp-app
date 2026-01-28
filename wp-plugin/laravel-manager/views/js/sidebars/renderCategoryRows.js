// laravel-manager/views/js/sidebars/renderCategoryRows.js
import { categoryBuildTree } from "./categoryBuildTree.js";

function renderCategoryRows() {
    const categoryTableBody = document.getElementById("categoryTableBody");
    let htmlTbody = "";
    let cats = window.categoriesData ? window.categoriesData.categories : [];
    if (cats.length > 0) {
        cats = categoryBuildTree(cats);
        //console.log("Tree đã dựng:", renderCategoryRows(cats));
        htmlTbody = htmlCategoryRows(cats);
    }
    if (categoryTableBody) {
        // console.log(categoryTableBody);
        categoryTableBody.innerHTML = htmlTbody;
    }
}

function htmlCategoryRows(categories) {
    let html = ``;
    categories.forEach(cat => {
        // Tạo khoảng trống thụt lề dựa trên level (mỗi level thụt 20px)
        const padding = cat.level * 20;

        html += /* html */ `
        <tr>
            <td>
                <input type="checkbox"
                name="category_ids[]"
                value="${cat.id}"
                disabled
                data-name="${cat.name}"
                data-slug="${cat.slug}"
                data-level="${cat.level}"
                >
            </td>
            <td>${cat.id}</td>
            <td style="padding-left: ${padding}px">${cat.level > 0 ? "↳ " : ""} <strong>${cat.name}</strong></td>
            <td>${cat.slug}</td>
        </tr>
        `;

        // Nếu có con, tiếp tục render đệ quy các con ngay bên dưới dòng cha
        if (cat.children && cat.children.length > 0) {
            html += htmlCategoryRows(cat.children);
        }
    });
    return html;
}

export { renderCategoryRows };
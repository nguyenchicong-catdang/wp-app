import { dataCategories, getDataCurrentCategories } from "./dataLoaderSidebar.js";
import { categoryBuildTree } from "./categoryBuildTree.js";

function renderCategoryTableBody() {
    const categoryTableBody = document.getElementById("categoryTableBody");
    if (!categoryTableBody) return;

    let htmlTbody = "";
    let cats = dataCategories;
    
    if (cats.length > 0) {
        cats = categoryBuildTree(cats);
        // Lấy danh sách ID đã lưu để so sánh
        const selectedIds = getDataCurrentCategories().map(item => String(item.id));
        htmlTbody = htmlCategoryRows(cats, selectedIds);
    }
    
    categoryTableBody.innerHTML = htmlTbody;
}

function htmlCategoryRows(categories, selectedIds = []) {
    let html = ``;
    categories.forEach((cat) => {
        const padding = cat.level * 20;
        
        // Kiểm tra xem ID này đã có trong cấu hình đã lưu chưa
        const isChecked = selectedIds.includes(String(cat.id)) ? "checked" : "";

        html += /* html */ `
        <tr>
            <td>
                <input type="checkbox"
                name="category_ids[]"
                disabled
                value="${cat.id}"
                ${isChecked} 
                data-name="${cat.name}"
                data-slug="${cat.slug}"
                data-level="${cat.level}"
                >
            </td>
            <td>${cat.id}</td>
            <td style="padding-left: ${padding}px">${cat.level > 0 ? "↳ " : ""} <strong>${cat.name}</strong></td>
        </tr>
        `;

        if (cat.children && cat.children.length > 0) {
            html += htmlCategoryRows(cat.children, selectedIds);
        }
    });
    return html;
}

export { renderCategoryTableBody };
// laravel-manager/views/js/sidebars/dragContainerSidebar.js
import { renderContainerSidebar } from "./renderContainerSidebar.js";

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            // Dùng dataTransfer để truyền dữ liệu tốt hơn trong Drag & Drop
            draggedItemIndex = e.target.getAttribute("data-index");
            e.target.style.opacity = "0.5";
        });

        item.addEventListener("dragend", (e) => {
            e.target.style.opacity = "1";
            container
                .querySelectorAll(".draggable-item")
                .forEach((el) => (el.style.border = "1px dashed #ccc"));
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            item.style.border = "2px solid #0073aa";
        });

        item.addEventListener("dragleave", () => {
            item.style.border = "1px dashed #ccc";
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetIndex = item.getAttribute("data-index");

            if (draggedItemIndex !== null && draggedItemIndex !== targetIndex) {
                reorderCategories(
                    categories,
                    parseInt(draggedItemIndex),
                    parseInt(targetIndex),
                );
            }
        });
    });
}

function reorderCategories(list, fromIndex, toIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);

    console.log("Thứ tự mới:", result);

    // SỬA LỖI TẠI ĐÂY: Gọi hàm RENDER, không gọi lại chính nó
    renderContainerSidebar(result);
}

export { dragContainerSidebar };

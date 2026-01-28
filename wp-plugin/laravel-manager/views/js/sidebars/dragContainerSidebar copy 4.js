// laravel-manager/views/js/sidebars/dragContainerSidebar.js
import { renderContainerSidebar } from "./renderContainerSidebar.js";

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        // Bắt đầu kéo
        item.addEventListener("dragstart", (e) => {
            draggedItemIndex = item.getAttribute("data-index");
            e.dataTransfer.setData("text/plain", draggedItemIndex);
            item.classList.add("dragging");
            item.style.opacity = "0.4";
        });

        item.addEventListener("dragend", (e) => {
            item.style.opacity = "1";
            item.classList.remove("dragging");
            // Xóa tất cả các class hiệu ứng trên các item khác
            container.querySelectorAll(".draggable-item").forEach((el) => {
                el.classList.remove("drag-over-active");
                el.style.border = "1px dashed #ccc";
                // Reset lại padding về giá trị gốc của nó (lấy từ dữ liệu)
                const originalIndex = el.getAttribute("data-index");
                el.style.paddingLeft = `${categories[originalIndex].level * 20}px`;
            });
        });

        // Trong sự kiện dragover
        item.addEventListener("dragover", (e) => {
            e.preventDefault();

            // 1. Lấy vị trí chuột so với item hiện tại
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;

            // 2. Định nghĩa độ rộng mỗi nấc (step) là 30px
            // Làm tròn để tạo cảm giác "khớp" (Snapping)
            const stepWidth = 30;
            let projectedLevel = Math.round(x / stepWidth);

            // Giới hạn level (ví dụ 0 đến 5)
            projectedLevel = Math.max(0, Math.min(projectedLevel, 5));

            // 3. Chỉ cập nhật nếu level thực sự thay đổi để tránh trình duyệt re-render liên tục
            const currentPadding = projectedLevel * stepWidth;
            if (item.style.paddingLeft !== `${currentPadding}px`) {
                item.style.paddingLeft = `${currentPadding}px`;
            }

            item.classList.add("drag-over-active");
        });

        item.addEventListener("dragleave", (e) => {
            item.classList.remove("drag-over-active");
            item.style.border = "1px dashed #ccc";

            // Trả lại padding cũ khi chuột rời đi mà chưa thả
            const index = item.getAttribute("data-index");
            item.style.paddingLeft = `${categories[index].level * 20}px`;
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetIndex = parseInt(item.getAttribute("data-index"));
            const fromIndex = parseInt(draggedItemIndex);

            // Tính level cuối cùng khi thả
            let finalLevel = Math.floor(e.offsetX / 30);
            finalLevel = Math.max(0, Math.min(finalLevel, 5));

            if (fromIndex !== null && !isNaN(fromIndex)) {
                const newList = updateOrderAndLevel(
                    categories,
                    fromIndex,
                    targetIndex,
                    finalLevel,
                );
                renderContainerSidebar(newList);
            }
        });
    });
}

function updateOrderAndLevel(list, fromIndex, toIndex, newLevel) {
    const result = Array.from(list);
    const [removed] = result.splice(fromIndex, 1);
    removed.level = newLevel;
    result.splice(toIndex, 0, removed);
    return result;
}

export { dragContainerSidebar };

// dragContainerSidebar.js
import { renderContainerSidebar } from "./renderContainerSidebar.js";

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;
    let currentDragLevel = 0;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            draggedItemIndex = item.getAttribute("data-index");
            item.classList.add("dragstart");
            e.dataTransfer.setData("text/plain", draggedItemIndex);
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            const containerBox = container.getBoundingClientRect();
            const relativeX = e.clientX - containerBox.left;

            // Tính toán level tạm thời (30px mỗi nấc)
            currentDragLevel = Math.max(
                0,
                Math.min(Math.floor(relativeX / 30), 5),
            );

            // Cập nhật giao diện ngay lập tức để người dùng thấy nó "thụt vào/thò ra"
            item.style.paddingLeft = `${currentDragLevel * 30}px`;
            item.setAttribute("data-level", currentDragLevel);
            item.classList.add("dragover");
        });

        item.addEventListener("dragleave", (e) => {
            // Khi rời đi, khôi phục lại level cũ từ dữ liệu gốc
            const idx = item.getAttribute("data-index");
            const originalLevel = categories[idx].level || 0;
            item.style.paddingLeft = `${originalLevel * 30}px`;
            item.setAttribute("data-level", originalLevel);
            item.classList.remove("dragover");
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetIndex = parseInt(item.getAttribute("data-index"));
            const fromIndex = parseInt(draggedItemIndex);

            if (fromIndex !== null && !isNaN(fromIndex)) {
                // Cập nhật mảng categories gốc
                const newList = updateOrderAndLevel(
                    categories,
                    fromIndex,
                    targetIndex,
                    currentDragLevel,
                );

                // Vẽ lại toàn bộ giao diện dựa trên mảng mới
                renderContainerSidebar(newList);
            }
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragstart");
        });
    });
}

function updateOrderAndLevel(list, fromIndex, toIndex, newLevel) {
    const result = Array.from(list);
    const [removed] = result.splice(fromIndex, 1);
    removed.level = newLevel; // Ghi đè level mới
    result.splice(toIndex, 0, removed);
    return result;
}

export { dragContainerSidebar };

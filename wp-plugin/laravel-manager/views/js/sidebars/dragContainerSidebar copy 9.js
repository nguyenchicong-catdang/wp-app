// dragContainerSidebar.js
import { renderContainerSidebar } from "./renderContainerSidebar.js";

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;
    let draggedElement = null; // Lưu element đang bị kéo
    let currentDragLevel = 0;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            draggedItemIndex = item.getAttribute("data-index");
            draggedElement = item; // Gán element hiện tại
            item.classList.add("dragstart");

            // Tùy chỉnh Ghost Image (hình ảnh mờ chạy theo con trỏ)
            e.dataTransfer.effectAllowed = "move";
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();

            // Tính level dựa trên vị trí chuột so với mép trái container
            const containerBox = container.getBoundingClientRect();
            const relativeX = e.clientX - containerBox.left;
            currentDragLevel = Math.max(
                0,
                Math.min(Math.floor(relativeX / 30), 5),
            );

            // Cập nhật style cho item mục tiêu để tạo hiệu ứng "mở chỗ"
            item.classList.add("dragover");

            // Bạn có thể hiển thị một "thanh thước đo" hoặc đổi màu
            // để biết đang ở level mấy mà không làm nhảy padding của item đích
            item.style.borderLeft = `${currentDragLevel * 10}px solid #007bff`;
        });

        item.addEventListener("dragleave", (e) => {
            item.classList.remove("dragover");
            item.style.borderLeft = ""; // Reset border khi rời đi
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetIndex = parseInt(item.getAttribute("data-index"));
            const fromIndex = parseInt(draggedItemIndex);

            if (fromIndex !== null && !isNaN(fromIndex)) {
                const newList = updateOrderAndLevel(
                    categories,
                    fromIndex,
                    targetIndex,
                    currentDragLevel,
                );
                renderContainerSidebar(newList);
            }
        });

        item.addEventListener("dragend", () => {
            if (draggedElement) {
                draggedElement.classList.remove("dragstart");
            }
            // Dọn dẹp tất cả style tạm thời trên toàn bộ danh sách
            container.querySelectorAll(".draggable-item").forEach((el) => {
                el.classList.remove("dragover");
                el.style.borderLeft = "";
            });
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

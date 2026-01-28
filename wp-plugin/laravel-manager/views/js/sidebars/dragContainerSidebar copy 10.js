// dragContainerSidebar.js
import { renderContainerSidebar } from "./renderContainerSidebar.js";

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;
    let originalLevel = 0; // Lưu level gốc của item đang kéo
    let startX = 0; // Lưu vị trí chuột lúc bắt đầu kéo
    let currentDragLevel = 0;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            draggedItemIndex = item.getAttribute("data-index");

            // Lấy level hiện tại của item từ mảng dữ liệu
            const cat = categories[draggedItemIndex];
            // originalLevel = cat ? cat.level || 0 : 0;

            startX = e.clientX; // Lưu vị trí X ban đầu
            item.classList.add("dragstart");
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();

            // Tính toán sự chênh lệch (offset) từ điểm bắt đầu
            const offsetX = e.clientX - startX;

            // Mỗi 30px di chuyển ngang sẽ tăng/giảm 1 level
            const levelOffset = Math.round(offsetX / 30);

            // Level mới = Level cũ + Level chênh lệch (giới hạn từ 0 đến 5)
            currentDragLevel = Math.max(
                0,
                Math.min(originalLevel + levelOffset, 5),
            );

            item.classList.add("dragover");

            // Hiển thị visual: dùng border-left để làm thước đo mức thụt vào
            // Nhân 10 hoặc 30 tùy bạn muốn độ dày của "thước đo"
            item.style.borderLeft = `${currentDragLevel * 10}px solid #007bff`;
        });

        item.addEventListener("dragleave", (e) => {
            item.classList.remove("dragover");
            item.style.borderLeft = "";
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetIndex = parseInt(item.getAttribute("data-index"));
            const fromIndex = parseInt(draggedItemIndex);

            if (fromIndex !== null && !isNaN(fromIndex)) {
                // Sử dụng currentDragLevel đã được tính cộng dồn ở trên
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
            container.querySelectorAll(".draggable-item").forEach((el) => {
                el.classList.remove("dragstart", "dragover");
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

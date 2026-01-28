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
            item.classList.add("dragover");

            // Tính toán level dựa trên vị trí chuột so với container (không phải item)
            const containerBox = container.getBoundingClientRect();
            const relativeX = e.clientX - containerBox.left;

            // Cập nhật currentDragLevel để dùng khi 'drop'
            currentDragLevel = Math.max(
                0,
                Math.min(Math.floor(relativeX / 30), 5),
            );

            // THAY ĐỔI TẠI ĐÂY:
            // Thay vì đổi padding của 'item', ta chỉ đổi style của cái 'đang được kéo'
            // Nếu bạn muốn nhìn thấy level trực quan, hãy dùng một border-left hoặc một placeholder.
            // Nếu muốn đơn giản nhất để không bị nhảy: Đừng thay đổi style của 'item' ở đây.
        });

        item.addEventListener("dragleave", (e) => {
            item.classList.remove("dragover");
            // Không cần reset padding ở đây nữa vì ta không thay đổi nó lúc dragover
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

import { renderContainerSidebar } from "./renderContainerSidebar.js";

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            draggedItemIndex = item.getAttribute("data-index");
            e.dataTransfer.setData("text/plain", draggedItemIndex);
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", (e) => {
            item.classList.remove("dragging");
            container.querySelectorAll(".draggable-item").forEach((el) => {
                el.classList.remove("drag-over-active");
                el.style.border = ""; // Reset về CSS default
                const idx = el.getAttribute("data-index");
                el.style.paddingLeft = ""; // Để CSS class tự xử lý theo level
            });
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();

            const box = item.getBoundingClientRect();
            // 1. Tính toán X chính xác hơn để "bắt dính" level
            const mouseX = e.clientX - box.left;
            const stepWidth = 30; // Độ rộng mỗi nấc level

            // Dùng Math.round để khi chuột đi quá 50% nấc tiếp theo, nó sẽ tự "hút" vào
            let projectedLevel = Math.round(mouseX / stepWidth);
            projectedLevel = Math.max(0, Math.min(projectedLevel, 5));

            // 2. Visual feedback: Snapping padding
            const snapPadding = projectedLevel * stepWidth;
            item.style.paddingLeft = `${snapPadding}px`;

            // 3. Visual feedback: Vị trí chèn (Trình bày đường kẻ)
            const offsetByY = e.clientY - box.top - box.height / 2;
            if (offsetByY < 0) {
                item.style.borderTop = "2px solid #007bff";
                item.style.borderBottom = "1px dashed #ccc";
            } else {
                item.style.borderBottom = "2px solid #007bff";
                item.style.borderTop = "1px dashed #ccc";
            }

            item.classList.add("drag-over-active");
        });

        item.addEventListener("dragleave", (e) => {
            item.classList.remove("drag-over-active");
            item.style.border = "";
            const index = item.getAttribute("data-index");
            // Trả lại level gốc khi rời chuột mà không drop
            item.style.paddingLeft = `${categories[index].level * 20}px`;
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetIndex = parseInt(item.getAttribute("data-index"));
            const fromIndex = parseInt(draggedItemIndex);

            // Lấy level dựa trên vị trí chuột lúc thả
            const box = item.getBoundingClientRect();
            const mouseX = e.clientX - box.left;
            let finalLevel = Math.round(mouseX / 30);
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

import { renderContainerSidebar } from "./renderContainerSidebar.js";

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;
    let startX = 0;
    let currentDragLevel = 0;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            draggedItemIndex = item.getAttribute("data-index");
            startX = e.clientX;

            item.classList.add("dragstart");

            // RESET: Khi nắm lên, ép padding về 0 ngay lập tức
            item.style.paddingLeft = "0px";
            item.setAttribute("data-level", "0");
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();

            // Tính toán level hoàn toàn mới dựa trên độ lệch chuột từ vị trí bắt đầu
            const offsetX = e.clientX - startX;
            // Mỗi 30px dịch sang phải = tăng 1 level
            currentDragLevel = Math.max(
                0,
                Math.min(Math.floor(offsetX / 30), 5),
            );

            item.classList.add("dragover");

            // RESET VẬT BỊ OVER: Để vật mục tiêu không gây nhiễu, ta ép padding nó về 0
            // và dùng border-left để hiển thị level dự kiến sẽ chèn vào
            item.style.paddingLeft = "0px";
            item.style.borderLeft = `${currentDragLevel * 30}px solid #007bff`;
        });

        item.addEventListener("dragleave", (e) => {
            item.classList.remove("dragover");
            item.style.borderLeft = "";

            // KHÔI PHỤC: Trả lại padding đúng của item mục tiêu khi chuột rời đi
            const idx = item.getAttribute("data-index");
            const originalLevel = categories[idx].level || 0;
            item.style.paddingLeft = `${originalLevel * 30}px`;
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetIndex = parseInt(item.getAttribute("data-index"));
            const fromIndex = parseInt(draggedItemIndex);

            if (fromIndex !== null && !isNaN(fromIndex)) {
                // Thả ra với level mới đã tính toán (mặc định bắt đầu từ 0 + offset)
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
                // Render sẽ lo việc đặt lại padding đúng, nhưng dọn dẹp ở đây cho chắc chắn
            });
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

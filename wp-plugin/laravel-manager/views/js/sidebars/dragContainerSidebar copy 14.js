import { renderContainerSidebar } from "./renderContainerSidebar.js";

const levelColors = [
    "#dee2e6",
    "#007bff",
    "#28a745",
    "#ffc107",
    "#fd7e14",
    "#dc3545",
];

function dragContainerSidebar(container, categories) {
    let draggedItemIndex = null;
    let startX = 0;
    let currentDragLevel = 0;

    container.querySelectorAll(".draggable-item").forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            draggedItemIndex = item.getAttribute("data-index");
            startX = e.clientX; // Ghi lại tọa độ X tuyệt đối của chuột

            const ghost = item.cloneNode(true);
            ghost.style.backgroundColor = "#28a745";
            ghost.style.width = item.offsetWidth + "px";
            ghost.style.opacity = "0.7";
            ghost.style.position = "absolute";
            ghost.style.paddingLeft = "0px";
            document.body.appendChild(ghost);

            // Điểm neo của ghost trùng với vị trí chuột lúc click để offsetX tính từ 0 chuẩn nhất
            // e.dataTransfer.setDragImage(ghost, e.offsetX, e.offsetY);
                        e.dataTransfer.setDragImage(
                            ghost,
                            e.offsetX,
                            e.offsetY,
                        );

                        
            e.dataTransfer.setData("text/plain", draggedItemIndex);

            setTimeout(() => {
                item.classList.add("dragstart");
                if (document.body.contains(ghost))
                    document.body.removeChild(ghost);
            }, 0);
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();

            // Tính offsetX chuẩn xác hơn
            const offsetX = e.clientX - startX;

            // TĂNG ĐỘ NHẠY: Chỉ cần nhích 10px là đã muốn lên level 1
            // Công thức: (giá trị thực + khoảng ưu tiên) / bước nhảy
            currentDragLevel = Math.max(
                0,
                Math.min(Math.round((offsetX) / 30), 5),
            );

            item.classList.add("dragover");
            const activeColor = levelColors[currentDragLevel];

            // Cập nhật Visual ngay lập tức
            item.style.paddingLeft = "0px";
            item.style.borderLeft = `${currentDragLevel * 30}px solid ${activeColor}`;
            item.style.borderTop = `2px solid ${activeColor}`;
        });

        item.addEventListener("dragleave", (e) => {
            item.classList.remove("dragover");
            item.style.borderLeft = "";
            item.style.borderTop = ""; // Reset border top

            const idx = item.getAttribute("data-index");
            const originalLevel = categories[idx].level || 0;
            item.style.paddingLeft = `${originalLevel * 30}px`;
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
            container.querySelectorAll(".draggable-item").forEach((el) => {
                el.classList.remove("dragstart", "dragover");
                el.style.borderLeft = "";
                el.style.borderTop = "";
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

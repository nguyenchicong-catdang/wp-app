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
            // Tạo một phần tử ảo để làm ghost image
            const ghost = item.cloneNode(true);
            ghost.style.backgroundColor = "#28a745"; // Màu xanh lá cho vật đang kéo
            ghost.style.width = item.offsetWidth + "px";
            ghost.style.position = "absolute";
            ghost.style.paddingLeft = "0px";
            // ghost.style.top = "-1000px"; // Giấu nó đi
            document.body.appendChild(ghost);

            // Yêu cầu trình duyệt dùng ghost này làm ảnh kéo
            e.dataTransfer.setDragImage(ghost, 0, 0);

            setTimeout(() => {
                draggedItemIndex = item.getAttribute("data-index");
                startX = e.clientX;
                item.classList.add("dragstart");
                item.style.paddingLeft = "0px";
                document.body.removeChild(ghost); // Dọn dẹp sau khi chụp
            }, 0);
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            const offsetX = e.clientX - startX;
            currentDragLevel = Math.max(
                0,
                Math.min(Math.floor(offsetX / 30), 5),
            );

            item.classList.add("dragover");

            const activeColor = levelColors[currentDragLevel];

            // Cập nhật Visual feedback
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

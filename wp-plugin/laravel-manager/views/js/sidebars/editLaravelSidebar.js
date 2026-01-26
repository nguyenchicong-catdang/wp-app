// laravel-manager/views/js/sidebars/editLaravelSidebar.js

let draggingEle = null;
const STEP_PIXELS = 25; // Khoảng cách thụt lề mỗi cấp

function editLaravelSidebar() {
    const btnEdit = document.getElementById("btnSidebarEdit");
    const root = document.getElementById("rootLaravelSidebar");

    if (!btnEdit) return;

    btnEdit.addEventListener("click", (e) => {
        renderForm(root);
        initDragAndDrop(); // Khởi tạo sự kiện cho container
        clickedBtnCreateInput();
        clickedSaveSidebar();
    });
}

function renderForm(root) {
    const html = /* html */ `
    <h3>Quản lý Menu</h3>
    <button id="btnCreateInput">Thêm mới</button>
    <form id="sidebarForm">
        <div id="sidebarContainer" style="min-height: 50px; border: 1px dashed #ccc; padding: 10px;">
        </div>
        <button type="button" id="btnSaveSidebar" style="width:100%; margin-top:20px; padding: 10px; background:#3498db; color:#fff; border:none; border-radius:4px; cursor:pointer;">
            Lưu cấu trúc (Gửi Server)
        </button>
    </form>
    `;
    root.innerHTML = html;
}

function clickedBtnCreateInput() {
    const btnCreateInput = document.getElementById("btnCreateInput");
    btnCreateInput.addEventListener("click", () => {
        createItem();
    });
}

function createItem(title = "", url = "", level = 0) {
    const container = document.getElementById("sidebarContainer");
    const div = document.createElement("div");
    div.className = "item";
    div.draggable = true;
    div.dataset.level = level;
    div.style.marginLeft = level * STEP_PIXELS + "px";
    div.style.cursor = "move";
    div.style.border = "1px solid #ddd";
    div.style.marginBottom = "5px";
    div.style.padding = "10px";
    div.style.background = "#fff";

    div.innerHTML = `
        <div class="item-header" style="display: flex; align-items: center; gap: 10px;">
            <span class="handle">☰</span>
            <div class="inputs-group" style="display: flex; flex-direction: column; flex-grow: 1;">
                <input type="text" name="title[]" placeholder="Tên nhãn" value="${title}">
                <input type="text" name="url[]" placeholder="Đường dẫn (URL)" value="${url}">
                <input type="hidden" name="level[]" value="${level}" class="level-input">
            </div>
            <button type="button" class="btn-del" style="background: red; color: white; border: none; cursor: pointer;">Xóa</button>
        </div>
    `;

    // Sự kiện xóa
    div.querySelector(".btn-del").onclick = () => div.remove();

    // Sự kiện cho riêng item này
    div.addEventListener("dragstart", (e) => {
        draggingEle = div;
        div.classList.add("dragging");
        e.dataTransfer.setData("text/plain", ""); // Fix cho Firefox
    });

    div.addEventListener("dragend", () => {
        div.classList.remove("dragging");
        draggingEle = null;
    });

    container.appendChild(div);
}

// Khởi tạo sự kiện dragover cho container (Xử lý vị trí chèn và thụt lề)
function initDragAndDrop() {
    const container = document.getElementById("sidebarContainer");

    container.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!draggingEle) return;

        const afterElement = getDragAfterElement(container, e.clientY);
        if (afterElement == null) {
            container.appendChild(draggingEle);
        } else {
            container.insertBefore(draggingEle, afterElement);
        }

        // --- Xử lý thụt lề (Level) dựa trên vị trí chuột ngang ---
        const rect = container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        let newLevel = Math.floor(offsetX / STEP_PIXELS);

        // Giới hạn level (ví dụ từ 0 đến 4)
        newLevel = Math.max(0, Math.min(newLevel, 4));

        draggingEle.style.marginLeft = newLevel * STEP_PIXELS + "px";
        draggingEle.dataset.level = newLevel;
        draggingEle.querySelector(".level-input").value = newLevel;
    });
}

// Hàm tìm vị trí chèn (giữa các item cũ)
function getDragAfterElement(container, y) {
    const draggableElements = [
        ...container.querySelectorAll(".item:not(.dragging)"),
    ];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY },
    ).element;
}

function clickedSaveSidebar() {
    const btnSaveSidebar = document.getElementById("btnSaveSidebar");
    const container = document.getElementById("sidebarContainer");

    btnSaveSidebar.addEventListener("click", () => {
        const items = [...container.querySelectorAll(".item")];

        // Thu thập dữ liệu theo thứ tự (order) thực tế trên màn hình
        const menuData = items.map((item, index) => {
            return {
                title: item.querySelector('input[name="title[]"]').value,
                url: item.querySelector('input[name="url[]"]').value,
                level: parseInt(item.dataset.level),
                order: index, // Thứ tự dựa trên vị trí trong mảng items
            };
        });

        console.log("Dữ liệu gửi Backend:", menuData);
        // Ở đây bạn dùng fetch để gửi menuData lên Laravel
        // fetch('/api/sidebar/save', { method: 'POST', body: JSON.stringify(menuData) ... })
    });
}

export { editLaravelSidebar };

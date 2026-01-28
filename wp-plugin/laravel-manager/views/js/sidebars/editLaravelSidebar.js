// laravel-manager/views/js/sidebars/editLaravelSidebar.js
import { renderContainerSidebar } from "./renderContainerSidebar.js";
import { updateDataCurrentCategories } from "./dataLoaderSidebar.js";
function editLaravelSidebar() {
    const btnEditSidebar = document.getElementById("btnEditSidebar");
    const rootLaravelSidebar = document.getElementById("rootLaravelSidebar");
    if (btnEditSidebar && rootLaravelSidebar) {
        btnEditSidebar.addEventListener("click", () => {
            // 1. Tìm tất cả checkbox (cả cái đã check và chưa check)
            const allBoxes = rootLaravelSidebar.querySelectorAll(
                'input[name="category_ids[]"]',
            );
            // 2. Kiểm tra xem đang ở chế độ Xem hay chế độ Sửa
            const isEditing = btnEditSidebar.classList.contains('editing');

            if (!isEditing) {
                // --- CHẾ ĐỘ: BẮT ĐẦU SỬA ---
                allBoxes.forEach((cb) => (cb.disabled = false)); // Mở khóa
                btnEditSidebar.textContent = "Save Change"; //// Đổi tên nút
                btnEditSidebar.classList.add("editing"); // Đánh dấu đang sửa
                btnEditSidebar.style.backgroundColor = "green";
                btnEditSidebar.style.color = "white";
            } else {
                // --- CHẾ ĐỘ: LẤY DỮ LIỆU & KHÓA LẠI ---
                const checkedBoxes = rootLaravelSidebar.querySelectorAll(
                    'input[name="category_ids[]"]:checked',
                );

                // Chuyển NodeList thành mảng các giá trị ID
                const selectedIds = Array.from(checkedBoxes).map((cb) => ({
                    id: cb.value,
                    name: cb.dataset.name,
                    slug: cb.dataset.slug,
                    level: cb.dataset.level
                }));

                // Khóa lại sau khi lấy xong dữ liệu
                allBoxes.forEach((cb) => (cb.disabled = true));
                btnEditSidebar.textContent = "Edit";
                btnEditSidebar.classList.remove("editing");
                btnEditSidebar.style.backgroundColor = "";
                btnEditSidebar.style.color = "";

                // console.log("Dữ liệu đã lưu:", selectedIds);
                updateDataCurrentCategories(selectedIds);
                renderContainerSidebar(selectedIds);
            }
        });
    }
}

export {editLaravelSidebar}
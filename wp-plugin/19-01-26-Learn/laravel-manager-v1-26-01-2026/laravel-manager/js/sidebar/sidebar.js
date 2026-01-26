import { init } from "./edit-render.js";

document.addEventListener("DOMContentLoaded", function () {
    // console.log(1);
    const editSidebarContainer = document.getElementById("editSidebar");
    if (editSidebarContainer) {
        // editSidebarContainer.innerHTML = renderEditSidebar();
        init(editSidebarContainer);
    }
    
});

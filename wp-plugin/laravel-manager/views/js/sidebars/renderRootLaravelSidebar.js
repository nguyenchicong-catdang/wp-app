// laravel-manager/views/js/sidebars/renderRootLaravelSidebar.js

function renderRootLaravelSidebar() {
    const rootLaravelSidebar = document.getElementById("rootLaravelSidebar");
    let html = "";
    html = /* html */ `
        <div>
            <h3>WordPress Categories</h3>
            <button id="btnEditSidebar">Edit</button>
            <table class="wp-list-table widefat striped table-view-list tags">
            <thead>
                <tr>
                    <th>☰</th>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                </tr>
            </thead>
            <tbody id="categoryTableBody"></tbody>
        </table>
        </div>
        <div>
            <h3>Laravel Sidebar</h3>
            <button id="btnUpdateSidebar">Update</button>
            <div id="containerSidebar"></div>
        </div>
    `;

    if (rootLaravelSidebar) {
        rootLaravelSidebar.innerHTML = html;
    }
}

export { renderRootLaravelSidebar };
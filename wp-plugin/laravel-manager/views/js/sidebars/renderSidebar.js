// laravel-manager/views/js/sidebars/renderSidebar.js

function renderSidebar() {
    const rootLaravelSidebar = document.getElementById("rootLaravelSidebar");
    let html = '';
    html = /* html */ `
        <h3>WordPress Categories</h3>
        <button id="btnEditSidebar">Edit</button>
        <table class="wp-list-table widefat">
            <thead>
                <tr>
                    <!-- <th width="30"><input type="checkbox" id="check-all" /></th> -->
                    <th>☰</th>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Slug</th>
                </tr>
            </thead>
            <tbody id="categoryTableBody"></tbody>
        </table>
        <h3>Laravel Sidebar</h3>
        <div id="containerSidebar"></div>
    `;

    if (rootLaravelSidebar) {
        rootLaravelSidebar.innerHTML = html;
    }
}

export {renderSidebar}
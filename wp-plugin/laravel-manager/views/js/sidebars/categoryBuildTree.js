// laravel-manager/views/js/sidebars/categoryBuildTree.js
function categoryBuildTree(items, parentId = 0, level = 0) {
    return items
        .filter((item) => Number(item.parent === Number(parentId)))
        .map((item) => ({
            ...item,
            level: level, // Lưu lại cấp độ để tiện hiển thị (0, 1, 2...)
            children: categoryBuildTree(items, item.id, level + 1),
        }));
}

export {categoryBuildTree}
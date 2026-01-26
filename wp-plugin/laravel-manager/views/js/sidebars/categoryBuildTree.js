// laravel-manager/views/js/sidebars/categoryBuildTree.js
function categoryBuildTree(items, parentId = 0, level = 0) {
    return items
        .filter((item) => {
            item.parent === parentId;
            level === level;
        })
        .map((item) => ({
            ...item,
            children: categoryBuildTree(items, item.id, level +1),
        }));
}

export {categoryBuildTree}
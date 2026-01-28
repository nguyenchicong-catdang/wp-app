// laravel-manager/views/js/sidebars/dataLoaderSidebar.js

export const dataCategories = window.dataCategories
    ? window.dataCategories.categories
    : [];

export let dataCurrentCategories = window.dataCurrentCategories
    ? window.dataCurrentCategories.currentCategories
    : [];

export function getDataCurrentCategories() {
    return dataCurrentCategories;
}

export function updateDataCurrentCategories(newCategories) {
    dataCurrentCategories = newCategories;
}
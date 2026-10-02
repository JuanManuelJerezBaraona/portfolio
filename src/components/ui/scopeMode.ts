/** Shared between the mode switch (client) and the layout's <head> script (server). */
export const MODE_STORAGE_KEY = 'scope-mode';

/** Applies the saved mode before anything paints, so there's no flash. */
export const MODE_INIT_SCRIPT = `try{if(localStorage.getItem('${MODE_STORAGE_KEY}')==='brightfield'){document.documentElement.dataset.mode='brightfield';}}catch(e){}`;

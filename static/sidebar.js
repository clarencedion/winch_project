document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".sidebar-menu li");
    
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            menuItems.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

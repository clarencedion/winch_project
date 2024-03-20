$(document).ready(function() {
    var popup = $('#popup');

    $('#open-popup-btn').click(function() {
        popup.show();
    });

    $('.close').click(function() {
        popup.hide();
    });
});


function openPopup() {
    document.getElementById("popup").classList.add("open");
    document.getElementById("overlay").classList.add("open");
}

function closePopup() {
    document.getElementById("popup").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
}
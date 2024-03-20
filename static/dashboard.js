// CHANGE PAGE CONTENT
/*
$(document).ready(function() {
    $("#dashboardButtonPage").click(function() {
        $.ajax({
            url: '/dashboard',
            type: 'GET',
            success: function(data) {
                // Update the DOM with the items data
            }
        });
    });

    $("#tasksButtonPage").click(function() {
        $.ajax({
            url: '/tasks',
            type: 'GET',
            success: function(data) {
                // Update the DOM with the tasks data
            }
        });
    });

    $("#chatButtonPage").click(function() {
        $.ajax({
            url: '/chat',
            type: 'GET',
            success: function(data) {
                // Update the DOM with the tasks data
            }
        });
    });
});
*/


// AJAX for add form
$(document).on('submit', '.add-form', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/add',
        data: formData,
        success: function(response){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: response.message
            })
            $('#dashboard-content').load(window.location.pathname + ' #dashboard-content', function() {
                initializeSorting();
            });
        },
        error: function(xhr, status, error){
            console.error(error);
        }
    });
});

// AJAX for duplicate form
$(document).on('submit', '.duplicate-form', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/duplicate',
        data: formData,
        success: function(response){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: response.message
            })
            $('#dashboard-content').load(window.location.pathname + ' #dashboard-content', function() {
                initializeSorting();
            });
        },
        error: function(xhr, status, error){
            console.error(error);
        }
    });
});

// AJAX for delete form
$(document).on('submit', '.delete-form', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/delete',
        data: formData,
        success: function(response){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: response.message
            })
            $('#dashboard-content').load(window.location.pathname + ' #dashboard-content', function() {
                initializeSorting();
            });
        },
        error: function(xhr, status, error){
            console.error(error);
        }
    });
});
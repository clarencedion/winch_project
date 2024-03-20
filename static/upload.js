document.body.addEventListener('submit', function(event) {
    if (event.target.id !== 'uploadForm') return;

    event.preventDefault();

    const fileInput = event.target.elements.file;
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
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
            title: 'File successfully uploaded !'
        })

        $('#dashboard-content').load(window.location.pathname + ' #dashboard-content', function() {
            initializeSorting();
        });

        // Clear the file input field
        fileInput.value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error uploading file.');
    });
}, true);
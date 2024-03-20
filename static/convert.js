document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/uploadword', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Get the iframe that contains the TinyMCE editor
        const iframe = document.querySelector('iframe');

        // Get the TinyMCE editor inside the iframe
        const tinymceEditor = iframe.contentDocument.getElementById('tinymce');

        // Set the content of the TinyMCE editor
        tinymceEditor.innerHTML = data.html_content;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error uploading file.');
    });
});
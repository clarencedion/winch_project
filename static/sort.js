// Function to initialize sorting
function initializeSorting() {
    $("#style-scroll").sortable({
        items: ".company", // Specify the items that should be sortable
        axis: "y",
        cursor: "move",
        opacity: 0.6,
        handle: ".drag-handle",
        update: function(event, ui) {
            var newOrder = [];
            $("#style-scroll .name").each(function() {
                newOrder.push($(this).text());
            });

            // Send updated order to the server
            $.ajax({
                url: '/update_order',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ items: newOrder }),
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    });
}

// Initialize sorting when the document is ready
$(document).ready(function() {
    initializeSorting();
});


//**************************** Jquery for post filter************************************************ */
jQuery(document).ready(function ($) {
    // Function to handle click event
    function handleTabClick() {
        var categoryId = $(this).data('category-id');

        $.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'get_single_and_related_posts',
                category_id: categoryId,
            },
            success: function (response) {
                $('.single-post-left').html(response.single_post);
                $('.related-posts-right').html(response.related_posts);
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    // Trigger click event on the first .category-tab after a delay
    setTimeout(function() {
        $('.category-tab:first').trigger('click');
    });

    // Click event handler for .category-tab elements
    $('.category-tab').on('click', handleTabClick);






// ********************* Code for active tabs ********************************//


    $(".category-tab").click(function () {
        // Remove active class from all tabs
        $(".category-tab").removeClass("active");
        // Add active class to the clicked tab
        $(this).addClass("active");

        // Hide all tab content
        $(".tab-content").hide();

        // Show the corresponding tab content
        var tabId = $(this).data("tab");
        $("#" + tabId).show();
    });

    // Set the initial active tab (optional)
    $(".category-tab:first").click();




    
});



// Function to handle the form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the element with the class 'printfriendly'
  var printfriendlyElement = document.querySelector('.printfriendly');

  // Change the display property of the 'printfriendly' element
  if (printfriendlyElement.style.display === 'none') {
    printfriendlyElement.style.display = 'block';
  } else {
    printfriendlyElement.style.display = 'none';
  }
}

// Get the form element
var form = document.getElementById('myForm');

// Add a submit event listener to the form
form.addEventListener('submit', handleSubmit);

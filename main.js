$(document).ready(function() {
    // Apply smooth scrolling only to the "Contact Us" link
    $('a[href="#contact-us"]').on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function() {
            window.location.hash = hash;
        });
    })
});
$('document').ready(function () {
    const myList = {};
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            myList[$(this).attr('data-name')] = $(this).attr('data-id');
        } else {
            delete myList[$(this).attr('data-name')];
        }
        const amenity = Object.keys(myList).sort();
        $('.amenities h4').text(amenity.join(', '));
    })
})

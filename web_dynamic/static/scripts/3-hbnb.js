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

        statusApi();
        placesApi();
    })

    function statusApi() {
        const api = "http://192.168.252.161:5001/api/v1/status";
        $.get(api, (data, textStatus) => {
            if (data.status == "OK") {
                console.log("adding")
                $('div#api_status').addClass('available');
            } else {
                $('div#api_status').removeClass('available');
            }
        })

    }

    $.ajax({
        type: "POST",
        url: "http://192.168.252.161:5001/api/v1/places_search/",
        data: JSON.stringify({}),
        contentType: "application/json",
        success: function (response) {
            response.forEach(function (item) {
                const tag = ['<article>', '<div class="title_box">',
                             `<h2>${item.name}</h2>`,
                             `<div class="price_by_night">$${item.price_by_night}</div>`,
                             '</div>',
                             '<div class="information">',
                             `<div class="max_guest">${item.max_guest} Guest(s) </div>`,
                             `<div class="number_rooms">${item.number_rooms}Bedroom(s)</div>`,
                             `<div class="number_bathrooms">${item.number_bathrooms}Bathrooms(s)</div>`,
                             '</div>',
                             '<div class="description">',
                             `${item.description}`,
                             '</div>',
                             '</article>'];
                $('SECTION.places').append(tag.join(''));
            })
        },
        error: function (error) {
            console.log(error);
        }
    })
})

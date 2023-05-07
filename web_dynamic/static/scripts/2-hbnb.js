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
})

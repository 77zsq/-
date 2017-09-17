$.get('http://139.199.192.48:9090/api/getbrandtitle', function(data) {
    console.log(data);
    console.log(data.result['brandTitleId']);
    $('.getbrand').html(template('getbrand', data.result));

    $('.getbrand a').on('click', function() {
        location.href = '../../../dist/html/getbrand/tenBrand.html?brandTitleId =' + data.result.brandTitleId;
    });
});
function compute() {
    let discount = $('#food_a').val() * 70 + $('#food_b').val() * 45 + $('#food_c').val() * 35;

    if ($('#nine').val() === "On") discount = Math.round(discount * 0.9);

    $('#price').val(discount);
}

$(document).ready(function () {
    compute();
    $('#food_a').change(compute);
    $('#food_b').change(compute);
    $('#food_c').change(compute);
    $('#nine').change(compute);
})
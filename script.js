$(document).ready(function () {

    var numbers = [];
    var ordened = [];

    $('#entradaNumero').on('keypress', function (e) {
        if (e.which == 13) {
            addNumber($('#entradaNumero').val());
        }
    });

    function addNumber(num) {
        if (num == '') {
            $('#entradaNumero').addClass("error");
        } else {
            $('#entradaNumero').removeClass("error");
            numbers.push(num);
            $('#entradaNumero').val('');
            $('#boxInsercao').val(numbers.toString());

            ordened.push(num);
            ordened.sort(function (a, b) { return a - b });
            $('#boxOrdenado').val(ordened.toString());
        }
    }

    $('#limpar').click(function () {
        numbers = [];
        ordened = [];
        $('#entradaNumero').val('');
        $('#boxInsercao').val(numbers.toString());
        $('#boxOrdenado').val(ordened.toString());

    });

    $('#randomButton').click(function () {
        var start = $('#startValue').val();
        var end = $('#endValue').val();
        if (start == '') {
            $('#startValue').addClass("error");
        } else if (end == '') {
            $('#endValue').addClass("error");
        } else if (start > end) {
            $('#startValue').addClass("error");
            $('#endValue').addClass("error");
        } else {
            $('#startValue').removeClass("error");
            $('#endValue').removeClass("error");


            for (var i = 0; i < $('#elementNumber').val(); i++) {
                addNumber(Math.floor(Math.random() * (end - start + 1)) + parseInt(start));
            }
        }

    });

    $('#noRepeatButton').click(function () {
        var start = $('#startValue').val();
        var end = $('#endValue').val();
        if (start == '') {
            $('#startValue').addClass("error");
        } else if (end == '') {
            $('#endValue').addClass("error");
        } else if (start > end) {
            $('#startValue').addClass("error");
            $('#endValue').addClass("error");
        } else if ($('#elementNumber').val() > (end - start + 1)) {
            $('#elementNumber').addClass("error");
        } else {
            $('#startValue').removeClass("error");
            $('#endValue').removeClass("error");
            $('#elementNumber').removeClass("error");

            for (var i = 0; i < $('#elementNumber').val(); i++) {
                var num = Math.floor(Math.random() * (end - start + 1)) + parseInt(start);
                if (numbers.includes(num)) {
                    i--;
                } else {
                    addNumber(num);
                }
            }
        }
    });

    $('#sistematica').click(function () {
    });

});
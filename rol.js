$(document).ready(function () {

    // Global variables
    var numbers = [];
    var ordened = [];
    var estrat = []
    var result = [];

    //On key press events
    $('#entradaNumero').on('keypress', function (e) {
        if (e.which == 13) {
            addNumber($('#entradaNumero').val());
        }
    });

    $('#estratName').on('keypress', function (e) {
        if (e.which == 13) {
            estratAdd();
        }
    });

    $('#estratNum').on('keypress', function (e) {
        if (e.which == 13) {
            estratAdd();
        }
    });

    //Clean fields buttons
    $('#limpar').click(function () {
        numbers = [];
        ordened = [];
        $('#entradaNumero').val('');
        $('#boxInsercao').val(numbers.toString());
        $('#boxOrdenado').val(ordened.toString());

    });

    $('#estratLimpa').click(function () {
        $('#estratValues').val('');
        $('#estratResult').val('');
        $('#estratNum').val('');
        $('#estratName').val('');
        $('#estratAmostra').val('');
        $('#estratPorcent').val('');
        estrat = [];
        result = [];
    });

    //ROL - Simple random
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

    //ROL - No Repeat Random
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

    //Sistematic (interval)
    $('#sistematica').click(function () {
        var start = $('#sisStart').val();
        var interval = $('#sisInterval').val();
        var qtd = $('#sisNumber').val();

        if (start == '') {
            $('#sisStart').addClass("error");
        } else if (interval == '') {
            $('#sisInterval').addClass("error");
        } else {
            $('#sisStart').removeClass("error");
            $('#sisInterval').removeClass("error");

            for (var i = 0; i < qtd; i++) {
                addNumber(start);
                start = parseInt(start) + parseInt(interval);
            }
        }
    });

    //JS Functions
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

    function estratAdd() {
        var value = $('#estratNum').val();
        var name = $('#estratName').val();

        if (value == '') {
            $('#estratNum').addClass("error");
        } else {
            $('#estratNum').removeClass("error");
            if (estrat.length == 0) {
                estrat.push(value + ' - ' + name);
            } else {
                estrat.push('\n' + value + ' - ' + name);
            }
            $('#estratNum').val('');
            $('#estratName').val('');

            $('#estratValues').val(estrat.toString());
            $('#estratNum').focus();

        }
    }

    //Stratified functions
    //Population based
    $('#proporcional').click(function () {
        var total = 0;
        var amostra = $('#estratAmostra').val();

        if (estrat.length == 0) {
            $('#estratValues').addClass('error');
        } else if (amostra == '') {
            $('#estratValues').removeClass('error');
            $('#estratAmostra').addClass('error');
        } else {
            $('#estratAmostra').removeClass('error');
            $('#estratValues').removeClass('error');
            for (var i = 0; i < estrat.length; i++) {
                var total = parseInt(total) + parseInt(estrat[i].substring(0, estrat[i].indexOf(' - ')));
            }
            var porcent = Math.round(amostra / total * 100)
            $('#estratPorcent').val(porcent);

            for (var i = 0; i < estrat.length; i++) {
                var index = estrat[i].indexOf(' - ');
                var prop = parseInt(estrat[i].substring(0, index));
                if (i == 0) {
                    result.push(Math.round((prop * (porcent / 100))) + estrat[i].substring(index));
                } else {
                    result.push('\n' + Math.round((prop * (porcent / 100))) + estrat[i].substring(index));
                }
            }

            $('#estratResult').val(result.toString());
        }

    });

    //uniform based
    $('#uniforme').click(function () {
        var amostra = $('#estratAmostra').val();
        if (estrat.length == 0) {
            $('#estratValues').addClass('error');
        } else if (amostra == '') {
            $('#estratValues').removeClass('error');
            $('#estratAmostra').addClass('error');
        } else {
            $('#estratAmostra').removeClass('error');
            $('#estratValues').removeClass('error');

            var total = amostra / estrat.length
            for (var i = 0; i < estrat.length; i++) {
                var index = estrat[i].indexOf(' - ');
                if (i == 0) {
                    result.push(total + estrat[i].substring(index));
                } else {
                    result.push('\n' + total + estrat[i].substring(index));
                }
            }
            $('#estratResult').val(result.toString());
        }
    });

});
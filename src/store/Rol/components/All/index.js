import './index.scss';
import numeral from 'numeral';

const RolTeste = () => {


    // Global variables
    var numbers = [];
    var ordened = [];
    var estrat = []
    var result = [];
    var fiSum = 0;
    var variaSum = 0;
    var media = 0;
    var nClass = 0;

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
        $('.disRow').remove();
        $('.conRow').remove();
        $('#disMedia').val('');
        $('#disModa').val('');
        $('#disMediana').val('');
        $('#disDP').val('');
        $('#disCV').val('');
        fiSum = 0;
        variaSum = 0;
        $('.btClass').remove();

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
            ordened.sort(function (a, b) {
                return a - b
            });
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


    /*
    TABLES SECTION CODES---------------------------------------------------------------------------------------------------------------------------------------------------
    */

    $('#btnDiscreta').click(function () {
        if (ordened.length == 0) {
            alert('Insira pelomenos 1 elmento acima para continuar');
        } else {
            $('.disRow').remove();
            $('#disMedia').val('');
            $('#disModa').val('');
            $('#disMediana').val('');
            $('#disDP').val('');
            $('#disCV').val('');
            var html;
            var f = 0;
            media = 0;
            var moda = [0];
            var modaValue = 0;
            fiSum = 0;
            variaSum = 0;


            for (var i = 0; i < ordened.length; i++) {
                media += parseInt(ordened[i]);
            }

            media = (media / ordened.length).toFixed(2);

            for (var i = 0; i < ordened.length; i++) {
                //Create a row object
                var row = {
                    Xi: 0,
                    fi: 1,
                    fr: 0,
                    f: 0,
                    fp: 0,
                    xifi: 0,
                    varia: 0
                }

                //Only add unique numbers
                if (ordened[i] != ordened[i - 1]) {
                    row.Xi = ordened[i];

                    for (var j = i + 1; j < ordened.length; j++) {
                        if (ordened[i] != ordened[j]) {
                            j = ordened.length;
                        } else {
                            row.fi += 1;
                        }
                    }
                    row.fr = (100 / ordened.length) * row.fi;
                    f += row.fi;
                    row.f = f;
                    row.fp = (100 / ordened.length) * f;
                    row.xifi = row.Xi * row.fi;
                    row.varia = Math.pow((row.Xi - media), 2) * row.fi;
                    variaSum += row.varia;
                    fiSum += row.fi;

                    html += '<tr class=\"disRow\"><th scope=\"row\">' + row.Xi + '</th><td>' + row.fi + '</td>' +
                        '<td>' + row.fr.toFixed(2) + '%</td>' +
                        '<td>' + row.f + '</td>' +
                        '<td>' + row.fp.toFixed(2) + '%</td>' +
                        '<td>' + row.xifi + '</td>' +
                        '<td>' + row.varia.toFixed(4) + '</td>' +
                        '</tr>'

                    if (modaValue < row.fi) {
                        moda = [];
                        modaValue = row.fi;
                        moda.push(row.Xi);
                    } else if (modaValue == row.fi) {
                        moda.push(row.Xi);
                    }

                }
            }

            $('#disMedia').val(media);
            $('#disModa').val(moda.toString());
            if (ordened.length % 2 == 0) {
                $('#disMediana').val(ordened[ordened.length / 2] + ',' + ordened[(ordened.length / 2) - 1]);
            } else {
                $('#disMediana').val(ordened[Math.floor(ordened.length / 2)]);
            }
            $('#discretaBody').append(html);
        }
    });

    $('#disPopulação').click(function () {
        var dp = variaSum / fiSum;
        dp = Math.pow(dp, 0.5)
        $('#disDP').val(dp.toFixed(2));
        $('#disCV').val(((dp / media) * 100).toFixed(2));
    });

    $('#disAmostra').click(function () {
        var dp = variaSum / (fiSum - 1);
        dp = Math.pow(dp, 0.5)
        $('#disDP').val(dp.toFixed(2));
        $('#disCV').val(((dp / media) * 100).toFixed(2));
    });

    $('#tabContinua').click(function () {

        var classes = Math.floor(Math.pow(ordened.length, 0.5));

        $('#1').text((classes - 1) + ' classes');
        $('#2').text((classes) + ' classes');
        $('#3').text((classes + 1) + ' classes');
    });

    $('#1').click(function () {

        var classes = $('#1').text();
        var html = '';
        var intervalo = ordened[ordened.length - 1] - ordened[0];
        media = 0;
        var moda = [0];
        var modaValue = 0;

        //Confirmar, pois no código orignal era a soma dos xi.fi, e não dos valores
        for (var i = 0; i < ordened.length; i++) {
            media += parseInt(ordened[i]);
        }

        media = (media / ordened.length).toFixed(2);

        if (parseInt(intervalo) % parseInt(classes) == 0) {
            intervalo = parseInt(intervalo) / parseInt(classes);
        } else {
            intervalo = Math.floor(parseInt(intervalo) / parseInt(classes)) + 1;
        }
        var interInit = ordened[0];
        var interEnd = ordened[0] + intervalo;
        var F = 0;

        for (var i = 1; i <= parseInt(classes); i++) {
            html += '<tr class=\"conRow\"><th scope=\"row\">' + i + '</th>' +
                '<td>' + interInit + ' |----- ' + interEnd + '</td>';

            var fi = 0;
            for (var j = 0; j < ordened.length; j++) {
                if (ordened[j] >= interInit && ordened[j] < interEnd) {
                    fi++;
                }
            }

            html += '<td>' + fi + '</td>' + '<td>' + (fi * 100) / ordened.length + '</td>';
            F += fi;
            html += '<td>' + F + '</td><td>' + (F * 100) / ordened.length + '</td>' +
                '<td>' + (interInit + interEnd) / 2 + '</td><td>' + ((interInit + interEnd) / 2) * fi + '</td>';


            html += '</tr>';
            interInit += intervalo;
            interEnd += intervalo;
        }

        $('#conInterval').val(intervalo);
        $('#conMedia').val(media);
        // comModa
        // comMediana
        // comDP
        // comCV
        $('#continuaBody').append(html);
    });
};

export default RolTeste;

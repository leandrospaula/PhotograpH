//v.1.2
// dependências : sweetalert2

const swal = require('sweetalert2');

(function($) {
    $.fn.newsletter = function(data) {
        const getData = data => {
                $.ajax({
                    url:
                        '/api/dataentities/' +
                        data.sigla +
                        '/search/?email=' +
                        data.structure.email +
                        '&_fields=id',
                    type: 'GET',
                    cache: false,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
                    .done(function(res) {
                        if (res[0] === undefined) {
                            saveData(data);
                        } else {
                            msgError('Este e-mail já está cadastrado em nossa base.', data);
                        }
                    })
                    .fail(function() {
                        msgError(
                            'Encontramos um erro em nosso sistema, tente novamente mais tarde!',
                            data
                        );
                    });
            },
            saveData = data => {
                $.ajax({
                    url: '/api/dataentities/' + data.sigla + '/documents/',
                    type: 'POST',
                    cache: false,
                    data: JSON.stringify(data.structure),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
                    .done(function(res) {
                        localStorage.setItem('email', data.structure.email);

                        msgSucess('Em breve você recebera nossas novidades.', data);
                    })
                    .fail(function() {
                        msgError(
                            'Encontramos um erro em nosso sistema, tente novamente mais tarde!',
                            data
                        );
                    });
            },
            msgError = (msg, data) => {
                if (data.type == 'modal' || data.type == 'withoutsweet') {
                    $(data.classDad)
                        .find('.space-error')
                        .html('<p>' + msg + '</p><a href="#" id="backButtonNW">Voltar</a>')
                        .addClass('active');
                    buttonErrorBack(data);
                } else {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: msg,
                        confirmButtonColor: data.colorbtn,
                    });
                }
            },
            msgSucess = (msg, data) => {
                if (data.type == 'modal' || data.type == 'withoutsweet') {
                    $(data.classDad).html(
                        '<div class="space-sucess">' +
                            '<h2>Parabens!</h2>' +
                            '<p>' +
                            msg +
                            '</p></div>'
                    );
                } else {
                    swal({
                        type: 'success',
                        title: 'Bem vindo!',
                        text: msg,
                        confirmButtonColor: data.colorbtn,
                    });
                }
            },
            buttonErrorBack = data => {
                if (data.type == 'modal' || data.type == 'withoutsweet') {
                    $(data.classForm).hide();
                    $('#backButtonNW').on('click', function() {
                        $('' + data.classDad + ' .space-error')
                            .html('')
                            .removeClass('active');
                        $(data.classForm).show();
                    });
                }
            };

        var session = localStorage.getItem('email');
        var errorActive = false;

        if (data.type == 'modal' || data.type == 'withoutsweet') {
            if (!$('' + data.classDad + ' .space-error').length) {
                $(data.classDad).append('<div class="space-error"></div>');
            } else {
                $('' + data.classDad + ' .space-error').html('');
            }
        }

        $(data.classForm)
            .find('input')
            .each(function() {
                if (errorActive == false) {
                    if (!$(this).val().length) {
                        errorActive = true;

                        msgError(
                            'Você esqueceu de preencher o campo ' +
                                $(this)
                                    .attr('placeholder')
                                    .substr(0, 1)
                                    .toUpperCase() +
                                $(this)
                                    .attr('placeholder')
                                    .substr(1)
                                    .toLowerCase() +
                                ' !',
                            data
                        );

                        return;
                    }
                }
            });

        if (errorActive == false) {
            if (session === data.structure.email) {
                msgError('Este e-mail já está cadastrado em nossa base.', data);
            } else {
                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                let res = regex.test(data.structure.email);

                if (!res) {
                    msgError('Insira um e-mail válido!', data);
                } else {
                    getData(data);
                }
            }
        }
    };
})(jQuery);

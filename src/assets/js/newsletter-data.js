//v.1.2
// dependências : sweetalert2

const Swal = require('sweetalert2');

function ResponseType({ type = '', message = '', data = [] }) {
    return { type, message, data };
}

function ResponseTypeError({ data = null }) {
    return ResponseType({
        type: 'error',
        message: 'encontramos um erro em nosso sistema, tente novamente mais tarde!',
        data,
    });
}

(function($) {
    $.fn.newsletterData = function(data) {
        function getData(data) {
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
                    console.log('TCL: $.fn.newsletter -> res', res);
                    if (res === undefined || res[0] === undefined) {
                        saveData(data);
                    } else {
                        // throw error('error getData', data);
                        // msgError('Este e-mail já está cadastrado em nossa base.', data);
                        Swal.fire('Cadastrado!', 'E-mail já cadastrado!', 'error');
                        return ResponseType({
                            type: 'error',
                            message: 'e-mail cadastrado',
                            data,
                        });
                    }
                })
                .fail(function() {
                    console.log('TCL: getData -> fail');
                    return ResponseTypeError({ data });
                    // msgError(
                    //     'Encontramos um erro em nosso sistema, tente novamente mais tarde!',
                    //     data
                    // );
                });
        }

        function saveData(data) {
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
                    console.log('TCL: saveData -> res', res);
                    localStorage.setItem('email', data.structure.email);
                    Swal.fire('Cadastrado!', 'Seu e-mail foi cadastrado com sucesso!', 'success');

                    return ResponseType({
                        type: 'success',
                        message: 'Em breve você receberá nossas novidades',
                        data,
                    });
                    // msgSucess('Em breve você recebera nossas novidades.', data);
                })
                .fail(function() {
                    console.log('TCL: saveData -> fail');
                    return ResponseTypeError({ data });
                    // msgError(
                    //     'Encontramos um erro em nosso sistema, tente novamente mais tarde!',
                    //     data
                    // );
                });
        }
        function msgSucess(msg, data) {
            if (data.type == 'modal' || data.type == 'withoutsweet') {
                $(data.classDad).html(
                    '<div class="space-sucess">' + '<h2>Parabens!</h2>' + '<p>' + msg + '</p></div>'
                );
            } else {
                Swal({
                    type: 'success',
                    title: 'Bem vindo!',
                    text: msg,
                    confirmButtonColor: data.colorbtn,
                });
            }
        }

        var session = localStorage.getItem('email');
        var errorActive = false;

        if (data.type == 'modal' || data.type == 'withoutsweet') {
            if (!$('' + data.classDad + ' .space-error').length) {
                $(data.classDad).append('<div class="space-error"></div>');
            } else {
                $('' + data.classDad + ' .space-error').html('');
            }
        }

        if (errorActive == false) {
            if (session === data.structure.email) {
                return ResponseTypeError(data);
            } else {
                const validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                let isValidEmail = validEmail.test(data.structure.email);

                if (!isValidEmail) {
                    console.log('TCL: $.fn.newsletterData -> isValidEmail', isValidEmail);
                    return ResponseType({
                        type: 'e-mail error',
                        message: 'Insira um email válido',
                        data,
                    });
                    // msgError('Insira um e-mail válido!', data);
                } else {
                    console.log('TCL: $.fn.newsletterData -> data', data);
                    return getData(data);
                }
            }
        }
    };
})(jQuery);

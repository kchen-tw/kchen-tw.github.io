$(() => {
    $('#upload-result').hide();
    $.getJSON('student.json', function(data) {
        $('#sid').empty();
        $.each(data, function(key, val) {
            $option = $('<option>').attr('value', val.sid + '-' + val.name).text(val.sid + '-' + val.name)
            $('#sid').append($option);
        });
    })
    $.getJSON('hw.json', function(data) {
        $('#hwid').empty();
        $.each(data, function(key, val) {
            $option = $('<option>').attr('value', val.hwid).text(val.hwid + ((val.require) ? '' : '*'))
            $('#hwid').append($option);
        });
    });

    $('#upload').on('click', (eventObject) => {

        var course = $('#course').val();
        var sid = $('#sid').val();
        var hwid = $('#hwid').val();

        if ($('#hwFile').val() == '') {
            $('#message').text('沒有選擇檔案')
            $('#dialog').modal('show')
            return
        }

        var loader = new Loader($('.loader-wrapper'))
        loader.start();

        $.ajax({
            url: '/upload/' + course + '/' + sid + '/' + hwid,
            type: 'POST',
            cache: false,
            data: new FormData($('#uploadForm')[0]),
            processData: false,
            contentType: false
        }).done(function(res) {
            if (res.status) {
                $('#uploadForm').hide();
                $('#upload-result').show();
                $('#message').text('繳交成功')
                $('#upload-result a').attr('href', res.url)
            } else {
                $('#message').text('繳交失敗 (' + res.message + ')')
            }
            $('#dialog').modal('show')
            loader.end();
        }).fail(function(res) {
            console.log(res)
            $('#message').text('繳交失敗')
            $('#dialog').modal('show')
            loader.end();
        });
    })
});
$('#img').on('click', function(){
    $('#imagem').click();
});

function pic(idImg){
    var img = document.getElementById(idImg);

    pix.util.dom.onload(img, function() {
        var planes = pix.findAll({
            img: img,
            colors: ['d7ffff', 'c2cadf'],
            clearNoise: false,
            tolerance: 10,
            accuracy: 5,
            concavity: 20,
        });
        document.getElementById('count').innerHTML = planes.length;
        planes.forEach(draw);
    });

    function draw(plane) {
        var canv = $('#canv');
        var ctx = canv[0].getContext("2d");
        ctx.beginPath();
        plane.forEach(function(point) {
            ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
        });
        ctx.stroke();
        ctx.closePath();
    }
}

$('form').on('submit', function(event){
    event.preventDefault();
    var form = document.getElementById('formPhoto');
    var formData = new FormData(form);
    // formData.append('file', fileInputElement.files[0]);
    // formData.append('iiii', 'sdfsdfsdf');

    $.ajax({
        url: 'processamento.php',
        type: 'POST',
        data: formData,
        success: function(data) {
            var obj = JSON.parse(data);

            $('#btnSend').css('display', 'none');
            $('#boxPhotos').css('display', 'block');
            $('#photoOriginal').empty();
            $('.picture-container').empty();
            $('#photoOriginal').html(
                '<img src="' +
                obj.file +
                '" style="min-width: 100%; width: 100%;">'
            );
            $('.picture-container').html(
                '<img src="' +
                obj.file_cp +
                '" style="min-width: 100%; width: 100%;" id="picture" class="picture">'
            );

            pic('picture');
        },
        cache: false,
        contentType: false,
        processData: false,
        xhr: function() { // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                myXhr.upload.addEventListener('progress', function() {
                    /* faz alguma coisa durante o progresso do upload */
                }, false);
            }
            return myXhr;
        }
    });
});

pic('#picture');
'use strict';

$(function() {

  d3Helper.initialize();

  $('#btn-place').click(function(event) {
    var form, x, y, face;

    if ($('#bender').attr('id')) {
      $('#bender').remove();
    }

    x = +$('#x').val();
    y = +$('#y').val();
    face = +$('#face').val()

    d3Helper.createBender(x, y, face);
  });

  $('#btn-turn').click(function(event) {
    var turn, transform, rotRegExp, rotation, newRotation;

    turn = +$('#turn').val();
    transform = $('#bender').attr('transform');
    rotation = (/\((\d{1,3}),/.exec(transform));
    rotation = +rotation[1] + turn * 90;
    newRotation = transform.replace(/\((\d{1,3}),/,
      '(' + rotation.toFixed() + ',');

    $('#bender').attr('transform', newRotation);
  });

  $('#btn-move').click(function(event) {

  });

  $('#btn-report').click(function(event) {

  });
});
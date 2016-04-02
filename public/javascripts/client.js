'use strict';

$(function() {
  var gridWidth, rectNumber, rectWidth;

  d3Helper.initialize();

  gridWidth = +$('#grid-svg').attr('width');
  rectNumber = 5;
  rectWidth = gridWidth / rectNumber;

  // ***************
  // **** PLACE ****
  // ***************
  $('#btn-place').click(function(event) {
    var form, x, y, face;

    if ($('#bender-outer').attr('id')) {
      $('#bender-outer').remove();
    }

    x = +$('#x').val();
    y = +$('#y').val();
    face = +$('#face').val()

    d3Helper.createBender(x, y, face);
  });

  // **************
  // **** TURN ****
  // **************
  $('#btn-turn').click(function(event) {
    var turn, benderOuter, benderInner, face, x, y, coordX, coordY, translate, translateX,
      translateY, newFace, rotation, rotateX, rotateY, newTranslateX,
      newTranslateY, rotate, newRotate, newTranslate;

    $('.alert').removeClass('visible');

    turn = +$('#turn').val();
    benderInner = $('#bender-inner');
    face = +benderInner.attr('data-face');
    rotate = benderInner.attr('transform');

    newFace = face + turn;
    if (face + turn < 0) {
      newFace = 3;
    }
    if (face + turn > 3) {
      newFace = 0;
    }
    rotation = (newFace * 90).toFixed();

    newRotate = rotate.replace(/rotate\(-?\d{1,3}\,/,
      'rotate(' + rotation + ',');
    benderInner.attr('transform', newRotate);
    benderInner.attr('data-face', newFace.toFixed());
  });

  // **************
  // **** MOVE ****
  // **************
  $('#btn-move').click(function(event) {
    var benderOuter, benderInner, face, x, y, coordX, coordY, rotation, translate, translateX,
      translateY, rotate, newX, newY, newCoordX, newCoordY, newTranslate, newRotate;

    $('.alert').removeClass('visible');

    benderOuter = $('#bender-outer');
    benderInner = $('#bender-inner');
    face = +benderInner.attr('data-face');
    x = +benderOuter.attr('data-x');
    y = +benderOuter.attr('data-y');
    coordX = +benderOuter.attr('data-coordx');
    coordY = +benderOuter.attr('data-coordy');

    translate = benderOuter.attr('transform');
    translateX = +(/translate\((-?\d+)\,/.exec(translate)[1]);
    translateY = +(/translate\(-?\d+\,\s(-?\d+)\)/.exec(translate)[1]);

    switch (face) {
      case 0:
        if (y < 4) {
          newX = translateX;
          newY = translateY - rectWidth;
          newCoordX = coordX;
          newCoordY = coordY - rectWidth;
          y++;
        } else {
          d3Helper.ouch();
          newX = translateX;
          newY = translateY;
          newCoordX = coordX;
          newCoordY = coordY;
        }
        break;

      case 1:
        if (x < 4) {
          newX = translateX + rectWidth;
          newY = translateY;
          newCoordX = coordX + rectWidth;
          newCoordY = coordY;
          x++;
        } else {
          d3Helper.ouch();
          newX = translateX;
          newY = translateY;
          newCoordX = coordX;
          newCoordY = coordY;
        }
        break;

      case 2:
        if (y > 0) {
          newX = translateX;
          newY = translateY + rectWidth;
          newCoordX = coordX;
          newCoordY = coordY + rectWidth;
          y--;
        } else {
          d3Helper.ouch();
          newX = translateX;
          newY = translateY;
          newCoordX = coordX;
          newCoordY = coordY;
        }
        break;

      case 3:
        if (x > 0) {
          newX = translateX - rectWidth;
          newY = translateY;
          newCoordX = coordX - rectWidth;
          newCoordY = coordY;
          x--;
        } else {
          d3Helper.ouch();
          newX = translateX;
          newY = translateY;
          newCoordX = coordX;
          newCoordY = coordY;
        }
        break;
      default:
        d3Helper.ouch();
    }

    newTranslate = translate.replace(/translate\(-?\d+\,\s-?\d+\)/,
      'translate(' + newX + ', ' + newY + ')');

    benderOuter.attr('transform', newTranslate);
    benderOuter.attr('data-x', x);
    benderOuter.attr('data-y', y);
    benderOuter.attr('data-coordx', newCoordX);
    benderOuter.attr('data-coordy', newCoordY);
  });

  // ****************
  // **** REPORT ****
  // ****************
  $('#btn-report').click(function(event) {
    var benderOuter, benderInner, x, y, face, direction, alert, message, newMessage;

    benderOuter = $('#bender-outer');
    x = benderOuter.attr('data-x');
    y = benderOuter.attr('data-y');
    benderInner = $('#bender-inner');
    face = benderInner.attr('data-face');

    switch (face) {
      case '0':
        direction = 'North';
        break;
      case '1':
        direction = 'East';
        break;
      case '2':
        direction = 'South';
        break;
      case '3':
        direction = 'West';
        break;
    }

    alert = $('.alert-info').children('h4');
    message = alert.text();
    newMessage = message.replace(/\d+\sx/, x + ' x');
    newMessage = newMessage.replace(/\d+\sy/, y + ' y');
    newMessage = newMessage.replace(/facing\s\w+\s/, 'facing ' + direction + ' ');

    alert.text(newMessage);
    $('.alert-info').addClass('visible');
  });
});
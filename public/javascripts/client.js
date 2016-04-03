'use strict';

$(function() {
  var gridWidth, rectNumber, rectWidth;

  // Create SVG grid
  d3Helper.initialize();

  gridWidth = +$('#grid-svg').attr('width');
  rectNumber = 5;
  rectWidth = gridWidth / rectNumber;

  // ***************
  // **** PLACE ****
  // ***************
  $('#btn-place').click(function() {
    var x, y, face;

    if ($('#bender-outer').attr('id')) {
      $('#bender-outer').remove();
    }

    x = +$('#x').val();
    y = +$('#y').val();
    face = +$('#face').val();

    // Create bender and place him on the grid according to form inputs
    d3Helper.createBender(x, y, face);
  });

  // **************
  // **** TURN ****
  // **************
  $('#btn-turn').click(function() {
    var turn, benderInner, face, newFace, rotation, rotate, newRotate;

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

    // Replace rotate degrees in transform attr based on turn input
    newRotate = rotate.replace(/rotate\(-?\d{1,3}/,
      'rotate(' + rotation);
    benderInner.attr('transform', newRotate);
    benderInner.attr('data-face', newFace.toFixed());
  });

  // **************
  // **** MOVE ****
  // **************
  $('#btn-move').click(function() {
    var benderOuter, benderInner, face, x, y, coordX, coordY, translate,
      translateX, translateY, newX, newY, newCoordX, newCoordY, newTranslate;

    $('.alert').removeClass('visible');

    benderOuter = $('#bender-outer');
    benderInner = $('#bender-inner');
    face = +benderInner.attr('data-face');
    x = +benderOuter.attr('data-x');
    y = +benderOuter.attr('data-y');
    coordX = +benderOuter.attr('data-coordx');
    coordY = +benderOuter.attr('data-coordy');

    // Extract current translate x and y from transform attr
    translate = benderOuter.attr('transform');
    translateX = +(/translate\((-?\d+)\,/.exec(translate)[1]);
    translateY = +(/translate\(-?\d+\,\s(-?\d+)\)/.exec(translate)[1]);

    if (face === 0 && y === 4 || face === 1 && x === 4 ||
      face === 2 && y === 0 ||face === 3 && x === 0) {
        $('.alert-danger').addClass('visible');
        newX = translateX;
        newY = translateY;
        newCoordX = coordX;
        newCoordY = coordY;

    } else {
    switch (face) {
      case 0:
        newX = translateX;
        newY = translateY - rectWidth;
        newCoordX = coordX;
        newCoordY = coordY - rectWidth;
        y++;
        break;

      case 1:
        newX = translateX + rectWidth;
        newY = translateY;
        newCoordX = coordX + rectWidth;
        newCoordY = coordY;
        x++;
        break;

      case 2:
        newX = translateX;
        newY = translateY + rectWidth;
        newCoordX = coordX;
        newCoordY = coordY + rectWidth;
        y--;
        break;

      case 3:
        newX = translateX - rectWidth;
        newY = translateY;
        newCoordX = coordX - rectWidth;
        newCoordY = coordY;
        x--;
        break;
      default:
        console.log('Something broke: check data-face attribute of #bender-inner');
    }
  }

    // Set new translate by replacing x and y attributes in string
    newTranslate = translate.replace(/translate\(-?\d+\,\s-?\d+\)/,
      'translate(' + newX.toFixed() + ', ' + newY.toFixed() + ')');

    benderOuter.attr('transform', newTranslate);
    benderOuter.attr('data-x', x);
    benderOuter.attr('data-y', y);
    benderOuter.attr('data-coordx', newCoordX);
    benderOuter.attr('data-coordy', newCoordY);
  });

  // ****************
  // **** REPORT ****
  // ****************
  $('#btn-report').click(function() {
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

    // Replace parts of alert string with current facing, x, and y
    alert = $('.alert-info').children('p');
    message = alert.text();
    newMessage = message.replace(/at\s\d+/, 'at ' + x);
    newMessage = newMessage.replace(/\,\s\d+/, ', ' + y);
    newMessage = newMessage.replace(/facing\s\w+\?/, 'facing ' + direction + '?');

    $('.alert-danger').removeClass('visible');
    alert.text(newMessage);
    $('.alert-info').addClass('visible');
  });
});
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

    turn = +$('#turn').val();
    benderOuter = $('#bender-outer');
    benderInner = $('#bender-inner');
    face = +benderInner.attr('data-face');
    x = +benderOuter.attr('data-x');
    y = +benderOuter.attr('data-y');
    coordX = benderOuter.attr('data-coordx');
    coordY = benderOuter.attr('data-coordy');
    translate = benderOuter.attr('transform');
    translateX = +(/translate\((-?\d+)\,/.exec(translate)[1]);
    translateY = +(/translate\(-?\d+\,\s(-?\d+)\)/.exec(translate)[1]);
    rotate = benderInner.attr('transform');

    newFace = face + turn;
    if (face + turn < 0) {
      newFace = 3;
    }
    if (face + turn > 3) {
      newFace = 0;
    }
    rotation = (newFace * 90).toFixed();

    switch (newFace) {
      case 0:
        newTranslateX = translateX;
        newTranslateY = translateY;
        break;

      case 1:
        newTranslateX = translateY * -1;
        newTranslateY = translateX;
        break;

      case 2:
        newTranslateX = translateX * -1;
        newTranslateY = translateY * -1;
        break;

      case 3:
        newTranslateX = translateY;
        newTranslateY = translateX * -1;
        break;
    }

    newRotate = rotate.replace(/rotate\(-?\d{1,3}\,/,
      'rotate(' + rotation + ',');

    // newRotate = rotate.replace(/rotate\((?:-?\d+\,\s){2}-?\d+\)/,
    //   'rotate(' + rotation + ', ' + coordX + ', ' + coordY +')');
    // newTranslate = translate.replace(/translate\(-?\d+\,\s-?\d+\)/,
    //   'translate(' + newTranslateX + ', ' + newTranslateY + ')');

    // benderOuter.attr('transform', newTranslate);
    benderInner.attr('transform', newRotate);
    benderInner.attr('data-face', newFace.toFixed());
  });

  // **************
  // **** MOVE ****
  // **************
  $('#btn-move').click(function(event) {
    var benderOuter, benderInner, face, x, y, coordX, coordY, rotation, translate, translateX,
      translateY, rotate, newX, newY, newCoordX, newCoordY, newTranslate, newRotate;

    benderOuter = $('#bender-outer');
    benderInner = $('#bender-inner');
    face = +benderInner.attr('data-face');
    x = +benderOuter.attr('data-x');
    y = +benderOuter.attr('data-y');
    coordX = +benderOuter.attr('data-coordx');
    coordY = +benderOuter.attr('data-coordy');
    rotation = face * 90;

    translate = benderOuter.attr('transform');
    translateX = +(/translate\((-?\d+)\,/.exec(translate)[1]);
    translateY = +(/translate\(-?\d+\,\s(-?\d+)\)/.exec(translate)[1]);

    rotate = benderInner.attr('transform');

    console.log(y);

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
    newRotate = rotate.replace(/rotate\((?:-?\d+\,\s){2}-?\d+\)/,
      'rotate(' + rotation + ', ' + newCoordX + ', ' + newCoordY +')');

    benderOuter.attr('transform', newTranslate);
    // benderInner.attr('transform', newRotate)
    benderOuter.attr('data-x', x);
    benderOuter.attr('data-y', y);
    benderOuter.attr('data-coordx', newCoordX);
    benderOuter.attr('data-coordy', newCoordY);
  });

  // ****************
  // **** REPORT ****
  // ****************
  $('#btn-report').click(function(event) {

  });
});
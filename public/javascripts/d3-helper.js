'use strict';

var d3Helper;

d3Helper = {
  initialize: function() {
    var w, h, grid, svg, rectWidth, rectHeight, i, dataX, dataY, rectX, rectY;

    w = 500;
    h = 500;
    grid = 5;

    svg = d3.select('#grid-div')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('viewBox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('id', 'grid-svg');

    rectWidth = w / grid;
    rectHeight = h / grid;

    for (i = 0; i < grid * grid; i++) {
      dataX = i % 5;
      dataY = Math.floor(i / grid);
      rectX = rectWidth * dataX;
      rectY = h - (rectHeight * (dataY + 1));

      svg.append('rect')
        .attr('x', rectX)
        .attr('y', rectY)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '1')
        .attr('data-x', dataX)
        .attr('data-y', dataY);
    }
  },
  createBender: function(x, y, face) {
    var svg, width, rectWidth, rectNumber, centerX, centerY,
      metalColor, whiteColor, radius, strokeWidth, bender;

    svg = $('#grid-svg');
    width = +svg.attr('width');
    rectWidth = width / 5;
    rectNumber = svg.find('rect').length;
    centerX = x * rectWidth + rectWidth / 2;
    centerY = y * rectWidth + rectWidth / 2;

    metalColor = '#7C9DA0';
    whiteColor = '#FFFED6';
    radius = rectWidth / 6;
    strokeWidth = 4;

    // Group to keep all Bender parts together
    bender = d3.select('#grid-svg')
      .append('g')
      .attr('id', 'bender')
      .attr('data-face', face);

    // Benders' head
    bender.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius)
      .attr('fill', metalColor);
    bender.append('rect')
      .attr('x', centerX - radius)
      .attr('y', centerY)
      .attr('width', radius * 2)
      .attr('height', radius * 2)
      .attr('fill', metalColor);

    // Bender's antennae
    bender.append('line')
      .attr('x1', centerX)
      .attr('y1', centerY - radius)
      .attr('x2', centerX)
      .attr('y2', centerY - radius * 2)
      .attr('stroke', metalColor)
      .attr('stroke-width', strokeWidth);
    bender.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY - radius * 2)
      .attr('r', strokeWidth)
      .attr('fill', metalColor);

    // Bender's eyes
    bender.append('rect')
      .attr('x', centerX - radius * 0.5)
      .attr('y', centerY)
      .attr('width', radius)
      .attr('height', radius * 0.7)
      .attr('fill', 'black');
    bender.append('circle')
      .attr('cx', centerX - radius * 0.5)
      .attr('cy', centerY + radius * 0.35)
      .attr('r', radius * 0.35)
      .attr('fill', 'black');
    bender.append('circle')
      .attr('cx', centerX + radius * 0.5)
      .attr('cy', centerY + radius * 0.35)
      .attr('r', radius * 0.35)
      .attr('fill', 'black');
    bender.append('circle')
      .attr('cx', centerX - radius * 0.35)
      .attr('cy', centerY + radius * 0.35)
      .attr('r', radius * 0.35)
      .attr('fill', whiteColor);
    bender.append('circle')
      .attr('cx', centerX + radius * 0.35)
      .attr('cy', centerY + radius * 0.35)
      .attr('r', radius * 0.35)
      .attr('fill', whiteColor);
    bender.append('circle')
      .attr('cx', centerX - radius * 0.35)
      .attr('cy', centerY + radius * 0.35)
      .attr('r', radius * 0.35 / 4)
      .attr('fill', 'black');
    bender.append('circle')
      .attr('cx', centerX + radius * 0.35)
      .attr('cy', centerY + radius * 0.35)
      .attr('r', radius * 0.35 / 4)
      .attr('fill', 'black');

    // Bender's mouth
    bender.append('rect')
      .attr('x', centerX - radius * 0.5)
      .attr('y', centerY + radius)
      .attr('width', radius)
      .attr('height', radius * 0.7)
      .attr('fill', whiteColor);
    bender.append('circle')
      .attr('cx', centerX - radius * 0.5)
      .attr('cy', centerY + radius * 1.35)
      .attr('r', radius * 0.35)
      .attr('fill', whiteColor);
    bender.append('circle')
      .attr('cx', centerX + radius * 0.5)
      .attr('cy', centerY + radius * 1.35)
      .attr('r', radius * 0.35)
      .attr('fill', whiteColor);

    bender.attr('transform', 'rotate(' + (face * 90).toFixed() + ', ' +
      centerX.toFixed() + ', ' + centerY.toFixed() + ')');
  }
};
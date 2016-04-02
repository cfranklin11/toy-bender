$(function($, d3) {
  var w, h, grid, svg, rectWidth, rectHeight, i, rectX, rectY;

  w = 90;
  h = 90;
  grid = 5;

  svg = d3.select('#grid-div')
    .append('svg')
    .attr('width', w.toFixed(0) + '%')
    .attr('height', h.toFixed(0) + '%')
    .attr('viewBox', '0 0 ' + w + ' ' + h)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('class', 'grid-svg');

  rectWidth = w / grid;
  rectHeight = h / grid;

  for (i = 0; i < grid + 1; i++) {
    rectX = rectWidth * i % 5;
    rectY = rectHeight * Math.floor(i / grid);
    svg.append('rectangle')
      .attr('x', )
      .attr('width', rectWidth.toFixed(0) + '%')
      .attr('height', rectHeight.toFixed(0) + '%')
      .attr('stroke', 'black')
      .attr('stroke-width', '0.5%')
  }
})(jQuery, d3);
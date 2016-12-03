// 'use strict';

var data = [
{label:'Total TAT', value:27},
{label:'collect - ship', value:5},
{label:'ship - receive', value:8},
{label:'receive - register', value:1},
{label:'register - report', value:3},
{label:'report - dispatch', value:10}
];


var div = d3.select('body').append('div').attr('class', 'toolTip');

var axisMargin = 20,
    margin = 40,
    valueMargin = 4,
    width = parseInt(d3.select('body').style('width'), 10), //parseInt() turns strings into numbers, reading up to and ignoring the first non-integer character, and also possibly performing base conversion
    height = parseInt(d3.select('body').style('height'), 10),
    barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
    barPadding = (height-axisMargin-margin*2)*0.3/data.length,
    data, bar, svg, scale, xAxis, labelWidth = 0;

var max = d3.max(data, function(d) { return d.value; });

svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);


bar = svg.selectAll('g') //data join
              .data(data)
              .enter()
              .append('g');

bar.attr('class', 'bar')
    .attr('cx',0)
    .attr('transform', function(d, i) {
      return 'translate(' + margin + ',' + (i * (barHeight + barPadding) + barPadding) + ')';
    });

bar.append('text') //bar label
    .attr('class', 'label')
    .attr('y', barHeight / 2)
    .attr('dy', '.35em') //vertical align middle
    .text(function(d){
      return d.label;
    }).each(function() {
      labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });

scale = d3.scale.linear() //axis scaling
                .domain([0, max])
                .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 2*margin + axisMargin)
          .orient('bottom');

bar.append('rect') //each bar
    .attr('transform', 'translate('+labelWidth+', 0)')
    .attr('height', barHeight)
    .attr('width', function(d){
      return scale(d.value);
    });

bar.append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('y', barHeight / 2)
    .attr('dx', -valueMargin + labelWidth) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .text(function(d){
      return (d.value);
    })
    .attr('x', function(d){
      var width = this.getBBox().width;
      return Math.max(width + valueMargin, scale(d.value));
    });

bar.on('mousemove', function(d){ //hover to show tooltips
  div.style('left', d3.event.pageX+10+'px');
  div.style('top', d3.event.pageY-25+'px');
  div.style('display', 'inline-block');
  div.html((d.label)+'<br>'+(d.value)+' Days'); //content to display
});

bar.on('mouseout', function(d){
  div.style('display', 'none');
});

svg.insert('g',':first-child')
    .attr('class', 'axisHorizontal')
    .attr('transform', 'translate(' + (margin + labelWidth) + ','+ (height - axisMargin - margin)+')')
    .call(xAxis);

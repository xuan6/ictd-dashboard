

































                .domain([0, max()])
                .range([0, width - margin*2 - labelWidth]);
              .append('g');
              .data(data)
              .enter()
            .append('svg')
            .attr('height', height);
            .attr('width', width)
          .orient('bottom');
          .scale(scale)
          .tickSize(-height + 2*margin + axisMargin)
      maxData = Math.max(...i.value);
      return 'translate(' + margin + ',' + (i * barHeight) + ')';//bar group margin
      return (d.value);
      return Math.max(width + valueMargin, scale(d.value));
      return scale(d);//对于data.value来说的d，每个元素就是int
      var width = this.getBBox().width;
    .append('rect')
    .append('text') //value annotation of each bar
    .attr('class', 'axisHorizontal')
    .attr('class', 'bar')
    .attr('class', 'value')
    .attr('cx',0)
    .attr('dx', -valueMargin + labelWidth) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('height', barHeight)
    .attr('text-anchor', 'end')
    .attr('transform', 'translate(' + (margin + labelWidth) + ','+ (height - axisMargin - margin)+')')
    .attr('transform', 'translate('+labelWidth+','+i*barHeight+barHeight*(1+data.length)+data.length*barPadding+')')
    .attr('transform', function(d, i) {
    .attr('width', function(d){
    .attr('x', function(d){
    .attr('y', barHeight * (i + 0.5)+labelWidth+i*barHeight+barHeight*(1+data.length)+data.length*barPadding)
    .call(xAxis);
    .data(function(d){ return d.value;})
    .data(function(d){ return d.value;})//数据源是每一条数据array
    .enter()
    .enter()
    .text(function(d){
    //没组第一个text的位置是没问题的，问题在于每组entity的text都在同一个位置了
    barHeight = (height-axisMargin-margin*2)* 0.25/data.length,
    barPadding = (height-axisMargin-margin*2)*0.3/data.length,
    bars.selectAll('rect') //each bar group, append bars
    bars.selectAll('text') //each bar group, append text annotation
    data, bar, svg, scale, xAxis, labelWidth = 0;
    height = parseInt(d3.select('#viz-avg-tat').style('height'), 10),
    i += 1; //画下一组entity
    if (Math.max(...i.value) >= maxData){
    margin = 40,
    valueMargin = 5,
    width = parseInt(d3.select('#viz-avg-tat').style('width'), 10), //parseInt() turns strings into numbers, reading up to and ignoring the first non-integer character, and also possibly performing base conversion
    }
    })
    });
    });
    });
  data.forEach(function(i){
  return maxData;
  var i = 0;
  var maxData = 0
  while (i < data.length){
  });
  };
//         console.log(val);
//         index += 1;
//         return val;
//         val = d.value[index];
//       labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
//       renderbar();
//       return d.label;
//       var length = 2;//test data length is 2
//       var val, index = 0;
//       while (index < length) {
//       }
//     .attr('class', 'label')
//     .attr('dy', '.35em') //vertical align middle
//     .attr('y', barHeight / 2)
//     .text(function(d){
//     }).each(function() {
//     });
//   div.html((d.label)+'<br>'+(d.value)+' Days'); //content to display
//   div.style('display', 'inline-block');
//   div.style('display', 'none');
//   div.style('display', 'none');
//   div.style('left', (d3.event.pageX-50)+'px');
//   div.style('top', (d3.event.pageY-200)+'px');
// 'use strict';
// bar2.on('mouseout', function(d){
// bars.append('text') //bar label
// d3.selectAll('rect').on('mousemove', function(d){ //hover to show tooltips
// d3.selectAll('rect').on('mouseout', function(d){
// function valBar(d){//for each entity (data array)
// });
// });
// });
// };
//hover等会儿再画
//label可以最后画，反正是固定的axis label
//var max = d3.max(data, function(d) { return d.value; });
//每个bar group是entity的group，每个group有6个bar
]
];
bars = svg.selectAll('g') //一共3组图，entity有过少就有多少组图，每一组图的margin是往下推一个bar height，每个bar之间的margin是barheight和barmargin各种加起来
bars.attr('class', 'bargroup')//bar = group of (label + rect + tooltip) for a specifc phase
function renderbar(){
renderbar();
scale = d3.scale.linear() //axis scaling
svg = d3.select('#viz-avg-tat')
svg.insert('g',':first-child')//chart canvas
var axisMargin = 5,
var data = [
var div = d3.select('#viz-avg-tat').append('div').attr('class', 'toolTip');
var label = [
var max = function(){ //find the max length of the rects
xAxis = d3.svg.axis()
{entity:'labA', value:[20,3,5,1,4,7]},
{entity:'labB',value:[27,5,8,1,3,10]},
{entity:'labC',value:[25,4,7,2,5,7]}
{label:'Collect - Ship', value:[3,5,4]},
{label:'Receive - Register', value:[1,1,2]},
{label:'Register - Report', value:[4,3,5]},
{label:'Report - Dispatch', value:[7,10,7]}
{label:'Ship - Receive', value:[5,8,7]},
{label:'Total TAT', value:[20,27,25]},
};
};
// 'use strict';


var data = [
{label:'Total TAT', value:[20,27,25]},
{label:'Collect - Ship', value:[3,5,4]},
{label:'Ship - Receive', value:[5,8,7]},
{label:'Receive - Register', value:[1,1,2]},
{label:'Register - Report', value:[4,3,5]},
{label:'Report - Dispatch', value:[7,10,7]}
];

var div = d3.select('#viz-avg-tat').append('div').attr('class', 'toolTip');

var axisMargin = 5,
    margin = 40,
    valueMargin = 5,
    width = parseInt(d3.select('#viz-avg-tat').style('width'), 10), //parseInt() turns strings into numbers, reading up to and ignoring the first non-integer character, and also possibly performing base conversion
    height = parseInt(d3.select('#viz-avg-tat').style('height'), 10),
    barHeight = (height-axisMargin-margin*2)* 0.25/data.length,
    barPadding = (height-axisMargin-margin*2)*0.3/data.length,
    data, bar, svg, scale, xAxis, labelWidth = 0;



//var max = d3.max(data, function(d) { return d.value; });

var max = function(){ //find the max length of the rects
  var maxData = 0
  data.forEach(function(i){
    if (Math.max(...i.value) >= maxData){
      maxData = Math.max(...i.value);
    }
  });
  return maxData;
};


svg = d3.select('#viz-avg-tat')
            .append('svg')
            .attr('width', width)
            .attr('height', height);


bars = svg.selectAll('g') //data join with bargroup
              .data(data)
              .enter()
              .append('g');

bars.attr('class', 'bargroup')//bar = group of (label + rect + tooltip) for a specifc phase
    .attr('cx',0)
    .attr('transform', function(d, i) {
      return 'translate(' + margin + ',' + (i * 2*(barHeight + barPadding) + barPadding) + ')';//bar group margin
    });

bars.append('text') //bar label
    .attr('class', 'label')
    .attr('y', barHeight / 2)
    .attr('dy', '.35em') //vertical align middle
    .text(function(d){
      return d.label;
    }).each(function() {
      labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });

scale = d3.scale.linear() //axis scaling
                .domain([0, max()])
                .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 2*margin + axisMargin)
          .orient('bottom');

bars.append('rect') //each bar
    .attr('class', 'bar1')
    .attr('transform', 'translate('+labelWidth+', 0)')
    .attr('height', barHeight)
    .attr('width', function(d){
      return scale(d.value[0]);
    });

bars.append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('y', barHeight / 2)
    .attr('dx', -valueMargin + labelWidth) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .text(function(d){
      return (d.value[0]);
    })
    .attr('x', function(d){
      var width = this.getBBox().width;
      return Math.max(width + valueMargin, scale(d.value[0]));
    });

bars.append('rect') //each bar
    .attr('class', 'bar2')
    .attr('transform', 'translate('+labelWidth+','+barHeight+ ')')
    .attr('height', barHeight)
    .attr('width', function(d){
      return scale(d.value[1]);
    });

var bar1 = d3.select('.bar1');

var bar2 = d3.select('.bar2');

var rect = d3.selectAll('rect');

function valBar(d){//for each entity (data array)
      var val, index = 0;
      var length = 2;//test data length is 2
      while (index < length) {
        val = d.value[index];
        index += 1;
        console.log(val);
        return val;
      }
};

bars.append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('y', barHeight * 1.5)
    .attr('dx', -valueMargin + labelWidth) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .text(function(d){
      return (d.value[1]);
    })
    .attr('x', function(d){
      var width = this.getBBox().width;
      return Math.max(width + valueMargin, scale(d.value[1]));
    });

bars.append('rect') //each bar
    .attr('class', 'bar3')
    .attr('transform', 'translate('+labelWidth+', '+2*barHeight+ ')')
    .attr('height', barHeight)
    .attr('width', function(d){
      return scale(d.value[2]);
    });

bars.append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('y', barHeight*2.5)
    .attr('dx', -valueMargin + labelWidth) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .text(function(d){
      return (d.value[2]);
    })
    .attr('x', function(d){
      var width = this.getBBox().width;
      return Math.max(width + valueMargin, scale(d.value[2]));
    });

// 对每一个d来说
// text val影响text内容和x位置
// 如果我能一次性把val求出来，就可以在text里一次性设置了 .text(val)和.attr('x', function())


    
    // .attr('x', function(d){
    //   var width = this.getBBox().width;
    //   return Math.max(width + valueMargin, scale(d.value[0]));
    // });

// bar2.append('text') //value annotation of each bar
//     .attr('class', 'value')
//     .attr('y', barHeight / 2)
//     .attr('dx', -valueMargin + labelWidth) //margin right
//     .attr('dy', '.35em') //vertical align middle
//     .attr('text-anchor', 'end')
//     .text(function(d){
//       return (d.value[1]);
//     })
//     .attr('x', function(d){
//       var width = this.getBBox().width;
//       return Math.max(width + valueMargin, scale(d.value[1]));
//     });



bar1.on('mousemove', function(d){ //hover to show tooltips
  div.style('left', (d3.event.pageX-50)+'px');
  div.style('top', (d3.event.pageY-200)+'px');
  div.style('display', 'inline-block');
  div.html((d.label)+'<br>'+(d.value[0])+' Days'); //content to display
});

bar2.on('mousemove', function(d){ //hover to show tooltips
  div.style('left', (d3.event.pageX-50)+'px');
  div.style('top', (d3.event.pageY-200)+'px');
  div.style('display', 'inline-block');
  div.html((d.label)+'<br>'+(d.value[1])+' Days'); //content to display
});

// bar2.on('mousemove', function(d){ //hover to show tooltips
//   div.style('left', (d3.event.pageX-50)+'px');
//   div.style('top', (d3.event.pageY-200)+'px');
//   div.style('display', 'inline-block');
//   div.html((d.label)+'<br>'+(d.value)+' Days'); //content to display
// });

rect.on('mouseout', function(d){
  div.style('display', 'none');
});

// bar2.on('mouseout', function(d){
//   div.style('display', 'none');
// });

svg.insert('g',':first-child')//chart canvas
    .attr('class', 'axisHorizontal')
    .attr('transform', 'translate(' + (margin + labelWidth) + ','+ (height - axisMargin - margin)+')')
    .call(xAxis);

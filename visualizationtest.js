// 'use strict';
var color = ['#5ab1f4','#d7dfe5','#45c677'];

var label = [
{'label':'Total TAT', value:[20,27,25]},
{'label':'Collect - Ship', value:[3,5,4]},
{'label':'Ship - Receive', value:[5,8,7]},
{'label':'Receive - Register', value:[1,1,2]},
{'label':'Register - Report', value:[4,3,5]},
{'label':'Report - Dispatch', value:[7,10,7]}
];

//每个bar group是entity的group，每个group有6个bar

var data = [
{'entity':'labA','value':[20,3,5,1,4,7]},
{'entity':'labB','value':[27,5,8,1,3,10]},
{'entity':'labC','value':[25,4,7,2,5,7]}
]

var div = d3.select('#viz-avg-tat').append('div').attr('class', 'toolTip');

var axisMargin = 5,
    margin = 40,
    valueMargin = 5,
    width = parseInt(d3.select('#viz-avg-tat').style('width'), 10), //parseInt() turns strings into numbers, reading up to and ignoring the first non-integer character, and also possibly performing base conversion
    height = parseInt(d3.select('#viz-avg-tat').style('height'), 10),
    barHeight = (height-axisMargin-margin*2)* 0.15/data.length,
    barPadding = (height-axisMargin-margin*2)*0.4/data.length,
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


bars = svg.selectAll('g') //一共3组图，entity有过少就有多少组图，每一组图的margin是往下推一个bar height，每个bar之间的margin是barheight和barmargin各种加起来
              .data(data)
              .enter()
              .append('g');

bars.attr('class', 'bargroup')//bar = group of (label + rect + tooltip) for a specifc phase
    .attr('cx',0)
    .attr('transform', function(d, i) {
      return 'translate(' + margin + ',' + i*barHeight + ')';//bar group margin
    });

//label可以最后画，反正是固定的axis label
// bars.append('text') //bar label
//     .attr('class', 'label')
//     .attr('y', barHeight / 2)
//     .attr('dy', '.35em') //vertical align middle
//     .text(function(d){
//       return d.label;
//     }).each(function() {
//       labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
//       renderbar();
//     });

scale = d3.scale.linear() //axis scaling
                .domain([0, max()])
                .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 2*margin + axisMargin)
          .orient('bottom');



function renderbar(){
  var t = 0;
  while (t < data.length){
    bars //each bar group, append bars
    .selectAll('rect')
    .data(function(d){return d.value;})
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('transform', function(d, i) {
                return 'translate(' + margin + ',' + (i * (barHeight + barPadding)+barPadding*0.5) + ')';
    })
    .attr('height', barHeight)
    .attr('width', function(d){
      return scale(d);//对于data.value来说的d，每个元素就是int
    })
    .attr('fill',function(t){
      return color[t];
    })
    .attr('fill-opacity', .9);

    bars//for each  bar group
    .selectAll('text')
    .data(function(d){return d.value;})
    .enter()
    .append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('transform', function(d, i) {
                return 'translate(' + margin + ',' + (i * (barHeight + barPadding)+barPadding*0.7)+ ')';
    })
    // .attr('y', function(i){
    //   return barHeight*(t + 0.5)+(i * (barHeight + barPadding)+barPadding*0.5)
    // })
    .attr('dx', -valueMargin + labelWidth) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .text(function(d){
      return d;
    })
    .attr('x', function(d){
      // var width = this.getBBox().width;
      return scale(d)-labelWidth;
      // return Math.max(width + valueMargin, scale(d));
    });

    t += 1; //画下一组entity
  };
};



// function valBar(d){//for each entity (data array)
//       var val, index = 0;
//       var length = 2;//test data length is 2
//       while (index < length) {
//         val = d.value[index];
//         index += 1;
//         console.log(val);
//         return val;
//       }
// };



//hover等会儿再画

// d3.selectAll('rect').on('mousemove', function(d){ //hover to show tooltips
//   div.style('left', (d3.event.pageX-50)+'px');
//   div.style('top', (d3.event.pageY-200)+'px');
//   div.style('display', 'inline-block');
//   div.html((d.label)+'<br>'+(d.value)+' Days'); //content to display
// });


// d3.selectAll('rect').on('mouseout', function(d){
//   div.style('display', 'none');
// });

// bar2.on('mouseout', function(d){
//   div.style('display', 'none');
// });

svg.insert('g',':first-child')//chart canvas
    .attr('class', 'axisHorizontal')
    .attr('transform', 'translate(' + (margin + labelWidth) + ','+ (height - axisMargin - margin)+')')
    .call(xAxis);

renderbar();
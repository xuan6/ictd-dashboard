// 'use strict';
// var color = d3.scale.ordinal()
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var tatlabel = ['Total TAT','Collect - Ship','Ship - Receive','Receive - Register','Register - Report','Report - Dispatch']

//每个bar group是entity的group，每个group有6个bar

var data = [
{'entity':'LabA','value':[20,3,5,1,4,7]},
{'entity':'LabB','value':[27,5,8,1,3,10]},
{'entity':'LabC','value':[25,4,7,2,5,7]}
]


var div = d3.select('#viz-avg-tat').append('div').attr('class', 'toolTip');

var axisMargin = 5,
    margin = 45,
    valueMargin = 5,
    width = 960,
    barHeight = 20,
    barPadding = 20,
    height = 6*(barHeight*data.length+barPadding)+margin*2,
    data, bar, svg, scale, xAxis = 0,
    labelWidth = 40;



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
      return 'translate(' + margin + ',' + i*barHeight + ')';//grouped bards margin
    });

//label可以最后画，反正是固定的axis label

// d3.select('rect')
//   .style('fill','#d7dfe5');

d3.select('.bargroup')
    .selectAll('rect')
    .data(tatlabel)
    .enter()
    .insert('text')
    .attr('size', 15)
    .attr('transform', function(d, i) {
                return 'translate(' + -0.7*labelWidth + ',' + (i * (barHeight*data.length + barPadding)+margin*1.2) + ')';
    })
    .attr('y', barHeight/2)
    .attr('dy', '.35em')
    .text(function(d){
      return d;
    })
    .attr('labelWidth', labelWidth);


scale = d3.scale.linear() //axis scaling
                .domain([0, max()])
                .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 0.2*margin + axisMargin)
          .orient('bottom');


var t = 0;
function renderbar(){
  var colorPicker = function(t){
    var color = ['#5ab1f4','#d7dfe5','#45c677'];
    return color[t];
  }
  while (t < data.length){
    console.log(colorPicker(t));
    bars //each bar group, append bars
    .selectAll('rect')
    .data(function(d){return d.value;})
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('transform', function(d, i) {
                return 'translate(' + (1.5*margin + labelWidth) + ',' + (i * (barHeight*data.length + barPadding)+margin*1.2) + ')';
    })
    .attr('height', barHeight)
    .attr('width', function(d){
      return scale(d);//对于data.value来说的d，每个元素就是int
    })
    .style('fill', colorPicker(t))//写function(t)其中的t会变成function(d)一样的作用！
    .attr('fill-opacity', .9);

    bars//for each  bar group
    .selectAll('text')
    .data(function(d){return d.value;})
    .enter()
    .append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('transform', function(d, i) {
                return 'translate(' + (1.5*margin + labelWidth) + ',' + (0.5*barPadding+i * (barHeight*data.length + barPadding)+margin*1.2)+ ')';
    })
    // .attr('y', function(i){
    //   return barHeight*(t + 0.5)+(i * (barHeight + barPadding)+barPadding*0.5)
    // })
    .attr('dx', -valueMargin + labelWidth) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .style('size','20px')
    .text(function(d){
      return d;
    })
    .attr('x', function(d){
      // var width = this.getBBox().width;
      return scale(d)-1.2*labelWidth;
      // return Math.max(width + valueMargin, scale(d));
    });

    t += 1; //画下一组entity
  };
};



//hover等会儿再画

// bars.selectAll('rect').
//   on('mousemove', function(d){ //hover to show tooltips
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
    .attr('transform', 'translate(' + (2.5*margin + labelWidth) + ','+ (height+margin)+')')
    .call(xAxis);

renderbar();
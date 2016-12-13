// 'use strict';
// var color = d3.scale.ordinal()
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var tatlabel = ['Total TAT','Collect - Ship','Ship - Receive','Receive - Register','Register - Report','Report - Dispatch']

//每个bar group是entity的group，每个group有6个bar

var data = [
{'entity':'LabA','value':[20,3,5,1,4,7]},
{'entity':'LabB','value':[27,5,8,1,3,10]},
{'entity':'LabC','value':[25,4,7,2,5,7]},
{'entity':'LabC','value':[21,3,9,2,8,4]},
{'entity':'LabC','value':[25,2,8,2,6,8]}
]

var colors = d3.scale.category20();

var resultColors = d3.scale.ordinal()
  .domain(['negative', 'indeterminate', 'positive'])
  .range(['#ff7c6d', '#fff45e', '#98e884']);


var div = d3.select('#viz-avg-tat').append('div').attr('class', 'toolTip');

var axisMargin = 5,
    margin = 45,
    valueMargin = 5,
    width = 960,
    barHeight = 20,
    barPadding = 20,
    height = 6*(barHeight*data.length+barPadding)+margin*2,
    data, bar, tatCanvas, scale, xAxis = 0,
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

//for eid test



var eidCanvas = d3.select('#viz-eid-result')
            .append('svg')
            .attr('width', width)
            .attr('height', height*.7);


var w = barHeight*data.length+3*margin;
var h = 500;
//Original data
var dataset = [
    [//positive
        { x: 0, y: 5 },
        { x: 1, y: 4 },
        { x: 2, y: 2 },
        { x: 3, y: 7 },
        { x: 4, y: 23 }
    ],
    //ind
    [
        { x: 0, y: 10 },
        { x: 1, y: 12 },
        { x: 2, y: 19 },
        { x: 3, y: 23 },
        { x: 4, y: 17 }
    ],
    //negative
    [
        { x: 0, y: 22 },
        { x: 1, y: 28 },
        { x: 2, y: 32 },
        { x: 3, y: 35 },
        { x: 4, y: 43 }
    ]
];
//Set up stack method
var stack = d3.layout.stack();
//Data, stacked
stack(dataset);
//Set up scales
var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset[0].length))
    .rangeRoundBands([0, w], 0.05);
var yScale = d3.scale.linear()
    .domain([0,
        d3.max(dataset, function(d) {
            return d3.max(d, function(d) {
                return d.y0 + d.y;
            });
        })
    ])
    .range([h,0]);
//Easy colors accessible via a 10-step ordinal scale

// Add a group for each row of data
var groups = eidCanvas.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr('transform', function(d, i) {
          return 'translate(' + margin+ ',' + 2*margin + ')';//grouped bards margin
        })
    .style("fill", function(d, i) {
        return resultColors(i);
    });
// Add a rect for each data value
var rects = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d.y0) - (h - yScale(d.y));
    })
    .attr("height", function(d) {
        return h - yScale(d.y);;
    })
    .attr("width", xScale.rangeBand());
//eid end







tatCanvas = d3.select('#viz-avg-tat')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

var tatLegend = d3.select('#legend-avg-tat')
            .append('svg')
            .attr('width', width)
            .attr('height', height/12);

var tatEntityItems = tatLegend.selectAll('g')
    .data(data)
    .enter()
    .append('g')

tatEntityItems
    .attr('class', function(d,i){
      return 'entity'+i;
    })
    .append('text')
    .text(function(d,i){
      return d.entity;
    })
    .attr('dy','.35em')
    .attr('transform', function(d, i) {
          return 'translate(' + (margin + i*2*labelWidth)+ ',' + margin + ')';//grouped bards margin
        });

tatEntityItems    
    .append('rect')
    .attr('fill',function(d,i){
      return colors(i);
    })
    .attr('class', function(d,i){
      return 'legend'+i;
    })
    .attr('height',barHeight)
    .attr('width',barHeight)
    .attr('transform', function(d, i) {
          return 'translate(' + (margin +labelWidth+ i*2*labelWidth)+ ',' + .7*margin + ')';//grouped bards margin
        });

bars = tatCanvas.selectAll('g') //一共3组图，entity有过少就有多少组图，每一组图的margin是往下推一个bar height，每个bar之间的margin是barheight和barmargin各种加起来
              .data(data)
              .enter()
              .append('g');

bars.attr('class', function(d,i){
    return 'bargroup'+i;
    })//bar = group of (label + rect + tooltip) for a specifc phase
    .attr('cx',0)
    .attr('transform', function(d, i) {
      return 'translate(' + margin + ',' + i*barHeight + ')';//grouped bards margin
    });


// bars.attr('class', 'bargroup')//bar = group of (label + rect + tooltip) for a specifc phase
//     .attr('cx',0)
//     .attr('transform', function(d, i) {
//       return 'translate(' + margin + ',' + i*barHeight + ')';//grouped bards margin
//     });


scale = d3.scale.linear() //axis scaling
                .domain([0, max()])
                .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 0.2*margin + axisMargin)
          .orient('bottom');



function renderbar(){
  var index = 0;
  while (index < data.length){


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
      return scale(d);})//对于data.value来说的d，每个元素就是int
    .attr('fill-opacity', .85);

    bars//for each  bar group, append text of the value
    .selectAll('text')
    .data(function(d){return d.value;})
    .enter()
    .append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('transform', function(d, i) {
                return 'translate(' + (1.5*margin + labelWidth) + ',' + (0.5*barPadding+i * (barHeight*data.length + barPadding)+margin*1.2)+ ')';
    })
    .attr('dx', -valueMargin ) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .style('size','20px')
    .text(function(d){
      return d;
    })
    .attr('x', function(d){
      // var width = this.getBBox().width;
      return scale(d);
      // return Math.max(width + valueMargin, scale(d));
    });

    index += 1; //画下一组entity
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

function fillColor(){
  var countGroup=data.length;
  var barGroupIndex = 0;
  
  while (barGroupIndex < countGroup) {
    var barGroupClassName = ('.bargroup'+barGroupIndex);
    console.log(barGroupClassName);
    d3.select(barGroupClassName)
      .selectAll('rect')
      .attr('fill',colors(barGroupIndex));
    barGroupIndex += 1;

  }
} 



tatCanvas.insert('g',':first-child')//chart canvas
    .attr('class', 'axisHorizontal')
    .attr('transform', 'translate(' + (2.5*margin + labelWidth) + ','+ (height+margin)+')')
    .call(xAxis);

//turnaround time vertical labels
tatCanvas.insert('g',':first-child')
    .attr('class','tatlabels')
    .selectAll('text')
    .data(tatlabel)
    .enter()
    .append('text')
    .attr('size', 15)
    .attr('transform', function(d, i) {
                return 'translate(' + 0.4*labelWidth + ',' + (i * (barHeight*data.length + barPadding)+margin*1.2) + ')';
    })
    .attr('y', barHeight/2)
    .attr('dy', '.35em')
    .text(function(d){
      return d;
    })
    .attr('labelWidth', labelWidth);


renderbar();
fillColor();
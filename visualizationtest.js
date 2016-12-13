/*---------data formart-----------*/

var tatlabel = ['Total TAT','Collect - Ship','Ship - Receive','Receive - Register','Register - Report','Report - Dispatch']

var eidlegend = ['Positive(Detected)','Indeterminate','Negative(Not Detected)','Rejected']

//tat data should looks like this format
var data = [
{'entity':'LabA','value':[20,3,5,1,4,7]},
{'entity':'LabB','value':[27,5,8,1,3,10]},
{'entity':'LabC','value':[25,4,7,2,5,7]},
{'entity':'LabD','value':[21,3,9,2,8,4]},
{'entity':'LabE','value':[25,2,8,2,6,8]}
]

//age data should looks like this format
var age = [
23,45,33,29,44
]


/*-------------set up config---------------*/

var colors = d3.scale.category20();

//edi test result colors
var resultColors = d3.scale.ordinal()
  .domain(['negative', 'indeterminate', 'positive','rejected'])
  .range(['#ff7c6d', '#fff45e', '#98e884','#d7dae0']);


// var div = d3.select('#viz-avg-tat').append('div').attr('class', 'toolTip');

var axisMargin = 5,
    margin = 45,
    valueMargin = 5,
    width = 960,
    barHeight = 20,
    barPadding = 20,
    height = 6*(barHeight*data.length+barPadding)+margin*2, //height for tat canvas
    data, bar, tatCanvas, scale, xAxis = 0,
    labelWidth = 40;


var max = function(){ //find the max length of the rects
  var maxData = 0
  data.forEach(function(i){
    if (Math.max(...i.value) >= maxData){
      maxData = Math.max(...i.value);
    }
  });
  return maxData;
};


scale = d3.scale.linear() //axis scaling
                .domain([0, max()])
                .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 0.2*margin + axisMargin)
          .orient('bottom');




/*-------------for avg age section ---------------*/

var scaleAge = d3.scale.linear() //axis scaling
                .domain([0, Math.max(...age)])
                .range([0, width - margin*2 - labelWidth]);
var ageHeight = barHeight*data.length+barPadding*4

var xAxisAge = d3.svg.axis()
          .scale(scaleAge)
          .tickSize(-ageHeight + 0.2*margin + axisMargin)
          .orient('bottom');

var ageCanvas = d3.select('#viz-avg-age')
            .append('svg')
            .attr('width', width)
            .attr('height', ageHeight);
            

var ages = ageCanvas.selectAll('rect')
              .data(age)
              .enter()
              .append('rect');

ages.attr('class', function(d,i){
    return 'age'+i;
    })
    .attr('cx',0)
    .attr('transform', function(d, i) {
      return 'translate(' + (2.5*margin + labelWidth) + ',' + (margin+i*barHeight) + ')';
    })
    .attr('height', barHeight)
    .attr('width', function(d){
      return .5*scale(d);})
    .attr('fill-opacity', .85);

//---------still buggy-----------
ageCanvas//for each  bar group, append text of the value
    .insert('g',':first-child')
    .attr('class','agevalues')
    .selectAll('text')
    .data(age)
    .enter()
    .append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('color','black')
    .attr('transform', function(d, i) {
                return 'translate('+0+',' + i*barHeight+ ')';
    })
    .attr('dx', valueMargin ) //margin right
    .attr('dy', '.35em') //vertical align middle
    // .attr('text-anchor', 'end')
    .style('size','20px')
    .text(function(d){
      return d;
    })
    .attr('x', function(d){
      // var width = this.getBBox().width;
      return labelWidth;
      // return Math.max(width + valueMargin, scale(d));
    });





/*-------------for eid test result---------------*/
var eidCanvas = d3.select('#viz-eid-result')
            .append('svg')
            .attr('width', width)
            .attr('height', barHeight*data.length+4*margin);


var w = width*0.8;
var h = barHeight*data.length+3*margin;


//convert data format
var dataset = [
    [//positive
        { x: 0, y: 5 }, //x for index, y for value
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
    ],
    [//rejected
        { x: 0, y: 4 },
        { x: 1, y: 7 },
        { x: 2, y: 6},
        { x: 3, y: 15 },
        { x: 4, y: 9 }
    ]
];

//Set up stack method
var stack = d3.layout.stack();
//Data, stacked
stack(dataset);

//Set up scales
var yScale = d3.scale.ordinal()
    .domain(d3.range(dataset[0].length))
    .rangeRoundBands([0, h], 0.05);
var xScale = d3.scale.linear()
    .domain([0,
        d3.max(dataset, function(d) {
            return d3.max(d, function(d) {
                return d.y0 + d.y;
            });
        })
    ])
    .range([0,w]);
//Easy colors accessible via a 10-step ordinal scale

// Add a group for each row of data
var eidgroups = eidCanvas.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr('transform', function(d, i) {
          return 'translate(' + (2.5*margin + labelWidth)+ ',' + 1.5*margin + ')';//grouped bards margin
        })
    .style("fill", function(d, i) {
        return resultColors(i);
    });
// Add a rect for each data value
var rects = eidgroups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(d.y0);
    })
    .attr("y", function(d,i) {
        return yScale(i);
    })
    .attr("height", barHeight)
    .attr("width", function(d){
      return xScale(d.y);
    });

var eidValue = eidgroups.selectAll('text')
    .data(function(d) { return d; })
    .enter()
    .append('text')
    .attr('class','result')
    .text(function(d) { return d.y; })
    .attr('x', function(d, i) {
        return xScale(d.y0)+3;
    })
    .attr('y', function(d,i) {
        return yScale(i)+.8*barHeight;
    });

eidCanvas.insert('g',':first-child')
    .attr('class','eidlabels')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('size', 15)
    .attr('transform', function(d, i) {
                return 'translate(' + (margin) + ',' + (1.5*margin+yScale(i)) + ')';
    })
    .attr('y', barHeight/2)
    .attr('dy', '.35em')
    .text(function(d){
      return d.entity;
    })
    .attr('labelWidth', labelWidth);

var eidLegend = d3.select('#legend-eid-result')
            .append('svg')
            .attr('width', width)
            .attr('height', h/10);

var eidResultItems = eidLegend.selectAll('g')
    .data(eidlegend)
    .enter()
    .append('g')

eidResultItems
    .attr('class', function(d,i){
      return 'result'+i;
    })
    .append('text')
    .attr('class','eidlegend')
    .text(function(d,i){
      return d;
    })
    .attr('dy','.35em')
    .attr('transform', function(d, i) {
          return 'translate(' + (margin + i*2*labelWidth)+ ',' + margin + ')';//grouped bards margin
        });

eidResultItems    
    .append('rect')
    .attr('fill',function(d,i){
      return resultColors(i);
    })
    .attr('height',barHeight)
    .attr('width',barHeight)
    .attr('transform', function(d, i) {
          return 'translate(' + (margin +labelWidth+ i*2*labelWidth)+ ',' + .7*margin + ')';//grouped bards margin
        });


/*-----------turnaround time--------*/

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



//hover

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
  
  while (barGroupIndex < countGroup){
    var barGroupClassName = ('.bargroup'+barGroupIndex);
    var ageClassName = ('.age'+barGroupIndex);
    console.log(ageClassName);
    d3.select(barGroupClassName)
      .selectAll('rect')
      .attr('fill',colors(barGroupIndex));

    d3.select(ageClassName)
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


ageCanvas.insert('g',':first-child')//chart canvas
    .attr('class', 'axisHorizontal')
    .attr('transform', 'translate(' + (2.5*margin + labelWidth) + ','+ ageHeight+')')
    .call(xAxisAge);

renderbar();
fillColor();
var parseDateDiff = function(matrix){
//此时默认是有Lab名字信息的
var date1, date2, date3, date4, date5, date6 = 0;
var entityName = ‘’
matrix.forEach(function(array){
	var index = 0
	if (array[0] is not string){ //没有lab信息，是算所有avg的，就要对Index处理
		index += 1;
		entityName = ‘Total’;
	}
	i.forEach(function(item){
		index += indexOf(item);
		switch (index){
case 1: //对有lab信息的array，第一个int的Index是1，没有lab信息，则第一个数的Index是0，但是之前人为加一了，所有也可以对应switch 1
date1 += item;

case 2:
date2 += item

case 3:
date3 += item;
//…
default: 
break

}
}); //finish loop per array
});//finish loop per matrix

var count = matrix.count; //多少个数列来求avg
var divider = count * 86400
if (entityName != ‘’){ //如果是算全部数据 不区分lab的话
	entityName = matrix[0][0]
}
avgTat.append( //最后的结果数列得到了date diff的结果
	{“entity”: entityName;
		“tat”: [(date1-date0)/divider, (date2-date1)/divider, ….]
	};
}


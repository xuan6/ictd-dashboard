
var tatdatashouldlooklikethis = [
{'entity':'NHL','value':[20,3,5,1,4,7]},
{'entity':'PHL','value':[27,5,8,1,3,10]},
{'entity':'UNION','value':[25,4,7,2,5,7]},
]

//age data should looks like this format
var ageshouldlooklikethis = [
	23,45,33
]


var eidshouldlooklikethis = [
    [//positive
        { x: 0, y: 5 }, //x for index, y for value
        { x: 1, y: 4 },
        { x: 2, y: 2 }
    ],
    //ind
    [
        { x: 0, y: 10 },
        { x: 1, y: 12 },
        { x: 2, y: 19 }
    ],
    //negative
    [
        { x: 0, y: 22 },
        { x: 1, y: 28 },
        { x: 2, y: 32 }
    ],
    [//rejected
        { x: 0, y: 4 },
        { x: 1, y: 7 },
        { x: 2, y: 6}
    ]
];


var avgAgePerState, avgAgePerTown,avgAgePerProvince = 
[
	['regionName',12],
	['regionName2',34],
	//.....
	['lastregionName',33]
]

/*----- ???? array of array??? -----*/
var avgAgeNHL = [
	[1]
]

var avgAgePerFacilityName, avgAgePerFacilityType =
[
	['facilityName',12],
	//.....
	['lastfacilityName',33]
]


/*------ array[0] is optional--------*/
var eidTestResultTotal, 
eidTestResultAIDSTFacility,
eidTestResultNHLLab =
[
	['Negative',23], //每一个可能都不存在，要判断 array[0] switch case
	['Positive',45],
	['Indeterminate',33],
	['Not Detected',55],
	['Detected',66]
]


var avgTatTotal,avgTatNHLLab = //每一个entity都是一个矩阵，需要对date1全部求和，然后再求平均值
[
	[2200000,33000000,110000,4400000,5500000,6000000],
	//.....

	[2200000,110000,110000,110000,110000,110000]
]


/* ------ eid test result data formatter -------- */
function parseEid(matrix){
	var positive, indeterminate, negative, rejected = 0;
	matrix.forEach(function(array){
		var resultType = array[0];
		var value = array[1];
		switch(resultType){
			case 'Positive':
			positive += value ;
			case 'Indeterminate':
			indeterminate += value;
			case 'Negative':
			negative += value;
			case 'Rejected':
			negative += value;
			case 'Detected':
			positive += value;
			case 'Not Detected':
			negative += value;
			default:
			break
		}//finish loop per row to detect which type it is
	})//finish loop the matrix for per entity
	return [positive, indeterminate, negative, rejected];
}

var EIDdataset = [
    [//positive
        //{ x: 0, y: 5 } x for index, y for value
    ],
    //ind
    [

    ],
    //negative
    [

    ],
    [//rejected
 
    ]
];

function constructEID(array){//parameter is the parseEID function, which eventually is the return value of the parse function
	var positive = array[0];
	var negative = array[1];
	var indeterminate = array[2];
	var rejected = array[3];

	var xindex = EIDdataset[0].length;
	if (xindex=0){
		x = 0
	}else{
		x = xindex;
	}

	EIDdataset[0].push({'x': x, 'y':positive});
	EIDdataset[1].push({'x': x, 'y':negative});
	EIDdataset[2].push({'x': x, 'y':indeterminate});
	EIDdataset[3].push({'x': x, 'y':rejected});
}

//call construction function to get formatted data for all data points to generate d3 graph
constructEID(parseEid(eidTestResultTotal));
constructEID(parseEid(eidTestResultAIDSTFacilityType));
constructEID(parseEid(eidTestResultAMIFacilityType));
constructEID(parseEid(eidTestResultDisHFacilityType));
constructEID(parseEid(eidTestResultGenHFacilityType));
constructEID(parseEid(eidTestResultMSFHFacilityType));
constructEID(parseEid(eidTestResultNHLFacilityType));
constructEID(parseEid(eidTestResultSpHFacilityType));
constructEID(parseEid(eidTestResultSRHFacilityType));
constructEID(parseEid(eidTestResultTHFacilityType));



/*---------calculate turnaround time ------*/
var parseDateDiff = function(matrix){
//此时默认是有Lab名字信息的
var date1, date2, date3, date4, date5, date6 = 0;
var entityName = ''
matrix.forEach(function(array){
	var index = 0
	array.forEach(function(item){
		index += indexOf(item);
		switch (index){
		case 0: 
		date1 += item;
		case 1:
		date2 += item
		case 2:
		date3 += item;
		case 3:
		date4 += item;
		case 4:
		date5 += item;
		case 5:
		date6 += item;
		default: 
		break
		}
	}); //finish loop per array
});//finish loop per matrix

var count = matrix.count; //多少个数列来求avg
var divider = count * 86400;
var value = [(date2-date1)/divider, (date3-date2)/divider, (date4-date3)/divider,(date5-date4)/divider,(date6-date5)/divider];
return value;
};

var labTat = []; //formatted dataset for d3 usage
var facilityTat = [];//formatted dataset for d3 usage

labTat.push( //最后的结果数列得到了date diff的结果
	{'entity': 'Total',
	'value': parseDateDiff(avgTatTotal)
	},
	{'entity': 'NHL',
	'value': parseDateDiff(avgTatNHLLab)
	},
	{'entity': 'PHL',
	'value': parseDateDiff(avgTatPHLLab)
	},
	{'entity': 'UNION',
	'value': parseDateDiff(avgTatUNIONLab)
	};
};

facilityTat.push( //最后的结果数列得到了date diff的结果
	{'entity': 'Total',
	'value': parseDateDiff(avgTatTotal)
	},
	{'entity': 'AIDS/STD Team',
	'value': parseDateDiff(avgTatAIDSTFacilityType)
	},
	{'entity': 'AMI',
	'value': parseDateDiff(avgTatAMIFacilityType)
	},
	{'entity': 'District Hospital',
	'value': parseDateDiff(avgTatDisHFacilityType)
	},
	{'entity': 'General Hospital',
	'value': parseDateDiff(avgTatGenHFacilityType)
	},
	{'entity': 'MSF-H',
	'value': parseDateDiff(avgTatMSFHFacilityType)
	},
	{'entity': 'National Health Lab',
	'value': parseDateDiff(avgTatNHLFacilityType)
	},
	{'entity': 'Specialist Hospital',
	'value': parseDateDiff(avgTatSpHFacilityType)
	},
	{'entity': 'State/Regional Hospital',
	'value': parseDateDiff(avgTatSRHFacilityType)
	},
	{'entity': 'Township Hospital',
	'value': parseDateDiff(avgTatTHFacilityType)
	}
}


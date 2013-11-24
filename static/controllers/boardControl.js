//socket was defined as a factory
function boardControl($scope,socket){

	$scope.brushColor = 'black';
	$scope.brushSize = 1;
	$scope.brushMode = 0;

	$scope.initBoard = function() {
		//install paper to global scope
		paper.install(window);
	

		//=======================================================================
		//Functions to change the brush variables NOW DONE WITH ng-click
		//=======================================================================
			/*var brushColor = 'red';//Default to color black

			//Change color function
			function changeColor(color) {
				brushColor = color;//Set the global brush color
							console.log('Is this ever run?');
			}

			//Do not know how to actually change the size of the brush but this should help.
			var brushSize = 5;

			function changeSize(size) {
				brushSize = size;//Update the size of the brush.
			}
			//holds whether the brush is a pencil or eraser 
			//Can add more modes later if in erase mode, color is backround
			//Also can add line tool where you click twice to add a line
			//BRUSH MODES 
			//Mode 0 = pencil
			//Mode 1 = erase
			//Mode 3 = line
			var brushMode = 0;//Default to pencil tool
			function changeMode(mode){
				brushMode = mode;//Update the current brush mode
			}*/
		    
		//=======================================================================
		// End Functions to change the brush variables
		//=======================================================================
		var canvas = document.getElementById('whiteBoard');
		paper.setup(canvas);

		//set myself as a new user
		var user = new User();
		//define new guests
		//var canvas_json = '[["Layer",{"children":[["Path",{}]]}],["Layer",{"children":[["Path",{}],["Path",{}],["Path",{"segments":[[584,208],[582,198],[578,188],[571,180],[561,173],[552,167],[541,163],[533,157],[523,153],[512,149],[502,145],[491,139],[480,135],[470,131],[459,128],[449,124],[438,122],[428,120],[418,120],[408,119],[396,117],[386,117],[375,115],[363,115],[353,115],[342,115],[332,117],[321,117],[309,119],[295,121],[280,123],[268,125],[258,127],[244,129],[232,131],[221,133],[211,137],[200,141],[185,147],[174,151],[163,157],[153,161],[145,168],[142,178],[143,188],[146,198]],"strokeColor":[0,0,0],"strokeCap":"round"}],["Path",{}],["Path",{"segments":[[209,222],[216,214],[229,198],[235,189],[241,181],[244,171],[249,161],[254,151],[257,141],[263,132],[271,126],[282,124],[292,122],[302,122],[313,122],[324,122],[336,122],[346,122],[363,122],[373,122],[383,124],[393,124],[403,124],[413,126],[423,126],[438,128],[448,130],[459,132],[469,134],[479,138],[490,142],[500,146],[510,150],[522,156],[533,162],[544,166],[554,168],[564,172],[575,175],[585,179],[596,181],[606,184],[616,186],[626,189],[636,190],[646,193],[656,195],[666,196],[676,198],[688,198],[698,196],[704,188],[703,178],[701,168],[698,157],[696,147],[688,140],[679,133],[671,126],[662,121],[653,116],[644,111]],"strokeColor":[0,0,0],"strokeCap":"round"}],["Path",{}],["Path",{"segments":[[533,162],[522,162],[503,160],[465,156],[451,154],[437,154],[419,152],[401,150],[376,150],[356,150],[345,148],[305,148],[294,146],[270,146],[244,144],[231,144],[189,140],[167,138],[151,134],[129,132],[107,128],[84,121],[70,119],[56,117],[41,115],[31,113],[21,112]],"strokeColor":[0,0,0],"strokeCap":"round"}],["Path",{}],["Path",{"segments":[[409,82],[414,92],[417,102],[421,113],[425,123],[429,133],[433,145],[437,155],[437,166],[439,177],[439,188],[440,198],[441,208]],"strokeColor":[0,0,0],"strokeCap":"round"}],["Path",{}],["Path",{"segments":[[330,189],[345,177],[353,171],[363,165],[373,159],[383,155],[391,149],[399,143],[408,137],[417,131],[425,125],[435,121],[445,116],[462,107],[474,103],[491,97],[501,95],[516,91],[526,89],[541,83],[551,81],[561,79],[571,77],[581,73],[591,71],[601,69],[612,67],[623,65],[633,63],[644,61],[654,60],[664,57],[671,67],[673,77],[675,87],[675,97],[675,108],[675,120],[673,130],[671,140],[665,151],[659,162],[654,171],[647,180],[638,189],[630,195],[619,200],[608,202],[597,202],[586,202],[576,200],[566,200],[556,198],[544,196],[533,194],[523,192],[512,190],[502,188],[492,186],[482,182],[471,178],[460,176],[472,173],[482,171],[492,169],[507,167],[517,165],[527,165],[537,161],[548,159],[558,159],[568,155],[578,153],[588,153],[599,149],[609,148],[619,146]],"strokeColor":[0,0,0],"strokeCap":"round"}],["Path",{}],["Path",{"segments":[[427.5,296],[437.5,303],[456.5,307],[478.5,309],[491.5,309],[506.5,311],[518.5,311],[533.5,311],[548.5,309],[563.5,309],[583.5,307],[593.5,307],[608.5,303],[621.5,301],[636.5,297],[651.5,293],[666.5,289],[676.5,285],[688.5,280],[703.5,273],[718.5,267],[733.5,260],[748.5,253],[763.5,245],[773.5,239],[793.5,229],[801.5,223],[811.5,214],[822.5,206],[831.5,198],[841.5,190],[850.5,181],[858.5,174],[866.5,168],[874.5,161],[882.5,153],[890.5,145],[899.5,138],[907.5,132]],"strokeColor":[0,0,0],"strokeCap":"round"}],["Path",{"segments":[[427.5,296]],"strokeColor":[0,0,0],"strokeCap":"round"}]]}]] ';
		var a_layer = new Layer();
		var guests = new Array ();
		var numPoints = 0;
		var tool = new Tool(); //needed to create tools
		tool.minDistance = 10;
		tool.onMouseDown = function(event){
	//Do different things based on mode now erase and pencil
			if($scope.brushMode === 1){//Eraser 
				path = new Path();
				path.strokeWidth = 5 + $scope.brushSize;//So that it erases a large area
				path.strokeColor = 'white';//Set color to white May be better to have an erase that actually erases.
				path.strokeCap = 'round';
				path.add(event.point);
				socket.emit('addPath',{ id:user.id,
					p1:event.point, 
					size:path.strokeWidth,
					color:path.strokeColor,
					cap:path.strokeCap,
					flag:0,
						p:tmp});
			}else if($scope.brushMode===0){
				path = new Path();
				path.strokeCap = 'round';
				path.strokeWidth = $scope.brushSize;
				path.strokeColor = $scope.brushColor;
				path.add(event.point);
				var tmp = path.clone();
				socket.emit('addPath',{ id:user.id,
				    p1:event.point, 
					size:path.strokeWidth,
					color:path.strokeColor,
					cap:path.strokeCap,
					flag:0,
						p:tmp});

			}else if($scope.brushMode===2){//most complex since it must wait for two clicks DOES NOT UPDATE OTHER USERS CANVAS
				if(numPoints === 0){
					numPoints = 1;
					tpoint=event.point;
				}else{
					numPoints = 0;
					path = new Path.Line(tpoint,event.point);
					path.strokeCap = 'round';
					path.strokeColor = $scope.brushColor;
					path.strokeWidth = $scope.brushSize;
					socket.emit('addPath',{ id:user.id,
			 		    p1:event.point,//["point", x, y] p1.x
			 		    p2:tpoint,
						size:path.strokeWidth,
						color:path.strokeColor,
						cap:path.strokeCap,
						flag:1,
						p:tmp});
				}

			}


			view.draw();
		}
		tool.onMouseUp = function(event) {
			// 	if(numPoints==0){
			// 	path.add(tpoint);
			// 	socket.emit('addPoint',{ id:user.id,
			//                          x:tpoint.x,
			// 						 y:tpoint.y });
			// 	view.draw();
			// }
			//canvas_json = project.exportJSON();
			//console.log(canvas_json);
	}

		tool.onMouseDrag = function(event) {
			if($scope.brushMode===2){

			}else{
				path.add(event.point);
				socket.emit('addPoint',{ id:user.id,
			                         x:event.point.x,
									 y:event.point.y });
				view.draw();
			}
		}

		//helper for finding user in array of users (guests)
		function findUser ( arr, id ){
			for ( var i = 0; i < guests.length; ++i ){
				if ( arr[i].id === id )
					return i;
			}
			console.log('error finding user');
			return -1;
		}
			
		//////////////////////////////////////////
		//socket actions
		/////////////////////////////////////////

		socket.on('connect', function() {
			console.log('My id is: ' + user.id);
			socket.emit('addUser', { id : user.id });
			socket.emit('getCanvas',{ id:user.id});

		});

		socket.on('addUser', function(data) {
			console.log('User with id: ' + data.id + ' has logged in');
			guests.push(new User(data.id));
		//	var index = findUser ( guests, data.id );
		//	project.importJSON(canvas_json);
		});
		//Function that grabs an updated canvas_json for specified client
		socket.on('getCanvas', function(data){
			var canvas_json = project.exportJSON();
			socket.emit('returnCanvas', { canvas_json:canvas_json,
										  id : data.id });
		});

		socket.on('returnCanvas', function(data){
			project.importJSON(data.canvas_json);
		});

		socket.on('removeUser', function(data) {
			console.log('User with id: ' + data.id + ' has logged out');
			var index = findUser ( guests, data.id );
			guests.splice(index,1);
		});

		socket.on('addPath', function (data){
			var index = findUser( guests, data.id );
			if ( index > -1 ){
				if(data.flag==0){
					var tmpPath = new Path();
					tmpPath.strokeWidth = data.size;
					tmpPath.strokeCap = data.cap;
					tmpPath.strokeColor = data.color;
					tmpPath.add({x:data.p1[1], y:data.p1[2]});
				}else{//TODO Make lines print for guests
					var tmpPath = new Path.Line({x:data.p2[1], y:data.p2[2]},{x:data.p1[1], y:data.p1[2]});
					console.log(data.p2 + ' ' + data.p1);
					tmpPath.strokeWidth = data.size;
					tmpPath.strokeColor = data.color;
					tmpPath.strokeCap = data.cap;

				}
				guests[index].path = tmpPath;
			//	console.log('path stuff: ' + tmpPath);
				view.draw();

			}
		});

		socket.on('addPoint', function (data){
			var index = findUser( guests, data.id );
			guests[index].path.add({x:data.x, y:data.y});
			view.draw();
		}); 



	}
}

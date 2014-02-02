var net = require('net');

var server = net.createServer(function(c) { //'connection' listener
  	console.log('server connected');
  	c.on('end', function() {
    		console.log('server disconnected');
  	});
	c.on('data', function(data){
		console.log('received: ' + data);
		var h = "id,nome,valor".split(",");
		var v = new String(data).split(",");
		if(v instanceof Array){
			for(i=0; i<v.length; i++){	
				console.log(h[i] + " = " + v[i]);
			}
			console.log("-------------");
		}
		var id = v[0];
		var retVal = "reject";
		if(id%7 == 0){
			retVal = "reject";
		}
		else if(id%3 == 0){
			retVal = "3000";
		}	
		else if(id%2 == 0){
			retVal = "2000";
		}
		else{
			retVal = "1000";
		}
		c.write(retVal + "\n");
	});
  	c.write('hello\r\n');
	c.pipe(c);
});

server.listen(6667, function() { //'listening' listener
  	console.log('server bound');
});


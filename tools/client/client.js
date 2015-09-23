Template.vthings.vthings = function() {
	return Things.find({});
}

var data = [4, 8, 15, 16, 23, 42];

Session.set("data",[
{name: "fighter", value:12}, 
{name: "fighter", value:99}, 
{name: "fighter", value:4}, 
{name: "fighter", value:6}, 
{name: "fighter", value:16}, 
{name: "fighter", value:54} ]);

// Session.set("data",[
// {name: "fighter", value:200}, 
// {name: "fighter", value:50}, 
// {name: "fighter", value:43}, 
// {name: "fighter", value:0}, 
// {name: "fighter", value:25}, 
// {name: "fighter", value:72} ]);

Template.actionTrackers.rendered = function(){

	console.log("actionTrackers.rendered");

	isUpdate = false;

	var width = 420,
	    barHeight = 20, 
	    height = 300, 
	    svg;

    svg = d3.select('#actionTrackers').append('svg')
      .attr('width', width)
      .attr('height', height);

	Tracker.autorun(function(){

		console.log(Session.get("data"));

    // var drawBars = function (update) {
    //   var data = Circles.findOne().data;
    //   var circles = svg.selectAll('circle').data(data);
    //   if (!update) {
    //     circles = circles.enter().append('circle')
    //       .attr('cx', function (d, i) { return x(i); })
    //       .attr('cy', height / 2);
    //   } else {
    //     circles = circles.transition().duration(1000);
    //   }
    //   circles.attr('r', function (d) { return d; });
    // };

		// var x = d3.scale.linear()
		//     .domain([0, d3.max(Session.get("data"))])
		//     .range([0, width]);

		    var x = d3.scale.linear()
		    .domain([0, 200])
		    .range([0, width]);
		    

		 console.log(x);

		// var chart = d3.select(".chart-svg")
		//     .attr("width", width)
		//     .attr("height", barHeight * data.length);

		var bar = svg.selectAll("g")
		    .data(Session.get("data"))

		if (!isUpdate) {
			bar.enter().append("g")
		    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append("rect")
			    .attr("width", function(d) { return x(d.value) })
			    .attr("height", barHeight - 1);

			bar.append("text")
		    .attr("x", function(d) { return x(d.value) - 3; })
		    .attr("y", barHeight / 2)
		    .attr("dy", ".35em")
		    .text(function(d) { return d.value; });
		} else {
      //bar = bar.transition().duration(1000);

   //    bar.select("rect").attr("width", x)
			//     .attr("height", barHeight - 1);

			// bar.select("text")
		 //    .attr("x", function(d) { return x(d) - 3; })
		 //    .attr("y", barHeight / 2)
		 //    .attr("dy", ".35em")
		 //    .text(function(d) { return d; });

		 		bar.select("rect").transition().duration(1000)
		 			.attr("width", function(d) { return x(d.value) })
			    .attr("height", barHeight - 1);


			bar.select("text").transition().duration(1000)
		    .attr("x", function(d) { return x(d.value) - 3; })
		    .attr("y", barHeight / 2)
		    .attr("dy", ".35em")
		    .text(function(d) { return d.value; });
    }

      //circles.attr('r', function (d) { return d; });

		  isUpdate = true;
	});

	Tracker.autorun(function(){

		d3.select("div.chart")
  .selectAll("div")
    .data(Session.get("data"))
  .enter().append("div")
    .style("width", function(d) { return d.value * 10 + "px"; })
    .text(function(d) { return d.value; });
    
	});
	
}

Template.vthings.events({
	'click input.increment' : function() {
		count = Things.find().count();

		Things.insert({name: "thing " + (count + 1)});
	},
	'click input.decrement' : function() {
		count = Things.find().count();
		
		if(count > 0) {
			Things.remove({_id: Things.findOne({name: "thing " + count})['_id']});
		}
	}
});

Template.vthing.circle = function() {
	var id = "a" + this._id;
	var selector_id = "#" + id;

	existing_circles = d3.select("#vthings").selectAll("g");
	console.log("current # of things = " + existing_circles.size());

	x_increment = (500 - 50) / (existing_circles.size() + 2);
	x_next = x_increment + 50;

	Template.vthing._draw_existing(existing_circles, x_next, x_increment);

	x_next = x_next + (x_increment * existing_circles.size());

	circle = d3.select("#vthings").selectAll(selector_id)
	circle_data = circle.data([id]);
	g_container = circle_data.enter()
					.append("g")
					.classed("thing", true)
					.attr("id", function(d) { return d })
					.attr("transform", function(d){
						i = x_next;
						x_next = x_next + x_increment;
						console.log("new circle at x = " + i);
						return "translate("+i+",100)"
					});

		g_container.append("circle")
					.style("stroke", "gray")
					.style("fill", "white")
					.attr("r", 40)
					.on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
					.on("mouseout", function(){d3.select(this).style("fill", "white");});

		g_container.append("text")
					.attr("dx", function(d) { return -20 })
					.text(this.name);
}

Template.vthing._draw_existing = function(existing_circles, x_next, x_increment) {
	existing_circles
			.transition()
			.duration(750)
			.style("stroke", "gray")
			.attr("transform", function(d){
				i = x_next;
				x_next = x_next + x_increment;
				console.log("move existing circle to x = " + i);
				return "translate("+i+",100)"
			});
}

d3.selection.prototype.size = function() {
	var n = 0;
	this.each(function() { ++n; });
	return n;
};

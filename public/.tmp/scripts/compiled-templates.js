Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("Home");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Touren");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Neue Tour");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("Statistik");
  }

  data.buffer.push("<div id=\"wrapper\">\n      \n      <!-- Sidebar -->\n      <div id=\"sidebar-wrapper\">\n        <ul class=\"sidebar-nav\">\n          <li class=\"sidebar-brand\"><a href=\"#\">Start Bootstrap</a></li>\n          <li class=\"active\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "home", options) : helperMissing.call(depth0, "linkTo", "home", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n          <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "tours", options) : helperMissing.call(depth0, "linkTo", "tours", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n          <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "tour.new", options) : helperMissing.call(depth0, "linkTo", "tour.new", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n          <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "statistics", options) : helperMissing.call(depth0, "linkTo", "statistics", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n        </ul>\n      </div>          \n      <!-- Page content -->\n      <div id=\"page-content-wrapper\">\n        <div class=\"content-header\">\n          <h1>\n            <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\">n</i></a>\n            Simple Sidebar\n          </h1>\n        </div>\n        <!-- Keep all page content within the page-content inset div! -->\n        <div class=\"page-content inset\">\n           ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </div>\n      </div>     \n    </div>\n    <!-- Custom JavaScript for the Menu Toggle -->\n    <script>\n      $(\"#menu-toggle\").click(function(e) {\n          e.preventDefault();\n          $(\"#wrapper\").toggleClass(\"active\");\n      });\n    </script>\n</div><!-- /.container -->");
  return buffer;
  
});

Ember.TEMPLATES["home"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        	<tr>\n        		<td>#</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.date", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.totalKm", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.totalTime", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n  			</tr>\n  			");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        	<tr>\n        		<td>#</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.date", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.time", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n  			</tr>\n  			");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        	<tr>\n        		<td>#</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.date", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.speed", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n  			</tr>\n  			");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        	<tr>\n        		<td>#</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.date", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n	  			<td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.totalKm", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n  			</tr>\n  			");
  return buffer;
  }

  data.buffer.push("<h1>Home</h1>\n<div class=\"row\">\n  <div class=\"col-6 col-sm-6 col-lg-6\">\n  	<h4>Letzten Touren:</h4>\n  	<table class=\"table table-hover\">\n  		<thead>\n  			<tr>\n	          	<th>#</th>  \n	            <th>Datum</th>  \n	            <th>Kilometer</th>  \n	            <th>Gesamtzeit</th>  \n          	</tr>  \n        </thead>  \n        <tbody>\n        	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tour", "in", "recentTours", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  		</tbody>\n  	</table>\n  	<h4>Beste Zeit bei 20km:</h4>\n  	<table class=\"table table-hover\">\n  		<thead>\n  			<tr>\n	          	<th>#</th>  \n	            <th>Datum</th>  \n	            <th>Zeit</th>  \n          	</tr>  \n        </thead>  \n        <tbody>\n        	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tour", "in", "topTime20", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  		</tbody>\n  	</table>\n  	<h4>Beste Durchschnitte:</h4>\n  	<table class=\"table table-hover\">\n  		<thead>\n  			<tr>\n	          	<th>#</th>  \n	            <th>Datum</th>  \n	            <th>Durchschnitt</th>  \n          	</tr>  \n        </thead>  \n        <tbody>\n        	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tour", "in", "topAvgSpeed", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  		</tbody>\n  	</table>\n  </div> <!-- /.col-6-->\n  <div class=\"col-6 col-sm-6 col-lg-6\">\n  	<h4>Meisten Gesamtkilometer:</h4>\n  	<table class=\"table table-hover\">\n  		<thead>\n  			<tr>\n	          	<th>#</th>  \n	            <th>Datum</th>  \n	            <th>Kilometer</th>  \n          	</tr>  \n        </thead>  \n        <tbody>\n        	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tour", "in", "topTotalKm", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  		</tbody>\n  	</table>\n  	<h4>Beste Zeit bei 30km::</h4>\n  	<table class=\"table table-hover\">\n  		<thead>\n  			<tr>\n	          	<th>#</th>  \n	            <th>Datum</th>  \n	            <th>Zeit</th>  \n          	</tr>  \n        </thead>  \n        <tbody>\n        	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tour", "in", "topTime30", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  		</tbody>\n  	</table>\n  	<h4>Beste Höchstgeschwindigkeit:</h4>\n  	<table class=\"table table-hover\">\n  		<thead>\n  			<tr>\n	          	<th>#</th>  \n	            <th>Datum</th>  \n	            <th>Kilometer</th>  \n          	</tr>  \n        </thead>  \n        <tbody>\n        	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tour", "in", "topTopSpeed", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  		</tbody>\n  	</table>\n  </div><!-- /.col-6-->\n</div><!-- /.row-->");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"well\">\n  Welcome to Yeoman and Ember.js!\n</div>\n");
  
});

Ember.TEMPLATES["statistics"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>\n	<h2>Statistiken zu allen gespeicherten Touren</h2>\n	<div class=\"row\">\n		<div id=\"totalTracks\" style=\"{text-align: center}\">\n			<h4>Verlauf gefahrerner Kilometer</h4>\n			<canvas id=\"totalTracksChart\" width=\"800\" height=\"400\"></canvas>\n		</div>\n	</div><!-- /.row -->\n	<div class=\"row\">\n		<div id=\"averageSpeeds\">\n			<h4>Verlauf Durchschnittsgeschwindigkeit</h4>\n			<canvas id=\"averageSpeedsChart\" width=\"800\" height=\"400\"></canvas>\n		</div>\n	</div><!-- /.row -->\n	<div class=\"row\">\n		<div id=\"topSpeeds\">\n			<h4>Verlauf Höchstgeschwindigkeit</h4>\n			<canvas id=\"topSpeedsChart\" width=\"800\" height=\"400\"></canvas>\n		</div>\n	</div><!-- /.row -->\n</div>\n\n<script type=\"text/javascript\">\n	var data = {\n		labels : [\"January\",\"February\",\"March\",\"April\",\"May\",\"June\",\"July\"],\n		datasets : [\n			{\n				fillColor : \"rgba(220,220,220,0.5)\",\n				strokeColor : \"rgba(220,220,220,1)\",\n				pointColor : \"rgba(220,220,220,1)\",\n				pointStrokeColor : \"#fff\",\n				data : [65,59,90,81,56,55,40]\n			},\n			{\n				fillColor : \"rgba(151,187,205,0.5)\",\n				strokeColor : \"rgba(151,187,205,1)\",\n				pointColor : \"rgba(151,187,205,1)\",\n				pointStrokeColor : \"#fff\",\n				data : [28,48,40,19,96,27,100]\n			}\n		]\n	}\n\n	//Get context with jQuery - using jQuery's .get() method.\n	var totalTracksChart = $(\"#totalTracksChart\").get(0);\n	var ctx = totalTracksChart.getContext(\"2d\");\n	//This will get the first returned node in the jQuery collection.\n	var myNewChart = new Chart(ctx).Line(data);\n\n	//Get context with jQuery - using jQuery's .get() method.\n	var averageSpeedsChart = $(\"#averageSpeedsChart\").get(0);\n	ctx = averageSpeedsChart.getContext(\"2d\");\n	//This will get the first returned node in the jQuery collection.\n	var myNewChart = new Chart(ctx).Line(data);\n\n	//Get context with jQuery - using jQuery's .get() method.\n	var topSpeedsChart = $(\"#topSpeedsChart\").get(0);\n	ctx = topSpeedsChart.getContext(\"2d\");\n	//This will get the first returned node in the jQuery collection.\n	var myNewChart = new Chart(ctx).Line(data); \n\n</script>");
  
});

Ember.TEMPLATES["tour"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>hilfe</h1>");
  
});

Ember.TEMPLATES["tour/new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"formContainer\">\n	<div id=\"msgContainer\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "EmberApp.MessageView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n	<form ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		<div class=\"row\">\n			<div class=\"col-xs-6\">\n				<div class=\"form-group\">\n					 <label for=\"totalKm\">Strecke gesamt [km]:</label>\n					");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("totalKm"),
    'id': ("totalKm"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n					<label for=\"avgSpeed\"> Avg. Geschwindigket</label>\n					");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("avgSpeed"),
    'id': ("avgSpeed"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n					<label for=\"topSpeed\"> Top. Geschwindigket</label>\n					");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("topSpeed"),
    'id': ("topSpeed"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n			</div><!-- /.col-xs-6 -->\n			<div class=\"col-xs-6\">\n				<div class=\"form-group\">\n					<label for=\"totalTime\">Zeit gesamt:</label>\n					");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("totalTime"),
    'id': ("totalTime"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n					<label for=\"time20\">Zeit bei 20km:</label>\n					");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("time20"),
    'id': ("time20"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n					<label for=\"time30\">Zeit bei 30km:</label>\n					");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("time30"),
    'id': ("time30"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n			</div><!-- /.col-xs-6 -->\n		</div><!-- /.row -->\n		<div class=\"row\">\n		 	<div class=\"col-xs-6\">\n				<div class=\"form-group\">\n				    <label for=\"condition\">Bedingungen:</label>\n				    ");
  hashContexts = {'contentBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'contentBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("EmberApp.weatherCondition"),
    'id': ("condition"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n				    <label for=\"temperature\">Temperatur:</label>\n				    ");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("temperature"),
    'id': ("temperature"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div id=\"weatherContainer\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "EmberApp.WeatherView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n			</div><!-- /.col-xs-6 -->\n			<div class=\"col-xs-6\">\n				<div class=\"form-group\">\n				    <label for=\"windDirection\">Windrichtung:</label>\n				    ");
  hashContexts = {'contentBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'contentBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("EmberApp.windDirection"),
    'id': ("windDirection"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n				    <label for=\"windSpeed\">Windgeschwindigkeit:</label>\n				    ");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("windSpeed"),
    'id': ("windSpeed"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n				    <label for=\"windStrength\">Windstärke:</label>\n				    ");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("windStrength"),
    'id': ("windStrength"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n				<div class=\"form-group\">\n				    <label for=\"windBlasts\">Böen:</label>\n				    ");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("windBlasts"),
    'id': ("windBlasts"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n			</div><!-- /.col-xs-6 -->\n		</div><!-- /.row -->\n		<div class=\"row\">\n			<div class=\"col-xs-12 col-md-12\">\n				<div class=\"form-group\">\n				    <label for=\"description\">Beschreibung der Strecke</label>\n				    ");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("description"),
    'id': ("description"),
    'class': ("form-control"),
    'placeholder': ("Wegpunkte...")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n				</div>\n			</div><!-- /.col-md-8-->\n		</div><!-- /.row -->\n		<div><button id=\"saveTourBtn\" type=\"submit\" class=\"btn btn-default\">Tour speichern</button></div>\n	</form>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["tours"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n		");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("list-group-item")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "tour.details", "", options) : helperMissing.call(depth0, "linkTo", "tour.details", "", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n	");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n			<h4 class=\"list-group-item-heading\"> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" : Name</h4>\n			<p class=\"list-group-item-text\"> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tour.id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" : ID</p>\n		");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\n	<div>\n		<form class=\"form-inline\">\n    		");
  hashContexts = {'contentBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'contentBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("EmberApp.weatherCondition"),
    'id': ("year"),
    'class': ("input-small")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    	   	");
  hashContexts = {'contentBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'contentBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'contentBinding': ("EmberApp.weatherCondition"),
    'id': ("month"),
    'class': ("input-small")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		    <button type=\"submit\" class=\"btn\">Sign in</button>\n		</form>\n	</div>\n\n	<h2>Touren2</h2>\n	<div class=\"list-group\">\n	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tour", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</div> <!-- /.list-group -->\n</div> <!-- /.container -->\n");
  return buffer;
  
});

Ember.TEMPLATES["views/message_view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" \n    <div class=\"messageWrapper\">\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.success", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div><!-- /.messageWrapper -->\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"success\">\n    	   <p>Eintrag wurde erfolgreich gespeichert.</p>\n    	   <button type=\"button\" class=\"btn btn-default btn-xs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideMsgView", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    	       <span class=\"glyphicon glyphicon-remove\"></span>\n    	    </button>\n        </div><!-- /.success -->\n        ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"error\">\n    	   <p>Eintrag konnte nicht gespeichert werden.<span class=\"errorMessage\"> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.errMsg", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></p>\n    	   <button type=\"button\" class=\"btn btn-default btn-xs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideMsgView", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    	   	   <span class=\"glyphicon glyphicon-remove\"></span>\n    	   </button>\n        </div><!-- /.error -->\n        ");
  return buffer;
  }

  data.buffer.push("<div id=\"messageView\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("visible::hidden")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "controller.visible", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</div><!-- /#messageview -->");
  return buffer;
  
});

Ember.TEMPLATES["views/weather_view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" \n				<li>min. : <span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.temperature.tempMin", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></li>\n				");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" \n				<li>max. : <span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.temperature.tempMax", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></li>\n				");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" \n					<li>Böen: <span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.wind.gust", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></li>\n				");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" \n      			<div class=\"row group\">\n	      			<div class=\"col-xs-6 col-md-4\">\n	      				<p class=\"settingCategory\">Verfügbare Orte:</p>\n	      			</div><!-- /.col-xs-6 col-md-4 -->\n	      			<div class=\"col-xs-12 col-md-8\" id=\"cityList\">\n	      				");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "city", "in", "controller.savedCities", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					</div> <!-- /.col-xs-12 col-md-8 -->\n      			</div> <!-- /.row -->\n      			");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n	      				<div class=\"input-group list\">\n	      					<span class=\"input-group-addon\">\n	        					<input type=\"radio\" name=\"weatherCity\" ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "STRING"};
  options = {hash:{
    'value': ("city.id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n	      					</span>\n	      					<input type=\"text\" class=\"form-control\" ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "STRING"};
  options = {hash:{
    'value': ("city.name")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n	      					<span class=\"input-group-btn\">\n        						<button class=\"btn btn-default\" type=\"button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeCity", "city.id", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        							<span class=\"glyphicon glyphicon-remove\"></span>\n        						</button>\n      						</span>\n      					</div><!-- /.input-group -->\n	      				");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" \n		      			<div class=\"list-group\">\n			      			");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "city", "in", "controller.searchedCities", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		      			</div><!-- /.list-group -->\n		      			");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n		      				<div class=\"input-group list\">\n		      					<input type=\"text\" class=\"form-control\" ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "STRING"};
  options = {hash:{
    'value': ("city.fullName")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n	      						<span class=\"input-group-btn\">\n    								<button class=\"btn btn-default\" type=\"button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addCity", "city.id", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    									<span class=\"glyphicon glyphicon-plus\"></span>\n    								</button>\n  								</span><!-- /input-group-btn -->\n      						</div><!-- /input-group -->\n	      					");
  return buffer;
  }

  data.buffer.push("<div id=\"weatherView\">\n	<div id=\"weatherTitleContainer\">\n		<p>Aktuelles Wetter von <span class=\"cityName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></p>\n		<button type=\"button\" id=\"settingsBtn\" class=\"btn btn-default btn-xs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showSettings", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    	   	<span class=\"glyphicon glyphicon-cog\"></span>\n    	</button>\n    	<button type=\"button\" id=\"refreshBtn\" class=\"btn btn-default btn-xs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "refresh", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    	   	<span class=\"glyphicon glyphicon-refresh\"></span>\n    	</button>\n	</div><!-- /#weatherTitleContainer -->\n	<div class=\"clear\"></div> \n	<div id=\"weatherLoader\" class=\"loader\"></div>\n	<div id=\"weatherContent\" class=\"row\">\n		<div class=\"col-xs-6 col-md-4 weatherIconContainer\">\n			<i ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("controller.icon")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></i>\n			<p>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n		</div>\n		<div class=\"col-xs-6 col-md-4 weatherDataContainer\">\n			<ul>\n				<li>Temperatur</li>\n				<li>aktuell: <span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.temperature.temp", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></li>\n				");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "controller.weather.temperature.tempMin", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n				");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "controller.weather.temperature.tempMax", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n			</ul>\n		</div>\n		<div class=\"col-xs-6 col-md-4 weatherDataContainer\">\n			<ul>\n				<li>Wind</li>\n				<li>Geschw.: <span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.wind.speed", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></li>\n				");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "controller.weather.wind.gust", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n				<li>Richtung: <span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.weather.wind.direction", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n			</ul>\n		</div>\n	</div><!-- /.row -->\n</div><!-- /#weatherView -->\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"weatherSettingsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n 	<div class=\"modal-dialog\">\n    	<div class=\"modal-content\">\n      		<div class=\"modal-header\">\n        		<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        		<h4 class=\"modal-title\" id=\"myModalLabel\">Wetter - Einstellungen</h4>\n      		</div><!-- /.modal-header -->\n      		<div class=\"modal-body\">\n      			<div class=\"row group\">\n	      			<div class=\"col-xs-6 col-md-4\">\n	      				<p class=\"settingCategory\">Aktueller Ort:</p>\n	      			</div><!-- /.col-xs-6 col-md-4 -->\n	      			<div class=\"col-xs-12 col-md-8\">\n	      				<p class=\"currentCity\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.currentCity.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n					</div><!-- /.col-xs-12 col-md-8\" -->\n	      		</div> <!-- /.row -->\n	      		");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "controller.savedCities", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      			<div class=\"row group\">\n	      			<div class=\"col-xs-6 col-md-4\">\n	      				<p class=\"settingCategory\">Suche Ort:</p>\n	      			</div><!-- /col-xs-6 col-md-4 -->\n	      			<div class=\"col-xs-12 col-md-8\">\n	      				<div id=\"searchField\" class=\"input-group\">\n				      		<input class=\"form-control\" type=\"text\" id=\"searchCityTextField\" placeholder=\"Ort eingbenen...\">\n				      		<span class=\"input-group-btn\">	\n				        		<button type=\"button\" class=\"btn btn-default\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "search", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n	      							<span class=\"glyphicon glyphicon-refresh\"></span>\n	      						</button>\n				      		</span><!-- /input-group-btn -->\n				    	</div><!-- /input-group -->\n			    		\n				    	<div id=\"settingsLoader\" class=\"loader\"></div> \n				    	");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "controller.searchedCities", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		      		</div><!-- /col-xs-12 col-md-8 -->\n				</div><!-- /.row -->\n      		</div><!-- /.modal-body -->\n      		<div class=\"modal-footer\">\n        		<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Schließen</button>\n    		</div><!-- /.modal-footer -->\n		</div><!-- /.modal-content -->\n  	</div><!-- /.modal-dialog -->\n</div><!-- /.modal -->	");
  return buffer;
  
});
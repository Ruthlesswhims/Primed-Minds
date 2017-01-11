// Scripts for validating equation input and hitting objects -->

$(function() {

  var numerator = document.getElementById('numerator');
  numerator.onchange = function() {
      updateValue(this.value, 'slope_text');
  };

  var denom = document.getElementById('denominator');
  denom.onchange = function() {
      updateValue(this.value, 'slope_text');
  };

  var slope_slider = document.getElementById('slope_slider');
  slope_slider.oninput = function() {
    updateValue(this.value, 'slope_slider');
  }

  var render = document.getElementById('renderButton'); 
  render.onclick = function() {
    outputUpdate();
  }

  var reset = document.getElementById('resetCurrent');
  reset.onclick = function() { 
    resetCurrent();
  }

  var nextConfig = document.getElementById('nextConfig');
  nextConfig.onclick = function() {
    nextConfig();
  }

  // static values 
  var INVALID_VALUE = 20; 
  var INITIAL_ROTATION = 45;
  var CANVAS_SIZE = 400;
  var NUM_CONFIGS = 8;
  var NUM_HITTABLES = 8; 

  // variables that change throughout run
  var currentConfig = 0;

  // initialize 
  document.getElementById("myCanvas").height = CANVAS_SIZE;
  document.getElementById("myCanvas").width = CANVAS_SIZE;

  for(var i=0; i<NUM_HITTABLES; i++) {
    document.getElementById("graph").innerHTML += 
      '<div class="hittable" id="img' + i + '"><img src="assets/graphing/banana.png" width="40px"/></div>'; 
  }

  renderCurrentConfig();

  // This function validates if entries are between -10 and 10
  function validate() {
      var value, text, pass;
  
      var num = parseFloat(document.getElementById("numerator").value);
      var den = parseFloat(document.getElementById("denominator").value);
      value = num/den; 
      if (value < 0 || value > 10) {
          text = "Please enter values between 0 and 10";
          value = INVALID_VALUE; // represents non-pass
      }
      else {
          text = "";
      }
      document.getElementById("error-text").innerHTML = text;
      return value;
  }

  // Updates the slider value when the text value is changed for the input named 'id'
  function updateValue(val, id) {
      var value = validate();
      if (id == "slope_text") {
        if(value != INVALID_VALUE) {
          document.getElementById('slope_slider').value = parseFloat(value);
        }
      } else if (id == 'slope_slider') {
        findSmallestFraction(val);
      }

      if(value != INVALID_VALUE) {
        turnSatellite(value);
      }
    }

    function findSmallestFraction(val) {
      var numerator = val*10; 
      var denom = 10; 
      var divisor = 0;
      while (divisor != 1) {
        if (numerator%10 == 0 && denom%10 == 0) {
          divisor = 10;
        } else if (numerator%5 == 0 && denom%5 == 0) {
          divisor = 5;
        } else if (numerator%2 == 0 && denom%2 == 0) {
          divisor = 2;
        } else {
          divisor = 1; // signals end
        }
        numerator /= divisor;
        denom /= divisor;
      }
      document.getElementById('numerator').value = numerator;
      document.getElementById('denominator').value = denom;
    }


    // Called when "Fire" is clicked
    function outputUpdate() {
      var num = parseFloat(validate());

      if (num == INVALID_VALUE) {
        document.getElementById("error-text").innerHTML = "cannot fire - slope must be between 0 and 10";
        return;
      }

      document.getElementById("slope-text").innerHTML = "Slope is " + num;

      var positiveslope;
      if (num > 0) {
        positiveslope = true;
      } else {
        positiveslope = false;
      }
      myGraph.clearPath();
      drawEquation(num, positiveslope);
    }

    function turnSatellite(slope) {
      var angle = Math.atan(slope); // returns angle IN RADIANS between -pi/2 and pi/2
      // convert to degrees
      angle = angle * 180 / Math.PI;
      angle -= INITIAL_ROTATION; 
      angle *= -1; 
      console.log('angle is ', angle);
      var sat = document.getElementById("satellite");
      sat.style.webkitTransform = "rotate(" + angle + "deg)"; 
    }

    function checkHits(x, y) {
        var slope = parseFloat(document.querySelector('#slope_slider').value);
        var text = "";
        for(var i=0; i<objects.length; i++) {
          if (x == objects[i].x && y == objects[i].y) {
            // at given x, does y = 10? 
            objects[i].hit = true;
            text += "You hit object #" + (i+1) + "! ";
            document.getElementById('img' + i).style.WebkitAnimationName = "fall";
          }
          document.getElementById("error-text").innerHTML = text;
        }
    }

    function nextConfig() {
      myGraph.clearPath();
      clearHits();
      currentConfig = (currentConfig+1)%NUM_CONFIGS;
      renderCurrentConfig();
    }

    function resetCurrent() {
      myGraph.clearPath();
      clearHits();
      renderCurrentConfig();
    }

    function clearHits() {
      for(var i=0; i<objects.length; i++) {
        objects[i].hit = false;
      }
      for(var i=0; i<4; i++) {
          document.getElementById('img' + i).style.WebkitAnimationName = "";
      }
    }

    function renderCurrentConfig() {
      switch(currentConfig) {
        case 0:
          // Update the objects variable
          objects = [{x: 1/2, y: 1.0}, 
                     {x: 1.0, y: 1.0}];
          break;  

        case 1: 
          objects = [{x: 1.0, y: 1/3}, 
                     {x: 1.0, y: 2/3},
                     {x: 1.0, y: 1.0}];
          break;
        case 2:
          objects = [{x: 1/3, y: 1.0}, 
                     {x: 2/3, y: 1.0}, 
                     {x: 1.0, y: 1.0},
                     {x: 1.0, y: 1/2}];
          break; 

        case 3:
          objects = [{x: 1/2, y: 1.0  }, 
                     {x: 1.0, y: 1/3}, 
                     {x: 1.0, y: 2/3},
                     {x: 1.0, y: 1.0}];
          break; 


        case 4:
          objects = [{x: 1/5, y: 1.0}, 
                     {x: 2/5, y: 1.0}, 
                     {x: 3/5, y: 1.0},
                     {x: 4/5, y: 1.0},
                     {x: 1.0, y: 1.0},
                     {x: 1.0, y: 1/4},
                     {x: 1.0, y: 1/2},
                     {x: 1.0, y: 3/4}];
          break; 

        case 5:
          objects = [{x: 1/4, y: 1.0}, 
                     {x: 1/2, y: 1.0}, 
                     {x: 3/4, y: 1.0},
                     {x: 1.0, y: 1/5},
                     {x: 1.0, y: 2/5},
                     {x: 1.0, y: 3/5},
                     {x: 1.0, y: 4/5},
                     {x: 1.0, y: 1.0}];
          break; 

        case 6:
          objects = [{x: 2/7, y: 1.0}, 
                     {x: 5/7, y: 1.0}, 
                     {x: 1.0, y: 1.0},
                     {x: 1.0, y: 3/10}];
          break; 

        case 7: 
          objects = [{x: 1/2, y: 1.0}, 
                     {x: 1.0, y: 1.0},
                     {x: 1.0, y: 1/2}];
          break;  

        default: // if none of the above cases
          console.log("Could not find configuration #" + currentConfig);
          console.log("Resetting");
          currentConfig = 0;
          // Call function to actually display config
          renderCurrentConfig();
          break; 
      } // end switch 

      // set all hits to false
      for (i=0; i<objects.length; i++) {
        objects[i].hit = false; 
      }

      renderConfigImages();  
    }

    function renderConfigImages() {
      for (var i=0; i<objects.length; i++) {
        var el = document.getElementById('img' + i); 
        el.style.paddingLeft = (objects[i].x * CANVAS_SIZE) + "px"; 
        el.style.top = (CANVAS_SIZE - (CANVAS_SIZE)*objects[i].y) + "px";
        el.style.display = "inline"; 
      }
      // hide all other images
      for (var i=objects.length; i<NUM_HITTABLES; i++) {
        var el = document.getElementById('img' + i); 
        el.style.display = "none";
      }
    }

    function Graph(config) {
        // user defined properties
        this.canvas = document.getElementById(config.canvasId);
        this.minX = config.minX;
        this.minY = config.minY;
        this.maxX = config.maxX;
        this.maxY = config.maxY;
        this.unitsPerTick = config.unitsPerTick;

        // constants
        this.axisColor = '#aaa';
        this.font = '8pt Calibri';
        this.tickSize = 20;

        // relationships
        this.context = this.canvas.getContext('2d');
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = this.canvas.width / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = this.canvas.width / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;

        // draw x and y axis
        this.drawXAxis();
        this.drawYAxis();
      }

      // Note this is currently a workaround as it has to redraw the x and y axis every time
      // Should look for a way to clear graph without having to redraw axes
      Graph.prototype.clearPath = function() {
        var context = this.context;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // context.restore();
        // this.transformContext();
        this.drawXAxis();
        this.drawYAxis();
        context.moveTo(0, CANVAS_SIZE); 

      }

      Graph.prototype.drawXAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo(this.canvas.width, this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        var xPosIncrement = this.unitsPerTick * this.unitX;
        var xPos, unit;
        context.font = this.font;
        context.textAlign = 'center';
        context.textBaseline = 'top';

        // draw left tick marks
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while(xPos > 0) {
          context.moveTo(xPos, this.centerY - this.tickSize / 2);
          context.lineTo(xPos, this.centerY + this.tickSize / 2);
          context.stroke();
          context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
          unit -= this.unitsPerTick;
          xPos = Math.round(xPos - xPosIncrement);
        }

        // draw right tick marks
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while(xPos < this.canvas.width) {
          context.moveTo(xPos, this.centerY - this.tickSize / 2);
          context.lineTo(xPos, this.centerY + this.tickSize / 2);
          context.stroke();
          context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
          unit += this.unitsPerTick;
          xPos = Math.round(xPos + xPosIncrement);
        }
        context.restore();
      };

      Graph.prototype.drawYAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 0);
        context.lineTo(this.centerX, this.canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        var yPosIncrement = this.unitsPerTick * this.unitY;
        var yPos, unit;
        context.font = this.font;
        context.textAlign = 'right';
        context.textBaseline = 'middle';

        // draw top tick marks
        yPos = this.centerY - yPosIncrement;
        unit = this.unitsPerTick;
        while(yPos > 0) {
          context.moveTo(this.centerX - this.tickSize / 2, yPos);
          context.lineTo(this.centerX + this.tickSize / 2, yPos);
          context.stroke();
          context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
          unit += this.unitsPerTick;
          yPos = Math.round(yPos - yPosIncrement);
        }

        // draw bottom tick marks
        yPos = this.centerY + yPosIncrement;
        unit = -1 * this.unitsPerTick;
        while(yPos < this.canvas.height) {
          context.moveTo(this.centerX - this.tickSize / 2, yPos);
          context.lineTo(this.centerX + this.tickSize / 2, yPos);
          context.stroke();
          context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
          unit -= this.unitsPerTick;
          yPos = Math.round(yPos + yPosIncrement);
        }
        context.restore();
      };


      var myGraph = new Graph({
        canvasId: 'myCanvas',
        minX: 0,
        minY: -1,
        maxX: 1,
        maxY: 0,
        unitsPerTick: 1
      });

      // variable to hold how many frames have elapsed in the animation
      var t;
      var vertices;
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      var points; 
      var hits; 

      function drawEquation(slope, positiveSlope) {
        var context = myGraph.context;
        context.save();

        // IMPORTANT!!!!  
        // Have to keep these resets *HERE* so that firing a second round or clearing graph works properly
        t = 1;
        vertices = [];
        hits = 0;
        context.moveTo(0, CANVAS_SIZE); 

        // Find list of vertices 
        vertices.push({x: 0, y: 0});

        var i=0; var end = false;  
        var y=0; var x = 0; 
        while (i<100 && !end) {
          // y = slope*x 
          // x = y/slope 
          // option A: next vertex is at a y=1 point
          y_a = Math.floor(y) + 1;
          x_a = y_a/slope;

          // option B: next vertex is at x=1 point
          x_b = Math.floor(x) + 1;
          y_b = x_b*slope; 

          // find which x comes first 
          if (x_a < x_b) {
            x = x_a; 
            y=y_a;
            x_vertex = x_a - Math.floor(x_a);
            vertices.push({x: x_vertex, y: 1})
            vertices.push({x: x_vertex, y: 0})
            console.log('vertex at A: ', x_vertex, 1);
          } else if (x_a > x_b) {
            x = x_b; 
            y=y_b;
            y_vertex = y_b - Math.floor(y_b);
            vertices.push({x: 1, y: y_vertex});
            vertices.push({x: 0, y: y_vertex});
            console.log('vertex at B: ', 1, y_vertex);
          } else {
            // x_a and x_b are the same, meaning this is a vertex at 1,1
            var end = true; 
            console.log('end with vertex at 1, 1');
            vertices.push({x: 1, y: 1});
          }
          i++;
        } // end while 

        // calculate incremental points along the path
        points = calcWaypoints(vertices);
        console.log('points length: ' + points.length);
        // extend the line from start to finish with animation
        animate();
      }

      // calc waypoints traveling along vertices
      function calcWaypoints(vertices) {
            var waypoints = [];
            for (var i = 1; i < vertices.length; i+=2) {
                var pt0 = (vertices[i-1].x)*CANVAS_SIZE;
                var pt1 = (vertices[i].x)*CANVAS_SIZE;
                var dx = pt1 - pt0;
                var y0 = CANVAS_SIZE - (vertices[i-1].y)*CANVAS_SIZE; 
                var y1 = CANVAS_SIZE - (vertices[i].y)*CANVAS_SIZE;
                var dy = y1 - y0;
                for (var j = 0; j < 100; j++) {
                    var x = pt0 + dx * j / 100;
                    var y = y0 + dy * j / 100;
                    // var ver is later used to check if an object is hit at this vertex
                    // as it can only be hit when j==99 (a top waypoint), set ver=-1 to indicate
                    // that this waypoint is not a vertex
                    var ver = {x: -1, y:-1}; 
                    if (j==99) {
                      // since this waypoint is a vertex, set ver
                      ver = {x: vertices[i].x, y: vertices[i].y}; 
                    } 
                    // "ignore" (aka do not draw) the last and first point to avoid drawing vertical lines
                    // points with ignore=true use context.moveTo instead of context.lineTo
                    var ignore = false; 
                    if (j==0 || j==99) {
                      ignore = true;
                    }

                    waypoints.push({
                        x: x, // the x coordinate on the graph
                        y: y, // the y coordinate on the graph
                        ignore: ignore, // if waypoint should NOT be drawn to 
                        hit: ver, // the specific vertex point, used to check if object is hit
                    });
                }
                waypoints.push({x: pt1, y: 0, ignore: true, hit: {x: -1, y:-1}});
            } 
            return (waypoints);
      }

      function animate() {
        if (t < points.length - 1) {
            requestAnimationFrame(animate);
        } 
        // draw a line segment from the last waypoint
        // to the current waypoint
          ctx.beginPath();
          ctx.moveTo(points[t - 1].x, points[t - 1].y);
          // ignore the two endpoints two avoid creating connecting vertical line
          if (!points[t].ignore) {
            ctx.lineTo(points[t].x, points[t].y);
            ctx.stroke(); 
          } else {
            // if at one of the endpoints, simply moveTo and do not stroke to avoid vertical line
            ctx.moveTo(points[t].x, points[t].y);
            // at this point, also check if object is hit
            if (points[t].hit.x != -1) {
              checkHits(points[t].hit.x, points[t].hit.y);
            }
          }
        // increment "t" to get the next waypoint
        t++;
      }

      Graph.prototype.transformContext = function() {
        var context = this.context;

        // move context to center of canvas
        this.context.translate(this.centerX, this.centerY);

        /*
         * stretch grid to fit the canvas window, and
         * invert the y scale so that that increments
         * as you move upwards
         */
        context.scale(this.scaleX, -this.scaleY);
      };
});
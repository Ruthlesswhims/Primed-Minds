var hit = false,llc1=false,llc2=false;
var t,p,w=0,firstTime,canMove;
var poly1V=[],poly2V=[],poly3V=[],poly4V=[],poly5V=[],poly6V=[],poly7V=[];
var poly1,poly2,poly3,poly4,poly5,poly6,poly7;

var polyb1,polyb2,polyb3,polyb4,polyb5,polyb6,polyb7,polybs,w;
var polyb1V=[],polyb2V=[],polyb3V=[],polyb4V=[],polyb5V=[],polyb6V=[],polyb7V=[];

var dot,Xc=[],Yc=[];
var bc='green';
var bridgeLife=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
//bridgeLife[has entered from one side][has entered from second side][had entered from one side][had entered from second side][the bridge cannot be walked];
var dotX=-1,dotY=-1;
function preload(){
	dot=loadImage('assets/bridges/WalkingMonster1.png');
}
function setup() {
    createCanvas(600,291);
    collideDebug(false);
	t=0;
  p=0;
  firstTime=1;
  canMove=1;

  image(dot, 50, 50);

  poly1=[[0,112],[0,112],[6,113],[21,116],[40,116],[50,109],[70,93],[86,76],[103,68],[120,66],[137,66],[141,77],[142,93],[141,105],[128,108],[112,115],[103,123],[94,141],[91,161],[98,179],[114,193],[139,201],[138,216],[136,231],[133,243],[116,242],[85,231],[70,218],[42,182],[23,175],[0,174],[0,143]];
  poly2=[[165,66],[165,66],[196,71],[216,69],[246,64],[269,63],[267,87],[263,107],[236,109],[195,109],[167,107],[164,87]];
  poly3=[[167,204],[167,204],[197,209],[230,211],[259,209],[267,228],[272,246],[241,252],[208,250],[183,250],[157,245]];
  poly4=[[296,66],[296,66],[317,75],[332,86],[341,92],[354,95],[426,95],[454,92],[458,108],[458,127],[429,126],[397,135],[377,152],[358,152],[336,148],[331,132],[311,114],[288,107],[290,86]];
  poly5=[[285,204],[285,204],[298,199],[314,190],[328,175],[353,174],[379,175],[392,190],[412,196],[451,200],[485,198],[486,219],[482,239],[460,239],[428,227],[388,220],[353,220],[332,224],[298,240],[288,222]];
  poly6=[[483,85],[483,85],[506,76],[532,64],[559,56],[600,54],[600,93],[572,95],[540,109],[511,120],[484,129],[480,107]];
  poly7=[[513,195],[513,195],[534,191],[556,191],[581,193],[600,197],[600,243],[578,244],[546,245],[509,244],[508,219]];

  polyb1=[[137,66],[137,66],[141,77],[142,93],[141,105],[167,107],[164,87],[165,66]];
  polyb2=[[269,63],[269,63],[296,66],[290,86],[288,107],[263,107],[267,87]];
  polyb3=[[454,92],[454,92],[483,85],[480,107],[484,129],[458,127],[458,108]];
  polyb4=[[485,198],[485,198],[513,195],[508,219],[509,244],[482,239],[486,219],[485,198]];
  polyb5=[[259,209],[259,209],[285,204],[298,240],[272,246],[267,228],[259,209]];
  polyb6=[[139,201],[136,231],[133,243],[157,245],[167,204]];
  polyb7=[[336,148],[336,148],[358,152],[377,152],[379,175],[353,174],[328,175]];

  polybs=[polyb1,polyb2,polyb3,polyb4,polyb5,polyb6,polyb7];
  
  w=[0,0,0,0,0,0,0];

  init();
 polybsV=[polyb1V,polyb2V,polyb3V,polyb4V,polyb5V,polyb6V,polyb7V];
}
function draw() {
    
 
}
function mouseDragged(){
	
		if(p==0){
			drawPath();
		}
		
	
	
}
function mousePressed() {
	t=0;
  	p=0;
	if(isInside([mouseX,mouseY],poly1) || isInside([mouseX,mouseY],poly2) || isInside([mouseX,mouseY],poly3) || isInside([mouseX,mouseY],poly4)||isInside([mouseX,mouseY],poly5)||isInside([mouseX,mouseY],poly6)||isInside([mouseX,mouseY],poly7)){
		p=1;
	}
	for(var i=0;i<w.length;i++){
		if(w[i]==1 && isInside([mouseX,mouseY],polybs[i])){
		p=1;
		
		break;

	}
	}
	
	if(firstTime==1 && !isInside([mouseX,mouseY],polyb1) && !isInside([mouseX,mouseY],polyb2) && !isInside([mouseX,mouseY],polyb3) && !isInside([mouseX,mouseY],polyb4) && !isInside([mouseX,mouseY],polyb5) && !isInside([mouseX,mouseY],polyb6) && !isInside([mouseX,mouseY],polyb7)){
		dotX=mouseX-6;
    	dotY=mouseY-7;
		firstTime=0;
	}

	if(abs(mouseX-dotX)<=25 && abs(mouseY-dotY)<=25){
		canMove=1;
		t=0;
	}
	else{
		canMove=0;
	}
}

function drawPoly( p, pv,col,shift){

	 for (var i=0; i<p.length; i++) {
    pv[i] = createVector( p[i][0]+shift,p[i][1]);
  }

strokeWeight(2);
stroke('rgba(0,0,0,1)');
fill(col);
beginShape();
for(var i=0;i<pv.length;i++){
	curveVertex(pv[i].x,pv[i].y);
}

endShape(CLOSE);

}

function drawPath(){
	init();
		stroke('red');
  strokeWeight(2);
	 for (var i=1;i<Xc.length;i++){
	  	line(Xc[i],Yc[i],Xc[i-1],Yc[i-1]);
	  }

	  var hit1 = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,poly1V);
	  var hit2 = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,poly2V);
	  var hit3 = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,poly3V);
	  var hit4 = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,poly4V);
	  var hit5 = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,poly5V);
	  var hit6 = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,poly6V);
	  var hit7 = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,poly7V);
	  var hitb=false;
	  for(var i=0;i<bridgeLife.length;i++){
	  	//print('w['+i+']='+w[i]);
	  	 if(w[i]==1)
	  		{
	  			hitb = collideLinePoly(mouseX,mouseY,pmouseX,pmouseY,polybsV[i]);
	  			//print(i+' des'+hitb);
	  			if(hitb==true)
	  			break;
	  		}
	  }
	 

	  //bridge one
	  bridgeLife[0][0]= collideLineLine(137,66,165,66,mouseX,mouseY,pmouseX,pmouseY);
	  bridgeLife[0][1]= collideLineLine(141,105,167,107,mouseX,mouseY,pmouseX,pmouseY);

	  //bridge two
	  bridgeLife[1][0]= collideLineLine(269,63,296,66,mouseX,mouseY,pmouseX,pmouseY);
	  bridgeLife[1][1]= collideLineLine(263,107,288,107,mouseX,mouseY,pmouseX,pmouseY);

	  //bridge three
	  bridgeLife[2][0]= collideLineLine(454,92,483,85,mouseX,mouseY,pmouseX,pmouseY);
	  bridgeLife[2][1]= collideLineLine(458,127,484,129,mouseX,mouseY,pmouseX,pmouseY);

	  //bridge four
	  bridgeLife[3][0]= collideLineLine(485,198,534,191,mouseX,mouseY,pmouseX,pmouseY);
	  bridgeLife[3][1]= collideLineLine(482,239,509,244,mouseX,mouseY,pmouseX,pmouseY);

	  //bridge five
	  bridgeLife[4][0]= collideLineLine(259,209,285,204,mouseX,mouseY,pmouseX,pmouseY);
	  bridgeLife[4][1]= collideLineLine(272,246,298,240,mouseX,mouseY,pmouseX,pmouseY);

	  //bridge six
	  bridgeLife[5][0]= collideLineLine(139,201,167,204,mouseX,mouseY,pmouseX,pmouseY);
	  bridgeLife[5][1]= collideLineLine(133,243,157,245,mouseX,mouseY,pmouseX,pmouseY);

	  //bridge seven
	  bridgeLife[6][0]= collideLineLine(336,148,328,175,mouseX,mouseY,pmouseX,pmouseY);
	  bridgeLife[6][1]= collideLineLine(377,152,379,175,mouseX,mouseY,pmouseX,pmouseY);

	  for(var k=0;k<2;k++)
	  {
	  		for(var i=0;i<bridgeLife.length;i++)
		{
		  	if(bridgeLife[i][k]==1)
		  	{
		  		bridgeLife[i][k+2]=1;
		  		
		  		for(var j=0;j<bridgeLife.length;j++)
		  		{

		  			if(i!=j && bridgeLife[j][4]==0)
		  			{
		  				bridgeLife[j][2]=0;
		  				bridgeLife[j][3]=0;
		  				w[j]=0;
		  				//print('i='+j);
		  			}
		  		}	
		  		break;
		    }
		}
	  }

	
	  
	  for(var i=0;i<bridgeLife.length;i++){
	  	if(bridgeLife[i][2]==1 && bridgeLife[i][3]==1){
	  		
	  		
	  		bridgeLife[i][4]=1;

	  		if(!isInside(mouseX,mouseY,polybs[i]))
	  			w[i]=1;
	  		//print(bridgeLife[i][4]=1);
	  		
	  	}

	  }

	  

	  if(hit1==true || hit2==true || hit3==true || hit4==true || hit5==true || hit6==true || hit7==true){
	  	hit=true;
	  }
	  else{hit=false;}


	 
    if(hit==false && hitb==false && canMove==1 && t==0){

    	line(mouseX,mouseY,pmouseX,pmouseY);
    	
    	//line(mouseX,mouseY,pmouseX,pmouseY);
    	//ellipse(mouseX,mouseY,5,5);
    	append(Xc,mouseX);
    	//print(Xc);
    	append(Yc,mouseY);
    	dotX=mouseX-6;
    	dotY=mouseY-7;
    	image(dot,dotX,dotY);

    }
    else if((hit==true || hitb==true) && canMove==1){
    	t=1;
    	image(dot,pmouseX-6,pmouseY-7);

    }
    
}
function init(){
background('#0ef21d');
  
  drawPoly( poly1, poly1V,'rgba(0, 178, 255, 1)',0);
 drawPoly( poly2, poly2V,'rgba(0, 178, 255, 1)',0);
 drawPoly( poly3, poly3V,'rgba(0, 178, 255, 1)',0);
 drawPoly( poly4, poly4V,'rgba(0, 178, 255, 1)',0);
 drawPoly( poly5, poly5V,'rgba(0, 178, 255, 1)',0);
 drawPoly( poly6, poly6V,'rgba(0, 178, 255, 1)',0);
 drawPoly( poly7, poly7V,'rgba(0, 178, 255, 1)',0);
 drawPoly( polyb1, polyb1V,bc,0);
 drawPoly( polyb2, polyb2V,bc,0);
 drawPoly( polyb3, polyb3V,bc,0);
 drawPoly( polyb4, polyb4V,bc,0);
 drawPoly( polyb5, polyb5V,bc,0);
 drawPoly( polyb6, polyb6V,bc,0);
 drawPoly( polyb7, polyb7V,bc,0);

 if(dotY>0 && dotX>0)
 image(dot,dotX,dotY);

 textSize(20);
 fill('black');
 text("A", 208, 148);
 text("B", 330, 266);
 text("C", 330, 24);
 text("D", 520, 148);

 /*stroke('red');
 //bridge one
	line(137,66,165,66);
	line(141,105,167,107);

	  //bridge two
	line(269,63,296,66);
	line(263,107,288,107);

	  //bridge three
	line(454,92,483,85);
	line(458,127,484,129);

	  //bridge four
	line(485,198,513,195);
	line(482,239,509,244);

	  //bridge five
	 line(259,209,285,204);
	 line(272,246,298,240);

	  //bridge six
	 line(139,201,167,204);
	 line(133,243,157,245);

	  //bridge seven
	 line(336,148,328,175);
	 line(377,152,379,175);
	 */

}
function isInside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};
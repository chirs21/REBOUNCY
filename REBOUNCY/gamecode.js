var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth-25 ;
canvas.height = window.innerHeight-24;
var barHeight = (240);

var particle =function(x,y,radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.style.display = "none";
    // document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

var mySound = new sound("ball.mp3");
var mySound1 = new sound("gameover.mp3");
var atom = new particle(100,100,10);

c.beginPath();
c.fillStyle = 'aqua';
c.arc(atom.x,atom.y,atom.radius,0, Math.PI*2,false);  //0 is start angle, 2*PI is end angle, will create a circle, 
c.closePath();										  // false indictes clockwise				
c.fill();
  
 var alive = -1; 
 var width = window.innerWidth;
 var xspeed = 8; 
 var yspeed = 5;
 var flagx = 0;  
 var flagy = 0;  
 var rectspeed = 7;
 var keys = [];
 var posx1=70;
 var posx2=70;
 var score=0;
 var state = 1;
 var winner;
 
function draw(){
    //Clears the entire canvas       
     c.clearRect(0,0,window.innerWidth,window.innerHeight);  
    if(alive == -1)
    {
        state = 1;
    	c.beginPath();
		c.fillStyle = 'rgba(255,255,255,0.5)';
		c.font = "50px Arial";
		c.fillText("REBOUNCY" , (window.innerWidth-20)/2 - 120 , (window.innerHeight-20)/2 - 70);
		c.font = "20px Arial";
		c.fillText("Chirag Malpani" , (window.innerWidth-20)/2 -50  , (window.innerHeight-20)/2 - 45);
        c.font = "20px Arial";
        c.fillText("Player1 vs Player2" , (window.innerWidth-20)/2 -65  , (window.innerHeight-20)/2 - 15);
		c.font = "20px Arial";
		c.fillText("Controls :" , (window.innerWidth-20)/2 - 20 , (window.innerHeight-20)/2 +20);
		c.fillText("P1(w,s) , P2(Arrow Keys)  -  Move" , (window.innerWidth-20)/2 - 125 , (window.innerHeight-20)/2 + 40 );
		c.font = "15px Arial";
		c.fillText("Press any key to begin." , (window.innerWidth-20)/2 - 50 , (window.innerHeight-20)/2 + 90);
		c.fillText("(Sound : On)" , (window.innerWidth-20)/2 - 20 , (window.innerHeight-20)/2 + 110);
    }



    else if(alive)
    {

    	if(score < 5)
	{
		xspeed = 8;
		barHeight = 210;
	}
	else if(score < 10)
	{
		xspeed = 10;
		barHeight = 190;
	}
	else if(score < 15)
	{
		xspeed=13;
		// yspeed+=1;
		barHeight = 150;
	}
	else if(score < 30)
	{
        xspeed = 15;
	}
    else
    {
        xspeed = 18;
    }
    if (keys[87]) {		//up
			if(posx1 >= 0)
			posx1-= rectspeed;
		  }
	if (keys[83]) {		//down
			if(posx1<=(window.innerHeight-22-barHeight))
			posx1 += rectspeed;
		  }

    if (keys[38]) {       //up
            if(posx2 >= 0)
            posx2-= rectspeed;
          }
    if (keys[40]) {     //down
            if(posx2<=(window.innerHeight-22-barHeight))
            posx2 += rectspeed;
          }

	c.beginPath();
	c.fillStyle = "#FF0000";
	c.fillRect(0, posx1, 20, barHeight);

	c.beginPath();
	c.fillStyle = "#FF0000";
	c.fillRect(window.innerWidth-44, posx2, 20, barHeight); 
	
	// xspeed = Math.ceil(Math.random()*5)+xspeed;
    	if(atom.x>=(window.innerWidth-55))
        {
        	 if(atom.y>=(posx2-22) && atom.y<=(posx2+barHeight+22))
			{      
        		flagx = 1;
        		score+=1;
                mySound.play();
                // mySound.stop();
     		}
     		else
     		{
     			alive = 0;
                mySound1.play();
                winner = 1;
     		}
        }
        else if(atom.x<35)
        {
        	 if(atom.y>=(posx1-22) && atom.y<=(posx1+barHeight+22))
        	 {
        		flagx=0;
        		score+=1;
                mySound.play();
        	 }
        	 else
        	 {
                winner = 2;
        	 	alive =0;
                mySound1.play();
        	 }
        }
        if(flagx == 1)
        {
        	atom.x -= xspeed;
        }
        else
        {
        	atom.x +=xspeed;
        }
        if(atom.y==(window.innerHeight-34))
        {
            mySound.play();
        	flagy = 1;
        }
        else if(atom.y==0)
        {
            mySound.play();
        	flagy=0;
        }
        if(flagy==0)
        {
        	atom.y += yspeed;
        }
        else if(flagy==1)
        {
        	atom.y-=yspeed;
        }

    c.beginPath();
    c.fillStyle = 'aqua';
    c.arc(atom.x,atom.y,atom.radius,0, Math.PI*2,false);
    c.closePath();
    c.fill();
}
else
{
        state = 0;
	    c.beginPath();
		c.fillStyle = 'rgba(255,255,255,0.5)';
		c.font = "30px Calibri";
		c.fillText("GAME OVER!" , (window.innerWidth-20)/2 - 55 , (window.innerHeight-20)/2 - 30);
        if(winner==1)
        {
		  c.fillText("Player 1 wins!", (window.innerWidth-20)/2 - 60 , (window.innerHeight-20)/2+10 );
        }
        else
        {
            c.fillText("Player 2 wins!", (window.innerWidth-20)/2 - 60 , (window.innerHeight-20)/2+10 );   
        }
}

    requestAnimationFrame(draw);    //Called inside the function
 }

window.addEventListener("keydown", keysPressed, false );
window.addEventListener("keyup", keysReleased, false);


 
function keysPressed(e) {
	// store an entry for every key pressed
    if(state==1)
    {
	keys[e.keyCode] = true;
	alive = 1;
    }
}
 
function keysReleased(e) {
    // mark keys that were released
	keys[e.keyCode] = false;
	
}
draw();

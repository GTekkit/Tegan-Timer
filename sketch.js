var y=0,m=0,d=0,h=0,m=0,s=0;
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var targetDate = [2019, 11, 1, 22, 30, 0];
var timeLeft = [];
var balls = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  for (var i = 0; i < 40; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(255);//245, 195, 194);
  noStroke();
  fill(245, 195, 194);
  for(i=0; i<balls.length; i++){
    balls[i].display();
    balls[i].move();
  }
  fill(255);
  textSize(20);
  setTimeLeft(getDate(), targetDate, timeLeft);
  text(aryToString(timeLeft), displayWidth/2-100, displayHeight/2);
}

function getDate() {
  var currentDate = [year(), month(), day(), hour(), minute(), second()];
  return currentDate;
}

function setTimeLeft(now, then, left) {
  for(i=0; i<now.length; i++){
    left[i] = then[i] - now[i];
  }
  if(left[5] < 0){
    left[4]--;
    left[5] += 60;
  }
  if(left[4] < 0){
    left[3]--;
    left[4] += 60;
  }
  if(left[3] < 0){
    left[2]--;
    left[3] += 24;
  }
  if(left[2] < 0){
    left[1]--;
    left[2] += daysInMonth[now[1]-1];
  }
  if(left[1] < 0){
    left[0]--;
    left[1] += 12;
  }
}

function aryToString(left){
  var string = 
    left[0] + " - " +
    left[1] + " - " +
    left[2] + " - " +
    left[3] + " - " +
    left[4] + " - " +
    left[5] + "";
  return string;
}




















function Ball() {
  var start = millis()-random(0,5000);
  this.diameter = 0;
  
  this.move = function() {
    if(millis()-start < 2000){
      this.diameter = map(millis()-start, 0, 2000, 0, 120);
    } else {
      this.diameter = map(millis()-start, 2000, 5000, 120, 0);
      this.x += this.xspeed;
      this.y += this.yspeed;
    }
    
    if(millis()-start >= 5000){
      start = millis();
      this.x = random(displayWidth/2-150, displayWidth/2+150);
      this.y = displayHeight/2;
      var angle = random(0, 628);
      this.xspeed = cos(angle/100);
      this.yspeed = sin(angle/100);
    }
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

'use strict';
var water;
var drowningPerson;
var drowningPersonSaved;
var boat;
var cursor;

var worldSeed;    //initial worldSeed
var H = XXH.h32();  //initial hash w/o seed

var tile_drowningPerson;
var tile_drowningPersonSaved;
var tile_water;
var tile_boat;
var tile_cursor;

var clicks = [];
var highPoints = [];
var boatPoints = [];

function myPreload(){
    water = loadImage("assets/water.png");
    drowningPerson = loadImage("assets/drowningPersonSaved.png");
    drowningPersonSaved = loadImage("assets/drowningPerson.png");
    boat = loadImage("assets/boat.png");
    cursor = loadImage("assets/lifeSaverCursor.png");
}

function mySetup() {

  tile_water = createGraphics(sprite_width, sprite_height);
  tile_water.image(water,0,0);

  tile_cursor = createGraphics(sprite_width, sprite_height);
  tile_cursor.image(cursor,0,0);

  tile_drowningPerson = createGraphics(sprite_width, sprite_height);
  tile_drowningPerson.image(drowningPerson,0,0);

  tile_drowningPersonSaved = createGraphics(sprite_width, sprite_height);
  tile_drowningPersonSaved.image(drowningPersonSaved,0,0);

  tile_boat = createGraphics(sprite_width, sprite_height);
  tile_boat.image(boat,0,0);
}

function myDraw() {
  var h = H.update(worldSeed).digest().toNumber(16);

  noiseSeed(h);
  background(0,0,64);
}

/*This section of code will determine tile height
    we can specify areas and say that within these areas there
    will be higher or lower sections of tile*/
function myTileHeight(i, j){

  if(noise(i, j) > 0.86 && noise(i, j) <= 1.0){
    boatPoints.push(i);
    boatPoints.push(j);

    for(var k = 0; k < boatPoints.length; k += 2){
      if(i == boatPoints[k] && j == boatPoints[k+1]){
        return 2.2; //returning boat
      }
    }
  }

  //scanning for a high point in the noise and placing a drowning person at that point
  if(noise(i, j) > 0.8 && noise(i, j) <= 0.86){

    highPoints.push(i);
    highPoints.push(j);


    //if the user has clicked on a dworning person, change to a saved person
    if(clicks.length > 0){
      for(var k = 0; k < clicks.length; k += 2){
        if(i == clicks[k] && j == clicks[k+1]){
          return 2.1; //returning drowningPersonSaved
        }
      }
    }
    //otherwise, setting up drowning person
    return 2;
  }
  //if not drowning or saved person, return noise function of time for water effect  
  return cos(sin(noise(i)*(millis()/200)*noise(j)));;
}

function myTileVariation(i, j, height){
    if(height == 2){
      // console.log(0);
      return -1;
    }
    else if(height == 2.1){
      return 2.1;
    }
    else if(height == 2.2){
      return 2.2;
    }

}

function myDrawTile(i, j, variation){
    if(variation == -1){
      image(tile_drowningPersonSaved, 0, 0);
    }
    else if(variation == 2.1){
      image(tile_drowningPerson, 0, 0);
    }
    else if(variation == 2.2){
      image(tile_boat, 0, 0);
    }
    else{
      //outputting layer of smoothly moving ocean
      image(tile_water, 0, 0);
    }
}//end - myDrawTile

function myTileDescription(i,j, variation) {
    return "Variation: " + variation;
}

function myHandleClick(i, j) {
  clicks.push(i);
  clicks.push(j);
  // console.log("clicked at (" + clicks[i] + ", " + clicks[i+1] + ")");
}

function myHandleWorldgenStringChange(key) {
  console.log("Worldgen Key: " + key);

  worldSeed = key;
}
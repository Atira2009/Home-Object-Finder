status = "";
img = "";
objects = "";

function preload(){
    img = loadImage('tvroom.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function draw(){
    if(status !=""){
        objectDetector.detect(img, gotResult);
        for(i=0; i <objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("object_status").innerHTML = "Number of objects detected are : " + objects.length;
        
        fill("#FF0000");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results
}
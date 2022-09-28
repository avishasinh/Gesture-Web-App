var url = "https://teachablemachine.withgoogle.com/models/OhINfxdNv/model.json"
var x = document.getElementById("webcam")
var classifier = ml5.imageClassifier(url, modelLoaded)

Webcam.attach(x)
Webcam.set({
    width:350,
    height:350,
    image_format: "png",
    png_quality: 90,
})

function capture(){
    Webcam.snap(function (dataURI){
        document.getElementById("snapshot").innerHTML = "<img id='picture' src='" + dataURI + "'></img>"
    })
}

function identify(){
    img = document.getElementById("picture")
    classifier.classify(img, gotResults)
}

function modelLoaded(){
    console.log("model loaded")
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("gestureName").innerHTML = results[0].label
        if(results[0].label=="ok"){
            document.getElementById("gestureIcon").innerHTML = "<span>&#128076;</span>"
        }
        else if(results[0].label == "Thumbs up"){
            document.getElementById("gestureIcon").innerHTML = "<span>&#128077;</span>"
        }
        else if(results[0].label == "Peace"){
            document.getElementById("gestureIcon").innerHTML = "<span>&#9996;</span>"
        }
        synth = window.speechSynthesis
        utterThis = new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utterThis)
    }
}
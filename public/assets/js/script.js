function noturno(){
    var color = document.getElementById("night_text").innerText;

    if (color == "OFF") {
        document.body.style.setProperty('--main-color', '#2f3337');
        document.body.style.setProperty('--background-color', '#2f3337');
        document.body.style.setProperty('--text-color', '#c6c6c6');

        night_text.style.color = 'green';
        document.getElementById("night_text").innerHTML = "ON";
    }else{
        document.body.style.setProperty('--main-color', '#dadadc');
        document.body.style.setProperty('--background-color', '#c6c6c6');
        document.body.style.setProperty('--text-color', '#363636');

        night_text.style.color = 'red';
        document.getElementById("night_text").innerHTML = "OFF";
    }
}
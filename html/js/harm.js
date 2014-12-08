var chords 
    = {
        "A"  : "A-E-C#",
        "A7" : "A-E-C#-G#",
        "Am" : "A-E-C",
        "H"  : "H-F#-Eb",
        "H7" : "H-F#-Eb-A",
        "Hm" : "H-F#-D",
        "C"  : "C-E-G",
        "C7" : "C-E-G-Hb",
        "Cm" : "C-Eb-G",
        "D"  : "D-A-F#",
        "D7" : "D-A-F#-C",
        "Dm" : "D-A-F",
        "E"  : "E-H-G#",
        "E7" : "E-H-G#-D",
        "Em" : "E-H-G",
        "F"  : "F-C-A",
        "F7" : "F-C-A-Eb",
        "Fm" : "F-C-G#",
        "G"  : "G-D-H",
        "G7" : "G-D-H-F",
        "Gm" : "G-D-Hb",
    };

function play() {
    var v = document.getElementById('melody').value; 
    //alert(v);
    var notesArr = v.split("-");
    for (val of notesArr) {
        console.log(val);
//        alert(val);
	document.getElementById(val).className='pressed_as_bold';
    }
    //.className='pressed_as_bold';
}
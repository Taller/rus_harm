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

function getElementByNoteRight(note) {

  if (!(typeof note == 'string') && !(note instanceof String)) {
      return undefined;
  }

  if (note.length > 2) {
      note = note.substring(0,2);
  }

  if (note === 'F#' || note === 'Db') {
      return document.getElementById('F_SHARP');
  }

  if (note === 'G#' || note === 'Ab') {
      return document.getElementById('G_SHARP');
  }

  if (note === 'D#' || note === 'Eb') {
      return document.getElementById('D_SHARP');
  }

  if (note === 'C4') {
      return document.getElementById('C4');
  }

  if ( (note.charAt(1) != '1' && note.charAt(1) != '2' && note.charAt(1) != '3')
        ||
        (note.charAt(0) != 'A' && note.charAt(0) != 'B' && note.charAt(0) != 'C' && note.charAt(0) != 'D'
        && note.charAt(0) != 'E' && note.charAt(0) != 'F' && note.charAt(0) != 'G' && note.charAt(1) != 'H')) {
      console.log(note.charAt(0));
      console.log(note.charAt(1));
      return undefined;
  }


  return document.getElementById(note);
}

function getElementByNoteLeft(note, row) {

  if (!(typeof note == 'string') && !(note instanceof String)) {
      return undefined;
  }

  if (note.length > 2) {
      note = note.substring(0,2);
  }


  if (note === 'F#') {
      return document.getElementById('LF_SHARP_1');
  }

  if (note.length == 2) {
      return undefined;
  }


  
}

function getElementByChordLeft(chord) {

  if (!(typeof chord == 'string') && !(chord instanceof String)) {
      return undefined;
  }


  if (chord.length > 2) {
      chord = chord.substring(0,2);
  }

  if (chord === 'Am') {
      return document.getElementById('LAm_CHORD_2');
  }

  if (chord === 'Dm') {
      return document.getElementById('LDm_CHORD_2');
  }

  if (chord === 'E7') {
      return document.getElementById('LE7_CHORD_2');
  }

  if (chord === 'H7') {
      return document.getElementById('LH7_CHORD_2');
  }

  if (chord === 'F') {
      return document.getElementById('LF_CHORD_3');
  }

  if (chord === 'C') {
      return document.getElementById('LC_CHORD_3');
  }

  if (chord === 'G') {
      return document.getElementById('LG_CHORD_3');
  }

  if (chord === 'D') {
      return document.getElementById('LD_CHORD_3');
  }

  return undefined;
}

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
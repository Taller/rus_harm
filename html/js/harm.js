var chords
    = {
    "A": "A-E-Db",
    "A7": "A-E-Db-G",
    "Am": "A-E-C",
    "H": "H-F#-Eb",
    "H7": "H-F#-Eb-A",
    "Hm": "H-F#-D",
    "C": "C-G-E",
    "C7": "C-G-E-Hb",
    "Cm": "C-G-Eb",
    "D": "D-A-F#",
    "D7": "D-A-F#-C",
    "Dm": "D-A-F",
    "E": "E-H-G#",
    "E7": "E-H-G#-D",
    "Em": "E-H-G",
    "F": "F-C-A",
    "F7": "F-C-A-Eb",
    "Fm": "F-C-G#",
    "G": "G-D-H",
    "G7": "G-D-H-F",
    "Gm": "G-D-Hb",
};

function getElementByNoteRight(note, octave) {

    if (!(typeof note == 'string') && !(note instanceof String)) {
        return undefined;
    }

    if (!(typeof octave == 'number')) {
        return undefined;
    }

    if (octave < 1 || octave > 3) {
        return undefined;
    }

    if (note === 'F#' || note === 'Gb') {
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

    if (note.length > 1) {
        note = note.substring(0, 1);
    }

    if ((note != 'A' && note != 'B' && note != 'C' && note != 'D'
            && note != 'E' && note != 'F' && note != 'G' && note != 'H')) {
        return undefined;
    }

    var elementId = note + '' + octave;
    return document.getElementById(elementId);
}

function getElementByNoteLeft(note, row) {
    if (!(typeof note == 'string') && !(note instanceof String)) {
        return undefined;
    }

    if (!(typeof row == 'number')) {
        return undefined;
    }

    if (note.length > 2) {
        note = note.substring(0, 2);
    }


    if (note === 'AA' && row === 1) {
        return document.getElementById('LAA_1');
    }

    if (note === 'F#' || note === 'Gb') {
        return document.getElementById('LF_SHARP_1');
    }

    if (note.length == 2) {
        return undefined;
    }

    var elementId = 'L' + note + '_' + row;
    return document.getElementById(elementId);
}

function getElementByChordLeft(chord) {

    if (!(typeof chord == 'string') && !(chord instanceof String)) {
        return undefined;
    }

    if (chord.length > 2) {
        chord = chord.substring(0, 2);
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

    if (chord === 'F' || chord === 'F7') {
        return document.getElementById('LF_CHORD_3');
    }

    if (chord === 'C' || chord === 'C7') {
        return document.getElementById('LC_CHORD_3');
    }

    if (chord === 'G' || chord === 'G7') {
        return document.getElementById('LG_CHORD_3');
    }

    if (chord === 'D' || chord === 'D7') {
        return document.getElementById('LD_CHORD_3');
    }

    return undefined;
}

function markNotesFor(chord) {
    clearPressed();
    document.getElementById('current_chord').innerHTML = chord;

    var notesInChord = chords[chord].split('-');

    for (note of notesInChord) {
        for (i = 1; i < 4; i++) {
            var rightNote = getElementByNoteRight(note, i);
            if (rightNote != undefined) {
                setPressedStyle(rightNote);
            }
            // fix for C4 note
            if (note === 'C' && i ===  3) {
                var rightNote = getElementByNoteRight(note + 4, 1);
                if (rightNote != undefined) {
                    setPressedStyle(rightNote);
                }
            }

            var leftNote = getElementByNoteLeft(note, i);
            if (leftNote != undefined) {
                setPressedStyle(leftNote);
            }

            // fix for seconf A on first row
            if (note === 'A' && i === 1) {
                var leftNote = getElementByNoteLeft('AA', i);
                if (leftNote != undefined) {
                    setPressedStyle(leftNote);
                }
            }
            var chord = getElementByChordLeft(chord);
            if (chord != undefined) {
                setPressedStyle(chord);
            }
        }

    }
    return notesInChord;
}

function setPressedStyle(el) {
    var currentClassName = el.className;
    if (currentClassName.indexOf('pressed_as_bold') == -1) {
        el.className = currentClassName + ' pressed_as_bold';
    }
}

function removePressedStyle(el) {
    if (el === undefined) {
        return;
    }

    var currentClassName = el.className;
    if (currentClassName.indexOf('pressed_as_bold') > -1) {
        el.className = currentClassName.replace(' pressed_as_bold', '');
    }
}

function clearPressed() {
    document.getElementById('current_chord').innerHTML = '';
    var pressedElements = document.getElementById('keyboard').getElementsByClassName('pressed_as_bold');
    while (pressedElements.length > 0) {
        removePressedStyle(pressedElements[0]);
    }
}

function playMelody() {
    clearPressed();
    var melody = document.getElementById('right_task').value;
    melody.split("-").forEach(function (item) {
        if (item.length > 2) {
            item = item.substring(0, 2);
        }

        var rightNote;
        if (item.charAt(1) === '#') {
            rightNote = getElementByNoteRight(item, 1);
        } else if (!isNaN(parseInt(item.charAt(1)))) {
            rightNote = getElementByNoteRight(item.charAt(0), parseInt(item.charAt(1)));
        }
        if (rightNote != undefined) {
            setPressedStyle(rightNote);
        }
        return;
    });
}

var chords
    = {
    "A":  ['A', 'E',  'Db'],
    "A7": ['A', 'E',  'Db', 'G' ],
    "Am": ['A', 'E',  'C' ],
    "H":  ['H', 'F#', 'Eb'],
    "H7": ['H', 'F#', 'Eb', 'A' ],
    "Hm": ['H', 'F#', 'D' ],
    "C":  ['C', 'G',  'E' ],
    "C7": ['C', 'G',  'E',  'Hb'],
    "Cm": ['C', 'G',  'Eb'],
    "D":  ['D', 'A',  'F#'],
    "D7": ['D', 'A',  'F#', 'C' ],
    "Dm": ['D', 'A',  'F' ],
    "E":  ['E', 'H',  'G#'],
    "E7": ['E', 'H',  'G#', 'D' ],
    "Em": ['E', 'H',  'G' ],
    "F":  ['F', 'C',  'A' ],
    "F7": ['F', 'C',  'A',  'Eb'],
    "Fm": ['F', 'C',  'G#'],
    "G":  ['G', 'D',  'H' ],
    "G7": ['G', 'D',  'H',  'F' ],
    "Gm": ['G', 'D',  'Hb'],
};

var nleft = {
    'C' : [6,  20],
    'D' : [2,  16, 21],
    'E' : [12, 22],
    'F' : [8,  23],
    'G' : [4,  24],
    'A' : [14, 18, 25],
    'H' : [10, 19],
    'B' : [10, 19],
    'F#': [17],
    'Gb': [17]
}

var nright = {
    'C' : [3,  10, 18, 25],
    'D' : [7,  15, 22],
    'E' : [4,  11, 19],
    'F' : [8,  16, 23],
    'G' : [5,  12, 20],
    'A' : [9,  17, 24],
    'H' : [6,  13, 21],
    'B' : [6,  13, 21],
    'F#': [14],
    'Gb': [14],
    'D#': [1],
    'Eb': [1],
    'G#': [2],
    'Ab': [2]
}

var cleft = {
    'Am': 13,
    'Dm': 15,
    'E7': 11,
    'H7': 9,
    'D' : 1,
    'D7': 1,
    'G' : 3,
    'G7': 3,
    'C' : 5,
    'C7': 5,
    'F' : 7,
    'F7': 7
}

function getElementByNoteRight(note, octave) {
    if (note in nright) {
        var nnums = nright[note];
        if ([1,2,3,4].indexOf(octave) != -1 && octave < nnums.length) {
            return document.getElementById('N' + nnums[octave]);
        } else {
            var quit = [];
            for (var i = 0; i < nnums.length; i++) {
                quit[i] = document.getElementById('N' + nnums[i]);
            }
            return quit;
        }
    }

    return undefined;
}

function getElementByNoteLeft(note) {
    if (note in nleft) {
        var quit = [];
        var nnums = nleft[note];
        for (var i = 0; i < nnums.length; i++) {
            quit[i] = document.getElementById('B' + nnums[i]);
        }
        return quit;
    }

    return undefined;
}

function getElementByChordLeft(chord) {
    if (chord in cleft) {
        return document.getElementById('B' + cleft[chord]);
    }

    return undefined;
}

function markPressedRight(note, octave) {
    var el = getElementByNoteRight(note);
    if (Object.prototype.toString.call(el) === '[object Array]') {
        for (button of el) {
            setPressedStyle(button);
        }
    } else {
        setPressedStyle(el);
    }
}

function markPressedLeft(note) {
    var el = getElementByNoteLeft(note);
    if (Object.prototype.toString.call(el) === '[object Array]') {
        for (button of el) {
            setPressedStyle(button);
        }
    } else {
        setPressedStyle(el);
    }
}

function markNotesFor(chord) {
    clearPressed();
    document.getElementById('current_chord').innerHTML = chord;

    var notesInChord = chords[chord];
    var el = getElementByChordLeft(chord);
    if (el != undefined) {
        setPressedStyle(el);
    }

    for (note of notesInChord) {
        markPressedRight(note);
        markPressedLeft(note);
    }
}

function setPressedStyle(el) {
    if (el === null || el === undefined) {
        return;
    }

    var currentClassName = el.className;
    if (currentClassName.indexOf('p_button') == -1
        && currentClassName.indexOf('chord') == -1
        && currentClassName.indexOf('p_chord') == -1) {
        el.className = currentClassName + ' p_button';
    }

    if (currentClassName.indexOf('p_button') == -1
        && currentClassName.indexOf('chord') != -1
        && currentClassName.indexOf('p_chord') == -1) {
        el.className = currentClassName.replace('chord', 'p_chord');
    }
}

function removePressedStyle(el) {
    if (el === undefined) {
        return;
    }

    var currentClassName = el.className;
    if (currentClassName.indexOf('p_button') > -1) {
        el.className = currentClassName.replace(' p_button', '');
    }

    if (currentClassName.indexOf('p_chord') > -1) {
        el.className = currentClassName.replace('p_chord', 'chord');
    }

}

function clearPressed() {
    document.getElementById('current_chord').innerHTML = '';
    var pressedElements = document.getElementById('keyboard').getElementsByClassName('p_button');
    while (pressedElements.length > 0) {
        removePressedStyle(pressedElements[0]);
    }

    pressedElements = document.getElementById('keyboard').getElementsByClassName('p_chord');
    while (pressedElements.length > 0) {
        removePressedStyle(pressedElements[0]);
    }
}

function playMelody(sel) {
    var value = sel.value;

    clearPressed();
    next(songs[value], 0);
}

function next(notes, n) {
    var item = notes[n];

    /* main recorgnition */
    if (item.length > 2) {
        item = item.substring(0, 2);
    }

    var rn, ln;
    if ((typeof item == 'object') && 'r' in item) {
        rn = item['r'];
    } else if(typeof item == 'string') {
        rn = item;
    }

    if ((typeof item == 'object') && 'l' in item) {
        ln = item['l'];
    } else if(typeof item == 'string') {
        ln = item;
    }

    var rightNote, leftNote;
    if (rn === '[X]') {
        rightNote = null;
    } else if (rn === '[-]') {
        rightNote = null;
    } else if (rn.charAt(1) === '#') {
        rightNote = getElementByNoteRight(rn, 1);
    } else if (!isNaN(parseInt(rn.charAt(1)))) {
        rightNote = getElementByNoteRight(rn.charAt(0), parseInt(rn.charAt(1)));
    }

    if (rn === '[X]') {
        leftNote = null;
    } else if (rn === '[-]') {
        leftNote = null;
    } else if (ln.charAt(1) === '#') {
        leftNote = getElementByNoteRight(ln, 1);
    } else if (!isNaN(parseInt(rn.charAt(1)))) {
        leftNote = getElementByNoteRight(ln.charAt(0), parseInt(ln.charAt(1)));
    }

    if (typeof rightNote === 'undefined') {
        showAlert(item);
    } else {
        setPressedStyle(rightNote);
    }

    if (typeof leftNote === 'undefined') {
        showAlert(item);
    } else {
        setPressedStyle(leftNote);
    }


    setTimeout(function () {
        clearPressed();
        if (notes[n + 1]) {
            next(notes, n + 1);
        }
    }, 600);
}

function showAlert(item) {
    var notes = '';
    if ((typeof item == 'object') && 'notes' in item) {
        notes = item['notes'];
    } else if(typeof item == 'string') {
        notes = item;
    }
    document.getElementById('alert').innerHTML = 'Unrecorgnized: <br>' + notes;
    setTimeout(function () {
        document.getElementById('alert').innerHTML = '';
    }, 2000);
}

/*
*  Example data structure
*  item = {
*      notes : "A1-A2-A3,
*      durarion : 600
*  }
*
*  {A1}[8]-{R}[8]-{A1-C1}[4]
*  {A1}[8] - 1/8 note
*  {R}[8] - 1/8 pause
*  {A1-C1}[4] - 1/4 play A1 and C1 together
*
*  Also, lyrics should be included
*
*  [] - all package is array of commands
*  each element contains rule for:
*  1. right hand
*  2. left hand
*  3. lyrics
*  [{}, {}, {}]
*  {'r':'...', 'l':'...', 't' : '...'}
*
*  special symbols
*  [X] - clear everything
*  [-] - skip, do nothing
* */
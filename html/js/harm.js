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

var tempos = {
    'grave'          : [40,  'Grave',          'Мрачно, печально'],
    'largo'          : [46,  'Largo',          'Долго'],
    'lento'          : [52,  'Lento',          'Медленно'],
    'adagio'         : [56,  'Adagio',         'Протяжно'],
    'larghetto'      : [60,  'Larghetto',      'Довольно широко'],
    'andante'        : [66,  'Andante',        'Умеренно'],
    'andantino'      : [69,  'Andantino',      'Скорее, чем andante, но медленнее, чем allegretto'],
    'sostenuto'      : [76,  'Sostenuto',      ''],
    'commodo'        : [80,  'Commodo',        'Удобно, непринуждённо, не спеша'],
    'maestoso'       : [84,  'Maestoso',       'Торжественно'],
    'moderato'       : [88,  'Moderato',       'Сдержанно'],
    'allegretto'     : [108, 'Allegretto',     'Медленнее, чем allegro, но скорее, чем andante'],
    'animato'        : [120, 'Animato',        'Оживлённо'],
    'allegro'        : [132, 'Allegro',        'Скоро. весело'],
    'allegro_assai'  : [144, 'Allegro assai',  'Весьма быстро'],
    'allegro_vivace' : [152, 'Allegro vivace', 'Значительно быстро'],
    'vivace'         : [160, 'Vivace',         'Быстро, живо'],
    'presto'         : [184, 'Presto',         'Быстро'],
    'prestissimo'    : [208, 'Prestissimo',    'Очень быстро']
}

function getElementByNumRight(num) {
    return document.getElementById('N' + num);
}

function getElementByNumLeft(num) {
    return document.getElementById('B' + num);
}

function getElementByNoteRight(note, octave) {
    if (note in nright) {
        var nnums = nright[note];
        if ([1, 2, 3, 4].indexOf(octave) != -1 && octave < nnums.length) {
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
        el.map(function(button) {
            setPressedStyle(button);
        });
    } else {
        setPressedStyle(el);
    }
}

function markPressedLeft(note) {
    var el = getElementByNoteLeft(note);
    if (Object.prototype.toString.call(el) === '[object Array]') {
        el.map(function(button) {
            setPressedStyle(button);
        });
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

function clearRight() {
    var pressedElements = document.getElementById('right-kbd').getElementsByClassName('p_button');
    while (pressedElements.length > 0) {
        removePressedStyle(pressedElements[0]);
    }
}

function clearLeft() {
    /* clear buttons */
    var pressedElements = document.getElementById('left-kbd').getElementsByClassName('p_button');
    while (pressedElements.length > 0) {
        removePressedStyle(pressedElements[0]);
    }
    /* clear chords */
    pressedElements = document.getElementById('left-kbd').getElementsByClassName('p_chord');
    while (pressedElements.length > 0) {
        removePressedStyle(pressedElements[0]);
    }
}

function clearPressed() {
    document.getElementById('current_chord').innerHTML = '';
    clearRight();
    clearLeft();
}

function playMelody(sel) {
    var value = sel.value;

    clearPressed();
    if (value === 'stop') {
        return;
    }

    var slowOption = document.getElementById("make_slow");
    var optionNameK = slowOption.options[slowOption.selectedIndex].value;

    var slowK = 10;
    if (optionNameK != 'stop') {
        slowK = parseInt(optionNameK);
    }

    var tempOption = document.getElementById("tempos_option");
    var optionNameT = tempOption.options[tempOption.selectedIndex].value;
    var tempo = songs[value][0]['Tempo'];
    if (optionNameT != 'stop' && optionNameT in tempos) {
        tempo = tempos[optionNameT][0];
    }
    var k = 60 / tempo * slowK * 1000;
    next(songs[value], 0, k);
}

function next(notes, n, tempo) {
    var item = notes[n];

    /* playRight */
    var rn;
    if ('rn' in item) {
        rn = item['rn'];

        if (Object.prototype.toString.call(rn) === '[object Array]') {
            rn.map(function(num_note) {
                setPressedStyle(getElementByNumRight(num_note));
            });
        }
    }

    /* playLeft */
    var ln;
    if ('ln' in item) {
        ln = item['ln'];

        if (Object.prototype.toString.call(ln) === '[object Array]') {
            ln.map(function(num_note) {
                setPressedStyle(getElementByNumLeft(num_note));
            });
        }
    }
    var duration;
    if ('d' in item) {
        duration = item['d'];
    }

    setTimeout(function () {
        if (Object.prototype.toString.call(rn) === '[object Array]'
            && rn[rn.length - 1] != 'x') {
            clearRight();
        }
        if (Object.prototype.toString.call(ln) === '[object Array]'
            && ln[ln.length - 1] != 'x') {
            clearLeft();
        }

        if (notes[n + 1]) {
            next(notes, n + 1, tempo);
        }
    }, tempo/duration);
}

function showAlert(item) {
    var notes = '';
    if ((typeof item == 'object') && 'notes' in item) {
        notes = item['notes'];
    } else if (typeof item == 'string') {
        notes = item;
    }
    document.getElementById('alert').innerHTML = 'Unrecorgnized: <br>' + notes;
    setTimeout(function () {
        document.getElementById('alert').innerHTML = '';
    }, 2000);
}

/*
 *  [] - all package is array of commands
 *  each element contains rule for:
 *  1. right hand
 *  2. left hand
 *  3. lyrics
 *  [{}, {}, {}]
 *  {'rn': [...], 'ln': [...], 't' : '...'}
 *
 *  special symbols
 *  'X' - clear everything
 * */
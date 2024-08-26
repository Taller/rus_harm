const tone = {
//          0    1     2     3    4    5    6     7    8     9   10    11
    'C':  ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'],
    'C#': ['C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C'],
    'D':  ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#'],
    'D#': ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D'],
    'E':  ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#'],
    'F':  ['F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#', 'E'],
    'F#': ['F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#', 'E', 'F'],
    'G':  ['G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
    'G#': ['G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
    'A':  ['A', 'A#', 'H', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
    'A#': ['A#', 'H', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
    'B':  ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
    'H':  ['H', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#']
};

class ScoreData {
    constructor(dataset) {

        this.btn = dataset.btn;
        this.side = dataset.side;
        this.octave = dataset.octave;
    }
    btn;
    side;
    octave;
}

function initToneDropDown() {
    const sel = document.getElementById('current_tone');
    let opt;
    for (const value in Object.keys(tone)) {
        opt = document.createElement('option');
        opt.value = Object.keys(tone)[value];
        opt.innerHTML = Object.keys(tone)[value];
        sel.appendChild(opt);
    }
}

const chords = {
    'maj': [0, 4, 7],
    'maj6': [0, 4, 7, 10],
    'maj7': [0, 4, 7, 11],
    'min': [0, 3, 7],
    'min6': [0, 3, 7, 10],
    'min7': [0, 3, 7, 11],
};

function getLettersInChord(btnNum) {
    if (btnNum === null || btnNum === undefined) {
        return;
    }

    let chordKey;
    if (leftBtnsChords[btnNum][1] === '') {
        chordKey = 'maj';
    } else {
        chordKey = 'min';
    }

    if (settings["show-6"]) {
        chordKey += '6';
    }

    if (settings["show-7"]) {
        chordKey += '7';
    }

    const currentTone = document.getElementById("current_tone").value;
    const currAllTones = tone[currentTone];
    const currChordTone = tone[currAllTones[leftBtns[btnNum]]];

    const chord = [];
    for (const n in chords[chordKey]) {
        chord.push(currChordTone[chords[chordKey][n]]);
    }

    return chord;
}

const tempos = {
    'grave': [40, 'Grave', 'Мрачно, печально'],
    'largo': [46, 'Largo', 'Долго'],
    'lento': [52, 'Lento', 'Медленно'],
    'adagio': [56, 'Adagio', 'Протяжно'],
    'larghetto': [60, 'Larghetto', 'Довольно широко'],
    'andante': [66, 'Andante', 'Умеренно'],
    'andantino': [69, 'Andantino', 'Скорее, чем andante, но медленнее, чем allegretto'],
    'sostenuto': [76, 'Sostenuto', ''],
    'commodo': [80, 'Commodo', 'Удобно, непринуждённо, не спеша'],
    'maestoso': [84, 'Maestoso', 'Торжественно'],
    'moderato': [88, 'Moderato', 'Сдержанно'],
    'allegretto': [108, 'Allegretto', 'Медленнее, чем allegro, но скорее, чем andante'],
    'animato': [120, 'Animato', 'Оживлённо'],
    'allegro': [132, 'Allegro', 'Скоро. весело'],
    'allegro_assai': [144, 'Allegro assai', 'Весьма быстро'],
    'allegro_vivace': [152, 'Allegro vivace', 'Значительно быстро'],
    'vivace': [160, 'Vivace', 'Быстро, живо'],
    'presto': [184, 'Presto', 'Быстро'],
    'prestissimo': [208, 'Prestissimo', 'Очень быстро']
};

const settings = {
    'show-all': true,
    'show-7': false,
    'show-6': false
};

const actions = {
    'initToneDropDown': initToneDropDown,
    'addNumbersToButtonsRight': addNumbersToButtonsRight,
    'addNumbersToButtonsLeft': addNumbersToButtonsLeft,
    'markBtnForChordRight': markBtnForChordRight,
    'markBtnForChordLeft' : markBtnForChordLeft
}



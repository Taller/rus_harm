function getElementByNumRight(num) {
    if (!isNaN(parseInt(num))) {
        return document.getElementById('N' + num);
    } else if (num in numbynote) {
        return document.getElementById('N' + numbynote[num]);
    }

    return undefined;
}

function getElementByNumLeft(num) {
    if (!isNaN(parseInt(num))) {
        return document.getElementById('B' + num);
    } else if (num in cleft) {
        return document.getElementById('B' + cleft[num]);
    } else if (num.length > 1 && num.charAt(0) === '-' && num.substring(1) in nleft) {
        return getElementByNoteLeft(num.substring(1));
    }

    return undefined;
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
    } else if (note in numbynote) {
        return document.getElementById('N' + numbynote[note]);
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
        el.map(function (button) {
            setPressedStyle(button);
        });
    } else {
        setPressedStyle(el);
    }
}

function markPressedLeft(note) {
    var el = getElementByNoteLeft(note);
    if (Object.prototype.toString.call(el) === '[object Array]') {
        el.map(function (button) {
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
        // показываем дополнительные кнопки слева для аккордов
        if (settings['show-all']) {
            markPressedLeft(note);
        }
    }
}

function markNotesForBass(bass, button) {
    clearPressed();
    markPressedRight(bass);
    setPressedStyle(button);
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

    var slowOption = document.getElementById("tempo");
    var optionNameK = slowOption.options[slowOption.selectedIndex].value;

    var slowK = 10;
    if (optionNameK != 'stop') {
        slowK = parseInt(optionNameK);
    }

    var k = 480000 / slowK;
    next(songs[value], 1, k);
}

function next(notes, n, tempo) {
    var item = notes[n];

    /* playRight */
    var rn;
    if ('rn' in item) {
        rn = item['rn'];

        if (Object.prototype.toString.call(rn) === '[object Array]') {
            rn.map(function (num_note) {
                setPressedStyle(getElementByNumRight(num_note));
            });
        }
    }

    /* playLeft */
    var ln;
    if ('ln' in item) {
        ln = item['ln'];

        if (Object.prototype.toString.call(ln) === '[object Array]') {
            ln.map(function (num_note) {
                var lel = getElementByNumLeft(num_note);
                if (Object.prototype.toString.call(lel) === '[object Array]') {
                    lel.map(function (one_el) {
                        setPressedStyle(one_el)
                    });
                } else {
                    setPressedStyle(lel);
                }

            });
        }
    }
    var duration;
    if ('d' in item) {
        duration = item['d'];
    } else {
        duration = 8;
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
    }, tempo / duration);
}

//function showAlert(item) {
//    var notes = '';
//    if ((typeof item == 'object') && 'notes' in item) {
//        notes = item['notes'];
//    } else if (typeof item == 'string') {
//        notes = item;
//    }
//    document.getElementById('alert').innerHTML = 'Unrecorgnized: <br>' + notes;
//    setTimeout(function () {
//        document.getElementById('alert').innerHTML = '';
//    }, 2000);
//}

function showHint(hint) {
    var el = document.getElementById('note_hint');
    if (hint === null || hint === undefined) {
        el.className = 'no_bg_img';
    } else {
        el.className = hint;
    }
}

function changeSetting(el) {
    if (el == null) {
        return;
    }

    var id = el.id;
    if (id in settings) {
        settings[id] = !settings[id];
    }
}


/*
 *  [] - all package is array of commands
 *  each element contains rule for:
 *  1. right hand ('rn')
 *  2. left hand  ('ln')
 *  3. duration   ('d'), 8 means 1/8, 4 - 1/4 and so on
 *  [{}, {}, {}]
 *  {'rn': [...], 'ln': [...], 'd' : '...'}
 *
 *  special symbols
 *  last 'x' - do not clear anything
 * */

/* TODO / NOTES
 * -1.* сброс состояния.
 * 2. остановку мелодии.
 * 3. дополнительные кнопки во время мелодии
 * 4. сексты для кнопок справа
 * 5. септы для кнопок справа
 * 6. футер
 * 7. предпоказ
 *
 * */
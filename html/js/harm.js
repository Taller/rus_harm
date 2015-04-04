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

function markPressedRight(note) {
    var el = getElementByNoteRight(note);
    if (Object.prototype.toString.call(el) === '[object Array]') {
        el.forEach(function (button) {
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
    if (!settings['stop']) {
        return;
    }

    clearPressed();
    document.getElementById('current_chord').innerHTML = chord;

    var el = getElementByChordLeft(chord);
    if (el != undefined) {
        setPressedStyle(el);
    }

    if (settings['show-7']) {
        chord = chord + '7';
    } else if (settings['show-6']) {
        chord = chord + '6';
    }
    var notesInChord = chords[chord];

    notesInChord.forEach(function (note) {
        markPressedRight(note);
        // показываем дополнительные кнопки слева для аккордов
        if (settings['show-all']) {
            markPressedLeft(note);
        }
    });
}

function markNotesForBass(bass, button) {
    if (!settings['stop']) {
        return;
    }

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
    } else if (currentClassName.indexOf('p_button') == -1
        && currentClassName.indexOf('chord') != -1
        && currentClassName.indexOf('p_chord') == -1) {
        el.className = currentClassName.replace('chord', 'p_chord');
    }
}

function setPreviewStyle(el) {
    if (el === null || el === undefined) {
        return;
    }

    var currentClassName = el.className;
    if (currentClassName.indexOf('button_preview') == -1) {
        el.className = currentClassName.replace('button', 'button_preview');
    }
}

function removePressedStyle(el) {
    if (el === null || el === undefined) {
        return;
    }

    var currentClassName = el.className;
    if (currentClassName.indexOf('p_button') > -1) {
        el.className = currentClassName.replace(' p_button', '');
    } else if (currentClassName.indexOf('p_chord') > -1) {
        el.className = currentClassName.replace('p_chord', 'chord');
    }
}

function removePreviewStyle(el) {
    if (el === null || el === undefined) {
        return;
    }

    var currentClassName = el.className;
    if (currentClassName.indexOf('button_preview') > -1) {
        el.className = currentClassName.replace('button_preview', 'button');
    }
}

function clearRight() {
    var pressedElements = document.getElementById('right-kbd').getElementsByClassName('p_button');
    while (pressedElements.length > 0) {
        removePressedStyle(pressedElements[0]);
    }

    pressedElements = document.getElementById('right-kbd').getElementsByClassName('button_preview');
    while (pressedElements.length > 0) {
        removePreviewStyle(pressedElements[0]);
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
    /* clear previews */
    pressedElements = document.getElementById('left-kbd').getElementsByClassName('button_preview');
    while (pressedElements.length > 0) {
        removePreviewStyle(pressedElements[0]);
    }
}

function clearPressed() {
    if (!settings['stop']) {
        return;
    }

    document.getElementById('current_chord').innerHTML = '';
    clearRight();
    clearLeft();
}

function playMelody(sel) {
    clearPressed();

    var value = sel.value;
    if (value === 'stop') {
        settings['stop'] = true;
        return;
    }

    var slowOption = document.getElementById("tempo");
    var optionNameK = slowOption.options[slowOption.selectedIndex].value;

    var slowK = 10;
    if (optionNameK != 'stop') {
        slowK = parseInt(optionNameK);
    }

    var k = 480000 / slowK;
    settings['stop'] = false;
    next(songs[value], 1, k);
    clearPressed();
}

function next(notes, n, tempo) {
    var item = notes[n];

    /* playRight */
    var rn = markRightFor(item, 'melody');
    /* playLeft */
    var ln = markLeftFor(item, 'melody');
    /* set previews */
    if (notes[n + 1]) {
        markRightFor(notes[(n + 1)], 'preview');
        markLeftFor(notes[(n + 1)], 'preview');
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

        if (notes[n + 1] && !settings['stop']) {
            next(notes, n + 1, tempo);
        } else {
            clearPressed();
            settings['stop'] = true;
        }
    }, tempo / duration);
}

function markRightFor(item, mode) {
    if (item === undefined) {
        return undefined;
    }

    /* playRight */
    var rn;
    if ('rn' in item) {
        rn = item['rn'];

        if (Object.prototype.toString.call(rn) === '[object Array]'
            && mode === 'melody') {
            rn.map(function (num_note) {
                removePreviewStyle(getElementByNumRight(num_note));
                setPressedStyle(getElementByNumRight(num_note));
            });
        } else if (Object.prototype.toString.call(rn) === '[object Array]'
            && mode === 'preview') {
            rn.map(function (num_note) {
                setPreviewStyle(getElementByNumRight(num_note));
            });
        }
    }

    return rn;
}

function markLeftFor(item, mode) {
    if (item === undefined) {
        return undefined;
    }

    /* playLeft */
    var ln;
    if ('ln' in item) {
        ln = item['ln'];

        if (Object.prototype.toString.call(ln) === '[object Array]'
            && mode === 'melody') {
            ln.map(function (num_note) {
                var lel = getElementByNumLeft(num_note);
                if (Object.prototype.toString.call(lel) === '[object Array]') {
                    lel.map(function (one_el) {
                        removePreviewStyle(one_el);
                        setPressedStyle(one_el);
                    });
                } else {
                    removePreviewStyle(lel);
                    setPressedStyle(lel);
                }
            });
        } else if (Object.prototype.toString.call(ln) === '[object Array]'
            && mode === 'preview') {
            ln.map(function (num_note) {
                var lel = getElementByNumLeft(num_note);
                if (Object.prototype.toString.call(lel) === '[object Array]') {
                    lel.map(function (one_el) {
                        setPreviewStyle(one_el)
                    });
                } else {
                    setPreviewStyle(lel);
                }
            });
        }
    }

    return ln;
}

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

    if (el.type === 'checkbox' && el.id === 'show-all') {
        settings['show-all'] = !settings['show-all'];
        return;
    } else if (el.type === 'select-one' && el.id === 'show-right') {
        settings['show-6'] = false;
        settings['show-7'] = false;

        var id = el.options[el.selectedIndex].value;
        if (id === 'clean-chord') {
            return;
        }

        if (id in settings) {
            settings[id] = true;
            return;
        }
    }
}

function stopMelody() {
    settings['stop'] = true;
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
 * -2.* остановку мелодии.
 * -3.* дополнительные кнопки во время мелодии -- не пойдет,
 * т.к. не знаем какая именно кнопка нужна, либо писать номер
 * -4.* сексты для кнопок справа
 * -5.* септы для кнопок справа
 * -6.* футер
 * -7.* предпоказ
 * -8.* сделать настройки в виде меню
 * 9. перерисовать ноты для клавиш
 * 10. мелодии, нужно больше мелодий
 *
 * */
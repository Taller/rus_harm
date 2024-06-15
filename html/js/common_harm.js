const leftBtns = ['empty_to_calc_btns_from_1',
    '2'/*'maj_chord'*/, '2', '7'/*'maj_chord'*/, '7', '0'/*'maj_chord'*/, '0', '5'/*'maj_chord'*/, '5',
    '11'/*'maj_chord'*/, '11', '4'/*'maj_chord'*/, '4', '9'/*'min_chord'*/, '9', '2'/*'min_chord'*/, '2',
    '6', '9', '11', '0', '2', '4', '5', '7', '9'
];

const leftBtnsChords = {
    '1': ['2', ''],
    '3': ['7', ''],
    '5': ['0', ''],
    '7': ['5', ''],
    '9': ['11', ''],
    '11': ['4', ''],
    '13': ['9', 'm'],
    '15': ['2', 'm']
};

const rightBtns = [
//   0    1    2    3    4    5    6     7    8    9    10   11   12   13    14   15   16   17   18   19   20   21    22   23   24   25
    '-', '3', '8', '0', '4', '7', '11', '2', '5', '9', '0', '4', '7', '11', '6', '2', '5', '9', '0', '4', '7', '11', '2', '5', '9', '0'

];

function addNumbersToButtonsLeft(btn_number) {
    <!-- добавляем цифры к кнопкам слева -->
    const elLeft = document.getElementById('B' + btn_number);

    let newEL;
    if (elLeft !== undefined && elLeft !== null) {
        newEL = document.createElement('div');
        newEL.textContent = '' + btn_number;
        newEL.className = 'btn_number';
        elLeft.appendChild(newEL);
    }
    return elLeft;
}

function addNumbersToButtonsRight(btn_number) {
    <!-- добавляем цифры к кнопкам справа -->
    const elRight = document.getElementById('N' + btn_number);

    let newEL;
    if (elRight !== undefined) {
        newEL = document.createElement('div');
        newEL.textContent = '' + btn_number;
        newEL.className = 'btn_number';
        elRight.appendChild(newEL);
    }
    return elRight;
}

function markSingleNote(btnScoreStr) {
    let btnScoreJson = JSON.parse(btnScoreStr);

    const allNotes = document.getElementById('all-notes').querySelectorAll(".note");
    for (let i = 0; i < allNotes.length; i++) {
        let child = allNotes[i];
        let scoreJson = JSON.parse(child.dataset.score);
        if (scoreJson.note === Array.from(btnScoreJson.note)[0] && scoreJson.octave === btnScoreJson.octave) {
            child.style.display = '';
            if (Array.from(btnScoreJson.note).length === 2) {
                if (Array.from(btnScoreJson.note)[1] === '#') {
                    const sharp = document.getElementById(scoreJson.note.toLowerCase() + scoreJson.octave).querySelectorAll(".sharp");
                    for (let j = 0; j < sharp.length; j++) {
                        sharp[j].style.display = '';
                    }
                } else if (Array.from(btnScoreJson.note)[1] === 'b') {
                    const flat = document.getElementById(scoreJson.note.toLowerCase() + scoreJson.octave).querySelectorAll(".flat");
                    for (let j = 0; j < flat.length; j++) {
                        flat[j].style.display = '';
                    }
                }
            }
        }
    }
}

function clearSingleNote(btnScoreStr) {
    let btnScoreJson = JSON.parse(btnScoreStr);

    const allNotes = document.getElementById('all-notes').querySelectorAll(".note");
    for (let i = 0; i < allNotes.length; i++) {
        let child = allNotes[i];
        let scoreJson = JSON.parse(child.dataset.score);
        if (scoreJson.note === Array.from(btnScoreJson.note)[0] && scoreJson.octave === btnScoreJson.octave) {
            child.style.display = 'none';
            if (Array.from(btnScoreJson.note).length === 2) {
                if (Array.from(btnScoreJson.note)[1] === '#') {
                    const sharp = document.getElementById(scoreJson.note.toLowerCase() + scoreJson.octave).querySelectorAll(".sharp");
                    for (let j = 0; j < sharp.length; j++) {
                        sharp[j].style.display = 'none';
                    }
                } else if (Array.from(btnScoreJson.note)[1] === 'b') {
                    const flat = document.getElementById(scoreJson.note.toLowerCase() + scoreJson.octave).querySelectorAll(".flat");
                    for (let j = 0; j < flat.length; j++) {
                        flat[j].style.display = 'none';
                    }
                }
            }
        }
    }
}

function markNote(el) {
    if (isPressed(el)) {
        clearSingleNote(el.dataset.score);
        removeStylePressed(el);
    } else {
        markSingleNote(el.dataset.score);
        setStylePressed(el);
    }
}

function markNotesForChord(btn_number) {
    clearPressed();
    if (btn_number === null || btn_number === undefined) {
        return;
    }

    const chordLettersSet = getLettersInChord(btn_number);

    for (let i = 1; i <= 25; i++) {
        actions.markBtnForChordLeft(i, chordLettersSet);
        actions.markBtnForChordRight(i, chordLettersSet);
    }
    setStylePressed(document.getElementById('B' + btn_number));
}

function markBtnForChordRight(btn_number, chordLettersSet) {
    const elRight = document.getElementById('N' + btn_number);

    if (elRight !== undefined && chordLettersSet.includes(elRight.childNodes[0].textContent.trim())) {
        setStylePressed(elRight);
    }
}

function markBtnForChordLeft(btn_number, chordLettersSet) {
    const elLeft = document.getElementById('B' + btn_number);

    if (elLeft === null || elLeft === undefined) {
        return;
    }

    if (chordLettersSet.includes(elLeft.childNodes[0].textContent.trim())) {
        if ((' ' + elLeft.className + ' ').indexOf(' ' + 'chord' + ' ') === -1) {
            setStylePressed(elLeft);
        }
    }
}

function clearPressed() {
    for (let i = 1; i <= 25; i++) {
        const elLeft = document.getElementById('B' + i);
        const elRight = document.getElementById('N' + i);
        removeStylePressed(elLeft);
        removeStylePressed(elRight);
    }

    const allNotes = document.getElementById('all-notes').querySelectorAll(".note");
    for (let i = 0; i < allNotes.length; i++) {
        let child = allNotes[i];
        if (child !== null && child !== undefined && child.className === 'note') {
            child.style.display = 'none';
        }
    }
}

function setStylePressed(el) {
    if (el === null || el === undefined) {
        return;
    }

    if (el.classList.contains("chord")) {
        el.classList.replace("chord", "p_chord");
    } else {
        el.classList.add("p_button");
    }
}

function removeStylePressed(el) {
    if (el === null || el === undefined) {
        return;
    }

    if (el.classList.contains("p_chord")) {
        el.classList.replace("p_chord", "chord");
    } else {
        el.classList.remove("p_button");
    }
}

function isPressed(el) {
    if (el === null || el === undefined) {
        return false;
    }

    return el.classList.contains("p_chord") || el.classList.contains("p_button");
}

function setTone(sel) {
    clearPressed();
    const allNotes = tone[sel.value]; // array of strings
    for (let i = 1; i <= 25; i++) {
        const elLeft = document.getElementById('B' + i);
        const elRight = document.getElementById('N' + i);

        let rightScoreJson = JSON.parse(elRight.dataset.score);
        rightScoreJson.note = allNotes[rightBtns[i]];

        if (elRight.firstChild) {
            elRight.firstChild.nodeValue = allNotes[rightBtns[i]];
        }
        elRight.dataset.score = JSON.stringify(rightScoreJson);

        let leftTone = leftBtnsChords[i];
        let leftScoreJson = JSON.parse(elLeft.dataset.score);

        if (typeof (leftTone) == "undefined" || leftTone == null) {
            leftTone = allNotes[leftBtns[i]];
            leftScoreJson.note = allNotes[leftBtns[i]]
        } else {
            leftTone = allNotes[leftBtnsChords[i][0]] + leftBtnsChords[i][1];
            leftScoreJson.note = allNotes[leftBtnsChords[i][0]] + leftBtnsChords[i][1];
        }
        if (elLeft.firstChild) {
            elLeft.firstChild.nodeValue = leftTone;
        }

        elLeft.dataset.score = JSON.stringify(leftScoreJson);
    }
}

function changeNoteColor(el) {
    const notes = el.querySelectorAll(".note");
    const flat = el.querySelectorAll(".flat");
    const sharp = el.querySelectorAll(".sharp");

    let noteJson;
    let needSet = true;
    for (let i = 0; i < notes.length; i++) {
        let child = notes[i];
        if (child.style.display === 'none') {
            child.style.display = '';
        } else {
            child.style.display = "none";
            needSet = false;
        }
        noteJson = JSON.parse(child.dataset.score);
    }

    for (let i = 0; i < flat.length; i++) {
        let child = flat[i];
        if (!needSet) {
            child.style.display = 'none';
        }
    }

    for (let i = 0; i < sharp.length; i++) {
        let child = sharp[i];
        if (!needSet) {
            child.style.display = 'none';
        }
    }

    for (let i = 1; i <= 25; i++) {
        const elLeft = document.getElementById('B' + i);
        const elRight = document.getElementById('N' + i);


        let rightScoreJson = JSON.parse(elRight.dataset.score);
        let leftScoreJson = JSON.parse(elLeft.dataset.score);

        if (rightScoreJson.note !== undefined
            && Array.from(rightScoreJson.note)[0] === noteJson.note
            && rightScoreJson.octave === noteJson.octave) {
            if (needSet && Array.from(rightScoreJson.note).length === 1) {
                setStylePressed(elRight);
            } else {
                removeStylePressed(elRight);
            }
        }
        if (leftScoreJson.note !== undefined
            && Array.from(leftScoreJson.note)[0] === noteJson.note
            && leftScoreJson.octave === noteJson.octave) {
            if (needSet && Array.from(leftScoreJson.note).length === 1) {
                setStylePressed(elLeft);
            } else {
                removeStylePressed(elLeft);
            }
        }
    }
}

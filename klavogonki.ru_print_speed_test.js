// https://klavogonki.ru/
// Подготовка массива со словами.
let full_text = "";
let typefocus = document.querySelectorAll("#typefocus span:not([style])");
if (typefocus.length === 0) {
    full_text = document.querySelector("#typefocus").textContent;
    typefocus = [];
};
const afterfocus = document.querySelectorAll("#afterfocus span:not([style])");
const type_and_after = Array.from(typefocus).concat(Array.from(afterfocus));
for (const element of type_and_after) full_text += element.textContent;
full_text = full_text.split(" ");

// определение языка ru/en
const check_lang = (words) => {
    let ru_counter = 0;
    let en_counter = 0;
    for (const word of words) {
        for (const i in word) word.charCodeAt(i) > 122 ? ru_counter++ : en_counter++;
    };
    return ru_counter >= en_counter;
};

// замена похожих символов из алфавита другого языка.
const ru_en = {'а': 'a', 'е': 'e', 'с': 'c', 'о': 'o', 'р': 'p', 'х': 'x', 'у': 'y', 'А': 'A', 'В': 'B', 'Е': 'E', 'С': 'C', 'К': 'K', 'М': 'M', 'О': 'O', 'Р': 'P', 'Т': 'T', 'Х': 'X', 'Н': 'H'};
const en_ru = {'a': 'а', 'e': 'е', 'c': 'с', 'o': 'о', 'p': 'р', 'x': 'х', 'y': 'у', 'A': 'А', 'B': 'В', 'E': 'Е', 'C': 'С', 'K': 'К', 'M': 'М', 'O': 'О', 'P': 'Р', 'T': 'Т', 'X': 'Х', 'H': 'Н'};
const trans_table = check_lang(full_text) ? en_ru : ru_en;
for (let i = 0; i < full_text.length; i++) {
    for (const key in trans_table) {
        full_text[i] = full_text[i].replace(key, trans_table[key]);
    };
};

const function_change = window.getEventListeners(inputtext).keyup[0].listener;

// Добавить 2 опечатки к результату.
for (let i = 0; i < 2; i++) {
    inputtext.value = "☻";
    function_change({isTrusted: true, target: inputtext});
    inputtext.value = "";
    function_change({isTrusted: true, target: inputtext});
};

// Ввод слов из массива.
let delay = 100;
for (const word of full_text) {
    for (const char of word + " ") {
        setTimeout(() => {
            inputtext.value += char;
            function_change({isTrusted: true, target: inputtext});
        }, delay);
        delay += 100;
    };
};

import { courses } from './courses.js';

const form = document.getElementById('form');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const resetButton = document.getElementById('resetButton');
const list = document.getElementById('list');

const filteredPrice = ([from, to]) => {
    return courses.filter(course => {
        const item = () => {
            if (to === 0) {
                return course.prices.map(num => (from <= (num ? num : from)));
            }
            else {
                return course.prices.map(num => (from <= num && num <= to));
            }
        }

        if (item().find(item => item === false) === undefined) {
            return true;
        }
    })
}

const render = (courses) => {
    return courses.map(({ name, prices }) => {
        return `<li>${name} (${value(prices) || '0'})</li>`
    }).join('');
};

function value(value) {
    return value.filter(item => {
        if (item !== null) return true;
    }).join(' - ');
}

list.innerHTML = render(courses);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const from = +fromInput.value;
    const to = +toInput.value;


    if (from >= to && from !== 0 && to !== 0) {
        alert('Значение "от" не может быть больше или равно значению "до"');
        return;
    }

    list.innerHTML = render(filteredPrice([from, to]));
})

resetButton.addEventListener('click', () => {
    list.innerHTML = render(courses);
})


// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];
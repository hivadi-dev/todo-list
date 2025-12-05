
//connect between two page//
const start = document.querySelectorAll('.start')
start.forEach((val) => {
    val.addEventListener('click', () => {
        window.location.href = 'index2.html'
    })
})
/////////


//time//
setInterval(() => {
    let x = new Date()
    document.getElementById('_time').innerText = x.getHours() + ' : ' + x.getMinutes() + ' : ' + x.getSeconds()
}, 1000);
////


//day//
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const today = new Date()
const dayName = days[today.getDay()]
document.getElementById('_day').innerText = dayName
////


//daynight active in tailwind//
function toggleDark() {
    document.body.classList.toggle("dark");
}
////


// day & night //
const _body = document.querySelector('body')
let toggle = document.getElementById('toggle')
let mode = true
toggle.addEventListener('click', () => {
    if (mode) {
        _body.classList.add('dark')
        toggle.innerHTML = '<i class="ri-sun-line"></i>'
    } else {
        _body.classList.remove('dark')
        toggle.innerHTML = '<i class="ri-moon-line"></i>'
    }
    mode = !mode
})



/////add task/////
const inp = document.querySelector('input');
const btn = document.querySelector('button');
const lines = document.querySelectorAll('#do .line');
const _do = document.getElementById('do')
const _done = document.getElementById('done')

btn.addEventListener('click', () => {
    let tempVal = inp.value.trim();
    if (tempVal === "") {
        alert("write down one goal for today, every big journey starts with a small step⭐");
        return;
    }

    for (let li of lines) {
        if (li.innerHTML.trim() === "") {
            toDoGen(li, tempVal)
            inp.value = ""
            inp.focus()
            return
        }
    }
    const newLi = document.createElement('li');
    toDoGen(newLi, tempVal);
    _do.appendChild(newLi);
    inp.value = "";
    inp.focus();
});


//delete//
function myDell(s) {
    if (confirm('are you sure?')) s.parentElement.remove()
    
}

//edit//
function myEdit(s) {
    s.classList.add('hide')
    s.previousElementSibling.classList.add('hide')
    let myTemp = s.previousElementSibling.innerText
    s.parentElement.children[0].classList.remove('hide')
    s.parentElement.children[0].value = myTemp
    s.parentElement.children[5].classList.remove('hide')

}

//save//
function _save(s) {
    const parent = s.parentElement;
    const input = parent.querySelector('input[type="text"]');
    const h2 = parent.querySelector('h2');
    const editIcon = parent.querySelector('.ri-pencil-fill');


    s.classList.remove('hide')
    input.classList.add('hide');

    // مقدار input را به h2 انتقال بده
    h2.innerText = input.value;
    h2.classList.remove('hide');

    // نمایش دوباره آیکون ویرایش
    editIcon.classList.remove('hide');
    s.classList.add('hide')
}


//go to done///
function gotoDone(s) {
    const lido = s.parentElement
    const mytext = lido.querySelector('h2').innerText
    let inseted = false
    for (let lidone of _done.querySelectorAll('li')) {
        if (lidone.innerHTML === '') {
            lidone.innerHTML = `
            <div class = 'flex items-center w-full gap-3'>
                <del class = 'text-[18px] mr-auto ps-1'>${mytext}</del>
                <i onclick="myDell(this)" class="ri-delete-bin-6-line text-red-500 text-[18px] cursor-pointer"></i>
                <em onclick = _redo(this)><i class="ri-arrow-turn-back-line font-bold text-green-700"></i></em>
            </div>
            `
            inseted = true
            break
        }
    }
    lido.remove()

}


//redo//
function _redo(s) {
    const lidone = s.parentElement; // li فعلی در جدول done
    const myText = lidone.querySelector('del').innerText; // متن داخل <del>

    // پیدا کردن اولین li خالی در جدول do
    let inserted = false;
    for (let lido of _do.querySelectorAll('li')) {
        if (lido.innerHTML.trim() === '') {
            toDoGen(lido, myText)

            inserted = true;
            break;
        }

    }
    if (!inserted) {
        const newLi = document.createElement('li');
        toDoGen(newLi, myText);
        _do.appendChild(newLi);
    }
    lidone.remove()


}




function toDoGen(li, tempVal) {
    li.innerHTML =
        `
                <div class="flex items-center w-full gap-3 ">
                    <input type = "text" class = 'hide mr-auto rounded-3xl ps-1 focus:outline-black focus:outline-0  text-[18px]'>
                    <h2 class="text-[18px] font-medium mr-auto ps-1">${tempVal}</h2>
                    <i onclick="myEdit(this)" class="ri-pencil-fill text-blue-500 text-[18px] cursor-pointer"></i>
                    <i onclick="myDell(this)" class="ri-delete-bin-6-line text-red-500 text-[18px] cursor-pointer"></i>
                    <input type="checkbox" class=" w-4 h-4 cursor-pointer" onchange = 'gotoDone(this)'>
                    <button onclick = _save(this) class = hide><i class="ri-check-line text-green-700 font-bold cursor-pointer"></i></button>
                </div>
            `
}







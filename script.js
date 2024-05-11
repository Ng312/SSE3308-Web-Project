const accordians = document.querySelectorAll('.accordian');

accordians.forEach(accordian => {
    const arrow = accordian.querySelector('.arrow');
    const answer = accordian.querySelector('.answer');

    accordian.addEventListener('click', () => {
        
        if(arrow.classList.contains('active')) {
            arrow.classList.remove('active');
            answer.style.maxHeight = null;
        } else {
            arrow.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        
    })
})
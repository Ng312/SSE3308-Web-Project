const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    const arrow = accordion.querySelector('.arrow');
    const answer = accordion.querySelector('.answer');

    accordion.addEventListener('click', () => {
        
        if(arrow.classList.contains('active')) {
            arrow.classList.remove('active');
            answer.style.maxHeight = null;
        } else {
            arrow.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        
    })
})
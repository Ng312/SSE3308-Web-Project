const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    const question = accordion.querySelector('.question');
    const arrow = accordion.querySelector('.arrow');
    const answer = accordion.querySelector('.answer');

    question.addEventListener('click', () => {
        const isActive = accordion.classList.contains('active');
        
        accordions.forEach(acc => {
            acc.classList.remove('active');
            acc.querySelector('.arrow').classList.remove('active');
            acc.querySelector('.answer').style.maxHeight = null;
        });
        
        if (!isActive) {
            accordion.classList.add('active');
            arrow.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            accordion.classList.remove('active');
            arrow.classList.remove('active');
            answer.style.maxHeight = null;
        }
    });
});

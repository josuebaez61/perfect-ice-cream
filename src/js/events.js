const btnDisplace = $('#btnDisplace');

export const setEvents = () => {
    btnDisplace.on('click', () => {
        document.getElementById('pageContent').scrollIntoView();
    });
}
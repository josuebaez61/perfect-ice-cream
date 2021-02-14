import { getProductById } from "./ajax";

const addCartModal = $('#addCartModal');

export const setEvents = () => {
    $('#btnDisplace').on('click', () => {
        document.getElementById('pageContent').scrollIntoView();
    });

    addCartModal.on('show.bs.modal', async(e) => {
        const button = e.relatedTarget;
        const prod   = await getProductById(button.dataset.id);
        console.log('button', prod)
        console.log('se mostro')
    })
}
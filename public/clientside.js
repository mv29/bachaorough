let socket = io();

$(function () {

    let containerChat = $('#chatbox');

    containerChat.hide();

    let btnSend = $('#btn-send');
    let inpMsg = $('#inp-msg');
    let listChats = $('#chatlist');

    btnSend.click(() => {
        socket.emit('chat', {
            message: inpMsg.val()
        })
    });

    socket.on('chat', (data) => {
        let cardExtraClass = (data.private)
            ? 'text-white bg-info'
            : '';
        listChats.append(
            $(`
            <div class="card ${cardExtraClass} col-12">
                <div class="card-body">
                    <div class="card-title">${data.sender}</div>
                    <div class="card-subtitle text-muted small">${data.timestamp}</div>
                    <div class="card-text">${data.message}</div>
                </div>
            </div>
            `
            )
        )
    })
});
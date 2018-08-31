/* eslint-disable */
(function ($) {

    const l = Ladda.create(document.querySelector('.ladda-button'));
    // l.start();
    // l.stop();
    // l.toggle();
    // l.isLoading();
    // l.setProgress( 0-1 );

    $('#addPlugin').click(function () {
        const repo = $('#gitLink').val();
        const rename = $('#rename').val();
        $.ajax({
            dataType: 'json',
            url: '/plugin/add',
            contentType: 'application/json',
            data: JSON.stringify({ repo, rename }),
            method: 'POST',
            type: 'POST',
            beforeSend: () => {
                l.start();
                l.setProgress(0 - 1);
                $.Notification.notify('warning', 'top center', 'Start process...', `You could close this window and refresh later, system will install plugin asynchronously.`)
            },
            success: (data, code, xhr) => {
                Custombox.close();
                $.Notification.notify('success', 'top center', 'Plug-in installed', `Plug-in has already installed to system, refresh current page.`)
                l.stop();
            },
            error: (xhr, textStatus, error) => {
                Custombox.close();

                $.Notification.notify('error', 'top center', 'Plug-in error', `Plug-in install has some errors are ${xhr.status}`)
                console.log(xhr);
                l.stop();
            }
        })
    })
}(window.jQuery));

/* eslint-disable */
(function ($) {
    // // Bind normal buttons
    // Ladda.bind('.ladda-button', { timeout: 30 * 1000 });

    // // Bind progress buttons and simulate loading progress
    // Ladda.bind('.progress-demo .ladda-button', {
    //     callback: function (instance) {
    //         var progress = 0;
    //         var interval = setInterval(function () {
    //             progress = Math.min(progress + Math.random() * 0.1, 1);
    //             instance.setProgress(progress);

    //             if (progress === 1) {
    //                 instance.stop();
    //                 clearInterval(interval);
    //             }
    //         }, 200);
    //     }
    // });

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
                l.stop();
                $.Notification.notify('success', 'top center', 'Plug-in installed', `Plug-in has already installed to system, refresh current page.`)
                Custombox.close()
            },
            error: (xhr, textStatus, error) => {
                l.stop();
                $.Notification.notify('error', 'top center', 'Plug-in error', `Plug-in install has some errors are ${xhr.status}`)
                console.log(xhr);
            }
        })
    })
}(window.jQuery));

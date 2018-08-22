/* eslint-disable */
(function ($) {
    const pluginDialog = (flow, parent, signal) => {
        const option = {
            url: '/plugin/list',
            width: '70em',
            height: '46em',
            quickClose: true,
            onshow: () => {
                // 设置的iframe的scroll属性为auto
                $('.ui-dialog-content').find('iframe').attr('scrolling', 'auto');
            },
            onclose: () => {
                location.reload();
                return false;
            },
        };
        if (flow !== undefined && parent !== undefined && signal !== undefined) {
            option.url += `/${flow}/${parent}/${signal}`;
            return top.dialog(option);
        } else {
            alert(`params not completed, ${[flow, parent, signal]}`)
        }
    };

    $('#addNodeToRoot').click(() => {
        // add to root
        const pluginList = pluginDialog($('#flowId').val(), 0, 'ANY');
        pluginList.showModal();
        return false;
    });

    $('button[data-add-node=1]').click(function () {
        const parentId = $(this).attr('data-node-id');
        const flowId = $(this).attr('data-flow-id');
        const signal = $(this).attr('data-signal');
        const pluginList = pluginDialog(flowId, parentId, signal);
        pluginList.showModal();
        return false;
    })

    $('a[data-state][data-value]').click(function () {
        const flowId = $('#flowId').val();
        const flowState = $(this).attr('data-value');
        $.ajax({
            dataType: 'json',
            url: '/flow/update',
            contentType: 'application/json',
            data: JSON.stringify({ flowId, flowState }),
            method: 'POST',
            type: 'POST',
            // beforeSend: $.Notification.notify('warning', 'top right', 'Start request...', `Try to request with data ${flowState}`),
            success: (data, code, xhr) => {
                $('.flowState').val(flowState);
                $.Notification.notify('success', 'top right', 'Request completed', `Flow data updated, state to ${flowState}`)
                // console.log(data, code, xhr)
            },
            error: (xhr, textStatus, error) => {
                $.Notification.notify('error', 'top right', 'Request failure', `Flow data not updated, error is ${xhr.status}`)
                console.log(xhr);
            }
        })
    })

    // 暂时不拖动，UI有bug，没精力调整
    // $('#nestable_list_1').nestable({
    //     maxDepth: 10,
    //     group: 1,
    // })
}(window.jQuery));

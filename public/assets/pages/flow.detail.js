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
        alert($(this).attr('data-parent-id'))
    })

    // 暂时不拖动，UI有bug，没精力调整
    // $('#nestable_list_1').nestable({
    //     maxDepth: 10,
    //     group: 1,
    // })
}(window.jQuery));

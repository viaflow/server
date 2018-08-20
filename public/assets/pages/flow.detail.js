/* eslint-disable */
(function ($) {
    const pluginDialog = (flow, parent) => {
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
        if (flow !== undefined && parent !== undefined) {
            option.url += `/${flow}/${parent}`;
        }
        return top.dialog(option);
    };

    $('#addNodeToRoot').click(() => {
        // add to root
        const pluginList = pluginDialog($('#flowId').val(), 0);
        pluginList.showModal();
        return false;
    });

    $('#nestable_list_1').nestable({
        maxDepth: 10,
        group: 1,
    })
    $('#nestable_list_2').nestable({
        maxDepth: 10,
        group: 1,
    })
}(window.jQuery));

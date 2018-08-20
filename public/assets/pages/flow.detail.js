/* eslint-disable */
const pluginDialog = (flow, parent) => {
    const option = {
        url: '/plugin/list',
        width: '76em',
        height: '46em',
        quickClose: true,
        onshow: () => {
            // 设置的iframe的scroll属性为auto
            jQuery('.ui-dialog-content').find('iframe').attr('scrolling', 'auto');
        },
    };
    if (flow !== undefined && parent !== undefined) {
        option.url += `/${flow}/${parent}`;
    }
    return dialog(option);
};

jQuery('#addNodeToRoot').click(() => {
    // add to root
    const pluginList = pluginDialog(jQuery('#flowId').val(), 0);
    pluginList.showModal();
    return false;
});

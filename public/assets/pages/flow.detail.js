$('#addNodeToRoot').click(() => {
    top.dialog({
        url: '/plugin/list',
    }).show();
    return false;
});

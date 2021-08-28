$(function () {
    // 调用gitUserInfo获取用户的基本信息
    getUserInfo()
    //点击按钮，实现退出功能
    $('#index_esc').on('click', function () {
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储的token
            localStorage.removeItem('token')
            //2.跳转登录页面
            location.href = '/login.html'

            //关闭confirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // 将headers封装到ajaxPrefilter里面去
        success: res => {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败')
            }
            renderAvatar(res.data)
        },
        // 将complete封装到ajaxPrefilter里面去
    })
}
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的图像
    if (user.user_pic) {
        $('.layui-nav-img').prop('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}
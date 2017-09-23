// translations for Chinese

export default {
    content: {
        words: {
            animation: "动画",
            fade: "褪色",
            bounce: "弹跳",
            submit: "提交",
            reset: "重启",
            continue: "继续",
            proceed: "继续",
            dismiss: "解雇",
            source_code: "源代码"
        },
        titles: {
            method_usage: "用法作为一种方法",
            directive_usage: "用法作为指令",
            confirmation_types: "确认类型",
        },
        descriptions: {
            confirmation_types: {
                1: "有时，您可能希望通过确保用户真正想要继续进行更严格",
                2: "柔软和硬确认对话框有助于此。"
            },
        },
        examples: {
            method_usage: {
                1: "警报对话框 - 一个按钮",
                2: "HTML对话框 - 风格/格式内容",
                3: "基本确认 - 立即关闭",
                4: "加载对话框 - 与ajax有用",
                5: "反转对话框 - 开关按钮",
                6: "淡化对话框 - 动画",
                7: "反弹对话框 - 动画"
            },
            directive_usage: {
                1: "给它一个字符串",
                2: "转到example.com",
                3: "给它一个对象"
            },
            confirmation_types: {
                1: "软确认 - 需要多次点击",
                2: "硬确认 - 需要验证文本"
            }
        }
    },

    messages: {
        alert: '这是一个警报对话框。 点击下面的按钮关闭。',
        html: `此对话框启用了<b class="dg-highlight-1">超文本标记语言</b>。 点击下面的按钮关闭。`,
        basic: '这是一个基本的确认对话框。 点击任一按钮立即关闭对话框',
        soft: '这是一个软确认对话框。 需要多次点击才能继续。',
        hard: `这是一个难以确认的对话框。用户的输入必须匹配 <span class="dg-highlight-1">验证</span> <span class="dg-highlight-1">文本</span>为了继续。`,
        loading: `这是一个加载对话框。 点击继续按钮后，加载程序将启动`,
        reverse: `左侧按钮是此对话框中的“继续”按钮。 点击以获得反向按钮的感觉`,
        click_continue: `你点击继续`,
        click_cancel: `关闭，因为已被点击`,
        loading_completed: `如果你看到我，那么装载机已经完成了`,
        loading_canceled: `你点击取消，所以没有加载`,
        directive_object: "此对话框也使用v-confirm指令触发。 它有OK和CANCEL回调",
        directive_string: '这是一个消息',
        directive_link: '这将带你到 "http://example.com". 请谨慎行事',
        form_reset: '更改将被丢弃。 重设此表格？',
        form_submit: '提交此表格？',
        empty_name: "名称字段为空"
    },
    placeholders: {
        your_name: "你的名字"
    }
}
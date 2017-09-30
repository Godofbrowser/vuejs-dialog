// translations for English

export default {
    content: {
        words: {
            animation: "animation",
            fade: "fade",
            bounce: "bounce",
            submit: "submit",
            reset: "Reset",
            continue: "continue",
            proceed: "continue",
            dismiss: "dismiss",
            source_code: "Source Code"
        },
        titles: {
            method_usage: "Usage as a method",
            directive_usage: "Usage as a directive",
            confirmation_types: "Confirmation types",
        },
        descriptions: {
            confirmation_types: {
                1: "Sometimes, you may want to be more strict by making sure a user really wants to proceed.",
                2: "The SOFT and HARD confirmation dialogs helps with that."
            },
        },
        examples: {
            method_usage: {
                1: "Alert Dialog - one button",
                2: "Html Dialog - style/format content",
                3: "Basic confirm - close instantly",
                4: "Loading Dialog - Useful with ajax",
                5: "Reversed Dialog - switch buttons",
                6: "Fade Dialog - Animation",
                7: "Bounce Dialog - Animation"
            },
            directive_usage: {
                1: "Give it a string",
                2: "Go to example.com",
                3: "Give it an object v-confirm=\"messageAndCallback\""
            },
            confirmation_types: {
                1: "Soft confirm - multiple clicks required",
                2: "Hard confirm - verification text required"
            }
        }
    },

    messages: {
        alert: 'This is an alert dialog. Click the button below to close.',
        html: `This dialog has <b class="dg-highlight-1">HTML</b> enabled. Click the button below to close.`,
        basic: 'This is a basic confirmation dialog. Clicking on either button dismisses the dialog instantly',
        soft: 'This is a soft confirmation dialog. Multiple clicks required to proceed.',
        hard: `This is a hard confirmation dialog. User\'s input must match <span class="dg-highlight-1">verification</span> <span class="dg-highlight-1">text</span> in order to proceed.`,
        loading: `This is a loading dialog. The loader will start once you Click on Proceed button`,
        reverse: `Left button is the Proceed button in this dialog. Click to have a feel of the reverse buttons`,
        click_continue: `You clicked continue`,
        click_cancel: `Closed because cancel was clicked`,
        loading_completed: `If you see me, then the loader has completed`,
        loading_canceled: `You clicked cancel, so there was no loading`,
        directive_object: "This dialog was also triggered using a v-confirm directive. It has both OK and CANCEL callback",
        directive_string: 'This is a message.',
        directive_link: 'This will take you to "http://example.com". Proceed with caution',
        form_reset: 'Changes would be discarded. Reset this form?',
        form_submit: 'Submit this form?',
        empty_name: "The name field is empty"
    },
    placeholders: {
        your_name: "Your name"
    }
}
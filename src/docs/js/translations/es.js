// translations for Spanish

export default {
    content: {
        words: {
            animation: "animación",
            fade: "descolorarse",
            bounce: "rebotar",
            submit: "enviar",
            reset: "Reiniciar",
            continue: "continuar",
            proceed: "proceder",
            dismiss: "despedir",
            source_code: "Código fuente"
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
        alert: 'Este es un cuadro de diálogo de alerta. Haga clic en el botón de abajo para cerrar.',
        html: `This dialog has <b class="dg-highlight-1">HTML</b> enabled. Click the button below to close.`,
        basic: 'Este es un diálogo de confirmación básico. Al hacer clic en cualquiera de los botones se descarta el cuadro de diálogo al instante',
        soft: 'Este es un diálogo de confirmación suave. Se necesitan varios clics para continuar.',
        hard: `This is a hard confirmation dialog. User\'s input must match <span class="dg-highlight-1">verification</span> <span class="dg-highlight-1">text</span> in order to proceed.`,
        loading: `Este es un diálogo de carga. El cargador se iniciará una vez que haga clic en el botón Continuar`,
        reverse: `El botón izquierdo es el botón Continuar en este cuadro de diálogo. Haga clic para tener una sensación de los botones de reversa`,
        click_continue: `Has hecho clic en continuar`,
        click_cancel: `Cerrado porque se hizo clic en cancelar`,
        loading_completed: `Si me ves, el cargador ha completado`,
        loading_canceled: `Hizo clic en cancelar, por lo que no hubo carga`,
        directive_object: "This dialog was also triggered using a v-confirm directive. It has both OK and CANCEL callback",
        directive_string: 'This is a message.',
        directive_link: 'This will take you to "http://example.com". Proceed with caution',
        form_reset: 'Changes would be discarded. Reset this form?',
        form_submit: 'Submit this form?',
        empty_name: "The name field is empty"
    },
    placeholders: {
        your_name: "Tu nombre"
    }
}
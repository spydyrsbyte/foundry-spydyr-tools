
function macro_run (event){
    const element = event.target;
    const macroName = $(element).attr('data-macro');
    const args = {};
	    
    $.each(element.attributes, function() {
        if (this.name.startsWith('data-args-')) {
            args[this.name.replace('data-args-','')] = this.value;
        }
    });
    game.macros.getName(macroName).execute(args);
}

Hooks.on("ready", () => {
	$(document).on('click', '#chat-log [data-type="macro.button"]', macro_run);
})


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

Hooks.once('init', () => {
  // Register the actual setting
  game.settings.register("spydyr-tools", "macroFolderWhitelist", {
    name: "Whitelisted Macro Folders",
    scope: "world",
    config: false,
    type: Array,
    default: []
  });

  // Register the custom settings menu
  game.settings.registerMenu("spydyr-tools", "macroFolderWhitelistMenu", {
    name: "Macro Folder Whitelist",
    label: "Configure Whitelisted Macro Folders",
    hint: "Choose which Macro folders your tools are allowed to access. Use * to allow all folders.",
    icon: "fas fa-folder",
    type: MacroFolderWhitelistConfig,
    restricted: true
  });

  // Handlebars helper for template logic
  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });
});

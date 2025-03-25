class MacroFolderWhitelistConfig extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "macro-folder-whitelist-config",
      title: "Macro Folder Whitelist",
      template: "modules/spydyr-tools/templates/macro-folder-whitelist.html",
      width: 600,
      height: "auto",
      closeOnSubmit: true
    });
  }

  async getData() {
    const folders = game.settings.get("spydyr-tools", "macroFolderWhitelist");
    const allFolders = Folder.collection.contents
      .filter(f => f.type === "Macro")
      .map(f => ({
        id: f.id,
        name: f.name
      }));

    return {
      folders,
      allFolders,
      isWildcard: folders.includes("*")
    };
  }

  async _updateObject(_event, formData) {
    const folders = Object.values(formData).filter(v => v.trim().length > 0);
    await game.settings.set("spydyr-tools", "macroFolderWhitelist", folders);
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Add folder from select
    html.find(".add-folder-select").on("click", () => {
      const select = html.find("select[name='folder-select']")[0];
      const value = select.value;
      if (!value) return;

      const container = html.find("#folder-list");
      const index = container.children().length;
      const row = $(`
        <div class="form-group">
          <input type="text" name="${index}" value="${value}" readonly />
          <button type="button" class="remove-folder">Remove</button>
        </div>
      `);
      container.append(row);
    });

    // Remove folder
    html.on("click", ".remove-folder", event => {
      $(event.currentTarget).closest(".form-group").remove();
    });

    // Add wildcard *
    html.find(".toggle-wildcard").on("click", () => {
      const container = html.find("#folder-list");
      container.empty().append(`
        <div class="form-group">
          <input type="text" name="0" value="*" readonly />
        </div>
      `);
    });
  }
}

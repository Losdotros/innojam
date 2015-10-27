sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.innojam.pic.controller.MainView", {
		onInit : function(evt) {
			var model = new sap.ui.model.json.JSONModel({
				title:"some title"
			});
			this.getView().setModel(model);
		}
	});

});
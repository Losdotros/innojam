var gifPlayers=[];
var maxDistances = {};
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.innojam.pic.controller.MainView", {
		onInit : function(evt) {
			var vendors=jQuery.sap.getModulePath("com.sap.innojam.pic.vendors", "");
			var model = new sap.ui.model.json.JSONModel({
				title:"Personalized Interactive Cockpoit",
				images:jQuery.sap.getModulePath("com.sap.innojam.pic.resources", "/images"),
				animations:jQuery.sap.getModulePath("com.sap.innojam.pic.resources", "/animations"),
				vendors:vendors
			});
			this.getView().setModel(model);
			jQuery.sap.registerModulePath("abc", "abc"); 
			jQuery.getScript(vendors+"/libgif.js", function() {
			    jQuery.getScript(vendors+"/rubbable.js", function() {
					var liveStream = new RubbableGif({ gif: document.getElementById('liveStream') } );
					liveStream.load();
					var miniMap = new RubbableGif({ gif: document.getElementById('miniMap') } );
					miniMap.load();
			    });
				
			});
		},
		handleOpen : function (oEvent) {
			var oButton = oEvent.getSource();

			// create action sheet only once
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment(
					"com.sap.innojam.pic.view.ActionSheet",
					this
				);
				this.getView().addDependent(this._actionSheet);
			}

			this._actionSheet.openBy(oButton);
		},
			//the header menu 
			
		onPress : function(event) {
			sap.m.MessageToast.show("first toast");
		}
	});

});
var gifPlayers=[];
var animations;
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.innojam.pic.controller.MainView", {
		onInit : function(evt) {
			var vendors=jQuery.sap.getModulePath("com.sap.innojam.pic.vendors", "");
			animations=jQuery.sap.getModulePath("com.sap.innojam.pic.resources", "/animations");
			var model = new sap.ui.model.json.JSONModel({
				title:"some title",
				images:jQuery.sap.getModulePath("com.sap.innojam.pic.resources", "/images"),
				animations:animations,
				vendors:vendors
			});
			this.getView().setModel(model);
			jQuery.sap.registerModulePath("abc", "abc"); 
			jQuery.getScript(vendors+"/libgif.js", function() {
			    jQuery.getScript(vendors+"/rubbable.js", function() {
					var liveStream = new RubbableGif({ gif: document.getElementById('liveStream') }, "liveStream");
					liveStream.load();
					var miniMap = new RubbableGif({ gif: document.getElementById('miniMap') }, "miniMap" );
					miniMap.load();
				//	var cockpit = new RubbableGif({ gif: document.getElementById('cockpit') }, "cockpit" );
				//	cockpit.load();
			    });
				
			});
		},
		
		onCockpit : function(event) {
			gifPlayers.forEach(function (element ) {
                if (element.playerName === "liveStream") {
                	element.pause();
                	element.load_url(animations + "/helmet.gif", function() {element.play();});
                }
            });
		},
		
		onDrone         : function(event) {
			gifPlayers.forEach(function (element ) {
                if (element.playerName === "liveStream") {
                	element.pause();
                	element.load_url(animations + "/birdsview.gif", function() {element.play();});
                }
            });
		},
		
		onRacecar : function(event) {
			gifPlayers.forEach(function (element ) {
                if (element.playerName === "liveStream") {
                	element.pause();
                	element.load_url(animations + "/sideview.gif", function() {element.play();});
                }
            });
		},
		
		handleOpenDriver         : function (oEvent) {
			var oButton = oEvent.getSource();
			// create action sheet only once
			if (!this._actionSheetDriver) {
				this._actionSheetDriver = sap.ui.xmlfragment(
					"com.sap.innojam.pic.view.ActionSheetDrivers",
					this
				);
				this.getView().addDependent(this._actionSheetDriver);
			}
			this._actionSheetDriver.openBy(oButton);
		},
		
			handleOpenLevel         : function (oEvent) {
			var oButton2 = oEvent.getSource();
			// create action sheet only once
			if (!this._actionSheetLevel) {
				this._actionSheetLevel = sap.ui.xmlfragment(
					"com.sap.innojam.pic.view.ActionSheetLevel",
					this
				);
				this.getView().addDependent(this._actionSheetLevel);
			}
			this._actionSheetLevel.openBy(oButton2);
		},
		onPress : function(event) {
			sap.m.MessageToast.show("first toast");
		}
	});

});
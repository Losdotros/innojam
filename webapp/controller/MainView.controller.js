sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.innojam.pic.controller.MainView", {
		onInit : function(evt) {
			var model = new sap.ui.model.json.JSONModel({
				title:"some title",
				TilesCollection: [
		{
			"icon" : "hint",
			"type" : "Monitor",
			"title" : "Tiles: a modern UI design pattern for overview & navigation."
		},
		{
			"icon" : "inbox",
			"number" : "89",
			"title" : "Approve Leave Requests",
			"info" : "Overdue",
			"infoState" : "Error"
		},
		{
			"type" : "Create",
			"title" : "Create Leave Requests",
			"info" : "28 Days Left",
			"infoState" : "Success"
		},
		{
			"icon" : "travel-expense-report",
			"number" : "281",
			"numberUnit" : "euro",
			"title" : "Travel Reimbursement",
			"info" : "1 day ago"
		},
		{
			"icon" : "loan",
			"number" : "2380",
			"numberUnit" : "euro",
			"title" : "My Salary",
			"info" : "8 days ago"
		},
		{
			"icon" : "lab",
			"number" : "1",
			"numberUnit" : "Invention",
			"title" : "Test Lab Reports",
			"info" : "8 Days Ago"
		},
		{
			"icon" : "inbox",
			"type" : "Monitor",
			"title" : "Leave Request History"
		},
		{
			"type" : "Create",
			"title" : "Create Purchase Order",
			"info" : "890€ Open Budget",
			"infoState" : "Success"
		},
		{
			"icon" : "stethoscope",
			"number" : "3",
			"title" : "Yearly Health Check",
			"info" : "3 year overdue",
			"infoState" : "Error"
		},
		{
			"icon" : "meal",
			"type" : "Monitor",
			"title" : "Meal Schedule"
		},
		{
			"icon" : "cart",
			"number" : "787",
			"numberUnit" : "euro",
			"title" : "My Shopping Carts",
			"info" : "Waiting for Approval",
			"infoState" : "Warning"
		},
		{
			"icon" : "factory",
			"number" : "2",
			"numberUnit" : "Outages",
			"title" : "Factory Power Management",
			"info" : "Production On Hold",
			"infoState" : "Error"
		},
		{
			"icon" : "calendar",
			"title" : "Team Calendar"
		},
		{
			"icon" : "pie-chart",
			"number" : "5",
			"title" : "Financial Reports",
			"info" : "4 day ago",
			"infoState" : "Warning"
		}
	]
			});
			this.getView().setModel(model);
			
			
		},
		onPress : function(event) {
			sap.m.MessageToast.show("first toast");
		}
	});

});
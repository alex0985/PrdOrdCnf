sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("alwe.ProdOrderConf.controller.Operations", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf alwe.ProdOrderConf.view.Operations
		 */
			onInit: function() {
				
			},
			onSelect: function(oEvent){

			},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf alwe.ProdOrderConf.view.Operations
		 */
			onBeforeRendering: function() {
				var oModel = this.getOwnerComponent().getModel();
				var oList = this.getView().byId("idOperationList");
				var oTemplate = this.byId("idListItemTemplate");
				oList.setModel(oModel);
				oList.bindItems("/OperationSet",oTemplate);
		}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf alwe.ProdOrderConf.view.Operations
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf alwe.ProdOrderConf.view.Operations
		 */
		//	onExit: function() {
		//
		//	}

	});

});
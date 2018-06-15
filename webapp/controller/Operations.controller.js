sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device"
], function(Controller, Device) {
	"use strict";

	return Controller.extend("alwe.ProdOrderConf.controller.Operations", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf alwe.ProdOrderConf.view.Operations
		 */
			onInit: function(oEvent) {
			},
			onSelect: function(oEvent){
			//	var oSelected = 
				var oRouter = this.getOwnerComponent().getRouter();
				this._showDetail(oEvent.getParameter("listItem"), oRouter);
			},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf alwe.ProdOrderConf.view.Operations
		 */
			onBeforeRendering: function(oEvent) {
				//Get Order Number from variable in global Model SELECTION
				var order = this.getView().getModel("selection").getProperty("/order");
				
				//Get Operation List Controll
				var oList = this.getView().byId("idOperationList");
				//Template also requiret
				var oTemplate = this.byId("idListItemTemplate");
				//Get global Odata Model and assign it to List
				var oModel = this.getOwnerComponent().getModel();
				oList.setModel(oModel);
				//Bind Items and set the Filter
				oList.bindItems("/OperationSet", oTemplate);
				
				var filter = [];
				var filterOrder = new sap.ui.model.Filter("OrderNumber", sap.ui.model.FilterOperator.EQ, order);
				filter.push(filterOrder);
				oList.getBinding("items").filter(filter);
		},
		
		onNavBack: function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("master", true);
		},
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
			onExit: function() {
			},
			
			_showDetail: function(oItem, oRouter){
				var bReplace = !Device.system.phone;
				var oModelSelection = this.getView().getModel("selection");
				oModelSelection.setProperty("/opPath", oItem.getBindingContextPath());
				oModelSelection.setProperty("/ConfNo", oItem.getBindingContext().getProperty("ConfNo"));
				
				oRouter.navTo("object", {
					objectId : oItem.getBindingContext().getProperty("RoutingNo") +  oItem.getBindingContext().getProperty("Counter")
				}, bReplace);
			}
	});

});
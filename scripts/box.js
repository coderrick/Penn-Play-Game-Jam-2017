
 pymongoteScript('box');
Box.attributes.add("boxHalfExtents", {type: "vec3", default: [0.5, 0.5, 0.5], title: "Box Half Extents"});
Box.attributes.add("boxIdleMaterial", {type: "asset", assetType: "material", title: "Box Idle Material"});
Box.attributes.add("boxHighlightedMaterial", {type: "asset", assetType: "material", title: "Box Highlighted Material"});

Box.attributes.add("loadingBar", {type: "entity", title: "Loading Bar", description: ""});
Box.attributes.add("barLoadingMaterial", {type: "asset", assetType: "material", title: "Bar Loading Material"});
Box.attributes.add("barSelectedMaterial", {type: "asset", assetType: "material", title: "Bar Selected Material"});

// initialize code called once per entity
Box.prototype.initialize = function() {
    this._aabb = new pc.BoundingBox(this.entity.getPosition().clone(), this.boxHalfExtents);
    this.loadingBarModel = this.loadingBar.children[0].model;
    this.boxModel = this.entity.model;
};

Box.prototype.postInitialize = function() {    
    this.app.fire("selectorcamera:add", this.entity, this._aabb);

    this.entity.on("selectorcamera:hover", this.onHover, this);
    this.entity.on("selectorcamera:unhover", this.onUnhover, this);
    this.entity.on("selectorcamera:selectionprogress", this.onSelectionProgress, this);
    this.entity.on("selectorcamera:select", this.onSelect, this);     
};

Box.prototype.update = function() {
    
};

Box.prototype.onHover = function () {
    // Enable the status bar and change the material to the 'loading' texture
    this.loadingBar.enabled = true;
    this.loadingBarModel.materialAsset = this.barLoadingMaterial;
    this.loadingBar.setLocalScale(0.0001, 1, 1);
};

Box.prototype.onUnhover = function () {
    // Hide the status bar 
    this.loadingBar.enabled = false;
    
    this.boxModel.materialAsset = this.boxIdleMaterial;
};

Box.prototype.onSelect = function () {
    // Change the status bar material to the 'selected' texture
    this.loadingBarModel.materialAsset = this.barSelectedMaterial;
    
    this.boxModel.materialAsset = this.boxHighlightedMaterial;
};

Box.prototype.onSelectionProgress = function (progress) {
    // Scale the bar based on the progress
    this.loadingBar.setLocalScale(progress, 1, 1);
}; 

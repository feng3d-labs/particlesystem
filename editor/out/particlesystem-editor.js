var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var editor;
(function (editor) {
    editor.createObjectMenu.push({
        label: "粒子系统",
        click: function () {
            editor.hierarchy.addGameObject(feng3d.GameObject.createPrimitive("Particle System"));
        }
    });
})(editor || (editor = {}));
var editor;
(function (editor) {
    /**
     * 粒子特效控制器
     */
    var ParticleEffectController = /** @class */ (function (_super) {
        __extends(ParticleEffectController, _super);
        function ParticleEffectController() {
            var _this = _super.call(this) || this;
            _this.particleSystems = [];
            _this.skinName = "ParticleEffectController";
            return _this;
        }
        ParticleEffectController.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            this.initView();
            this.updateView();
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.pauseBtn.addEventListener(egret.MouseEvent.CLICK, this.onClick, this);
            this.stopBtn.addEventListener(egret.MouseEvent.CLICK, this.onClick, this);
        };
        ParticleEffectController.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.pauseBtn.removeEventListener(egret.MouseEvent.CLICK, this.onClick, this);
            this.stopBtn.removeEventListener(egret.MouseEvent.CLICK, this.onClick, this);
        };
        ParticleEffectController.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.stopBtn:
                    this.particleSystems.forEach(function (v) { return v.stop(); });
                    break;
                case this.pauseBtn:
                    if (this.isParticlePlaying)
                        this.particleSystems.forEach(function (v) { return v.pause(); });
                    else
                        this.particleSystems.forEach(function (v) { return v.continue(); });
                    break;
            }
            this.updateView();
        };
        ParticleEffectController.prototype.onEnterFrame = function () {
            var v = this.particleSystems;
            if (v) {
                var playbackSpeed = (this.particleSystems[0] && this.particleSystems[0].main.simulationSpeed) || 1;
                var playbackTime = (this.particleSystems[0] && this.particleSystems[0].time) || 0;
                var particles = this.particleSystems.reduce(function (pv, cv) { pv += cv.particleCount; return pv; }, 0);
                //
                this.speedInput.text = playbackSpeed.toString();
                this.timeInput.text = playbackTime.toFixed(3);
                this.particlesInput.text = particles.toString();
            }
        };
        ParticleEffectController.prototype.initView = function () {
            var _this = this;
            if (this.saveParent)
                return;
            this.saveParent = this.parent;
            feng3d.ticker.nextframe(function () {
                _this.parent.removeChild(_this);
            });
            feng3d.globalDispatcher.on("editor.selectedObjectsChanged", this.onDataChange, this);
        };
        ParticleEffectController.prototype.updateView = function () {
            if (!this.particleSystems)
                return;
            this.pauseBtn.label = this.isParticlePlaying ? "Pause" : "Continue";
        };
        Object.defineProperty(ParticleEffectController.prototype, "isParticlePlaying", {
            get: function () {
                return this.particleSystems.reduce(function (pv, cv) { return pv || cv.isPlaying; }, false);
            },
            enumerable: false,
            configurable: true
        });
        ParticleEffectController.prototype.onDataChange = function () {
            var _this = this;
            var particleSystems = editor.editorData.selectedGameObjects.reduce(function (pv, cv) { var ps = cv.getComponent("ParticleSystem"); ps && (pv.push(ps)); return pv; }, []);
            this.particleSystems.forEach(function (v) {
                v.pause();
                v.off("particleCompleted", _this.updateView, _this);
            });
            this.particleSystems = particleSystems;
            this.particleSystems.forEach(function (v) {
                v.continue();
                v.on("particleCompleted", _this.updateView, _this);
            });
            if (this.particleSystems.length > 0)
                this.saveParent.addChild(this);
            else
                this.parent && this.parent.removeChild(this);
        };
        return ParticleEffectController;
    }(eui.Component));
    editor.ParticleEffectController = ParticleEffectController;
})(editor || (editor = {}));
var editor;
(function (editor) {
    var ParticleComponentView = /** @class */ (function (_super) {
        __extends(ParticleComponentView, _super);
        /**
         * 对象界面数据
         */
        function ParticleComponentView(component) {
            var _this = _super.call(this) || this;
            _this.component = component;
            _this.once(eui.UIEvent.COMPLETE, _this.onComplete, _this);
            _this.skinName = "ParticleComponentView";
            return _this;
        }
        /**
         * 更新界面
         */
        ParticleComponentView.prototype.updateView = function () {
            this.updateEnableCB();
            if (this.componentView)
                this.componentView.updateView();
        };
        ParticleComponentView.prototype.onComplete = function () {
            var componentName = feng3d.classUtils.getQualifiedClassName(this.component).split(".").pop();
            this.accordion.titleName = componentName;
            this.componentView = feng3d.objectview.getObjectView(this.component, { autocreate: false, excludeAttrs: ["enabled"] });
            this.accordion.addContent(this.componentView);
            this.enabledCB = this.accordion["enabledCB"];
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            if (this.stage)
                this.onAddToStage();
        };
        ParticleComponentView.prototype.onAddToStage = function () {
            this.updateView();
            this.enabledCB.addEventListener(egret.Event.CHANGE, this.onEnableCBChange, this);
            feng3d.watcher.watch(this.component, "enabled", this.updateEnableCB, this);
        };
        ParticleComponentView.prototype.onRemovedFromStage = function () {
            this.enabledCB.removeEventListener(egret.Event.CHANGE, this.onEnableCBChange, this);
            feng3d.watcher.unwatch(this.component, "enabled", this.updateEnableCB, this);
        };
        ParticleComponentView.prototype.updateEnableCB = function () {
            this.enabledCB.selected = this.component.enabled;
        };
        ParticleComponentView.prototype.onEnableCBChange = function () {
            this.component.enabled = this.enabledCB.selected;
        };
        return ParticleComponentView;
    }(eui.Component));
    editor.ParticleComponentView = ParticleComponentView;
})(editor || (editor = {}));
var editor;
(function (editor) {
    var OAVParticleComponentList = /** @class */ (function (_super) {
        __extends(OAVParticleComponentList, _super);
        function OAVParticleComponentList(attributeViewInfo) {
            var _this = _super.call(this, attributeViewInfo) || this;
            _this.skinName = "OAVParticleComponentList";
            return _this;
        }
        Object.defineProperty(OAVParticleComponentList.prototype, "space", {
            get: function () {
                return this._space;
            },
            set: function (value) {
                this._space = value;
                this.dispose();
                this.initView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OAVParticleComponentList.prototype, "attributeName", {
            get: function () {
                return this._attributeName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OAVParticleComponentList.prototype, "attributeValue", {
            get: function () {
                return this._space[this._attributeName];
            },
            set: function (value) {
                if (this._space[this._attributeName] != value) {
                    this._space[this._attributeName] = value;
                }
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        OAVParticleComponentList.prototype.initView = function () {
            this.group.layout.gap = -1;
            var components = this.attributeValue;
            for (var i = 0; i < components.length; i++) {
                this.addComponentView(components[i]);
            }
        };
        OAVParticleComponentList.prototype.dispose = function () {
            var components = this.attributeValue;
            for (var i = 0; i < components.length; i++) {
                this.removedComponentView(components[i]);
            }
        };
        /**
         * 更新界面
         */
        OAVParticleComponentList.prototype.updateView = function () {
            for (var i = 0, n = this.group.numChildren; i < n; i++) {
                var child = this.group.getChildAt(i);
                if (child instanceof editor.ParticleComponentView)
                    child.updateView();
            }
        };
        OAVParticleComponentList.prototype.addComponentView = function (component) {
            var o;
            var displayObject = new editor.ParticleComponentView(component);
            displayObject.percentWidth = 100;
            this.group.addChild(displayObject);
        };
        OAVParticleComponentList.prototype.removedComponentView = function (component) {
            for (var i = this.group.numChildren - 1; i >= 0; i--) {
                var displayObject = this.group.getChildAt(i);
                if (displayObject instanceof editor.ParticleComponentView && displayObject.component == component) {
                    this.group.removeChild(displayObject);
                }
            }
        };
        OAVParticleComponentList = __decorate([
            feng3d.OAVComponent()
        ], OAVParticleComponentList);
        return OAVParticleComponentList;
    }(editor.OAVBase));
    editor.OAVParticleComponentList = OAVParticleComponentList;
})(editor || (editor = {}));
//# sourceMappingURL=particlesystem-editor.js.map
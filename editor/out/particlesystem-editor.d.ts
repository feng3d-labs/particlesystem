declare namespace editor {
}
declare namespace editor {
    /**
     * 粒子特效控制器
     */
    class ParticleEffectController extends eui.Component {
        pauseBtn: eui.Button;
        stopBtn: eui.Button;
        speedInput: eui.TextInput;
        timeInput: eui.TextInput;
        particlesInput: eui.TextInput;
        private saveParent;
        private particleSystems;
        constructor();
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        private onClick;
        private onEnterFrame;
        private initView;
        private updateView;
        private get isParticlePlaying();
        private onDataChange;
    }
}
declare namespace editor {
    class ParticleComponentView extends eui.Component {
        component: feng3d.ParticleModule;
        componentView: feng3d.IObjectView;
        accordion: editor.Accordion;
        enabledCB: eui.CheckBox;
        /**
         * 对象界面数据
         */
        constructor(component: feng3d.ParticleModule);
        /**
         * 更新界面
         */
        updateView(): void;
        private onComplete;
        private onAddToStage;
        private onRemovedFromStage;
        private updateEnableCB;
        private onEnableCBChange;
    }
}
declare namespace editor {
    class OAVParticleComponentList extends OAVBase {
        protected _space: feng3d.ParticleSystem;
        group: eui.Group;
        constructor(attributeViewInfo: feng3d.AttributeViewInfo);
        get space(): feng3d.ParticleSystem;
        set space(value: feng3d.ParticleSystem);
        get attributeName(): string;
        get attributeValue(): Object;
        set attributeValue(value: Object);
        initView(): void;
        dispose(): void;
        /**
         * 更新界面
         */
        updateView(): void;
        private addComponentView;
        private removedComponentView;
    }
}
//# sourceMappingURL=particlesystem-editor.d.ts.map
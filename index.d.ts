declare namespace feng3d {
    /**
     * 粒子
     */
    class Particle {
        /**
         * 出生时间
         */
        birthTime: number;
        /**
         * 寿命
         */
        lifetime: number;
        /**
         * 位置
         */
        position: Vector3;
        /**
         * 速度
         */
        velocity: Vector3;
        /**
         * 加速度
         */
        acceleration: Vector3;
        /**
         * 旋转角度
         */
        rotation: Vector3;
        /**
         * 角速度
         */
        angularVelocity: Vector3;
        /**
         * 尺寸
         */
        size: Vector3;
        /**
         * 起始尺寸
         */
        startSize: Vector3;
        /**
         * 颜色
         */
        color: Color4;
        /**
         * 起始颜色
         */
        startColor: Color4;
        /**
         * 纹理UV缩放和偏移。
         */
        tilingOffset: Vector4;
        /**
         * 在粒子上翻转UV坐标，使它们呈现水平镜像。
         */
        flipUV: Vector2;
        /**
         * 出生时在周期的位置（在发射时被更新）
         */
        birthRateAtDuration: number;
        /**
         * 此时粒子在生命周期的位置（在更新状态前被更新）
         */
        rateAtLifeTime: number;
        /**
         * 缓存，用于存储计算时临时数据
         */
        cache: {};
        /**
         * 上次记录的时间
         */
        preTime: number;
        /**
         * 当前记录的时间
         */
        curTime: number;
        /**
         * 上次记录位置
         */
        prePosition: Vector3;
        /**
         * 当前记录位置
         */
        curPosition: Vector3;
        /**
         * 子发射器信息
         */
        subEmitInfo: ParticleSystemEmitInfo;
        /**
         * 更新状态
         */
        updateState(time: number): void;
    }
}
declare namespace feng3d {
    interface UniformsTypes {
        Particles_Additive: ParticlesAdditiveUniforms;
    }
    /**
     * UnityShader "Particles/Additive"
     */
    class ParticlesAdditiveUniforms {
        __class__: "feng3d.ParticlesAdditiveUniforms";
        _TintColor: Color4;
        /**
         * 粒子贴图
         */
        _MainTex: Texture2D<Texture2DEventMap>;
        /**
         * 粒子贴图使用的UV变换
         */
        _MainTex_ST: Vector4;
        /**
         * @todo
         */
        _InvFade: number;
    }
    interface DefaultMaterial {
        "Particle-Material": Material;
    }
}
declare namespace feng3d {
    /**
     * UnityShader "Particles/Alpha Blended Premultiply"
     */
    class ParticlesAlphaBlendedPremultiplyUniforms {
        __class__: "feng3d.ParticlesAlphaBlendedPremultiplyUniforms";
        /**
         * 粒子贴图
         */
        _MainTex: Texture2D<Texture2DEventMap>;
        /**
         * 粒子贴图使用的UV变换
         */
        _MainTex_ST: Vector4;
        /**
         * @todo
         */
        u_softParticlesFactor: number;
    }
}
declare namespace feng3d {
    interface ComponentMap {
        ParticleSystem: ParticleSystem;
    }
    interface GameObjectEventMap {
        /**
         * 粒子系统播放完一个周期
         */
        particleCycled: ParticleSystem;
        /**
         * 粒子效果播放结束
         */
        particleCompleted: ParticleSystem;
    }
    /**
     * 粒子系统
     */
    class ParticleSystem extends Renderable {
        __class__: "feng3d.ParticleSystem";
        /**
         * Is the particle system playing right now ?
         *
         * 粒子系统正在运行吗?
         */
        get isPlaying(): boolean;
        private _isPlaying;
        /**
         * Is the particle system stopped right now ?
         *
         * 粒子系统现在停止了吗?
         */
        get isStopped(): boolean;
        /**
         * Is the particle system paused right now ?
         *
         * 粒子系统现在暂停了吗?
         */
        get isPaused(): boolean;
        /**
         * The current number of particles (Read Only).
         *
         * 当前粒子数(只读)。
         */
        get particleCount(): number;
        /**
         * Playback position in seconds.
         *
         * 回放位置(秒)
         */
        time: number;
        get main(): ParticleMainModule;
        set main(v: ParticleMainModule);
        private _main;
        get emission(): ParticleEmissionModule;
        set emission(v: ParticleEmissionModule);
        private _emission;
        get shape(): ParticleShapeModule;
        set shape(v: ParticleShapeModule);
        private _shape;
        get velocityOverLifetime(): ParticleVelocityOverLifetimeModule;
        set velocityOverLifetime(v: ParticleVelocityOverLifetimeModule);
        private _velocityOverLifetime;
        get limitVelocityOverLifetime(): ParticleLimitVelocityOverLifetimeModule;
        set limitVelocityOverLifetime(v: ParticleLimitVelocityOverLifetimeModule);
        private _limitVelocityOverLifetime;
        /**
         * Script interface for the Particle System velocity inheritance module.
         *
         * 粒子系统速度继承模块。
         */
        get inheritVelocity(): ParticleInheritVelocityModule;
        set inheritVelocity(v: ParticleInheritVelocityModule);
        private _inheritVelocity;
        get forceOverLifetime(): ParticleForceOverLifetimeModule;
        set forceOverLifetime(v: ParticleForceOverLifetimeModule);
        private _forceOverLifetime;
        get colorOverLifetime(): ParticleColorOverLifetimeModule;
        set colorOverLifetime(v: ParticleColorOverLifetimeModule);
        private _colorOverLifetime;
        /**
         * 颜色随速度变化模块。
         */
        get colorBySpeed(): ParticleColorBySpeedModule;
        set colorBySpeed(v: ParticleColorBySpeedModule);
        private _colorBySpeed;
        get sizeOverLifetime(): ParticleSizeOverLifetimeModule;
        set sizeOverLifetime(v: ParticleSizeOverLifetimeModule);
        private _sizeOverLifetime;
        /**
         * 缩放随速度变化模块
         */
        get sizeBySpeed(): ParticleSizeBySpeedModule;
        set sizeBySpeed(v: ParticleSizeBySpeedModule);
        private _sizeBySpeed;
        get rotationOverLifetime(): ParticleRotationOverLifetimeModule;
        set rotationOverLifetime(v: ParticleRotationOverLifetimeModule);
        private _rotationOverLifetime;
        /**
         * 旋转角度随速度变化模块
         */
        get rotationBySpeed(): ParticleRotationBySpeedModule;
        set rotationBySpeed(v: ParticleRotationBySpeedModule);
        private _rotationBySpeed;
        /**
         * 旋转角度随速度变化模块
         */
        get noise(): ParticleNoiseModule;
        set noise(v: ParticleNoiseModule);
        private _noise;
        /**
         * 旋转角度随速度变化模块
         */
        get subEmitters(): ParticleSubEmittersModule;
        set subEmitters(v: ParticleSubEmittersModule);
        private _subEmitters;
        /**
         * 粒子系统纹理表动画模块。
         */
        get textureSheetAnimation(): ParticleTextureSheetAnimationModule;
        set textureSheetAnimation(v: ParticleTextureSheetAnimationModule);
        private _textureSheetAnimation;
        geometry: QuadGeometry;
        material: Material;
        castShadows: boolean;
        receiveShadows: boolean;
        get single(): boolean;
        constructor();
        update(interval: number): void;
        /**
         * 停止
         */
        stop(): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 继续
         */
        continue(): void;
        beforeRender(renderAtomic: RenderAtomic, scene: Scene, camera: Camera): void;
        private _awaked;
        /**
         * 粒子池，用于存放未发射或者死亡粒子
         */
        private _particlePool;
        /**
         * 活跃的粒子列表
         */
        private _activeParticles;
        /**
         * 属性数据列表
         */
        private _attributes;
        private readonly _modules;
        /**
         * 发射粒子
         *
         * @param startTime 发射起始时间
         * @param endTime 发射终止时间
         * @param startPos 发射起始位置
         * @param stopPos 发射终止位置
         */
        private _emit;
        /**
         * 计算在指定移动的位移线段中发射的粒子列表。
         *
         * @param rateAtDuration
         * @param prePos
         * @param currentPos
         */
        private _emitWithMove;
        /**
         * 计算在指定时间段内发射的粒子列表
         *
         * @param rateAtDuration
         * @param preRealTime
         * @param duration
         * @param realEmitTime
         */
        private _emitWithTime;
        /**
         * 发射粒子
         * @param birthTime 发射时间
         * @param num 发射数量
         */
        private _emitParticles;
        /**
         * 更新活跃粒子状态
         */
        private _updateActiveParticlesState;
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        private _initParticleState;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        private _updateParticleState;
        private _simulationSpaceChanged;
        /**
         * 给指定粒子添加指定空间的位移。
         *
         * @param particle 粒子。
         * @param position 速度。
         * @param space 速度所在空间。
         * @param name  速度名称。如果不为 undefined 时保存，调用 removeParticleVelocity 可以移除该部分速度。
         */
        addParticlePosition(particle: Particle, position: Vector3, space: ParticleSystemSimulationSpace, name?: string): void;
        /**
         * 移除指定粒子上的位移
         *
         * @param particle 粒子。
         * @param name 位移名称。
         */
        removeParticlePosition(particle: Particle, name: string): void;
        /**
         * 给指定粒子添加指定空间的速度。
         *
         * @param particle 粒子。
         * @param velocity 速度。
         * @param space 速度所在空间。
         * @param name  速度名称。如果不为 undefined 时保存，调用 removeParticleVelocity 可以移除该部分速度。
         */
        addParticleVelocity(particle: Particle, velocity: Vector3, space: ParticleSystemSimulationSpace, name?: string): void;
        /**
         * 移除指定粒子上的速度
         *
         * @param particle 粒子。
         * @param name 速度名称。
         */
        removeParticleVelocity(particle: Particle, name: string): void;
        /**
         * 给指定粒子添加指定空间的速度。
         *
         * @param particle 粒子。
         * @param acceleration 加速度。
         * @param space 加速度所在空间。
         * @param name  加速度名称。如果不为 undefined 时保存，调用 removeParticleVelocity 可以移除该部分速度。
         */
        addParticleAcceleration(particle: Particle, acceleration: Vector3, space: ParticleSystemSimulationSpace, name?: string): void;
        /**
         * 移除指定粒子上的加速度
         *
         * @param particle 粒子。
         * @param name 加速度名称。
         */
        removeParticleAcceleration(particle: Particle, name: string): void;
        /**
         * 触发子发射器
         *
         * @param subEmitterIndex 子发射器索引
         */
        TriggerSubEmitter(subEmitterIndex: number, particles?: Particle[]): void;
        /**
         * 是否为被上级粒子系统引用的子粒子系统。
         */
        _isSubParticleSystem: boolean;
        /**
         * 发射信息
         */
        _emitInfo: ParticleSystemEmitInfo;
    }
    /**
     * 粒子系统发射器状态信息
     */
    interface ParticleSystemEmitInfo {
        /**
         * 上次粒子系统时间
         */
        preTime: number;
        /**
         * 当前粒子系统时间
         */
        currentTime: number;
        /**
         * 上次世界坐标
         */
        preWorldPos: Vector3;
        /**
         * 当前世界坐标
         */
        currentWorldPos: Vector3;
        /**
         * 发射器本地位置
         */
        position: Vector3;
        /**
         * Start delay in seconds.
         * 启动延迟(以秒为单位)。在调用.play()时初始化值。
         */
        startDelay: number;
        /**
         * 此次位移
         */
        moveVec: Vector3;
        /**
         * 当前移动速度
         */
        speed: Vector3;
        /**
         * 此时在发射周期的位置
         */
        rateAtDuration: number;
        /**
         * 用于处理移动发射的剩余移动距离。
         */
        _leftRateOverDistance: number;
        /**
         * 是否已经执行位移发射。
         */
        _isRateOverDistance: boolean;
    }
    interface DefaultGeometry {
        "Billboard-Geometry": QuadGeometry;
    }
    interface PrimitiveGameObject {
        "Particle System": GameObject;
    }
}
declare namespace feng3d {
    class ParticleEmissionBurst {
        __class__: "feng3d.ParticleEmissionBurst";
        /**
         * The time that each burst occurs.
         * 每次爆炸发生的时间。
         */
        time: number;
        /**
         * 要发射的粒子数。
         */
        count: MinMaxCurve;
        /**
         * Minimum number of bursts to be emitted.
         * 要发射的最小爆发数量。
         */
        get minCount(): number;
        set minCount(v: number);
        /**
         * Maximum number of bursts to be emitted.
         *
         * 要发射的最大爆发数量。
         */
        get maxCount(): number;
        set maxCount(v: number);
        /**
         * 喷发被触发的几率。
         */
        probability: number;
        /**
         * 是否喷发
         */
        get isProbability(): boolean;
        private _isProbability;
        /**
         * 通过触发的几率计算是否喷发。
         */
        calculateProbability(): boolean;
    }
}
declare namespace feng3d {
    /**
     * The mode used to generate new points in a shape (Shuriken).
     *
     * 用于在形状中生成新点的模式
     */
    enum ParticleSystemShapeMultiModeValue {
        /**
         * Generate points randomly. (Default)
         *
         * 生成随机点。(默认)
         */
        Random = 0,
        /**
         * Animate the emission point around the shape.
         *
         * 使发射点围绕形状运动。
         */
        Loop = 1,
        /**
         * Animate the emission point around the shape, alternating between clockwise and counter-clockwise directions.
         *
         * 使发射点围绕形状运动，在顺时针和逆时针方向之间交替。
         */
        PingPong = 2,
        /**
         * Distribute new particles around the shape evenly.
         *
         * 在形状周围均匀分布新粒子。
         *
         * @todo
         */
        BurstSpread = 3
    }
}
declare namespace feng3d {
    /**
     * 粒子系统圆锥体发射类型，用于定义基于圆锥体的发射类型。
     */
    enum ParticleSystemShapeConeEmitFrom {
        /**
         * 从圆锥体底面发射。
         */
        Base = 0,
        /**
         * 从圆锥体底面边缘沿着曲面发射。
         */
        BaseShell = 1,
        /**
         * 从圆锥体内部发射。
         */
        Volume = 2,
        /**
         * 从圆锥体曲面沿着曲面发射。
         */
        VolumeShell = 3
    }
}
declare namespace feng3d {
    /**
     * The animation type.
     *
     * 动画类型。
     */
    enum ParticleSystemAnimationType {
        /**
         * Animate over the whole texture sheet from left to right, top to bottom.
         *
         * 从左到右，从上到下动画整个纹理表。
         */
        WholeSheet = 0,
        /**
         * Animate a single row in the sheet from left to right.
         *
         * 从左到右移动工作表中的一行。
         */
        SingleRow = 1
    }
}
declare namespace feng3d {
    /**
     * A flag representing each UV channel.
     * 一个代表每个紫外线频道的旗子。
     */
    enum UVChannelFlags {
        /**
         * 无通道。
         */
        Nothing = 0,
        /**
         * First UV channel.
         * 第一UV通道。
         */
        UV0 = 1,
        /**
         * Second UV channel.
         * 第二UV通道。
         */
        UV1 = 2,
        /**
         * Third UV channel.
         * 第三UV通道。
         */
        UV2 = 4,
        /**
         * Fourth UV channel.
         * 第四UV通道。
         */
        UV3 = 8,
        /**
         * All channel.
         * 所有通道。
         */
        Everything = 15
    }
}
declare namespace feng3d {
    /**
     * 粒子模拟空间
     */
    enum ParticleSystemSimulationSpace {
        /**
         * Simulate particles in local space.
         *
         * 模拟局部空间中的粒子。
         */
        Local = 0,
        /**
         * Simulate particles in world space.
         *
         * 模拟世界空间中的粒子。
         */
        World = 1
    }
}
declare namespace feng3d {
    /**
     * Control how particle systems apply transform scale.
     *
     * 控制粒子系统如何应用变换尺度。
     */
    enum ParticleSystemScalingMode {
        /**
         * Scale the particle system using the entire transform hierarchy.
         *
         * 使用整个转换层次来缩放粒子系统。
         */
        Hierarchy = 0,
        /**
         * Scale the particle system using only its own transform scale. (Ignores parent scale).
         *
         * 尺度粒子系统只使用自己的变换尺度。(忽略了父母规模)。
         */
        Local = 1,
        /**
         * Only apply transform scale to the shape component, which controls where particles are spawned, but does not affect their size or movement.
         *
         * 只对形状组件应用变换比例，它控制生成粒子的位置，但不影响粒子的大小或移动。
         */
        Shape = 2
    }
}
declare namespace feng3d {
    /**
     * 发射形状
     */
    enum ParticleSystemShapeType {
        /**
         * Emit from a sphere.
         *
         * 从球体的体积中发射。
         */
        Sphere = 0,
        /**
         * Emit from the surface of a sphere.
         *
         * 从球体表面发射。
         */
        SphereShell = 1,
        /**
         * Emit from a half-sphere.
         *
         * 从半球体的体积发射。
         */
        Hemisphere = 2,
        /**
         * Emit from the surface of a half-sphere.
         *
         * 从半球体的表面发射。
         */
        HemisphereShell = 3,
        /**
         * Emit from a cone.
         *
         * 从圆锥体发射。
         */
        Cone = 4,
        /**
         * Emit from the base surface of a cone.
         *
         * 从圆锥体的基面发射。
         */
        ConeShell = 7,
        /**
         * Emit from the volume of a cone.
         *
         * 从一个圆锥体的体积发出。
         */
        ConeVolume = 8,
        /**
         * Emit from the surface of a cone.
         *
         * 从一个圆锥体的表面发射。
         */
        ConeVolumeShell = 9,
        /**
         * Emit from the volume of a box.
         *
         * 从一个盒子的体积中发出。
         */
        Box = 5,
        /**
         * Emit from the surface of a box.
         *
         * 从盒子表面发射。
         */
        BoxShell = 15,
        /**
         * Emit from the edges of a box.
         *
         * 从盒子的边缘发出。
         */
        BoxEdge = 16,
        /**
         * Emit from a mesh.
         *
         * 从一个网格中发出。
         *
         * @todo
         */
        Mesh = 6,
        /**
         * Emit from a mesh renderer.
         *
         * 从一个网格渲染器发射。
         *
         * @todo
         */
        MeshRenderer = 13,
        /**
         * Emit from a skinned mesh renderer.
         *
         * 从蒙皮网格渲染器发出。
         *
         * @todo
         */
        SkinnedMeshRenderer = 14,
        /**
         * Emit from a circle.
         *
         * 从一个圆发出。
         */
        Circle = 10,
        /**
         * Emit from the edge of a circle.
         *
         * 从圆的边缘发出。
         */
        CircleEdge = 11,
        /**
         * Emit from an edge.
         *
         * 从边缘发出。
         */
        SingleSidedEdge = 12
    }
}
declare namespace feng3d {
    /**
     * The emission shape (Shuriken).
     *
     * 发射的形状
     */
    enum ParticleSystemShapeType1 {
        /**
         * Emit from a sphere.
         *
         * 从球体的体积中发射。
         */
        Sphere = 0,
        /**
         * Emit from a half-sphere.
         *
         * 从半球体的体积发射。
         */
        Hemisphere = 1,
        /**
         * Emit from a cone.
         *
         * 从圆锥体发射。
         */
        Cone = 2,
        /**
         * Emit from the volume of a box.
         *
         * 从一个盒子的体积中发出。
         */
        Box = 3,
        /**
         * Emit from a mesh.
         *
         * 从一个网格中发出。
         *
         * @todo
         */
        Mesh = 4,
        /**
         * Emit from a mesh renderer.
         *
         * 从一个网格渲染器发射。
         *
         * @todo
         */
        MeshRenderer = 5,
        /**
         * Emit from a skinned mesh renderer.
         *
         * 从蒙皮网格渲染器发出。
         *
         * @todo
         */
        SkinnedMeshRenderer = 6,
        /**
         * Emit from a circle.
         *
         * 从一个圆发出。
         */
        Circle = 7,
        /**
         * Emit from an edge.
         *
         * 从边缘发出。
         */
        Edge = 8
    }
}
declare namespace feng3d {
    /**
     * The mesh emission type.
     *
     * 网格发射类型。
     */
    enum ParticleSystemMeshShapeType {
        /**
         * Emit from the vertices of the mesh.
         *
         * 从网格的顶点发出。
         */
        Vertex = 0,
        /**
         * Emit from the edges of the mesh.
         *
         * 从网格的边缘发出。
         */
        Edge = 1,
        /**
         * Emit from the surface of the mesh.
         *
         * 从网格表面发出。
         */
        Triangle = 2
    }
}
declare namespace feng3d {
    /**
     * How to apply emitter velocity to particles.
     *
     * 如何将发射体速度应用于粒子。
     */
    enum ParticleSystemInheritVelocityMode {
        /**
         * Each particle inherits the emitter's velocity on the frame when it was initially emitted.
         *
         * 每个粒子在最初发射时都继承了发射体在帧上的速度。
         */
        Initial = 0,
        /**
         * Each particle's velocity is set to the emitter's current velocity value, every frame.
         *
         * 每一帧，每个粒子的速度都设定为发射器的当前速度值。
         */
        Current = 1
    }
}
declare namespace feng3d {
    /**
     * The quality of the generated noise.
     *
     * 产生的噪音的质量。
     */
    enum ParticleSystemNoiseQuality {
        /**
         * Low quality 1D noise.
         *
         * 低质量的一维噪声。
         */
        Low = 0,
        /**
         * Medium quality 2D noise.
         *
         * 中等质量2D噪音。
         */
        Medium = 1,
        /**
         * High quality 3D noise.
         *
         * 高品质3D噪音。
         */
        High = 2
    }
}
declare namespace feng3d {
    /**
     * The events that cause new particles to be spawned.
     *
     * 导致新粒子产生的事件。
     */
    enum ParticleSystemSubEmitterType {
        /**
         * Spawns new particles when particles from the parent system are born.
         *
         * 当来自父系统的粒子诞生时，产生新的粒子。
         */
        Birth = 0,
        /**
         * Spawns new particles when particles from the parent system collide with something.
         *
         * 当来自父系统的粒子与某物碰撞时，产生新的粒子。
         */
        Collision = 1,
        /**
         * Spawns new particles when particles from the parent system die.
         *
         * 当来自父系统的粒子死亡时，产生新的粒子。
         */
        Death = 2,
        /**
         * Spawns new particles when particles from the parent system pass conditions in the Trigger Module.
         *
         * 当来自父系统的粒子通过触发器模块中的条件时，生成新的粒子。
         */
        Trigger = 3,
        /**
         * Spawns new particles when triggered from script using ParticleSystem.TriggerSubEmitter.
         *
         * 当使用ParticleSystem.TriggerSubEmitter从脚本中触发时，生成新的粒子。
         */
        Manual = 4
    }
}
declare namespace feng3d {
    /**
     * The properties of sub-emitter particles.
     */
    enum ParticleSystemSubEmitterProperties {
        /**
         * When spawning new particles, do not inherit any properties from the parent particles.
         */
        InheritNothing = 0,
        /**
         * When spawning new particles, inherit all available properties from the parent particles.
         */
        InheritEverything = 1,
        /**
         * When spawning new particles, multiply the start color by the color of the parent particles.
         */
        InheritColor = 2,
        /**
         * When spawning new particles, multiply the start size by the size of the parent particles.
         */
        InheritSize = 3,
        /**
         * When spawning new particles, add the start rotation to the rotation of the parent particles.
         */
        InheritRotation = 4,
        /**
         * New particles will have a shorter lifespan, the closer their parent particles are to death.
         */
        InheritLifetime = 5,
        /**
         * When spawning new particles, use the duration and age properties from the parent system, when sampling MainModule curves in the Sub-Emitter.
         */
        InheritDuration = 6
    }
}
declare namespace feng3d {
    enum ParticleSystemRenderMode {
        /**
         * Render particles as billboards facing the active camera. (Default)
         */
        Billboard = 0,
        /**
         * Stretch particles in the direction of motion.
         */
        Stretch = 1,
        /**
         * Render particles as billboards always facing up along the y-Axis.
         */
        HorizontalBillboard = 2,
        /**
         * Render particles as billboards always facing the player, but not pitching along the x-Axis.
        
         */
        VerticalBillboard = 3,
        /**
         * Render particles as meshes.
         */
        Mesh = 4,
        /**
         * Do not render particles.
         */
        None = 5
    }
}
declare namespace feng3d {
    /**
     * How particles are aligned when rendered.
     */
    enum ParticleSystemRenderSpace {
        /**
         * Particles face the camera plane.
         */
        View = 0,
        /**
         * Particles align with the world.
         */
        World = 1,
        /**
         * Particles align with their local transform.
         */
        Local = 2,
        /**
         * Particles face the eye position.
         */
        Facing = 3,
        /**
         * Particles are aligned to their direction of travel.
         */
        Velocity = 4
    }
}
declare namespace feng3d {
    /**
     * This enum controls the mode under which the sprite will interact with the masking system.
     *
     * Sprites by default do not interact with masks SpriteMaskInteraction.None. A sprite can also be setup to be visible in presence of one or more masks SpriteMaskInteraction.VisibleInsideMask or to be visible on areas where no masks are present SpriteMaskInteraction.VisibleOutsideMask.
     */
    enum SpriteMaskInteraction {
        /**
         * The sprite will not interact with the masking system.
         */
        None = 0,
        /**
         * The sprite will be visible only in areas where a mask is present.
         */
        VisibleInsideMask = 1,
        /**
         * The sprite will be visible only in areas where no mask is present.
         */
        VisibleOutsideMask = 2
    }
}
declare namespace feng3d {
    /**
     * The sorting mode for particle systems.
     */
    enum ParticleSystemSortMode {
        /**
         * No sorting.
         */
        None = 0,
        /**
         * Sort based on distance.
         */
        Distance = 1,
        /**
         * Sort the oldest particles to the front.
         */
        OldestInFront = 2,
        /**
         * Sort the youngest particles to the front.
         */
        YoungestInFront = 3
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 发射形状
     */
    class ParticleSystemShape {
        protected _module: ParticleShapeModule;
        constructor(module: ParticleShapeModule);
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        calcParticlePosDir(particle: Particle, position: Vector3, dir: Vector3): void;
    }
}
declare namespace feng3d {
    /**
     * 从球体的体积中发射。
     */
    class ParticleSystemShapeSphere extends ParticleSystemShape {
        /**
         * 球体半径
         */
        get radius(): number;
        set radius(v: number);
        /**
         * 是否从球面发射
         */
        emitFromShell: boolean;
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        calcParticlePosDir(particle: Particle, position: Vector3, dir: Vector3): void;
    }
}
declare namespace feng3d {
    /**
     * 从半球体的体积中发出。
     */
    class ParticleSystemShapeHemisphere extends ParticleSystemShape {
        radius: number;
        /**
         * 是否从球面发射
         */
        emitFromShell: boolean;
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        calcParticlePosDir(particle: Particle, position: Vector3, dir: Vector3): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统发射圆锥体，用于定义基于圆锥体的粒子发射时的初始状态。
     */
    class ParticleSystemShapeCone extends ParticleSystemShape {
        /**
         * Angle of the cone.
         * 圆锥的角度。
         */
        get angle(): number;
        set angle(v: number);
        /**
         * 圆锥体底部半径。
         */
        get radius(): number;
        set radius(v: number);
        /**
         * Length of the cone.
         *
         * 圆锥的长度（高度）。
         */
        get length(): number;
        set length(v: number);
        /**
         * Circle arc angle.
         */
        get arc(): number;
        set arc(v: number);
        /**
         * The mode used for generating particles around the arc.
         * 在弧线周围产生粒子的模式。
         */
        get arcMode(): ParticleSystemShapeMultiModeValue;
        set arcMode(v: ParticleSystemShapeMultiModeValue);
        /**
         * Control the gap between emission points around the arc.
         * 控制弧线周围发射点之间的间隙。
         */
        get arcSpread(): number;
        set arcSpread(v: number);
        /**
         * When using one of the animated modes, how quickly to move the emission position around the arc.
         * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
         */
        get arcSpeed(): MinMaxCurve;
        set arcSpeed(v: MinMaxCurve);
        /**
         * 粒子系统圆锥体发射类型。
         */
        emitFrom: ParticleSystemShapeConeEmitFrom;
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        calcParticlePosDir(particle: Particle, position: Vector3, dir: Vector3): void;
    }
}
declare namespace feng3d {
    enum ParticleSystemShapeBoxEmitFrom {
        /**
         * 从盒子内部发射。
         */
        Volume = 0,
        /**
         * 从盒子外壳发射。
         */
        Shell = 1,
        /**
         * 从盒子边缘发射。
         */
        Edge = 2
    }
    /**
     * 粒子系统 发射盒子
     */
    class ParticleSystemShapeBox extends ParticleSystemShape {
        /**
         * 盒子X方向缩放。
         */
        get boxX(): number;
        set boxX(v: number);
        /**
         * 盒子Y方向缩放。
         */
        get boxY(): number;
        set boxY(v: number);
        /**
         * 盒子Z方向缩放。
         */
        get boxZ(): number;
        set boxZ(v: number);
        /**
         * 粒子系统盒子发射类型。
         */
        emitFrom: ParticleSystemShapeBoxEmitFrom;
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        calcParticlePosDir(particle: Particle, position: Vector3, dir: Vector3): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 发射圆盘
     */
    class ParticleSystemShapeCircle extends ParticleSystemShape {
        get radius(): number;
        set radius(v: number);
        get arc(): number;
        set arc(v: number);
        /**
         * The mode used for generating particles around the arc.
         *
         * 在弧线周围产生粒子的模式。
         */
        get arcMode(): ParticleSystemShapeMultiModeValue;
        set arcMode(v: ParticleSystemShapeMultiModeValue);
        /**
         * Control the gap between emission points around the arc.
         *
         * 控制弧线周围发射点之间的间隙。
         */
        get arcSpread(): number;
        set arcSpread(v: number);
        /**
         * When using one of the animated modes, how quickly to move the emission position around the arc.
         * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
         */
        get arcSpeed(): MinMaxCurve;
        set arcSpeed(v: MinMaxCurve);
        /**
         * 是否从圆形边缘发射。
         */
        emitFromEdge: boolean;
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        calcParticlePosDir(particle: Particle, position: Vector3, dir: Vector3): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 发射边
     */
    class ParticleSystemShapeEdge extends ParticleSystemShape {
        /**
         * 边长的一半。
         */
        get radius(): number;
        set radius(v: number);
        /**
         * The mode used for generating particles around the radius.
         *
         * 在弧线周围产生粒子的模式。
         */
        get radiusMode(): ParticleSystemShapeMultiModeValue;
        set radiusMode(v: ParticleSystemShapeMultiModeValue);
        /**
         * Control the gap between emission points around the radius.
         *
         * 控制弧线周围发射点之间的间隙。
         */
        get radiusSpread(): number;
        set radiusSpread(v: number);
        /**
         * When using one of the animated modes, how quickly to move the emission position around the radius.
         *
         * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
         */
        get radiusSpeed(): MinMaxCurve;
        set radiusSpeed(v: MinMaxCurve);
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        calcParticlePosDir(particle: Particle, position: Vector3, dir: Vector3): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子模块
     */
    class ParticleModule extends EventEmitter {
        /**
         * 是否开启
         */
        enabled: boolean;
        /**
         * 粒子系统
         */
        particleSystem: ParticleSystem;
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
        /**
         * 更新
         *
         * @param interval
         */
        update(interval: number): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子主模块
     */
    class ParticleMainModule extends ParticleModule {
        __class__: "feng3d.ParticleMainModule";
        enabled: boolean;
        /**
         * 粒子系统的持续时间(秒)。
         */
        duration: number;
        /**
         * 粒子系统在循环吗?
         */
        loop: boolean;
        /**
         * When looping is enabled, this controls whether this particle system will look like it has already simulated for one loop when first becoming visible.
         *
         * 当循环被激活时，它控制这个粒子系统在第一次出现时是否看起来像已经模拟了一个循环。
         */
        prewarm: boolean;
        /**
         * Start delay in seconds.
         *
         * 启动延迟(以秒为单位)。
         */
        startDelay: MinMaxCurve;
        /**
         * Start delay multiplier in seconds.
         *
         * 启动延迟乘数(以秒为单位)。
         */
        get startDelayMultiplier(): number;
        /**
         * The total lifetime in seconds that each new particle will have.
         *
         * 每个新粒子的总寿命(以秒计)。
         */
        startLifetime: MinMaxCurve;
        /**
         * Start lifetime multiplier.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall lifetime multiplier.
         *
         * 起始寿命乘数。
         * 如果您只想更改总体寿命乘数，则此方法比访问整个曲线更有效。
         */
        get startLifetimeMultiplier(): number;
        set startLifetimeMultiplier(v: number);
        /**
         * The initial speed of particles when emitted.
         *
         * 粒子发射时的初始速度。
         */
        startSpeed: MinMaxCurve;
        /**
         * A multiplier of the initial speed of particles when emitted.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall speed multiplier.
         *
         * 粒子发射时的初始速度的乘子。
         * 这种方法比访问整个曲线更有效，如果你只想改变整体速度乘数。
         */
        get startSpeedMultiplier(): number;
        set startSpeedMultiplier(v: number);
        /**
         * A flag to enable specifying particle size individually for each axis.
         *
         * 允许为每个轴分别指定粒度大小的标志。
         */
        useStartSize3D: boolean;
        /**
         * The initial size of particles when emitted.
         *
         * 粒子发射时的初始大小。
         */
        get startSize(): MinMaxCurve;
        set startSize(v: MinMaxCurve);
        /**
         * Start size multiplier.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
         *
         * 开始尺寸乘数。
         * 如果您只想更改整体尺寸倍增器，则此方法比访问整个曲线更有效。
         */
        get startSizeMultiplier(): number;
        set startSizeMultiplier(v: number);
        /**
         * The initial size of particles when emitted.
         *
         * 发射时粒子的初始大小。
         */
        startSize3D: MinMaxCurveVector3;
        /**
         * The initial size of particles along the X axis when emitted.
         *
         * 发射时沿X轴的粒子的初始大小。
         */
        get startSizeX(): MinMaxCurve;
        set startSizeX(v: MinMaxCurve);
        /**
         * Start rotation multiplier along the X axis.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
         *
         * 启动旋转乘法器沿X轴。
         * 如果您只想更改整体大小倍增器，则此方法比访问整个曲线更有效。
         */
        get startSizeXMultiplier(): number;
        set startSizeXMultiplier(v: number);
        /**
         * The initial size of particles along the Y axis when emitted.
         *
         * 发射时沿Y轴的粒子的初始大小。
         */
        get startSizeY(): MinMaxCurve;
        set startSizeY(v: MinMaxCurve);
        /**
         * Start rotation multiplier along the Y axis.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
         *
         * 启动旋转乘法器沿Y轴。
         * 如果您只想更改整体大小倍增器，则此方法比访问整个曲线更有效。
         */
        get startSizeYMultiplier(): number;
        set startSizeYMultiplier(v: number);
        /**
         * The initial size of particles along the Z axis when emitted.
         *
         * 发射时沿Z轴的粒子的初始大小。
         */
        get startSizeZ(): MinMaxCurve;
        set startSizeZ(v: MinMaxCurve);
        /**
         * Start rotation multiplier along the Z axis.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
         *
         * 启动旋转乘法器沿Z轴。
         * 如果您只想更改整体大小倍增器，则此方法比访问整个曲线更有效。
         */
        get startSizeZMultiplier(): number;
        set startSizeZMultiplier(v: number);
        /**
         * A flag to enable 3D particle rotation.
         * 一个启用粒子3D旋转的标记。
         */
        useStartRotation3D: boolean;
        /**
         * The initial rotation of particles when emitted.
         * 粒子发射时的初始旋转。
         */
        get startRotation(): MinMaxCurve;
        set startRotation(v: MinMaxCurve);
        /**
         * Start rotation multiplier.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
         *
         * 开始旋转乘数。
         * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
         */
        get startRotationMultiplier(): number;
        set startRotationMultiplier(v: number);
        /**
         * The initial rotation of particles when emitted.
         *
         * 粒子发射时的初始旋转。
         */
        startRotation3D: MinMaxCurveVector3;
        /**
         * The initial rotation of particles around the X axis when emitted.
         *
         * 发射时粒子围绕X轴的初始旋转。
         */
        get startRotationX(): MinMaxCurve;
        set startRotationX(v: MinMaxCurve);
        /**
         * Start rotation multiplier around the X axis.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
         *
         * 开始绕X轴旋转乘法器。
         * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
         */
        get startRotationXMultiplier(): number;
        set startRotationXMultiplier(v: number);
        /**
         * The initial rotation of particles around the Y axis when emitted.
         *
         * 发射时粒子围绕Y轴的初始旋转。
         */
        get startRotationY(): MinMaxCurve;
        set startRotationY(v: MinMaxCurve);
        /**
         * Start rotation multiplier around the Y axis.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
         *
         * 开始绕Y轴旋转乘法器。
         * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
         */
        get startRotationYMultiplier(): number;
        set startRotationYMultiplier(v: number);
        /**
         * The initial rotation of particles around the Z axis when emitted.
         *
         * 发射时粒子围绕Z轴的初始旋转。
         */
        get startRotationZ(): MinMaxCurve;
        set startRotationZ(v: MinMaxCurve);
        /**
         * Start rotation multiplier around the Z axis.
         * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
         *
         * 开始绕Z轴旋转乘法器。
         * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
         */
        get startRotationZMultiplier(): number;
        set startRotationZMultiplier(v: number);
        /**
         * Cause some particles to spin in the opposite direction. Set between 0 and 1, where higher values will cause a higher proportion of particles to spin in the opposite direction.
         *
         * 导致一些粒子向相反的方向旋转。设置在0和1之间，数值越大，粒子朝相反方向旋转的比例越大。
         */
        randomizeRotationDirection: number;
        /**
         * The initial color of particles when emitted.
         *
         * 粒子发射时的初始颜色。
         */
        startColor: MinMaxGradient;
        /**
         * Scale applied to the gravity.
         *
         * 应用于重力加速度的缩放。
         */
        gravityModifier: MinMaxCurve;
        /**
         * This selects the space in which to simulate particles. It can be either world or local space.
         *
         * 模拟空间，使粒子位置模拟在世界，本地或自定义空间。在本地空间中，它们相对于自己的转换而存在，在自定义空间中，它们相对于自定义转换。
         *
         * @todo
         */
        simulationSpace: ParticleSystemSimulationSpace;
        /**
         * Override the default playback speed of the Particle System.
         *
         * 重写粒子系统的默认播放速度。
         */
        simulationSpeed: number;
        /**
         * Control how the particle system's Transform Component is applied to the particle system.
         *
         * 控制粒子系统的变换组件如何应用于粒子系统。
         */
        scalingMode: ParticleSystemScalingMode;
        /**
         * If set to true, the particle system will automatically start playing on startup.
         *
         * 如果设置为真，粒子系统将自动开始播放启动。
         */
        playOnAwake: boolean;
        /**
         * The maximum number of particles to emit.
         *
         * 发射粒子的最大数量。
         */
        maxParticles: number;
        constructor();
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统发射模块。
     */
    class ParticleEmissionModule extends ParticleModule {
        __class__: "feng3d.ParticleEmissionModule";
        /**
         * 随着时间的推移，新粒子产生的速度。
         */
        rateOverTime: MinMaxCurve;
        /**
         * Change the rate over time multiplier.
         * This is more efficient than accessing the whole curve, if you only want to change the overall rate multiplier.
         *
         * 改变率随时间的乘数。
         * 如果您只想更改整体的速率乘数，那么这比访问整个曲线更有效。
         * 只在
         */
        get rateOverTimeMultiplier(): number;
        set rateOverTimeMultiplier(v: number);
        /**
         * The rate at which new particles are spawned, over distance.
         * New particles will only be emitted when the emitter moves.
         *
         * 产生新粒子的速度，通过距离。
         * 新粒子只有世界空间模拟且发射器移动时才会被发射出来。
         */
        rateOverDistance: MinMaxCurve;
        /**
         * Change the rate over distance multiplier.
         * This is more efficient than accessing the whole curve, if you only want to change the overall rate multiplier.
         *
         * 改变速率随距离变化的乘数。
         * 如果您只想更改整体的速率乘数，那么这比访问整个曲线更有效。
         */
        get rateOverDistanceMultiplier(): number;
        set rateOverDistanceMultiplier(v: number);
        /**
         * 爆发数组
         */
        bursts: ParticleEmissionBurst[];
        /**
         * The current number of bursts.
         *
         * 当前的爆发次数。
         */
        get burstCount(): number;
        /**
         * Get the burst array.
         * 获取爆发数组。
         *
         * @param bursts Array of bursts to be filled in.要填充的爆发数组。
         * @returns The number of bursts in the array.数组中的爆发次数。
         */
        getBursts(bursts: ParticleEmissionBurst[]): number;
        /**
         * Set the burst array.
         * 设置爆发数组。
         *
         * @param bursts Array of bursts.爆发的数组。
         * @param size Optional array size, if burst count is less than array size.可选的数组大小，如果爆发计数小于数组大小。
         */
        setBursts(bursts: ParticleEmissionBurst[], size?: number): void;
    }
}
declare namespace feng3d {
    /**
     * Shape of the emitter volume, which controls where particles are emitted and their initial direction.
     * 发射体体积的形状，它控制粒子发射的位置和初始方向。
     */
    class ParticleShapeModule extends ParticleModule {
        __class__: "feng3d.ParticleShapeModule";
        /**
         * Type of shape to emit particles from.
         * 发射粒子的形状类型。
         */
        shapeType: ParticleSystemShapeType;
        /**
         * Type of shape to emit particles from.
         * 发射粒子的形状类型。
         */
        shape: ParticleSystemShapeType1;
        /**
         * 当前使用的发射形状
         */
        activeShape: ParticleSystemShape;
        /**
         * Align particles based on their initial direction of travel.
         * 根据粒子的初始运动方向排列粒子。
         *
         * Using align to Direction in the Shape module forces the system to be rendered using Local Billboard Alignment.
         * 在形状模块中使用align to Direction迫使系统使用本地看板对齐方式呈现。
         */
        alignToDirection: boolean;
        /**
         * Randomizes the starting direction of particles.
         * 随机化粒子的起始方向。
         */
        randomDirectionAmount: number;
        /**
         * Spherizes the starting direction of particles.
         * 使粒子的起始方向球面化。
         */
        sphericalDirectionAmount: number;
        /**
         * Angle of the cone.
         *
         * 圆锥的角度。
         */
        angle: number;
        /**
         * Circle arc angle.
         *
         * 圆弧角。
         */
        arc: number;
        /**
         * The mode used for generating particles around the arc.
         *
         * 在弧线周围产生粒子的模式。
         */
        arcMode: ParticleSystemShapeMultiModeValue;
        /**
         * When using one of the animated modes, how quickly to move the emission position around the arc.
         *
         * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
         */
        arcSpeed: MinMaxCurve;
        /**
         * A multiplier of the arc speed of the emission shape.
         *
         * 发射形状的电弧速度的乘数。
         */
        get arcSpeedMultiplier(): number;
        set arcSpeedMultiplier(v: number);
        /**
         * Control the gap between emission points around the arc.
         *
         * 控制弧线周围发射点之间的间隙。
         */
        arcSpread: number;
        /**
         * Scale of the box.
         *
         * 盒子的缩放。
         */
        box: Vector3;
        /**
         * Length of the cone.
         *
         * 圆锥的长度（高度）。
         */
        length: number;
        /**
         * Mesh to emit particles from.
         *
         * 发射粒子的网格。
         *
         * @todo
         */
        mesh: Geometry;
        /**
         * Emit from a single material, or the whole mesh.
         *
         * 从一个单一的材料，或整个网格发射。
         *
         * @todo
         */
        useMeshMaterialIndex: boolean;
        /**
         * Emit particles from a single material of a mesh.
         *
         * 从一个网格的单一材料发射粒子。
         *
         * @todo
         */
        meshMaterialIndex: number;
        /**
         * MeshRenderer to emit particles from.
         *
         * 从 MeshRenderer 发射粒子。
         *
         * @todo
         */
        meshRenderer: any;
        /**
         * SkinnedMeshRenderer to emit particles from.
         *
         * 从 SkinnedMeshRenderer 发射粒子。
         *
         * @todo
         */
        skinnedMeshRenderer: any;
        /**
         * Apply a scaling factor to the mesh used for generating source positions.
         *
         * 对用于生成源位置的网格应用缩放因子。
         *
         * @todo
         */
        meshScale: number;
        /**
         * Where on the mesh to emit particles from.
         *
         * 从网格的什么地方发射粒子。
         *
         * @todo
         */
        meshShapeType: ParticleSystemMeshShapeType;
        /**
         * Modulate the particle colors with the vertex colors, or the material color if no vertex colors exist.
         *
         * 用顶点颜色调节粒子颜色，如果没有顶点颜色，则调节材质颜色。
         *
         * @todo
         */
        useMeshColors: boolean;
        /**
         * Move particles away from the surface of the source mesh.
         *
         * 将粒子从源网格的表面移开。
         */
        normalOffset: number;
        /**
         * Radius of the shape.
         *
         * 形状的半径。
         */
        radius: number;
        /**
         * The mode used for generating particles around the radius.
         *
         * 在弧线周围产生粒子的模式。
         */
        radiusMode: ParticleSystemShapeMultiModeValue;
        /**
         * When using one of the animated modes, how quickly to move the emission position along the radius.
         *
         * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
         */
        radiusSpeed: MinMaxCurve;
        /**
         * A multiplier of the radius speed of the emission shape.
         *
         * 发射形状的半径速度的乘法器。
         */
        get radiusSpeedMultiplier(): number;
        set radiusSpeedMultiplier(v: number);
        /**
         * Control the gap between emission points around the radius.
         *
         * 控制弧线周围发射点之间的间隙。
         */
        radiusSpread: number;
        private _shapeSphere;
        private _shapeHemisphere;
        private _shapeCone;
        private _shapeBox;
        private _shapeCircle;
        private _shapeEdge;
        constructor();
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        private _onShapeTypeChanged;
        private _onShapeChanged;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 速度随时间变化模块
     *
     * Controls the velocity of each particle during its lifetime.
     * 控制每个粒子在其生命周期内的速度。
     */
    class ParticleVelocityOverLifetimeModule extends ParticleModule {
        __class__: "feng3d.ParticleVelocityOverLifetimeModule";
        /**
         * Curve to control particle speed based on lifetime.
         *
         * 基于寿命的粒子速度控制曲线。
         */
        velocity: MinMaxCurveVector3;
        /**
         * Specifies if the velocities are in local space (rotated with the transform) or world space.
         *
         * 指定速度是在局部空间(与变换一起旋转)还是在世界空间。
         */
        space: ParticleSystemSimulationSpace;
        /**
         * Curve to control particle speed based on lifetime, on the X axis.
         *
         * 曲线控制粒子速度基于寿命，在X轴上。
         */
        get x(): MinMaxCurve;
        set x(v: MinMaxCurve);
        /**
         * X axis speed multiplier.
         *
         * X轴速度倍增器。
         */
        get xMultiplier(): number;
        set xMultiplier(v: number);
        /**
         * Curve to control particle speed based on lifetime, on the Y axis.
         *
         * 曲线控制粒子速度基于寿命，在Y轴上。
         */
        get y(): MinMaxCurve;
        set y(v: MinMaxCurve);
        /**
         * Y axis speed multiplier.
         *
         * Y轴速度倍增器。
         */
        get yMultiplier(): number;
        set yMultiplier(v: number);
        /**
         * Curve to control particle speed based on lifetime, on the Z axis.
         *
         * 曲线控制粒子速度基于寿命，在Z轴上。
         */
        get z(): MinMaxCurve;
        set z(v: MinMaxCurve);
        /**
         * Z axis speed multiplier.
         *
         * Z轴速度倍增器。
         */
        get zMultiplier(): number;
        set zMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * Limit Velocity Over Lifetime module.
     *
     * 基于时间轴限制速度模块。
     */
    class ParticleLimitVelocityOverLifetimeModule extends ParticleModule {
        __class__: "feng3d.ParticleLimitVelocityOverLifetimeModule";
        /**
         * Set the size over lifetime on each axis separately.
         *
         * 在每个轴上分别设置生命周期内的大小。
         */
        separateAxes: boolean;
        /**
         * Maximum velocity curve, when not using one curve per axis.
         *
         * 最大速度曲线，当不使用每轴一个曲线时。
         */
        limit: MinMaxCurve;
        /**
         * Maximum velocity.
         *
         * 最高速度。
         */
        limit3D: MinMaxCurveVector3;
        /**
         * Specifies if the velocities are in local space (rotated with the transform) or world space.
         *
         * 指定速度是在局部空间(与变换一起旋转)还是在世界空间。
         */
        space: ParticleSystemSimulationSpace;
        /**
         * Controls how much the velocity that exceeds the velocity limit should be dampened.
         *
         * 控制多少速度，超过速度限制应该被抑制。
         */
        dampen: number;
        /**
         * Change the limit multiplier.
         *
         * 改变限制乘法因子。
         */
        get limitMultiplier(): number;
        set limitMultiplier(v: number);
        /**
         * Maximum velocity curve for the X axis.
         *
         * X轴的最大速度曲线。
         */
        get limitX(): MinMaxCurve;
        set limitX(v: MinMaxCurve);
        /**
         * Change the limit multiplier on the X axis.
         *
         * 改变X轴上的极限乘法器。
         */
        get limitXMultiplier(): number;
        set limitXMultiplier(v: number);
        /**
         * Maximum velocity curve for the Y axis.
         *
         * Y轴的最大速度曲线。
         */
        get limitY(): MinMaxCurve;
        set limitY(v: MinMaxCurve);
        /**
         * Change the limit multiplier on the Y axis.
         *
         * 改变Y轴上的极限乘法器。
         */
        get limitYMultiplier(): number;
        set limitYMultiplier(v: number);
        /**
         * Maximum velocity curve for the Z axis.
         *
         * Z轴的最大速度曲线。
         */
        get limitZ(): MinMaxCurve;
        set limitZ(v: MinMaxCurve);
        /**
         * Change the limit multiplier on the Z axis.
         *
         * 更改Z轴上的极限乘法器。
         */
        get limitZMultiplier(): number;
        set limitZMultiplier(v: number);
        /**
         * 初始化粒子状态
         *
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         *
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * The Inherit Velocity Module controls how the velocity of the emitter is transferred to the particles as they are emitted.
     *
     * 遗传速度模块控制发射体的速度在粒子发射时如何传递到粒子上。（只有粒子系统在世界空间中模拟时生效）
     */
    class ParticleInheritVelocityModule extends ParticleModule {
        "__class__": "feng3d.ParticleInheritVelocityModule";
        /**
         * How to apply emitter velocity to particles.
         *
         * 如何将发射体速度应用于粒子。
         */
        mode: ParticleSystemInheritVelocityMode;
        /**
         * Curve to define how much emitter velocity is applied during the lifetime of a particle.
         *
         * 曲线，用来定义在粒子的生命周期内应用了多少发射速度。
         */
        multiplier: MinMaxCurve;
        /**
         * Curve to define how much emitter velocity is applied during the lifetime of a particle.
         *
         * 曲线，用来定义在粒子的生命周期内应用了多少发射速度。
         */
        get curve(): MinMaxCurve;
        set curve(v: MinMaxCurve);
        /**
         * Change the curve multiplier.
         *
         * 改变曲线的乘数。
         */
        get curveMultiplier(): number;
        set curveMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 作用在粒子上的力随时间变化模块
     *
     * 控制每个粒子在其生命周期内的力。
     * Script interface for the Force Over Lifetime module.
     */
    class ParticleForceOverLifetimeModule extends ParticleModule {
        /**
         * 作用在粒子上的力
         */
        force: MinMaxCurveVector3;
        /**
         * Are the forces being applied in local or world space?
         *
         * 这些力是作用于局部空间还是世界空间
         */
        space: ParticleSystemSimulationSpace;
        /**
         * When randomly selecting values between two curves or constants, this flag will cause a new random force to be chosen on each frame.
         *
         * 当在两条曲线或常数之间随机选择值时，此标志将导致在每一帧上选择一个新的随机力。
         *
         * @todo
         */
        randomized: boolean;
        /**
         * The curve defining particle forces in the X axis.
         *
         * 在X轴上定义粒子力的曲线。
         */
        get x(): MinMaxCurve;
        set x(v: MinMaxCurve);
        /**
         * Change the X axis mulutiplier.
         *
         * 改变X轴的乘数。
         */
        get xMultiplier(): number;
        set xMultiplier(v: number);
        /**
         * The curve defining particle forces in the Y axis.
         *
         * 在Y轴上定义粒子力的曲线。
         */
        get y(): MinMaxCurve;
        set y(v: MinMaxCurve);
        /**
         * Change the Y axis mulutiplier.
         *
         * 改变Y轴的乘数。
         */
        get yMultiplier(): number;
        set yMultiplier(v: number);
        /**
         * The curve defining particle forces in the Z axis.
         *
         * 在Z轴上定义粒子力的曲线。
         */
        get z(): MinMaxCurve;
        set z(v: MinMaxCurve);
        /**
         * Change the Z axis mulutiplier.
         *
         * 改变Z轴的乘数。
         */
        get zMultiplier(): number;
        set zMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * the Color By Speed module.
     *
     * 颜色随速度变化模块。
     */
    class ParticleColorBySpeedModule extends ParticleModule {
        /**
         * The gradient controlling the particle colors.
         *
         * 控制粒子颜色的梯度。
         */
        color: MinMaxGradient;
        /**
         * Apply the color gradient between these minimum and maximum speeds.
         *
         * 在这些最小和最大速度之间应用颜色渐变。
         */
        range: Vector2;
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 颜色随时间变化模块
     */
    class ParticleColorOverLifetimeModule extends ParticleModule {
        /**
         * The gradient controlling the particle colors.
         * 控制粒子颜色的梯度。
         */
        color: MinMaxGradient;
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 缩放随时间变化模块
     */
    class ParticleSizeOverLifetimeModule extends ParticleModule {
        /**
         * Set the size over lifetime on each axis separately.
         *
         * 在每个轴上分别设置生命周期内的大小。
         */
        separateAxes: boolean;
        /**
         * Curve to control particle size based on lifetime.
         *
         * 基于寿命的粒度控制曲线。
         */
        get size(): MinMaxCurve;
        set size(v: MinMaxCurve);
        /**
         * Size multiplier.
         *
         * 尺寸的乘数。
         */
        get sizeMultiplier(): number;
        set sizeMultiplier(v: number);
        /**
         * Curve to control particle size based on lifetime.
         *
         * 基于寿命的粒度控制曲线。
         */
        size3D: MinMaxCurveVector3;
        /**
         * Size over lifetime curve for the X axis.
         *
         * X轴的尺寸随生命周期变化曲线。
         */
        get x(): MinMaxCurve;
        set x(v: MinMaxCurve);
        /**
         * X axis size multiplier.
         *
         * X轴尺寸的乘数。
         */
        get xMultiplier(): number;
        set xMultiplier(v: number);
        /**
         * Size over lifetime curve for the Y axis.
         *
         * Y轴的尺寸随生命周期变化曲线。
         */
        get y(): MinMaxCurve;
        set y(v: MinMaxCurve);
        /**
         * Y axis size multiplier.
         *
         * Y轴尺寸的乘数。
         */
        get yMultiplier(): number;
        set yMultiplier(v: number);
        /**
         * Size over lifetime curve for the Z axis.
         *
         * Z轴的尺寸随生命周期变化曲线。
         */
        get z(): MinMaxCurve;
        set z(v: MinMaxCurve);
        /**
         * Z axis size multiplier.
         *
         * Z轴尺寸的乘数。
         */
        get zMultiplier(): number;
        set zMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * Script interface for the Size By Speed module.
     *
     * 粒子系统 缩放随速度变化模块
     */
    class ParticleSizeBySpeedModule extends ParticleModule {
        /**
         * Set the size over speed on each axis separately.
         *
         * 在每个轴上分别设置生命周期内的大小。
         */
        separateAxes: boolean;
        /**
         * Curve to control particle size based on speed.
         *
         * 基于速度的粒度控制曲线。
         */
        get size(): MinMaxCurve;
        set size(v: MinMaxCurve);
        /**
         * Curve to control particle size based on speed.
         *
         * 基于寿命的粒度控制曲线。
         */
        size3D: MinMaxCurveVector3;
        /**
         * Apply the size curve between these minimum and maximum speeds.
         *
         * 在这些最小和最大速度之间应用尺寸变化。
         */
        range: Vector2;
        /**
         * Size multiplier.
         *
         * 尺寸的乘数。
         */
        get sizeMultiplier(): number;
        set sizeMultiplier(v: number);
        /**
         * Size over speed curve for the X axis.
         *
         * X轴的尺寸随生命周期变化曲线。
         */
        get x(): MinMaxCurve;
        set x(v: MinMaxCurve);
        /**
         * X axis size multiplier.
         *
         * X轴尺寸的乘数。
         */
        get xMultiplier(): number;
        set xMultiplier(v: number);
        /**
         * Size over speed curve for the Y axis.
         *
         * Y轴的尺寸随生命周期变化曲线。
         */
        get y(): MinMaxCurve;
        set y(v: MinMaxCurve);
        /**
         * Y axis size multiplier.
         *
         * Y轴尺寸的乘数。
         */
        get yMultiplier(): number;
        set yMultiplier(v: number);
        /**
         * Size over speed curve for the Z axis.
         *
         * Z轴的尺寸随生命周期变化曲线。
         */
        get z(): MinMaxCurve;
        set z(v: MinMaxCurve);
        /**
         * Z axis size multiplier.
         *
         * Z轴尺寸的乘数。
         */
        get zMultiplier(): number;
        set zMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 旋转角度随时间变化模块
     */
    class ParticleRotationOverLifetimeModule extends ParticleModule {
        /**
         * Set the rotation over lifetime on each axis separately.
         * 在每个轴上分别设置基于生命周期的旋转。
         */
        separateAxes: boolean;
        /**
         * 角速度，基于生命周期的旋转。
         */
        angularVelocity: MinMaxCurveVector3;
        /**
         * Rotation over lifetime curve for the X axis.
         *
         * X轴的旋转寿命曲线。
         */
        get x(): MinMaxCurve;
        set x(v: MinMaxCurve);
        /**
         * Rotation multiplier around the X axis.
         *
         * 绕X轴旋转乘法器
         */
        get xMultiplier(): number;
        set xMultiplier(v: number);
        /**
         * Rotation over lifetime curve for the Y axis.
         *
         * Y轴的旋转寿命曲线。
         */
        get y(): MinMaxCurve;
        set y(v: MinMaxCurve);
        /**
         * Rotation multiplier around the Y axis.
         *
         * 绕Y轴旋转乘法器
         */
        get yMultiplier(): number;
        set yMultiplier(v: number);
        /**
         * Rotation over lifetime curve for the Z axis.
         *
         * Z轴的旋转寿命曲线。
         */
        get z(): MinMaxCurve;
        set z(v: MinMaxCurve);
        /**
         * Rotation multiplier around the Z axis.
         *
         * 绕Z轴旋转乘法器
         */
        get zMultiplier(): number;
        set zMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统 旋转角度随速度变化模块
     */
    class ParticleRotationBySpeedModule extends ParticleModule {
        /**
         * Set the rotation by speed on each axis separately.
         * 在每个轴上分别设置随速度变化的旋转。
         */
        separateAxes: boolean;
        /**
         * 角速度，随速度变化的旋转。
         */
        angularVelocity: MinMaxCurveVector3;
        /**
         * Apply the rotation curve between these minimum and maximum speeds.
         *
         * 在这些最小和最大速度之间应用旋转曲线。
         */
        range: Vector2;
        /**
         * Rotation by speed curve for the X axis.
         *
         * X轴的旋转随速度变化曲线。
         */
        get x(): MinMaxCurve;
        set x(v: MinMaxCurve);
        /**
         * Rotation multiplier around the X axis.
         *
         * 绕X轴旋转乘法器
         */
        get xMultiplier(): number;
        set xMultiplier(v: number);
        /**
         * Rotation by speed curve for the Y axis.
         *
         * Y轴的旋转随速度变化曲线。
         */
        get y(): MinMaxCurve;
        set y(v: MinMaxCurve);
        /**
         * Rotation multiplier around the Y axis.
         *
         * 绕Y轴旋转乘法器
         */
        get yMultiplier(): number;
        set yMultiplier(v: number);
        /**
         * Rotation by speed curve for the Z axis.
         *
         * Z轴的旋转随速度变化曲线。
         */
        get z(): MinMaxCurve;
        set z(v: MinMaxCurve);
        /**
         * Rotation multiplier around the Z axis.
         *
         * 绕Z轴旋转乘法器
         */
        get zMultiplier(): number;
        set zMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * Script interface for the Noise Module.
     *
     * The Noise Module allows you to apply turbulence to the movement of your particles. Use the low quality settings to create computationally efficient Noise, or simulate smoother, richer Noise with the higher quality settings. You can also choose to define the behavior of the Noise individually for each axis.
     *
     * 噪声模块
     *
     * 噪声模块允许你将湍流应用到粒子的运动中。使用低质量设置来创建计算效率高的噪声，或者使用高质量设置来模拟更平滑、更丰富的噪声。您还可以选择为每个轴分别定义噪声的行为。
     */
    class ParticleNoiseModule extends ParticleModule {
        /**
         * Control the noise separately for each axis.
         *
         * 分别控制每个轴的噪声。
         */
        separateAxes: boolean;
        /**
         * How strong the overall noise effect is.
         *
         * 整体噪音效应有多强。
         */
        get strength(): MinMaxCurve;
        set strength(v: MinMaxCurve);
        /**
         * How strong the overall noise effect is.
         *
         * 整体噪音效应有多强。
         */
        strength3D: MinMaxCurveVector3;
        /**
         * Define the strength of the effect on the X axis, when using separateAxes option.
         *
         * 在使用分别控制每个轴时，在X轴上定义效果的强度。
         */
        get strengthX(): MinMaxCurve;
        set strengthX(v: MinMaxCurve);
        /**
         * Define the strength of the effect on the Y axis, when using separateAxes option.
         *
         * 在使用分别控制每个轴时，在Y轴上定义效果的强度。
         */
        get strengthY(): MinMaxCurve;
        set strengthY(v: MinMaxCurve);
        /**
         * Define the strength of the effect on the Z axis, when using separateAxes option.
         *
         * 在使用分别控制每个轴时，在Z轴上定义效果的强度。
         */
        get strengthZ(): MinMaxCurve;
        set strengthZ(v: MinMaxCurve);
        /**
         * Low values create soft, smooth noise, and high values create rapidly changing noise.
         *
         * 低值产生柔和、平滑的噪声，高值产生快速变化的噪声。
         */
        frequency: number;
        /**
         * Scroll the noise map over the particle system.
         *
         * 在粒子系统上滚动噪声图。
         */
        scrollSpeed: MinMaxCurve;
        /**
         * Higher frequency noise will reduce the strength by a proportional amount, if enabled.
         *
         * 如果启用高频率噪音，将按比例减少强度。
         */
        damping: boolean;
        /**
         * Layers of noise that combine to produce final noise.
         *
         * 一层一层的噪声组合在一起产生最终的噪声。
         */
        octaveCount: number;
        /**
         * When combining each octave, scale the intensity by this amount.
         *
         * 当组合每个八度时，按这个比例调整强度。
         */
        octaveMultiplier: number;
        /**
         * When combining each octave, zoom in by this amount.
         *
         * 当组合每个八度时，放大这个数字。
         */
        octaveScale: number;
        /**
         * Generate 1D, 2D or 3D noise.
         *
         * 生成一维、二维或三维噪声。
         */
        quality: ParticleSystemNoiseQuality;
        /**
         * Enable remapping of the final noise values, allowing for noise values to be translated into different values.
         *
         * 允许重新映射最终的噪声值，允许将噪声值转换为不同的值。
         */
        remapEnabled: boolean;
        /**
         * Define how the noise values are remapped.
         *
         * 定义如何重新映射噪声值。
         */
        get remap(): MinMaxCurve;
        set remap(v: MinMaxCurve);
        /**
         * Define how the noise values are remapped.
         *
         * 定义如何重新映射噪声值。
         */
        remap3D: MinMaxCurveVector3;
        /**
         * Define how the noise values are remapped on the X axis, when using the ParticleSystem.NoiseModule.separateAxes option.
         *
         * 在使用分别控制每个轴时，如何在X轴上重新映射噪声值。
         */
        get remapX(): MinMaxCurve;
        set remapX(v: MinMaxCurve);
        /**
         * Define how the noise values are remapped on the Y axis, when using the ParticleSystem.NoiseModule.separateAxes option.
         *
         * 在使用分别控制每个轴时，如何在Y轴上重新映射噪声值。
         */
        get remapY(): MinMaxCurve;
        set remapY(v: MinMaxCurve);
        /**
         * Define how the noise values are remapped on the Z axis, when using the ParticleSystem.NoiseModule.separateAxes option.
         *
         * 在使用分别控制每个轴时，如何在Z轴上重新映射噪声值。
         */
        get remapZ(): MinMaxCurve;
        set remapZ(v: MinMaxCurve);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
        static _frequencyScale: number;
        static _strengthScale: number;
        static _timeScale: number;
        /**
         * 绘制噪音到图片
         *
         * @param image 图片数据
         */
        drawImage(image: ImageData): void;
        private _getDrawImageStrength;
        /**
         * 获取噪音值
         *
         * @param x
         * @param y
         */
        private _getNoiseValue;
        /**
         * 获取单层噪音值
         *
         * @param x
         * @param y
         */
        private _getNoiseValueBase;
        /**
         * 更新
         *
         * @param interval
         */
        update(interval: number): void;
        private _scrollValue;
    }
}
declare namespace feng3d {
    /**
     * Script interface for the SubEmittersModule.
     *
     * The sub-emitters module allows you to spawn particles in child emitters from the positions of particles in the parent system.
     *
     * This module triggers child particle emission on events such as the birth, death, and collision of particles in the parent system.
     */
    class ParticleSubEmittersModule extends ParticleModule {
        /**
         * The total number of sub-emitters.
         */
        get subEmittersCount(): number;
        private subEmitters;
        /**
         * Add a new sub-emitter.
         */
        AddSubEmitter(subEmitter: ParticleSystem, type: ParticleSystemSubEmitterType, properties: ParticleSystemSubEmitterProperties, emitProbability: number): void;
        /**
         * Gets the probability that the sub-emitter emits particles.
         *
         * @param index The index of the sub-emitter.
         */
        GetSubEmitterEmitProbability(index: number): number;
        /**
         * Gets the properties of the sub - emitter at the given index.
         *
         * @param index The index of the sub-emitter.
         */
        GetSubEmitterProperties(index: number): ParticleSystemSubEmitterProperties;
        /**
         * Gets the sub - emitter Particle System at the given index.
         *
         * @param index The index of the desired sub-emitter.
         */
        GetSubEmitterSystem(index: number): ParticleSystem;
        /**
         * Gets the type of the sub - emitter at the given index.
         *
         * @param index The index of the desired sub-emitter.
         */
        GetSubEmitterType(index: number): ParticleSystemSubEmitterType;
        /**
         * Removes a sub - emitter from the given index in the array.
         *
         * @param index The index of the desired sub-emitter.
         */
        RemoveSubEmitter(index: number): void;
        /**
         * Sets the probability that the sub - emitter emits particles.
         *
         * @param index The index of the sub-emitter you want to modify.
         * @param emitProbability The probability value.
         */
        SetSubEmitterEmitProbability(index: number, emitProbability: number): void;
        /**
         * Sets the properties of the sub - emitter at the given index.
         *
         * @param index The index of the sub-emitter you want to modify.
         * @param properties The new properties to assign to this sub-emitter.
         */
        SetSubEmitterProperties(index: number, properties: ParticleSystemSubEmitterProperties): void;
        /**
         * Sets the Particle System to use as the sub - emitter at the given index.
         */
        SetSubEmitterSystem(index: number, subEmitter: ParticleSystem): void;
        /**
         * Sets the type of the sub - emitter at the given index.
         *
         * @param index The index of the sub-emitter you want to modify.
         * @param type The new spawning type to assign to this sub-emitter.
         */
        SetSubEmitterType(index: number, type: ParticleSystemSubEmitterType): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * 粒子系统纹理表动画模块。
     */
    class ParticleTextureSheetAnimationModule extends ParticleModule {
        /**
         * Defines the tiling of the texture.
         *
         * 定义纹理的平铺。
         */
        tiles: Vector2;
        /**
         * Specifies the animation type.
         *
         * 指定动画类型。
         */
        animation: ParticleSystemAnimationType;
        /**
         * Curve to control which frame of the texture sheet animation to play.
         *
         * 曲线控制哪个帧的纹理表动画播放。
         */
        frameOverTime: MinMaxCurve;
        /**
         * Use a random row of the texture sheet for each particle emitted.
         *
         * 对每个发射的粒子使用纹理表的随机行。
         */
        useRandomRow: boolean;
        /**
         * Explicitly select which row of the texture sheet is used, when useRandomRow is set to false.
         *
         * 当useRandomRow设置为false时，显式选择使用纹理表的哪一行。
         */
        get rowIndex(): number;
        set rowIndex(v: number);
        private _rowIndex;
        /**
         * Define a random starting frame for the texture sheet animation.
         *
         * 为纹理表动画定义一个随机的起始帧。
         */
        startFrame: MinMaxCurve;
        /**
         * Specifies how many times the animation will loop during the lifetime of the particle.
         *
         * 指定在粒子的生命周期内动画将循环多少次。
         */
        cycleCount: number;
        /**
         * Flip the UV coordinate on particles, causing them to appear mirrored.
         *
         * 在粒子上翻转UV坐标，使它们呈现镜像翻转。
         */
        flipUV: Vector2;
        /**
         * Choose which UV channels will receive texture animation.
         *
         * 选择哪个UV通道将接收纹理动画。
         *
         * todo 目前引擎中只有一套UV
         */
        uvChannelMask: UVChannelFlags;
        /**
         * Flip the U coordinate on particles, causing them to appear mirrored horizontally.
         *
         * 在粒子上翻转U坐标，使它们呈现水平镜像。
         */
        get flipU(): number;
        set flipU(v: number);
        /**
         * Flip the V coordinate on particles, causing them to appear mirrored vertically.
         *
         * 在粒子上翻转V坐标，使它们垂直镜像。
         */
        get flipV(): number;
        set flipV(v: number);
        /**
         * Frame over time mutiplier.
         *
         * 帧随时间变化的乘数。
         */
        get frameOverTimeMultiplier(): number;
        set frameOverTimeMultiplier(v: number);
        /**
         * Defines the tiling of the texture in the X axis.
         *
         * 定义纹理在X轴上的平铺。
         */
        get numTilesX(): number;
        set numTilesX(v: number);
        /**
         * Defines the tiling of the texture in the Y axis.
         *
         * 定义纹理在Y轴上的平铺。
         */
        get numTilesY(): number;
        set numTilesY(v: number);
        /**
         * Starting frame multiplier.
         *
         * 起始帧乘数。
         */
        get startFrameMultiplier(): number;
        set startFrameMultiplier(v: number);
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle): void;
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle): void;
    }
}
declare namespace feng3d {
    /**
     * Use this class to render particles on to the screen.
     */
    class ParticleSystemRenderer extends ParticleModule {
        /**
         * The number of currently active custom vertex streams.
         */
        activeVertexStreamsCount: number;
        /**
         * Control the direction that particles face.
         */
        alignment: ParticleSystemRenderSpace;
        /**
         * Allow billboard particles to roll around their z-axis.
         */
        allowRoll: boolean;
        /**
         * How much do the particles stretch depending on the Camera's speed.
         */
        cameraVelocityScale: number;
        /**
         * Enables GPU Instancing on platforms that support it.
         */
        enableGPUInstancing: boolean;
        /**
         * Flip a percentage of the particles, along each axis.
         */
        flip: Vector3;
        /**
         * Enables freeform stretching behavior.
         */
        freeformStretching: boolean;
        /**
         * How much are the particles stretched in their direction of motion, defined as the length of the particle compared to its width.
         */
        lengthScale: number;
        /**
         * Specifies how the Particle System Renderer interacts with SpriteMask.
         */
        maskInteraction: SpriteMaskInteraction;
        /**
         * Clamp the maximum particle size.
         */
        maxParticleSize: number;
        /**
         * The Mesh that the particle uses instead of a billboarded Texture.
         */
        mesh: GeometryLike;
        /**
         * The number of Meshes the system uses for particle rendering.
         */
        meshCount: number;
        /**
         * Clamp the minimum particle size.
         */
        minParticleSize: number;
        /**
         * Specifies how much a billboard particle orients its normals towards the Camera.
         */
        normalDirection: number;
        /**
         * Modify the pivot point used for rotating particles.
         */
        pivot: Vector3;
        /**
         * Specifies how the system draws particles.
         */
        renderMode: ParticleSystemRenderMode;
        /**
         * Rotate the particles based on the direction they are stretched in.This is added on top of other particle rotation.
         */
        rotateWithStretchDirection: boolean;
        /**
         * Apply a shadow bias to prevent self - shadowing artifacts.The specified value is the proportion of the particle size.
         */
        shadowBias: number;
        /**
         * Biases Particle System sorting amongst other transparencies.
         */
        sortingFudge: number;
        /**
         * Specifies how to sort particles within a system.
         */
        sortMode: ParticleSystemSortMode;
        /**
         * Set the Material that the TrailModule uses to attach trails to particles.
         */
        trailMaterial: Material;
        /**
         * Specifies how much particles stretch depending on their velocity.
         */
        velocityScale: number;
    }
}
//# sourceMappingURL=index.d.ts.map
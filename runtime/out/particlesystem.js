var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var feng3d;
(function (feng3d) {
    /**
     * 粒子
     */
    var Particle = /** @class */ (function () {
        function Particle() {
            /**
             * 出生时间
             */
            this.birthTime = 0;
            /**
             * 寿命
             */
            this.lifetime = 5;
            /**
             * 位置
             */
            this.position = new feng3d.Vector3();
            /**
             * 速度
             */
            this.velocity = new feng3d.Vector3();
            /**
             * 加速度
             */
            this.acceleration = new feng3d.Vector3();
            /**
             * 旋转角度
             */
            this.rotation = new feng3d.Vector3();
            /**
             * 角速度
             */
            this.angularVelocity = new feng3d.Vector3();
            /**
             * 尺寸
             */
            this.size = new feng3d.Vector3(1, 1, 1);
            /**
             * 起始尺寸
             */
            this.startSize = new feng3d.Vector3(1, 1, 1);
            /**
             * 颜色
             */
            this.color = new feng3d.Color4();
            /**
             * 起始颜色
             */
            this.startColor = new feng3d.Color4();
            /**
             * 纹理UV缩放和偏移。
             */
            this.tilingOffset = new feng3d.Vector4(1, 1, 0, 0);
            /**
             * 在粒子上翻转UV坐标，使它们呈现水平镜像。
             */
            this.flipUV = new feng3d.Vector2();
            /**
             * 缓存，用于存储计算时临时数据
             */
            this.cache = {};
        }
        /**
         * 更新状态
         */
        Particle.prototype.updateState = function (time) {
            var preTime = Math.max(this.curTime, this.birthTime);
            time = Math.max(this.birthTime, time);
            //
            var deltaTime = time - preTime;
            // 计算速度
            this.velocity.add(this.acceleration.scaleNumberTo(deltaTime));
            // 计算位置
            this.position.x += this.velocity.x * deltaTime;
            this.position.y += this.velocity.y * deltaTime;
            this.position.z += this.velocity.z * deltaTime;
            // 计算角度
            this.rotation.add(this.angularVelocity.scaleNumberTo(deltaTime));
            // 记录粒子此次移动的起始时间以及起始位置
            this.prePosition = this.curPosition.clone();
            this.curPosition = this.position.clone();
            this.preTime = this.curTime;
            this.curTime = time;
        };
        return Particle;
    }());
    feng3d.Particle = Particle;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * UnityShader "Particles/Additive"
     */
    var ParticlesAdditiveUniforms = /** @class */ (function () {
        function ParticlesAdditiveUniforms() {
            this._TintColor = new feng3d.Color4(0.5, 0.5, 0.5, 0.5);
            /**
             * 粒子贴图
             */
            this._MainTex = feng3d.Texture2D.defaultParticle;
            /**
             * 粒子贴图使用的UV变换
             */
            this._MainTex_ST = new feng3d.Vector4(1, 1, 0, 0);
            /**
             * @todo
             */
            this._InvFade = 1.0;
        }
        __decorate([
            feng3d.serialize,
            feng3d.oav()
        ], ParticlesAdditiveUniforms.prototype, "_TintColor", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "粒子贴图" })
        ], ParticlesAdditiveUniforms.prototype, "_MainTex", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "粒子贴图使用的UV变换" })
        ], ParticlesAdditiveUniforms.prototype, "_MainTex_ST", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav()
        ], ParticlesAdditiveUniforms.prototype, "_InvFade", void 0);
        return ParticlesAdditiveUniforms;
    }());
    feng3d.ParticlesAdditiveUniforms = ParticlesAdditiveUniforms;
    feng3d.shaderConfig.shaders["Particles_Additive"].cls = ParticlesAdditiveUniforms;
    feng3d.shaderConfig.shaders["Particles_Additive"].renderParams = {
        enableBlend: true,
        sfactor: feng3d.BlendFactor.SRC_ALPHA,
        dfactor: feng3d.BlendFactor.ONE,
        colorMask: feng3d.ColorMask.RGB,
        cullFace: feng3d.CullFace.NONE,
        depthMask: false,
    };
    feng3d.Material.setDefault("Particle-Material", { shaderName: "Particles_Additive" });
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * UnityShader "Particles/Alpha Blended Premultiply"
     */
    var ParticlesAlphaBlendedPremultiplyUniforms = /** @class */ (function () {
        function ParticlesAlphaBlendedPremultiplyUniforms() {
            /**
             * 粒子贴图
             */
            this._MainTex = feng3d.Texture2D.defaultParticle;
            /**
             * 粒子贴图使用的UV变换
             */
            this._MainTex_ST = new feng3d.Vector4(1, 1, 0, 0);
            /**
             * @todo
             */
            this.u_softParticlesFactor = 1.0;
        }
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "粒子贴图" })
        ], ParticlesAlphaBlendedPremultiplyUniforms.prototype, "_MainTex", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "粒子贴图使用的UV变换" })
        ], ParticlesAlphaBlendedPremultiplyUniforms.prototype, "_MainTex_ST", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav()
        ], ParticlesAlphaBlendedPremultiplyUniforms.prototype, "u_softParticlesFactor", void 0);
        return ParticlesAlphaBlendedPremultiplyUniforms;
    }());
    feng3d.ParticlesAlphaBlendedPremultiplyUniforms = ParticlesAlphaBlendedPremultiplyUniforms;
    feng3d.shaderConfig.shaders["Particles_AlphaBlendedPremultiply"].cls = ParticlesAlphaBlendedPremultiplyUniforms;
    feng3d.shaderConfig.shaders["Particles_AlphaBlendedPremultiply"].renderParams = {
        enableBlend: true,
        sfactor: feng3d.BlendFactor.ONE,
        dfactor: feng3d.BlendFactor.ONE_MINUS_SRC_ALPHA,
        colorMask: feng3d.ColorMask.RGB,
        cullFace: feng3d.CullFace.NONE,
        depthMask: false,
    };
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统
     */
    var ParticleSystem = /** @class */ (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem() {
            var _this = _super.call(this) || this;
            _this._isPlaying = false;
            /**
             * Playback position in seconds.
             *
             * 回放位置(秒)
             */
            _this.time = 0;
            _this.geometry = feng3d.Geometry.getDefault("Billboard-Geometry");
            _this.material = feng3d.Material.getDefault("Particle-Material");
            _this.castShadows = true;
            _this.receiveShadows = true;
            _this._awaked = false;
            /**
             * 粒子池，用于存放未发射或者死亡粒子
             */
            _this._particlePool = [];
            /**
             * 活跃的粒子列表
             */
            _this._activeParticles = [];
            /**
             * 属性数据列表
             */
            _this._attributes = {
                a_particle_position: new feng3d.Attribute("a_particle_position", [], 3, 1),
                a_particle_scale: new feng3d.Attribute("a_particle_scale", [], 3, 1),
                a_particle_rotation: new feng3d.Attribute("a_particle_rotation", [], 3, 1),
                a_particle_color: new feng3d.Attribute("a_particle_color", [], 4, 1),
                a_particle_tilingOffset: new feng3d.Attribute("a_particle_tilingOffset", [], 4, 1),
                a_particle_flipUV: new feng3d.Attribute("a_particle_flipUV", [], 2, 1),
            };
            _this._modules = [];
            /**
             * 是否为被上级粒子系统引用的子粒子系统。
             */
            _this._isSubParticleSystem = false;
            _this.main = new feng3d.ParticleMainModule();
            _this.emission = new feng3d.ParticleEmissionModule();
            _this.shape = new feng3d.ParticleShapeModule();
            _this.velocityOverLifetime = new feng3d.ParticleVelocityOverLifetimeModule();
            _this.inheritVelocity = new feng3d.ParticleInheritVelocityModule();
            _this.forceOverLifetime = new feng3d.ParticleForceOverLifetimeModule();
            _this.limitVelocityOverLifetime = new feng3d.ParticleLimitVelocityOverLifetimeModule();
            _this.colorOverLifetime = new feng3d.ParticleColorOverLifetimeModule();
            _this.colorBySpeed = new feng3d.ParticleColorBySpeedModule();
            _this.sizeOverLifetime = new feng3d.ParticleSizeOverLifetimeModule();
            _this.sizeBySpeed = new feng3d.ParticleSizeBySpeedModule();
            _this.rotationOverLifetime = new feng3d.ParticleRotationOverLifetimeModule();
            _this.rotationBySpeed = new feng3d.ParticleRotationBySpeedModule();
            _this.noise = new feng3d.ParticleNoiseModule();
            _this.subEmitters = new feng3d.ParticleSubEmittersModule();
            _this.textureSheetAnimation = new feng3d.ParticleTextureSheetAnimationModule();
            _this.main.enabled = true;
            _this.emission.enabled = true;
            _this.shape.enabled = true;
            return _this;
        }
        Object.defineProperty(ParticleSystem.prototype, "isPlaying", {
            /**
             * Is the particle system playing right now ?
             *
             * 粒子系统正在运行吗?
             */
            get: function () {
                return this._isPlaying;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "isStopped", {
            /**
             * Is the particle system stopped right now ?
             *
             * 粒子系统现在停止了吗?
             */
            get: function () {
                return !this._isPlaying && this.time == 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "isPaused", {
            /**
             * Is the particle system paused right now ?
             *
             * 粒子系统现在暂停了吗?
             */
            get: function () {
                return !this._isPlaying && this.time != 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "particleCount", {
            /**
             * The current number of particles (Read Only).
             *
             * 当前粒子数(只读)。
             */
            get: function () {
                return this._activeParticles.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "main", {
            get: function () { return this._main; },
            set: function (v) {
                if (this._main) {
                    feng3d.watcher.unwatch(this._main, "simulationSpace", this._simulationSpaceChanged, this);
                }
                Array.replace(this._modules, this._main, v);
                v.particleSystem = this;
                this._main = v;
                feng3d.watcher.watch(this._main, "simulationSpace", this._simulationSpaceChanged, this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "emission", {
            get: function () { return this._emission; },
            set: function (v) {
                Array.replace(this._modules, this._emission, v);
                v.particleSystem = this;
                this._emission = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "shape", {
            get: function () { return this._shape; },
            set: function (v) {
                Array.replace(this._modules, this._shape, v);
                v.particleSystem = this;
                this._shape = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "velocityOverLifetime", {
            get: function () { return this._velocityOverLifetime; },
            set: function (v) {
                Array.replace(this._modules, this._velocityOverLifetime, v);
                v.particleSystem = this;
                this._velocityOverLifetime = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "limitVelocityOverLifetime", {
            get: function () { return this._limitVelocityOverLifetime; },
            set: function (v) {
                Array.replace(this._modules, this._limitVelocityOverLifetime, v);
                v.particleSystem = this;
                this._limitVelocityOverLifetime = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "inheritVelocity", {
            /**
             * Script interface for the Particle System velocity inheritance module.
             *
             * 粒子系统速度继承模块。
             */
            get: function () { return this._inheritVelocity; },
            set: function (v) {
                Array.replace(this._modules, this._inheritVelocity, v);
                v.particleSystem = this;
                this._inheritVelocity = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "forceOverLifetime", {
            get: function () { return this._forceOverLifetime; },
            set: function (v) {
                Array.replace(this._modules, this._forceOverLifetime, v);
                v.particleSystem = this;
                this._forceOverLifetime = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "colorOverLifetime", {
            get: function () { return this._colorOverLifetime; },
            set: function (v) {
                Array.replace(this._modules, this._colorOverLifetime, v);
                v.particleSystem = this;
                this._colorOverLifetime = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "colorBySpeed", {
            /**
             * 颜色随速度变化模块。
             */
            get: function () { return this._colorBySpeed; },
            set: function (v) {
                Array.replace(this._modules, this._colorBySpeed, v);
                v.particleSystem = this;
                this._colorBySpeed = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "sizeOverLifetime", {
            get: function () { return this._sizeOverLifetime; },
            set: function (v) {
                Array.replace(this._modules, this._sizeOverLifetime, v);
                v.particleSystem = this;
                this._sizeOverLifetime = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "sizeBySpeed", {
            /**
             * 缩放随速度变化模块
             */
            get: function () { return this._sizeBySpeed; },
            set: function (v) {
                Array.replace(this._modules, this._sizeBySpeed, v);
                v.particleSystem = this;
                this._sizeBySpeed = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "rotationOverLifetime", {
            get: function () { return this._rotationOverLifetime; },
            set: function (v) {
                Array.replace(this._modules, this._rotationOverLifetime, v);
                v.particleSystem = this;
                this._rotationOverLifetime = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "rotationBySpeed", {
            /**
             * 旋转角度随速度变化模块
             */
            get: function () { return this._rotationBySpeed; },
            set: function (v) {
                Array.replace(this._modules, this._rotationBySpeed, v);
                v.particleSystem = this;
                this._rotationBySpeed = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "noise", {
            /**
             * 旋转角度随速度变化模块
             */
            get: function () { return this._noise; },
            set: function (v) {
                Array.replace(this._modules, this._noise, v);
                v.particleSystem = this;
                this._noise = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "subEmitters", {
            /**
             * 旋转角度随速度变化模块
             */
            get: function () { return this._subEmitters; },
            set: function (v) {
                Array.replace(this._modules, this._subEmitters, v);
                v.particleSystem = this;
                this._subEmitters = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "textureSheetAnimation", {
            /**
             * 粒子系统纹理表动画模块。
             */
            get: function () { return this._textureSheetAnimation; },
            set: function (v) {
                Array.replace(this._modules, this._textureSheetAnimation, v);
                v.particleSystem = this;
                this._textureSheetAnimation = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "single", {
            get: function () { return true; },
            enumerable: false,
            configurable: true
        });
        ParticleSystem.prototype.update = function (interval) {
            var _this = this;
            if (!this.isPlaying)
                return;
            var deltaTime = this.main.simulationSpeed * interval / 1000;
            this.time = this.time + deltaTime;
            var emitInfo = this._emitInfo;
            emitInfo.preTime = emitInfo.currentTime;
            emitInfo.currentTime = this.time - emitInfo.startDelay;
            emitInfo.preWorldPos.copy(emitInfo.currentWorldPos);
            // 粒子系统位置
            emitInfo.currentWorldPos.copy(this.transform.worldPosition);
            // 粒子系统位移
            emitInfo.moveVec.copy(emitInfo.currentWorldPos).sub(emitInfo.preWorldPos);
            // 粒子系统速度
            emitInfo.speed.copy(emitInfo.moveVec).divideNumber(deltaTime);
            this._modules.forEach(function (m) {
                m.update(deltaTime);
            });
            this._updateActiveParticlesState(deltaTime);
            // 完成一个循环
            if (this.main.loop && Math.floor(emitInfo.preTime / this.main.duration) < Math.floor(emitInfo.currentTime / this.main.duration)) {
                // 重新计算喷发概率
                this.emission.bursts.forEach(function (element) {
                    element.calculateProbability();
                });
                this.dispatch("particleCycled", this);
            }
            // 发射粒子
            if (!this._isSubParticleSystem) // 子粒子系统自身不会自动发射粒子
             {
                var emits = this._emit(emitInfo);
                emits.sort(function (a, b) { return a.time - b.time; });
                emits.forEach(function (v) {
                    _this._emitParticles(v);
                });
            }
            // 判断非循环的效果是否播放结束
            if (!this.main.loop && this._activeParticles.length == 0 && emitInfo.currentTime > this.main.duration) {
                this.stop();
                this.dispatch("particleCompleted", this);
            }
        };
        /**
         * 停止
         */
        ParticleSystem.prototype.stop = function () {
            this._isPlaying = false;
            this.time = 0;
            this._particlePool = this._particlePool.concat(this._activeParticles);
            this._activeParticles.length = 0;
        };
        /**
         * 播放
         */
        ParticleSystem.prototype.play = function () {
            this._isPlaying = true;
            this.time = 0;
            this._particlePool = this._particlePool.concat(this._activeParticles);
            this._activeParticles.length = 0;
            var startDelay = this.main.startDelay.getValue(Math.random());
            this._emitInfo =
                {
                    preTime: -startDelay,
                    currentTime: -startDelay,
                    preWorldPos: new feng3d.Vector3(),
                    currentWorldPos: new feng3d.Vector3(),
                    rateAtDuration: 0,
                    _leftRateOverDistance: 0,
                    _isRateOverDistance: false,
                    startDelay: startDelay,
                    moveVec: new feng3d.Vector3(),
                    speed: new feng3d.Vector3(),
                    position: new feng3d.Vector3(),
                };
            // 重新计算喷发概率
            this.emission.bursts.forEach(function (element) {
                element.calculateProbability();
            });
        };
        /**
         * 暂停
         */
        ParticleSystem.prototype.pause = function () {
            this._isPlaying = false;
        };
        /**
         * 继续
         */
        ParticleSystem.prototype.continue = function () {
            if (this.time == 0) {
                this.play();
            }
            else {
                this._isPlaying = true;
                this._emitInfo.preTime = Math.max(0, this._emitInfo.currentTime);
            }
        };
        ParticleSystem.prototype.beforeRender = function (renderAtomic, scene, camera) {
            _super.prototype.beforeRender.call(this, renderAtomic, scene, camera);
            if (Boolean(scene.runEnvironment & feng3d.RunEnvironment.feng3d) && !this._awaked) {
                if (this.main.playOnAwake && !this._isPlaying) {
                    this.play();
                }
                this._awaked = true;
            }
            renderAtomic.instanceCount = this._activeParticles.length;
            //
            renderAtomic.shaderMacro.HAS_PARTICLE_ANIMATOR = true;
            renderAtomic.shaderMacro.ENABLED_PARTICLE_SYSTEM_textureSheetAnimation = this.textureSheetAnimation.enabled;
            // 计算公告牌矩阵
            var isbillboard = !this.shape.alignToDirection && this.geometry == feng3d.Geometry.getDefault("Billboard-Geometry");
            var billboardMatrix = new feng3d.Matrix3x3();
            if (isbillboard) {
                var cameraMatrix = camera.transform.localToWorldMatrix.clone();
                var localCameraForward = cameraMatrix.getAxisZ();
                var localCameraUp = cameraMatrix.getAxisY();
                if (this.main.simulationSpace == feng3d.ParticleSystemSimulationSpace.Local) {
                    localCameraForward = this.gameObject.transform.worldToLocalRotationMatrix.transformPoint3(localCameraForward);
                    localCameraUp = this.gameObject.transform.worldToLocalRotationMatrix.transformPoint3(localCameraUp);
                }
                var matrix4x4 = new feng3d.Matrix4x4();
                matrix4x4.lookAt(localCameraForward, localCameraUp);
                billboardMatrix.formMatrix4x4(matrix4x4);
            }
            var positions = [];
            var scales = [];
            var rotations = [];
            var colors = [];
            var tilingOffsets = [];
            var flipUVs = [];
            for (var i = 0, n = this._activeParticles.length; i < n; i++) {
                var particle = this._activeParticles[i];
                positions.push(particle.position.x, particle.position.y, particle.position.z);
                scales.push(particle.size.x, particle.size.y, particle.size.z);
                rotations.push(particle.rotation.x, particle.rotation.y, particle.rotation.z);
                colors.push(particle.color.r, particle.color.g, particle.color.b, particle.color.a);
                tilingOffsets.push(particle.tilingOffset.x, particle.tilingOffset.y, particle.tilingOffset.z, particle.tilingOffset.w);
                flipUVs.push(particle.flipUV.x, particle.flipUV.y);
            }
            if (isbillboard) {
                for (var i = 0, n = rotations.length; i < n; i += 3) {
                    rotations[i + 2] = -rotations[i + 2];
                }
            }
            //
            this._attributes.a_particle_position.data = positions;
            this._attributes.a_particle_scale.data = scales;
            this._attributes.a_particle_rotation.data = rotations;
            this._attributes.a_particle_color.data = colors;
            this._attributes.a_particle_tilingOffset.data = tilingOffsets;
            this._attributes.a_particle_flipUV.data = flipUVs;
            //
            renderAtomic.uniforms.u_particle_billboardMatrix = billboardMatrix;
            if (this.main.simulationSpace == feng3d.ParticleSystemSimulationSpace.World) {
                renderAtomic.uniforms.u_modelMatrix = function () { return new feng3d.Matrix4x4(); };
                renderAtomic.uniforms.u_ITModelMatrix = function () { return new feng3d.Matrix4x4(); };
            }
            for (var key in this._attributes) {
                renderAtomic.attributes[key] = this._attributes[key];
            }
        };
        /**
         * 发射粒子
         *
         * @param startTime 发射起始时间
         * @param endTime 发射终止时间
         * @param startPos 发射起始位置
         * @param stopPos 发射终止位置
         */
        ParticleSystem.prototype._emit = function (emitInfo) {
            // 
            var emits = [];
            var startTime = emitInfo.preTime;
            var endTime = emitInfo.currentTime;
            if (!this.emission.enabled)
                return emits;
            // 判断是否开始发射
            if (endTime <= 0)
                return emits;
            var loop = this.main.loop;
            var duration = this.main.duration;
            // 判断是否结束发射
            if (!loop && startTime >= duration)
                return emits;
            // 计算最后发射时间
            if (!loop)
                endTime = Math.min(endTime, duration);
            // 计算此处在发射周期的位置
            var rateAtDuration = (endTime % duration) / duration;
            if (rateAtDuration == 0 && endTime >= duration)
                rateAtDuration = 1;
            emitInfo.rateAtDuration = rateAtDuration;
            // 处理移动发射粒子
            var moveEmits = this._emitWithMove(emitInfo);
            emits = emits.concat(moveEmits);
            // 单粒子发射周期
            var timeEmits = this._emitWithTime(emitInfo, duration);
            emits = emits.concat(timeEmits);
            return emits;
        };
        /**
         * 计算在指定移动的位移线段中发射的粒子列表。
         *
         * @param rateAtDuration
         * @param prePos
         * @param currentPos
         */
        ParticleSystem.prototype._emitWithMove = function (emitInfo) {
            var emits = [];
            if (this.main.simulationSpace == feng3d.ParticleSystemSimulationSpace.World) {
                if (emitInfo._isRateOverDistance) {
                    var moveVec = emitInfo.currentWorldPos.subTo(emitInfo.preWorldPos);
                    var moveDistance = moveVec.length;
                    var worldPos = emitInfo.currentWorldPos;
                    // 本次移动距离
                    if (moveDistance > 0) {
                        // 移动方向
                        var moveDir = moveVec.clone().normalize();
                        // 剩余移动量
                        var leftRateOverDistance = emitInfo._leftRateOverDistance + moveDistance;
                        // 发射频率
                        var rateOverDistance = this.emission.rateOverDistance.getValue(emitInfo.rateAtDuration);
                        // 发射间隔距离
                        var invRateOverDistance = 1 / rateOverDistance;
                        // 发射间隔位移
                        var invRateOverDistanceVec = moveDir.scaleNumberTo(1 / rateOverDistance);
                        // 上次发射位置
                        var lastRateOverDistance = emitInfo.preWorldPos.addTo(moveDir.negateTo().scaleNumber(emitInfo._leftRateOverDistance));
                        while (invRateOverDistance < leftRateOverDistance) {
                            emits.push({
                                position: lastRateOverDistance.add(invRateOverDistanceVec).clone().sub(worldPos),
                                time: emitInfo.preTime + (emitInfo.currentTime - emitInfo.preTime) * (1 - leftRateOverDistance / moveDistance),
                                num: 1,
                                emitInfo: emitInfo
                            });
                            leftRateOverDistance -= invRateOverDistance;
                        }
                        emitInfo._leftRateOverDistance = leftRateOverDistance;
                    }
                }
                emitInfo._isRateOverDistance = true;
            }
            else {
                emitInfo._isRateOverDistance = false;
                emitInfo._leftRateOverDistance = 0;
            }
            return emits;
        };
        /**
         * 计算在指定时间段内发射的粒子列表
         *
         * @param rateAtDuration
         * @param preRealTime
         * @param duration
         * @param realEmitTime
         */
        ParticleSystem.prototype._emitWithTime = function (emitInfo, duration) {
            var rateAtDuration = emitInfo.rateAtDuration;
            var preTime = emitInfo.preTime;
            var currentTime = emitInfo.currentTime;
            var emits = [];
            var step = 1 / this.emission.rateOverTime.getValue(rateAtDuration);
            var bursts = this.emission.bursts;
            // 遍历所有发射周期
            var cycleStartIndex = Math.floor(preTime / duration);
            var cycleEndIndex = Math.ceil(currentTime / duration);
            for (var k = cycleStartIndex; k < cycleEndIndex; k++) {
                var cycleStartTime = k * duration;
                var cycleEndTime = (k + 1) * duration;
                // 单个周期内的起始与结束时间
                var startTime = Math.max(preTime, cycleStartTime);
                var endTime = Math.min(currentTime, cycleEndTime);
                // 处理稳定发射
                var singleStart = Math.ceil(startTime / step) * step;
                for (var i = singleStart; i < endTime; i += step) {
                    emits.push({ time: i, num: 1, emitInfo: emitInfo, position: emitInfo.position.clone() });
                }
                // 处理喷发
                var inCycleStart = startTime - cycleStartTime;
                var inCycleEnd = endTime - cycleStartTime;
                for (var i_1 = 0; i_1 < bursts.length; i_1++) {
                    var burst = bursts[i_1];
                    if (burst.isProbability && inCycleStart <= burst.time && burst.time < inCycleEnd) {
                        emits.push({ time: cycleStartTime + burst.time, num: burst.count.getValue(rateAtDuration), emitInfo: emitInfo, position: emitInfo.position.clone() });
                    }
                }
            }
            return emits;
        };
        /**
         * 发射粒子
         * @param birthTime 发射时间
         * @param num 发射数量
         */
        ParticleSystem.prototype._emitParticles = function (v) {
            var num = v.num;
            var birthTime = v.time;
            var position = v.position;
            var emitInfo = v.emitInfo;
            for (var i = 0; i < num; i++) {
                if (this._activeParticles.length >= this.main.maxParticles)
                    return;
                var lifetime = this.main.startLifetime.getValue(emitInfo.rateAtDuration);
                var birthRateAtDuration = (birthTime - emitInfo.startDelay) / this.main.duration;
                var rateAtLifeTime = (emitInfo.currentTime - birthTime) / lifetime;
                if (rateAtLifeTime < 1) {
                    var particle = this._particlePool.pop() || new feng3d.Particle();
                    particle.cache = {};
                    particle.position.copy(position);
                    particle.birthTime = birthTime;
                    particle.lifetime = lifetime;
                    particle.rateAtLifeTime = rateAtLifeTime;
                    //
                    particle.birthRateAtDuration = birthRateAtDuration - Math.floor(birthRateAtDuration);
                    //
                    particle.preTime = emitInfo.currentTime;
                    particle.curTime = emitInfo.currentTime;
                    particle.prePosition = position.clone();
                    particle.curPosition = position.clone();
                    //
                    this._activeParticles.push(particle);
                    this._initParticleState(particle);
                    this._updateParticleState(particle, 0);
                }
            }
        };
        /**
         * 更新活跃粒子状态
         */
        ParticleSystem.prototype._updateActiveParticlesState = function (deltaTime) {
            for (var i = this._activeParticles.length - 1; i >= 0; i--) {
                var particle = this._activeParticles[i];
                particle.rateAtLifeTime = (particle.curTime + deltaTime - particle.birthTime) / particle.lifetime;
                if (particle.rateAtLifeTime < 0 || particle.rateAtLifeTime > 1) {
                    this._activeParticles.splice(i, 1);
                    this._particlePool.push(particle);
                    particle.subEmitInfo = null;
                }
                else {
                    this._updateParticleState(particle, deltaTime);
                }
            }
        };
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleSystem.prototype._initParticleState = function (particle) {
            this._modules.forEach(function (v) { v.initParticleState(particle); });
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleSystem.prototype._updateParticleState = function (particle, deltaTime) {
            //
            this._modules.forEach(function (v) { v.updateParticleState(particle); });
            particle.updateState(particle.curTime + deltaTime);
        };
        ParticleSystem.prototype._simulationSpaceChanged = function () {
            if (!this.transform)
                return;
            if (this._activeParticles.length == 0)
                return;
            if (this._main.simulationSpace == feng3d.ParticleSystemSimulationSpace.Local) {
                var worldToLocalMatrix = this.transform.worldToLocalMatrix;
                this._activeParticles.forEach(function (p) {
                    worldToLocalMatrix.transformPoint3(p.position, p.position);
                    worldToLocalMatrix.transformVector3(p.velocity, p.velocity);
                    worldToLocalMatrix.transformVector3(p.acceleration, p.acceleration);
                });
            }
            else {
                var localToWorldMatrix = this.transform.localToWorldMatrix;
                this._activeParticles.forEach(function (p) {
                    localToWorldMatrix.transformPoint3(p.position, p.position);
                    localToWorldMatrix.transformVector3(p.velocity, p.velocity);
                    localToWorldMatrix.transformVector3(p.acceleration, p.acceleration);
                });
            }
        };
        /**
         * 给指定粒子添加指定空间的位移。
         *
         * @param particle 粒子。
         * @param position 速度。
         * @param space 速度所在空间。
         * @param name  速度名称。如果不为 undefined 时保存，调用 removeParticleVelocity 可以移除该部分速度。
         */
        ParticleSystem.prototype.addParticlePosition = function (particle, position, space, name) {
            if (name != undefined) {
                this.removeParticleVelocity(particle, name);
                particle.cache[name] = { value: position.clone(), space: space };
            }
            if (space != this.main.simulationSpace) {
                if (space == feng3d.ParticleSystemSimulationSpace.World) {
                    this.transform.worldToLocalMatrix.transformPoint3(position, position);
                }
                else {
                    this.transform.localToWorldMatrix.transformPoint3(position, position);
                }
            }
            //
            particle.position.add(position);
        };
        /**
         * 移除指定粒子上的位移
         *
         * @param particle 粒子。
         * @param name 位移名称。
         */
        ParticleSystem.prototype.removeParticlePosition = function (particle, name) {
            var obj = particle.cache[name];
            if (obj) {
                delete particle.cache[name];
                var space = obj.space;
                var value = obj.value;
                if (space != this.main.simulationSpace) {
                    if (space == feng3d.ParticleSystemSimulationSpace.World) {
                        this.transform.worldToLocalMatrix.transformPoint3(value, value);
                    }
                    else {
                        this.transform.localToWorldMatrix.transformPoint3(value, value);
                    }
                }
                //
                particle.position.sub(value);
            }
        };
        /**
         * 给指定粒子添加指定空间的速度。
         *
         * @param particle 粒子。
         * @param velocity 速度。
         * @param space 速度所在空间。
         * @param name  速度名称。如果不为 undefined 时保存，调用 removeParticleVelocity 可以移除该部分速度。
         */
        ParticleSystem.prototype.addParticleVelocity = function (particle, velocity, space, name) {
            if (name != undefined) {
                this.removeParticleVelocity(particle, name);
                particle.cache[name] = { value: velocity.clone(), space: space };
            }
            if (space != this.main.simulationSpace) {
                if (space == feng3d.ParticleSystemSimulationSpace.World) {
                    this.transform.worldToLocalMatrix.transformVector3(velocity, velocity);
                }
                else {
                    this.transform.localToWorldMatrix.transformVector3(velocity, velocity);
                }
            }
            //
            particle.velocity.add(velocity);
        };
        /**
         * 移除指定粒子上的速度
         *
         * @param particle 粒子。
         * @param name 速度名称。
         */
        ParticleSystem.prototype.removeParticleVelocity = function (particle, name) {
            var obj = particle.cache[name];
            if (obj) {
                delete particle.cache[name];
                var space = obj.space;
                var value = obj.value;
                if (space != this.main.simulationSpace) {
                    if (space == feng3d.ParticleSystemSimulationSpace.World) {
                        this.transform.worldToLocalMatrix.transformVector3(value, value);
                    }
                    else {
                        this.transform.localToWorldMatrix.transformVector3(value, value);
                    }
                }
                //
                particle.velocity.sub(value);
            }
        };
        /**
         * 给指定粒子添加指定空间的速度。
         *
         * @param particle 粒子。
         * @param acceleration 加速度。
         * @param space 加速度所在空间。
         * @param name  加速度名称。如果不为 undefined 时保存，调用 removeParticleVelocity 可以移除该部分速度。
         */
        ParticleSystem.prototype.addParticleAcceleration = function (particle, acceleration, space, name) {
            if (name != undefined) {
                this.removeParticleAcceleration(particle, name);
                particle.cache[name] = { value: acceleration.clone(), space: space };
            }
            if (space != this.main.simulationSpace) {
                if (space == feng3d.ParticleSystemSimulationSpace.World) {
                    this.transform.worldToLocalMatrix.transformVector3(acceleration, acceleration);
                }
                else {
                    this.transform.localToWorldMatrix.transformVector3(acceleration, acceleration);
                }
            }
            //
            particle.acceleration.add(acceleration);
        };
        /**
         * 移除指定粒子上的加速度
         *
         * @param particle 粒子。
         * @param name 加速度名称。
         */
        ParticleSystem.prototype.removeParticleAcceleration = function (particle, name) {
            var obj = particle.cache[name];
            if (obj) {
                delete particle.cache[name];
                var space = obj.space;
                var value = obj.value;
                if (space != this.main.simulationSpace) {
                    if (space == feng3d.ParticleSystemSimulationSpace.World) {
                        this.transform.worldToLocalMatrix.transformVector3(value, value);
                    }
                    else {
                        this.transform.localToWorldMatrix.transformVector3(value, value);
                    }
                }
                //
                particle.acceleration.sub(value);
            }
        };
        /**
         * 触发子发射器
         *
         * @param subEmitterIndex 子发射器索引
         */
        ParticleSystem.prototype.TriggerSubEmitter = function (subEmitterIndex, particles) {
            var _this = this;
            if (particles === void 0) { particles = null; }
            if (!this.subEmitters.enabled)
                return;
            var subEmitter = this.subEmitters.GetSubEmitterSystem(subEmitterIndex);
            if (!subEmitter)
                return;
            if (!subEmitter.enabled)
                return;
            var probability = this.subEmitters.GetSubEmitterEmitProbability(subEmitterIndex);
            this.subEmitters.GetSubEmitterProperties(subEmitterIndex);
            this.subEmitters.GetSubEmitterType(subEmitterIndex);
            particles = particles || this._activeParticles;
            var emits = [];
            particles.forEach(function (particle) {
                if (Math.random() > probability)
                    return;
                // 粒子所在世界坐标
                var particleWoldPos = _this.transform.localToWorldMatrix.transformPoint3(particle.position);
                // 粒子在子粒子系统的坐标
                var subEmitPos = subEmitter.transform.worldToLocalMatrix.transformPoint3(particleWoldPos);
                if (!particle.subEmitInfo) {
                    var startDelay = _this.main.startDelay.getValue(Math.random());
                    particle.subEmitInfo = {
                        preTime: particle.preTime - particle.birthTime - startDelay,
                        currentTime: particle.preTime - particle.birthTime - startDelay,
                        preWorldPos: particleWoldPos.clone(),
                        currentWorldPos: particleWoldPos.clone(),
                        rateAtDuration: 0,
                        _leftRateOverDistance: 0,
                        _isRateOverDistance: false,
                        startDelay: startDelay,
                        moveVec: new feng3d.Vector3(),
                        speed: new feng3d.Vector3(),
                        position: subEmitPos,
                    };
                }
                else {
                    particle.subEmitInfo.preTime = particle.preTime - particle.birthTime - particle.subEmitInfo.startDelay;
                    particle.subEmitInfo.currentTime = particle.curTime - particle.birthTime - particle.subEmitInfo.startDelay;
                    particle.subEmitInfo.position.copy(subEmitPos);
                }
                var subEmits = subEmitter._emit(particle.subEmitInfo);
                emits = emits.concat(subEmits);
            });
            emits.sort(function (a, b) { return a.time - b.time; });
            emits.forEach(function (v) {
                subEmitter._emitParticles(v);
            });
        };
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Main", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "main", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Emission", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "emission", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Shape", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "shape", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Velocity Over Lifetime", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "velocityOverLifetime", null);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "limit velocity over lifetime module.", block: "limitVelocityOverLifetime", component: "OAVObjectView" })
            ,
            feng3d.oav({ tooltip: "基于时间轴限制速度模块。", block: "Limit Velocity Over Lifetime", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "limitVelocityOverLifetime", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "粒子系统速度继承模块。", block: "Inherit Velocity", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "inheritVelocity", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Force Over Lifetime", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "forceOverLifetime", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Color Over Lifetime", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "colorOverLifetime", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Color By Speed", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "colorBySpeed", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "sizeOverLifetime", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "sizeOverLifetime", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Size By Speed", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "sizeBySpeed", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Rotation Over Lifetime", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "rotationOverLifetime", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Rotation By Speed", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "rotationBySpeed", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Noise", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "noise", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ block: "Sub Emitters", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "subEmitters", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "粒子系统纹理表动画模块。", block: "Texture Sheet Animation", component: "OAVObjectView" })
        ], ParticleSystem.prototype, "textureSheetAnimation", null);
        __decorate([
            feng3d.oav({ tooltip: "粒子系统渲染模块。", block: "Renderer" })
        ], ParticleSystem.prototype, "geometry", void 0);
        __decorate([
            feng3d.oav({ block: "Renderer" })
        ], ParticleSystem.prototype, "material", void 0);
        __decorate([
            feng3d.oav({ block: "Renderer" }),
            feng3d.serialize
        ], ParticleSystem.prototype, "castShadows", void 0);
        __decorate([
            feng3d.oav({ block: "Renderer" }),
            feng3d.serialize
        ], ParticleSystem.prototype, "receiveShadows", void 0);
        ParticleSystem = __decorate([
            feng3d.AddComponentMenu("Effects/ParticleSystem"),
            feng3d.RegisterComponent()
        ], ParticleSystem);
        return ParticleSystem;
    }(feng3d.Renderable));
    feng3d.ParticleSystem = ParticleSystem;
    feng3d.Geometry.setDefault("Billboard-Geometry", new feng3d.QuadGeometry());
    feng3d.GameObject.registerPrimitive("Particle System", function (g) {
        g.addComponent("ParticleSystem");
        g.getComponent("Transform").rx = -90;
    });
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ParticleEmissionBurst = /** @class */ (function () {
        function ParticleEmissionBurst() {
            /**
             * The time that each burst occurs.
             * 每次爆炸发生的时间。
             */
            this.time = 0;
            /**
             * 要发射的粒子数。
             */
            this.count = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { constant: 30, constantMin: 30, constantMax: 30 });
            /**
             * 喷发被触发的几率。
             */
            this.probability = 1.0;
            this._isProbability = true;
        }
        Object.defineProperty(ParticleEmissionBurst.prototype, "minCount", {
            /**
             * Minimum number of bursts to be emitted.
             * 要发射的最小爆发数量。
             */
            get: function () {
                return this.count.constantMin;
            },
            set: function (v) {
                this.count.constantMin = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleEmissionBurst.prototype, "maxCount", {
            /**
             * Maximum number of bursts to be emitted.
             *
             * 要发射的最大爆发数量。
             */
            get: function () {
                return this.count.constantMax;
            },
            set: function (v) {
                this.count.constantMax = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleEmissionBurst.prototype, "isProbability", {
            /**
             * 是否喷发
             */
            get: function () {
                return this._isProbability;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 通过触发的几率计算是否喷发。
         */
        ParticleEmissionBurst.prototype.calculateProbability = function () {
            this._isProbability = this.probability >= Math.random();
            return this._isProbability;
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The time that each burst occurs." })
            ,
            feng3d.oav({ tooltip: "每次爆炸发生的时间。" })
        ], ParticleEmissionBurst.prototype, "time", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Number of particles to be emitted." })
            ,
            feng3d.oav({ tooltip: "要发射的粒子数。" })
        ], ParticleEmissionBurst.prototype, "count", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The chance that the burst will trigger." })
            ,
            feng3d.oav({ tooltip: "喷发被触发的几率。取值在0与1之间，默认1。" })
        ], ParticleEmissionBurst.prototype, "probability", void 0);
        return ParticleEmissionBurst;
    }());
    feng3d.ParticleEmissionBurst = ParticleEmissionBurst;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The mode used to generate new points in a shape (Shuriken).
     *
     * 用于在形状中生成新点的模式
     */
    var ParticleSystemShapeMultiModeValue;
    (function (ParticleSystemShapeMultiModeValue) {
        /**
         * Generate points randomly. (Default)
         *
         * 生成随机点。(默认)
         */
        ParticleSystemShapeMultiModeValue[ParticleSystemShapeMultiModeValue["Random"] = 0] = "Random";
        /**
         * Animate the emission point around the shape.
         *
         * 使发射点围绕形状运动。
         */
        ParticleSystemShapeMultiModeValue[ParticleSystemShapeMultiModeValue["Loop"] = 1] = "Loop";
        /**
         * Animate the emission point around the shape, alternating between clockwise and counter-clockwise directions.
         *
         * 使发射点围绕形状运动，在顺时针和逆时针方向之间交替。
         */
        ParticleSystemShapeMultiModeValue[ParticleSystemShapeMultiModeValue["PingPong"] = 2] = "PingPong";
        /**
         * Distribute new particles around the shape evenly.
         *
         * 在形状周围均匀分布新粒子。
         *
         * @todo
         */
        ParticleSystemShapeMultiModeValue[ParticleSystemShapeMultiModeValue["BurstSpread"] = 3] = "BurstSpread";
    })(ParticleSystemShapeMultiModeValue = feng3d.ParticleSystemShapeMultiModeValue || (feng3d.ParticleSystemShapeMultiModeValue = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统圆锥体发射类型，用于定义基于圆锥体的发射类型。
     */
    var ParticleSystemShapeConeEmitFrom;
    (function (ParticleSystemShapeConeEmitFrom) {
        /**
         * 从圆锥体底面发射。
         */
        ParticleSystemShapeConeEmitFrom[ParticleSystemShapeConeEmitFrom["Base"] = 0] = "Base";
        /**
         * 从圆锥体底面边缘沿着曲面发射。
         */
        ParticleSystemShapeConeEmitFrom[ParticleSystemShapeConeEmitFrom["BaseShell"] = 1] = "BaseShell";
        /**
         * 从圆锥体内部发射。
         */
        ParticleSystemShapeConeEmitFrom[ParticleSystemShapeConeEmitFrom["Volume"] = 2] = "Volume";
        /**
         * 从圆锥体曲面沿着曲面发射。
         */
        ParticleSystemShapeConeEmitFrom[ParticleSystemShapeConeEmitFrom["VolumeShell"] = 3] = "VolumeShell";
    })(ParticleSystemShapeConeEmitFrom = feng3d.ParticleSystemShapeConeEmitFrom || (feng3d.ParticleSystemShapeConeEmitFrom = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The animation type.
     *
     * 动画类型。
     */
    var ParticleSystemAnimationType;
    (function (ParticleSystemAnimationType) {
        /**
         * Animate over the whole texture sheet from left to right, top to bottom.
         *
         * 从左到右，从上到下动画整个纹理表。
         */
        ParticleSystemAnimationType[ParticleSystemAnimationType["WholeSheet"] = 0] = "WholeSheet";
        /**
         * Animate a single row in the sheet from left to right.
         *
         * 从左到右移动工作表中的一行。
         */
        ParticleSystemAnimationType[ParticleSystemAnimationType["SingleRow"] = 1] = "SingleRow";
    })(ParticleSystemAnimationType = feng3d.ParticleSystemAnimationType || (feng3d.ParticleSystemAnimationType = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * A flag representing each UV channel.
     * 一个代表每个紫外线频道的旗子。
     */
    var UVChannelFlags;
    (function (UVChannelFlags) {
        /**
         * 无通道。
         */
        UVChannelFlags[UVChannelFlags["Nothing"] = 0] = "Nothing";
        /**
         * First UV channel.
         * 第一UV通道。
         */
        UVChannelFlags[UVChannelFlags["UV0"] = 1] = "UV0";
        /**
         * Second UV channel.
         * 第二UV通道。
         */
        UVChannelFlags[UVChannelFlags["UV1"] = 2] = "UV1";
        /**
         * Third UV channel.
         * 第三UV通道。
         */
        UVChannelFlags[UVChannelFlags["UV2"] = 4] = "UV2";
        /**
         * Fourth UV channel.
         * 第四UV通道。
         */
        UVChannelFlags[UVChannelFlags["UV3"] = 8] = "UV3";
        /**
         * All channel.
         * 所有通道。
         */
        UVChannelFlags[UVChannelFlags["Everything"] = 15] = "Everything";
    })(UVChannelFlags = feng3d.UVChannelFlags || (feng3d.UVChannelFlags = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子模拟空间
     */
    var ParticleSystemSimulationSpace;
    (function (ParticleSystemSimulationSpace) {
        /**
         * Simulate particles in local space.
         *
         * 模拟局部空间中的粒子。
         */
        ParticleSystemSimulationSpace[ParticleSystemSimulationSpace["Local"] = 0] = "Local";
        /**
         * Simulate particles in world space.
         *
         * 模拟世界空间中的粒子。
         */
        ParticleSystemSimulationSpace[ParticleSystemSimulationSpace["World"] = 1] = "World";
    })(ParticleSystemSimulationSpace = feng3d.ParticleSystemSimulationSpace || (feng3d.ParticleSystemSimulationSpace = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Control how particle systems apply transform scale.
     *
     * 控制粒子系统如何应用变换尺度。
     */
    var ParticleSystemScalingMode;
    (function (ParticleSystemScalingMode) {
        /**
         * Scale the particle system using the entire transform hierarchy.
         *
         * 使用整个转换层次来缩放粒子系统。
         */
        ParticleSystemScalingMode[ParticleSystemScalingMode["Hierarchy"] = 0] = "Hierarchy";
        /**
         * Scale the particle system using only its own transform scale. (Ignores parent scale).
         *
         * 尺度粒子系统只使用自己的变换尺度。(忽略了父母规模)。
         */
        ParticleSystemScalingMode[ParticleSystemScalingMode["Local"] = 1] = "Local";
        /**
         * Only apply transform scale to the shape component, which controls where particles are spawned, but does not affect their size or movement.
         *
         * 只对形状组件应用变换比例，它控制生成粒子的位置，但不影响粒子的大小或移动。
         */
        ParticleSystemScalingMode[ParticleSystemScalingMode["Shape"] = 2] = "Shape";
    })(ParticleSystemScalingMode = feng3d.ParticleSystemScalingMode || (feng3d.ParticleSystemScalingMode = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 发射形状
     */
    var ParticleSystemShapeType;
    (function (ParticleSystemShapeType) {
        /**
         * Emit from a sphere.
         *
         * 从球体的体积中发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["Sphere"] = 0] = "Sphere";
        /**
         * Emit from the surface of a sphere.
         *
         * 从球体表面发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["SphereShell"] = 1] = "SphereShell";
        /**
         * Emit from a half-sphere.
         *
         * 从半球体的体积发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["Hemisphere"] = 2] = "Hemisphere";
        /**
         * Emit from the surface of a half-sphere.
         *
         * 从半球体的表面发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["HemisphereShell"] = 3] = "HemisphereShell";
        /**
         * Emit from a cone.
         *
         * 从圆锥体发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["Cone"] = 4] = "Cone";
        /**
         * Emit from the base surface of a cone.
         *
         * 从圆锥体的基面发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["ConeShell"] = 7] = "ConeShell";
        /**
         * Emit from the volume of a cone.
         *
         * 从一个圆锥体的体积发出。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["ConeVolume"] = 8] = "ConeVolume";
        /**
         * Emit from the surface of a cone.
         *
         * 从一个圆锥体的表面发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["ConeVolumeShell"] = 9] = "ConeVolumeShell";
        /**
         * Emit from the volume of a box.
         *
         * 从一个盒子的体积中发出。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["Box"] = 5] = "Box";
        /**
         * Emit from the surface of a box.
         *
         * 从盒子表面发射。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["BoxShell"] = 15] = "BoxShell";
        /**
         * Emit from the edges of a box.
         *
         * 从盒子的边缘发出。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["BoxEdge"] = 16] = "BoxEdge";
        /**
         * Emit from a mesh.
         *
         * 从一个网格中发出。
         *
         * @todo
         */
        ParticleSystemShapeType[ParticleSystemShapeType["Mesh"] = 6] = "Mesh";
        /**
         * Emit from a mesh renderer.
         *
         * 从一个网格渲染器发射。
         *
         * @todo
         */
        ParticleSystemShapeType[ParticleSystemShapeType["MeshRenderer"] = 13] = "MeshRenderer";
        /**
         * Emit from a skinned mesh renderer.
         *
         * 从蒙皮网格渲染器发出。
         *
         * @todo
         */
        ParticleSystemShapeType[ParticleSystemShapeType["SkinnedMeshRenderer"] = 14] = "SkinnedMeshRenderer";
        /**
         * Emit from a circle.
         *
         * 从一个圆发出。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["Circle"] = 10] = "Circle";
        /**
         * Emit from the edge of a circle.
         *
         * 从圆的边缘发出。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["CircleEdge"] = 11] = "CircleEdge";
        /**
         * Emit from an edge.
         *
         * 从边缘发出。
         */
        ParticleSystemShapeType[ParticleSystemShapeType["SingleSidedEdge"] = 12] = "SingleSidedEdge";
    })(ParticleSystemShapeType = feng3d.ParticleSystemShapeType || (feng3d.ParticleSystemShapeType = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The emission shape (Shuriken).
     *
     * 发射的形状
     */
    var ParticleSystemShapeType1;
    (function (ParticleSystemShapeType1) {
        /**
         * Emit from a sphere.
         *
         * 从球体的体积中发射。
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["Sphere"] = 0] = "Sphere";
        /**
         * Emit from a half-sphere.
         *
         * 从半球体的体积发射。
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["Hemisphere"] = 1] = "Hemisphere";
        /**
         * Emit from a cone.
         *
         * 从圆锥体发射。
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["Cone"] = 2] = "Cone";
        /**
         * Emit from the volume of a box.
         *
         * 从一个盒子的体积中发出。
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["Box"] = 3] = "Box";
        /**
         * Emit from a mesh.
         *
         * 从一个网格中发出。
         *
         * @todo
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["Mesh"] = 4] = "Mesh";
        /**
         * Emit from a mesh renderer.
         *
         * 从一个网格渲染器发射。
         *
         * @todo
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["MeshRenderer"] = 5] = "MeshRenderer";
        /**
         * Emit from a skinned mesh renderer.
         *
         * 从蒙皮网格渲染器发出。
         *
         * @todo
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["SkinnedMeshRenderer"] = 6] = "SkinnedMeshRenderer";
        /**
         * Emit from a circle.
         *
         * 从一个圆发出。
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["Circle"] = 7] = "Circle";
        /**
         * Emit from an edge.
         *
         * 从边缘发出。
         */
        ParticleSystemShapeType1[ParticleSystemShapeType1["Edge"] = 8] = "Edge";
    })(ParticleSystemShapeType1 = feng3d.ParticleSystemShapeType1 || (feng3d.ParticleSystemShapeType1 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The mesh emission type.
     *
     * 网格发射类型。
     */
    var ParticleSystemMeshShapeType;
    (function (ParticleSystemMeshShapeType) {
        /**
         * Emit from the vertices of the mesh.
         *
         * 从网格的顶点发出。
         */
        ParticleSystemMeshShapeType[ParticleSystemMeshShapeType["Vertex"] = 0] = "Vertex";
        /**
         * Emit from the edges of the mesh.
         *
         * 从网格的边缘发出。
         */
        ParticleSystemMeshShapeType[ParticleSystemMeshShapeType["Edge"] = 1] = "Edge";
        /**
         * Emit from the surface of the mesh.
         *
         * 从网格表面发出。
         */
        ParticleSystemMeshShapeType[ParticleSystemMeshShapeType["Triangle"] = 2] = "Triangle";
    })(ParticleSystemMeshShapeType = feng3d.ParticleSystemMeshShapeType || (feng3d.ParticleSystemMeshShapeType = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * How to apply emitter velocity to particles.
     *
     * 如何将发射体速度应用于粒子。
     */
    var ParticleSystemInheritVelocityMode;
    (function (ParticleSystemInheritVelocityMode) {
        /**
         * Each particle inherits the emitter's velocity on the frame when it was initially emitted.
         *
         * 每个粒子在最初发射时都继承了发射体在帧上的速度。
         */
        ParticleSystemInheritVelocityMode[ParticleSystemInheritVelocityMode["Initial"] = 0] = "Initial";
        /**
         * Each particle's velocity is set to the emitter's current velocity value, every frame.
         *
         * 每一帧，每个粒子的速度都设定为发射器的当前速度值。
         */
        ParticleSystemInheritVelocityMode[ParticleSystemInheritVelocityMode["Current"] = 1] = "Current";
    })(ParticleSystemInheritVelocityMode = feng3d.ParticleSystemInheritVelocityMode || (feng3d.ParticleSystemInheritVelocityMode = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The quality of the generated noise.
     *
     * 产生的噪音的质量。
     */
    var ParticleSystemNoiseQuality;
    (function (ParticleSystemNoiseQuality) {
        /**
         * Low quality 1D noise.
         *
         * 低质量的一维噪声。
         */
        ParticleSystemNoiseQuality[ParticleSystemNoiseQuality["Low"] = 0] = "Low";
        /**
         * Medium quality 2D noise.
         *
         * 中等质量2D噪音。
         */
        ParticleSystemNoiseQuality[ParticleSystemNoiseQuality["Medium"] = 1] = "Medium";
        /**
         * High quality 3D noise.
         *
         * 高品质3D噪音。
         */
        ParticleSystemNoiseQuality[ParticleSystemNoiseQuality["High"] = 2] = "High";
    })(ParticleSystemNoiseQuality = feng3d.ParticleSystemNoiseQuality || (feng3d.ParticleSystemNoiseQuality = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The events that cause new particles to be spawned.
     *
     * 导致新粒子产生的事件。
     */
    var ParticleSystemSubEmitterType;
    (function (ParticleSystemSubEmitterType) {
        /**
         * Spawns new particles when particles from the parent system are born.
         *
         * 当来自父系统的粒子诞生时，产生新的粒子。
         */
        ParticleSystemSubEmitterType[ParticleSystemSubEmitterType["Birth"] = 0] = "Birth";
        /**
         * Spawns new particles when particles from the parent system collide with something.
         *
         * 当来自父系统的粒子与某物碰撞时，产生新的粒子。
         */
        ParticleSystemSubEmitterType[ParticleSystemSubEmitterType["Collision"] = 1] = "Collision";
        /**
         * Spawns new particles when particles from the parent system die.
         *
         * 当来自父系统的粒子死亡时，产生新的粒子。
         */
        ParticleSystemSubEmitterType[ParticleSystemSubEmitterType["Death"] = 2] = "Death";
        /**
         * Spawns new particles when particles from the parent system pass conditions in the Trigger Module.
         *
         * 当来自父系统的粒子通过触发器模块中的条件时，生成新的粒子。
         */
        ParticleSystemSubEmitterType[ParticleSystemSubEmitterType["Trigger"] = 3] = "Trigger";
        /**
         * Spawns new particles when triggered from script using ParticleSystem.TriggerSubEmitter.
         *
         * 当使用ParticleSystem.TriggerSubEmitter从脚本中触发时，生成新的粒子。
         */
        ParticleSystemSubEmitterType[ParticleSystemSubEmitterType["Manual"] = 4] = "Manual";
    })(ParticleSystemSubEmitterType = feng3d.ParticleSystemSubEmitterType || (feng3d.ParticleSystemSubEmitterType = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The properties of sub-emitter particles.
     */
    var ParticleSystemSubEmitterProperties;
    (function (ParticleSystemSubEmitterProperties) {
        /**
         * When spawning new particles, do not inherit any properties from the parent particles.
         */
        ParticleSystemSubEmitterProperties[ParticleSystemSubEmitterProperties["InheritNothing"] = 0] = "InheritNothing";
        /**
         * When spawning new particles, inherit all available properties from the parent particles.
         */
        ParticleSystemSubEmitterProperties[ParticleSystemSubEmitterProperties["InheritEverything"] = 1] = "InheritEverything";
        /**
         * When spawning new particles, multiply the start color by the color of the parent particles.
         */
        ParticleSystemSubEmitterProperties[ParticleSystemSubEmitterProperties["InheritColor"] = 2] = "InheritColor";
        /**
         * When spawning new particles, multiply the start size by the size of the parent particles.
         */
        ParticleSystemSubEmitterProperties[ParticleSystemSubEmitterProperties["InheritSize"] = 3] = "InheritSize";
        /**
         * When spawning new particles, add the start rotation to the rotation of the parent particles.
         */
        ParticleSystemSubEmitterProperties[ParticleSystemSubEmitterProperties["InheritRotation"] = 4] = "InheritRotation";
        /**
         * New particles will have a shorter lifespan, the closer their parent particles are to death.
         */
        ParticleSystemSubEmitterProperties[ParticleSystemSubEmitterProperties["InheritLifetime"] = 5] = "InheritLifetime";
        /**
         * When spawning new particles, use the duration and age properties from the parent system, when sampling MainModule curves in the Sub-Emitter.
         */
        ParticleSystemSubEmitterProperties[ParticleSystemSubEmitterProperties["InheritDuration"] = 6] = "InheritDuration";
    })(ParticleSystemSubEmitterProperties = feng3d.ParticleSystemSubEmitterProperties || (feng3d.ParticleSystemSubEmitterProperties = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ParticleSystemRenderMode;
    (function (ParticleSystemRenderMode) {
        /**
         * Render particles as billboards facing the active camera. (Default)
         */
        ParticleSystemRenderMode[ParticleSystemRenderMode["Billboard"] = 0] = "Billboard";
        /**
         * Stretch particles in the direction of motion.
         */
        ParticleSystemRenderMode[ParticleSystemRenderMode["Stretch"] = 1] = "Stretch";
        /**
         * Render particles as billboards always facing up along the y-Axis.
         */
        ParticleSystemRenderMode[ParticleSystemRenderMode["HorizontalBillboard"] = 2] = "HorizontalBillboard";
        /**
         * Render particles as billboards always facing the player, but not pitching along the x-Axis.
        
         */
        ParticleSystemRenderMode[ParticleSystemRenderMode["VerticalBillboard"] = 3] = "VerticalBillboard";
        /**
         * Render particles as meshes.
         */
        ParticleSystemRenderMode[ParticleSystemRenderMode["Mesh"] = 4] = "Mesh";
        /**
         * Do not render particles.
         */
        ParticleSystemRenderMode[ParticleSystemRenderMode["None"] = 5] = "None";
    })(ParticleSystemRenderMode = feng3d.ParticleSystemRenderMode || (feng3d.ParticleSystemRenderMode = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * How particles are aligned when rendered.
     */
    var ParticleSystemRenderSpace;
    (function (ParticleSystemRenderSpace) {
        /**
         * Particles face the camera plane.
         */
        ParticleSystemRenderSpace[ParticleSystemRenderSpace["View"] = 0] = "View";
        /**
         * Particles align with the world.
         */
        ParticleSystemRenderSpace[ParticleSystemRenderSpace["World"] = 1] = "World";
        /**
         * Particles align with their local transform.
         */
        ParticleSystemRenderSpace[ParticleSystemRenderSpace["Local"] = 2] = "Local";
        /**
         * Particles face the eye position.
         */
        ParticleSystemRenderSpace[ParticleSystemRenderSpace["Facing"] = 3] = "Facing";
        /**
         * Particles are aligned to their direction of travel.
         */
        ParticleSystemRenderSpace[ParticleSystemRenderSpace["Velocity"] = 4] = "Velocity";
    })(ParticleSystemRenderSpace = feng3d.ParticleSystemRenderSpace || (feng3d.ParticleSystemRenderSpace = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * This enum controls the mode under which the sprite will interact with the masking system.
     *
     * Sprites by default do not interact with masks SpriteMaskInteraction.None. A sprite can also be setup to be visible in presence of one or more masks SpriteMaskInteraction.VisibleInsideMask or to be visible on areas where no masks are present SpriteMaskInteraction.VisibleOutsideMask.
     */
    var SpriteMaskInteraction;
    (function (SpriteMaskInteraction) {
        /**
         * The sprite will not interact with the masking system.
         */
        SpriteMaskInteraction[SpriteMaskInteraction["None"] = 0] = "None";
        /**
         * The sprite will be visible only in areas where a mask is present.
         */
        SpriteMaskInteraction[SpriteMaskInteraction["VisibleInsideMask"] = 1] = "VisibleInsideMask";
        /**
         * The sprite will be visible only in areas where no mask is present.
         */
        SpriteMaskInteraction[SpriteMaskInteraction["VisibleOutsideMask"] = 2] = "VisibleOutsideMask";
    })(SpriteMaskInteraction = feng3d.SpriteMaskInteraction || (feng3d.SpriteMaskInteraction = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The sorting mode for particle systems.
     */
    var ParticleSystemSortMode;
    (function (ParticleSystemSortMode) {
        /**
         * No sorting.
         */
        ParticleSystemSortMode[ParticleSystemSortMode["None"] = 0] = "None";
        /**
         * Sort based on distance.
         */
        ParticleSystemSortMode[ParticleSystemSortMode["Distance"] = 1] = "Distance";
        /**
         * Sort the oldest particles to the front.
         */
        ParticleSystemSortMode[ParticleSystemSortMode["OldestInFront"] = 2] = "OldestInFront";
        /**
         * Sort the youngest particles to the front.
         */
        ParticleSystemSortMode[ParticleSystemSortMode["YoungestInFront"] = 3] = "YoungestInFront";
    })(ParticleSystemSortMode = feng3d.ParticleSystemSortMode || (feng3d.ParticleSystemSortMode = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 发射形状
     */
    var ParticleSystemShape = /** @class */ (function () {
        function ParticleSystemShape(module) {
            this._module = module;
        }
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        ParticleSystemShape.prototype.calcParticlePosDir = function (particle, position, dir) {
        };
        return ParticleSystemShape;
    }());
    feng3d.ParticleSystemShape = ParticleSystemShape;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 从球体的体积中发射。
     */
    var ParticleSystemShapeSphere = /** @class */ (function (_super) {
        __extends(ParticleSystemShapeSphere, _super);
        function ParticleSystemShapeSphere() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 是否从球面发射
             */
            _this.emitFromShell = false;
            return _this;
        }
        Object.defineProperty(ParticleSystemShapeSphere.prototype, "radius", {
            /**
             * 球体半径
             */
            get: function () {
                return this._module.radius;
            },
            set: function (v) {
                this._module.radius = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        ParticleSystemShapeSphere.prototype.calcParticlePosDir = function (particle, position, dir) {
            // 计算位置
            dir.copy(feng3d.Vector3.random()).scaleNumber(2).subNumber(1).normalize();
            position.copy(dir).scaleNumber(this.radius);
            if (!this.emitFromShell) {
                position.scaleNumber(Math.random());
            }
        };
        __decorate([
            feng3d.oav({ tooltip: "球体半径" })
        ], ParticleSystemShapeSphere.prototype, "radius", null);
        __decorate([
            feng3d.oav({ tooltip: "是否从球面发射" })
        ], ParticleSystemShapeSphere.prototype, "emitFromShell", void 0);
        return ParticleSystemShapeSphere;
    }(feng3d.ParticleSystemShape));
    feng3d.ParticleSystemShapeSphere = ParticleSystemShapeSphere;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 从半球体的体积中发出。
     */
    var ParticleSystemShapeHemisphere = /** @class */ (function (_super) {
        __extends(ParticleSystemShapeHemisphere, _super);
        function ParticleSystemShapeHemisphere() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.radius = 1;
            /**
             * 是否从球面发射
             */
            _this.emitFromShell = false;
            return _this;
        }
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        ParticleSystemShapeHemisphere.prototype.calcParticlePosDir = function (particle, position, dir) {
            // 计算位置
            dir.copy(feng3d.Vector3.random()).scaleNumber(2).subNumber(1).normalize();
            dir.z = Math.abs(dir.z);
            position.copy(dir).scaleNumber(this.radius);
            if (!this.emitFromShell) {
                position.scaleNumber(Math.random());
            }
        };
        __decorate([
            feng3d.oav({ tooltip: "球体半径" })
        ], ParticleSystemShapeHemisphere.prototype, "radius", void 0);
        __decorate([
            feng3d.oav({ tooltip: "是否从球面发射" })
        ], ParticleSystemShapeHemisphere.prototype, "emitFromShell", void 0);
        return ParticleSystemShapeHemisphere;
    }(feng3d.ParticleSystemShape));
    feng3d.ParticleSystemShapeHemisphere = ParticleSystemShapeHemisphere;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统发射圆锥体，用于定义基于圆锥体的粒子发射时的初始状态。
     */
    var ParticleSystemShapeCone = /** @class */ (function (_super) {
        __extends(ParticleSystemShapeCone, _super);
        function ParticleSystemShapeCone() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 粒子系统圆锥体发射类型。
             */
            _this.emitFrom = feng3d.ParticleSystemShapeConeEmitFrom.Base;
            return _this;
        }
        Object.defineProperty(ParticleSystemShapeCone.prototype, "angle", {
            /**
             * Angle of the cone.
             * 圆锥的角度。
             */
            // @oav({ tooltip: "Angle of the cone." })
            get: function () {
                return this._module.angle;
            },
            set: function (v) {
                this._module.angle = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCone.prototype, "radius", {
            /**
             * 圆锥体底部半径。
             */
            get: function () {
                return this._module.radius;
            },
            set: function (v) {
                this._module.radius = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCone.prototype, "length", {
            /**
             * Length of the cone.
             *
             * 圆锥的长度（高度）。
             */
            // @oav({ tooltip: "Length of the cone." })
            get: function () {
                return this._module.length;
            },
            set: function (v) {
                this._module.length = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCone.prototype, "arc", {
            /**
             * Circle arc angle.
             */
            get: function () {
                return this._module.arc;
            },
            set: function (v) {
                this._module.arc = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCone.prototype, "arcMode", {
            /**
             * The mode used for generating particles around the arc.
             * 在弧线周围产生粒子的模式。
             */
            get: function () {
                return this._module.arcMode;
            },
            set: function (v) {
                this._module.arcMode = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCone.prototype, "arcSpread", {
            /**
             * Control the gap between emission points around the arc.
             * 控制弧线周围发射点之间的间隙。
             */
            get: function () {
                return this._module.arcSpread;
            },
            set: function (v) {
                this._module.arcSpread = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCone.prototype, "arcSpeed", {
            /**
             * When using one of the animated modes, how quickly to move the emission position around the arc.
             * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
             */
            get: function () {
                return this._module.arcSpeed;
            },
            set: function (v) {
                this._module.arcSpeed = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        ParticleSystemShapeCone.prototype.calcParticlePosDir = function (particle, position, dir) {
            var radius = this.radius;
            var angle = this.angle;
            var arc = this.arc;
            angle = Math.clamp(angle, 0, 87);
            // 在圆心的方向
            var radiusAngle = 0;
            if (this.arcMode == feng3d.ParticleSystemShapeMultiModeValue.Random) {
                radiusAngle = Math.random() * arc;
            }
            else if (this.arcMode == feng3d.ParticleSystemShapeMultiModeValue.Loop) {
                var totalAngle = particle.birthTime * this.arcSpeed.getValue(particle.birthRateAtDuration) * 360;
                radiusAngle = totalAngle % arc;
            }
            else if (this.arcMode == feng3d.ParticleSystemShapeMultiModeValue.PingPong) {
                var totalAngle = particle.birthTime * this.arcSpeed.getValue(particle.birthRateAtDuration) * 360;
                radiusAngle = totalAngle % arc;
                if (Math.floor(totalAngle / arc) % 2 == 1) {
                    radiusAngle = arc - radiusAngle;
                }
            }
            // else if (this.arcMode == ParticleSystemShapeMultiModeValue.BurstSpread)
            // {
            // }
            if (this.arcSpread > 0) {
                radiusAngle = Math.floor(radiusAngle / arc / this.arcSpread) * arc * this.arcSpread;
            }
            radiusAngle = Math.degToRad(radiusAngle);
            // 在圆的位置
            var radiusRate = 1;
            if (this.emitFrom == feng3d.ParticleSystemShapeConeEmitFrom.Base || this.emitFrom == feng3d.ParticleSystemShapeConeEmitFrom.Volume) {
                radiusRate = Math.random();
            }
            // 在圆的位置
            var basePos = new feng3d.Vector3(Math.cos(radiusAngle), Math.sin(radiusAngle), 0);
            // 底面位置
            var bottomPos = basePos.scaleNumberTo(radius).scaleNumber(radiusRate);
            // 顶面位置
            var topPos = basePos.scaleNumberTo(radius + this.length * Math.tan(Math.degToRad(angle))).scaleNumber(radiusRate);
            topPos.z = this.length;
            // 计算方向
            dir.copy(topPos).sub(bottomPos).normalize();
            // 计算位置
            position.copy(bottomPos);
            if (this.emitFrom == feng3d.ParticleSystemShapeConeEmitFrom.Volume || this.emitFrom == feng3d.ParticleSystemShapeConeEmitFrom.VolumeShell) {
                // 上下点进行插值
                position.lerpNumber(topPos, Math.random());
            }
        };
        __decorate([
            feng3d.oav({ tooltip: "圆锥的角度。" })
        ], ParticleSystemShapeCone.prototype, "angle", null);
        __decorate([
            feng3d.oav({ tooltip: "圆锥体底部半径。" })
        ], ParticleSystemShapeCone.prototype, "radius", null);
        __decorate([
            feng3d.oav({ tooltip: "圆锥的长度（高度）。" })
        ], ParticleSystemShapeCone.prototype, "length", null);
        __decorate([
            feng3d.oav({ tooltip: "圆弧角。" })
        ], ParticleSystemShapeCone.prototype, "arc", null);
        __decorate([
            feng3d.oav({ tooltip: "在弧线周围产生粒子的模式。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemShapeMultiModeValue } })
        ], ParticleSystemShapeCone.prototype, "arcMode", null);
        __decorate([
            feng3d.oav({ tooltip: "控制弧线周围发射点之间的间隙。" })
        ], ParticleSystemShapeCone.prototype, "arcSpread", null);
        __decorate([
            feng3d.oav({ tooltip: "当使用一个动画模式时，如何快速移动发射位置周围的弧。" })
        ], ParticleSystemShapeCone.prototype, "arcSpeed", null);
        __decorate([
            feng3d.oav({ tooltip: "粒子系统圆锥体发射类型。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemShapeConeEmitFrom } })
        ], ParticleSystemShapeCone.prototype, "emitFrom", void 0);
        return ParticleSystemShapeCone;
    }(feng3d.ParticleSystemShape));
    feng3d.ParticleSystemShapeCone = ParticleSystemShapeCone;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ParticleSystemShapeBoxEmitFrom;
    (function (ParticleSystemShapeBoxEmitFrom) {
        /**
         * 从盒子内部发射。
         */
        ParticleSystemShapeBoxEmitFrom[ParticleSystemShapeBoxEmitFrom["Volume"] = 0] = "Volume";
        /**
         * 从盒子外壳发射。
         */
        ParticleSystemShapeBoxEmitFrom[ParticleSystemShapeBoxEmitFrom["Shell"] = 1] = "Shell";
        /**
         * 从盒子边缘发射。
         */
        ParticleSystemShapeBoxEmitFrom[ParticleSystemShapeBoxEmitFrom["Edge"] = 2] = "Edge";
    })(ParticleSystemShapeBoxEmitFrom = feng3d.ParticleSystemShapeBoxEmitFrom || (feng3d.ParticleSystemShapeBoxEmitFrom = {}));
    /**
     * 粒子系统 发射盒子
     */
    var ParticleSystemShapeBox = /** @class */ (function (_super) {
        __extends(ParticleSystemShapeBox, _super);
        function ParticleSystemShapeBox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 粒子系统盒子发射类型。
             */
            _this.emitFrom = ParticleSystemShapeBoxEmitFrom.Volume;
            return _this;
        }
        Object.defineProperty(ParticleSystemShapeBox.prototype, "boxX", {
            /**
             * 盒子X方向缩放。
             */
            get: function () {
                return this._module.box.x;
            },
            set: function (v) {
                this._module.box.x = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeBox.prototype, "boxY", {
            /**
             * 盒子Y方向缩放。
             */
            get: function () {
                return this._module.box.y;
            },
            set: function (v) {
                this._module.box.y = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeBox.prototype, "boxZ", {
            /**
             * 盒子Z方向缩放。
             */
            get: function () {
                return this._module.box.z;
            },
            set: function (v) {
                this._module.box.z = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        ParticleSystemShapeBox.prototype.calcParticlePosDir = function (particle, position, dir) {
            // 计算位置
            position.copy(feng3d.Vector3.random().scaleNumber(2).subNumber(1));
            if (this.emitFrom == ParticleSystemShapeBoxEmitFrom.Shell) {
                var max = Math.max(Math.abs(position.x), Math.abs(position.y), Math.abs(position.z));
                if (Math.abs(position.x) == max) {
                    position.x = position.x < 0 ? -1 : 1;
                }
                else if (Math.abs(position.y) == max) {
                    position.y = position.y < 0 ? -1 : 1;
                }
                else if (Math.abs(position.z) == max) {
                    position.z = position.z < 0 ? -1 : 1;
                }
            }
            else if (this.emitFrom == ParticleSystemShapeBoxEmitFrom.Edge) {
                var min = Math.min(Math.abs(position.x), Math.abs(position.y), Math.abs(position.z));
                if (Math.abs(position.x) == min) {
                    position.y = position.y < 0 ? -1 : 1;
                    position.z = position.z < 0 ? -1 : 1;
                }
                else if (Math.abs(position.y) == min) {
                    position.x = position.x < 0 ? -1 : 1;
                    position.z = position.z < 0 ? -1 : 1;
                }
                else if (Math.abs(position.z) == min) {
                    position.x = position.x < 0 ? -1 : 1;
                    position.y = position.y < 0 ? -1 : 1;
                }
            }
            position.scale(new feng3d.Vector3(this.boxX, this.boxY, this.boxZ)).scaleNumber(0.5);
            // 
            dir.set(0, 0, 1);
        };
        __decorate([
            feng3d.oav({ tooltip: "盒子X方向缩放。" })
        ], ParticleSystemShapeBox.prototype, "boxX", null);
        __decorate([
            feng3d.oav({ tooltip: "盒子Y方向缩放。" })
        ], ParticleSystemShapeBox.prototype, "boxY", null);
        __decorate([
            feng3d.oav({ tooltip: "盒子Z方向缩放。" })
        ], ParticleSystemShapeBox.prototype, "boxZ", null);
        __decorate([
            feng3d.oav({ tooltip: "粒子系统盒子发射类型。", component: "OAVEnum", componentParam: { enumClass: ParticleSystemShapeBoxEmitFrom } })
        ], ParticleSystemShapeBox.prototype, "emitFrom", void 0);
        return ParticleSystemShapeBox;
    }(feng3d.ParticleSystemShape));
    feng3d.ParticleSystemShapeBox = ParticleSystemShapeBox;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 发射圆盘
     */
    var ParticleSystemShapeCircle = /** @class */ (function (_super) {
        __extends(ParticleSystemShapeCircle, _super);
        function ParticleSystemShapeCircle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 是否从圆形边缘发射。
             */
            _this.emitFromEdge = false;
            return _this;
        }
        Object.defineProperty(ParticleSystemShapeCircle.prototype, "radius", {
            get: function () {
                return this._module.radius;
            },
            set: function (v) {
                this._module.radius = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCircle.prototype, "arc", {
            get: function () {
                return this._module.arc;
            },
            set: function (v) {
                this._module.arc = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCircle.prototype, "arcMode", {
            /**
             * The mode used for generating particles around the arc.
             *
             * 在弧线周围产生粒子的模式。
             */
            // @oav({ tooltip: "The mode used for generating particles around the arc.", component: "OAVEnum", componentParam: { enumClass: ParticleSystemShapeMultiModeValue } })
            get: function () {
                return this._module.arcMode;
            },
            set: function (v) {
                this._module.arcMode = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCircle.prototype, "arcSpread", {
            /**
             * Control the gap between emission points around the arc.
             *
             * 控制弧线周围发射点之间的间隙。
             */
            get: function () {
                return this._module.arcSpread;
            },
            set: function (v) {
                this._module.arcSpread = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeCircle.prototype, "arcSpeed", {
            /**
             * When using one of the animated modes, how quickly to move the emission position around the arc.
             * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
             */
            get: function () {
                return this._module.arcSpeed;
            },
            set: function (v) {
                this._module.arcSpeed = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        ParticleSystemShapeCircle.prototype.calcParticlePosDir = function (particle, position, dir) {
            var radius = this.radius;
            var arc = this.arc;
            // 在圆心的方向
            var radiusAngle = 0;
            if (this.arcMode == feng3d.ParticleSystemShapeMultiModeValue.Random) {
                radiusAngle = Math.random() * arc;
            }
            else if (this.arcMode == feng3d.ParticleSystemShapeMultiModeValue.Loop) {
                var totalAngle = particle.birthTime * this.arcSpeed.getValue(particle.birthRateAtDuration) * 360;
                radiusAngle = totalAngle % arc;
            }
            else if (this.arcMode == feng3d.ParticleSystemShapeMultiModeValue.PingPong) {
                var totalAngle = particle.birthTime * this.arcSpeed.getValue(particle.birthRateAtDuration) * 360;
                radiusAngle = totalAngle % arc;
                if (Math.floor(totalAngle / arc) % 2 == 1) {
                    radiusAngle = arc - radiusAngle;
                }
            }
            if (this.arcSpread > 0) {
                radiusAngle = Math.floor(radiusAngle / arc / this.arcSpread) * arc * this.arcSpread;
            }
            radiusAngle = Math.degToRad(radiusAngle);
            // 计算位置
            dir.set(Math.cos(radiusAngle), Math.sin(radiusAngle), 0);
            dir.scaleNumberTo(radius, position);
            if (!this.emitFromEdge) {
                position.scaleNumber(Math.random());
            }
        };
        __decorate([
            feng3d.oav({ tooltip: "半径" })
        ], ParticleSystemShapeCircle.prototype, "radius", null);
        __decorate([
            feng3d.oav({ tooltip: "弧度" })
        ], ParticleSystemShapeCircle.prototype, "arc", null);
        __decorate([
            feng3d.oav({ tooltip: "在弧线周围产生粒子的模式。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemShapeMultiModeValue } })
        ], ParticleSystemShapeCircle.prototype, "arcMode", null);
        __decorate([
            feng3d.oav({ tooltip: "控制弧线周围发射点之间的间隙。" })
        ], ParticleSystemShapeCircle.prototype, "arcSpread", null);
        __decorate([
            feng3d.oav({ tooltip: "当使用一个动画模式时，如何快速移动发射位置周围的弧。" })
        ], ParticleSystemShapeCircle.prototype, "arcSpeed", null);
        __decorate([
            feng3d.oav({ tooltip: "是否从圆形边缘发射。" })
        ], ParticleSystemShapeCircle.prototype, "emitFromEdge", void 0);
        return ParticleSystemShapeCircle;
    }(feng3d.ParticleSystemShape));
    feng3d.ParticleSystemShapeCircle = ParticleSystemShapeCircle;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 发射边
     */
    var ParticleSystemShapeEdge = /** @class */ (function (_super) {
        __extends(ParticleSystemShapeEdge, _super);
        function ParticleSystemShapeEdge() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ParticleSystemShapeEdge.prototype, "radius", {
            /**
             * 边长的一半。
             */
            get: function () {
                return this._module.radius;
            },
            set: function (v) {
                this._module.radius = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeEdge.prototype, "radiusMode", {
            /**
             * The mode used for generating particles around the radius.
             *
             * 在弧线周围产生粒子的模式。
             */
            get: function () {
                return this._module.radiusMode;
            },
            set: function (v) {
                this._module.radiusMode = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeEdge.prototype, "radiusSpread", {
            /**
             * Control the gap between emission points around the radius.
             *
             * 控制弧线周围发射点之间的间隙。
             */
            get: function () {
                return this._module.radiusSpread;
            },
            set: function (v) {
                this._module.radiusSpread = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSystemShapeEdge.prototype, "radiusSpeed", {
            /**
             * When using one of the animated modes, how quickly to move the emission position around the radius.
             *
             * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
             */
            get: function () {
                return this._module.radiusSpeed;
            },
            set: function (v) {
                this._module.radiusSpeed = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 计算粒子的发射位置与方向
         *
         * @param particle
         * @param position
         * @param dir
         */
        ParticleSystemShapeEdge.prototype.calcParticlePosDir = function (particle, position, dir) {
            var arc = 360 * this.radius;
            // 在圆心的方向
            var radiusAngle = 0;
            if (this.radiusMode == feng3d.ParticleSystemShapeMultiModeValue.Random) {
                radiusAngle = Math.random() * arc;
            }
            else if (this.radiusMode == feng3d.ParticleSystemShapeMultiModeValue.Loop) {
                var totalAngle = particle.birthTime * this.radiusSpeed.getValue(particle.birthRateAtDuration) * 360;
                radiusAngle = totalAngle % arc;
            }
            else if (this.radiusMode == feng3d.ParticleSystemShapeMultiModeValue.PingPong) {
                var totalAngle = particle.birthTime * this.radiusSpeed.getValue(particle.birthRateAtDuration) * 360;
                radiusAngle = totalAngle % arc;
                if (Math.floor(totalAngle / arc) % 2 == 1) {
                    radiusAngle = arc - radiusAngle;
                }
            }
            if (this.radiusSpread > 0) {
                radiusAngle = Math.floor(radiusAngle / arc / this.radiusSpread) * arc * this.radiusSpread;
            }
            radiusAngle = radiusAngle / arc;
            // 
            dir.set(0, 1, 0);
            position.set(this.radius * (radiusAngle * 2 - 1), 0, 0);
        };
        __decorate([
            feng3d.oav({ tooltip: "边长的一半。" })
        ], ParticleSystemShapeEdge.prototype, "radius", null);
        __decorate([
            feng3d.oav({ tooltip: "在弧线周围产生粒子的模式。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemShapeMultiModeValue } })
        ], ParticleSystemShapeEdge.prototype, "radiusMode", null);
        __decorate([
            feng3d.oav({ tooltip: "控制弧线周围发射点之间的间隙。" })
        ], ParticleSystemShapeEdge.prototype, "radiusSpread", null);
        __decorate([
            feng3d.oav({ tooltip: "当使用一个动画模式时，如何快速移动发射位置周围的弧。" })
        ], ParticleSystemShapeEdge.prototype, "radiusSpeed", null);
        return ParticleSystemShapeEdge;
    }(feng3d.ParticleSystemShape));
    feng3d.ParticleSystemShapeEdge = ParticleSystemShapeEdge;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子模块
     */
    var ParticleModule = /** @class */ (function (_super) {
        __extends(ParticleModule, _super);
        function ParticleModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 是否开启
             */
            _this.enabled = false;
            return _this;
        }
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleModule.prototype.initParticleState = function (particle) {
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleModule.prototype.updateParticleState = function (particle) {
        };
        /**
         * 更新
         *
         * @param interval
         */
        ParticleModule.prototype.update = function (interval) {
        };
        __decorate([
            feng3d.oav({ tooltip: "是否开启" }),
            feng3d.serialize
        ], ParticleModule.prototype, "enabled", void 0);
        return ParticleModule;
    }(feng3d.EventDispatcher));
    feng3d.ParticleModule = ParticleModule;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子主模块
     */
    var ParticleMainModule = /** @class */ (function (_super) {
        __extends(ParticleMainModule, _super);
        function ParticleMainModule() {
            var _this = _super.call(this) || this;
            _this.enabled = true;
            /**
             * 粒子系统的持续时间(秒)。
             */
            _this.duration = 5;
            /**
             * 粒子系统在循环吗?
             */
            _this.loop = true;
            /**
             * When looping is enabled, this controls whether this particle system will look like it has already simulated for one loop when first becoming visible.
             *
             * 当循环被激活时，它控制这个粒子系统在第一次出现时是否看起来像已经模拟了一个循环。
             */
            _this.prewarm = false;
            /**
             * Start delay in seconds.
             *
             * 启动延迟(以秒为单位)。
             */
            _this.startDelay = new feng3d.MinMaxCurve();
            /**
             * The total lifetime in seconds that each new particle will have.
             *
             * 每个新粒子的总寿命(以秒计)。
             */
            _this.startLifetime = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { between0And1: true, constant: 5, constantMin: 5, constantMax: 5 });
            /**
             * The initial speed of particles when emitted.
             *
             * 粒子发射时的初始速度。
             */
            _this.startSpeed = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { constant: 5, constantMin: 5, constantMax: 5 });
            /**
             * A flag to enable specifying particle size individually for each axis.
             *
             * 允许为每个轴分别指定粒度大小的标志。
             */
            _this.useStartSize3D = false;
            /**
             * The initial size of particles when emitted.
             *
             * 发射时粒子的初始大小。
             */
            _this.startSize3D = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1 }, yCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1 }, zCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1 } });
            /**
             * A flag to enable 3D particle rotation.
             * 一个启用粒子3D旋转的标记。
             */
            _this.useStartRotation3D = false;
            /**
             * The initial rotation of particles when emitted.
             *
             * 粒子发射时的初始旋转。
             */
            _this.startRotation3D = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { curveMultiplier: 180 }, yCurve: { curveMultiplier: 180 }, zCurve: { curveMultiplier: 180 } });
            /**
             * Cause some particles to spin in the opposite direction. Set between 0 and 1, where higher values will cause a higher proportion of particles to spin in the opposite direction.
             *
             * 导致一些粒子向相反的方向旋转。设置在0和1之间，数值越大，粒子朝相反方向旋转的比例越大。
             */
            _this.randomizeRotationDirection = 0;
            /**
             * The initial color of particles when emitted.
             *
             * 粒子发射时的初始颜色。
             */
            _this.startColor = new feng3d.MinMaxGradient();
            /**
             * Scale applied to the gravity.
             *
             * 应用于重力加速度的缩放。
             */
            _this.gravityModifier = new feng3d.MinMaxCurve();
            /**
             * This selects the space in which to simulate particles. It can be either world or local space.
             *
             * 模拟空间，使粒子位置模拟在世界，本地或自定义空间。在本地空间中，它们相对于自己的转换而存在，在自定义空间中，它们相对于自定义转换。
             *
             * @todo
             */
            _this.simulationSpace = feng3d.ParticleSystemSimulationSpace.Local;
            /**
             * Override the default playback speed of the Particle System.
             *
             * 重写粒子系统的默认播放速度。
             */
            _this.simulationSpeed = 1;
            /**
             * Control how the particle system's Transform Component is applied to the particle system.
             *
             * 控制粒子系统的变换组件如何应用于粒子系统。
             */
            _this.scalingMode = feng3d.ParticleSystemScalingMode.Local;
            /**
             * If set to true, the particle system will automatically start playing on startup.
             *
             * 如果设置为真，粒子系统将自动开始播放启动。
             */
            _this.playOnAwake = true;
            /**
             * The maximum number of particles to emit.
             *
             * 发射粒子的最大数量。
             */
            _this.maxParticles = 1000;
            return _this;
        }
        Object.defineProperty(ParticleMainModule.prototype, "startDelayMultiplier", {
            /**
             * Start delay multiplier in seconds.
             *
             * 启动延迟乘数(以秒为单位)。
             */
            get: function () {
                return this.startDelay.curveMultiplier;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startLifetimeMultiplier", {
            /**
             * Start lifetime multiplier.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall lifetime multiplier.
             *
             * 起始寿命乘数。
             * 如果您只想更改总体寿命乘数，则此方法比访问整个曲线更有效。
             */
            get: function () {
                return this.startLifetime.curveMultiplier;
            },
            set: function (v) {
                this.startLifetime.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSpeedMultiplier", {
            /**
             * A multiplier of the initial speed of particles when emitted.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall speed multiplier.
             *
             * 粒子发射时的初始速度的乘子。
             * 这种方法比访问整个曲线更有效，如果你只想改变整体速度乘数。
             */
            get: function () {
                return this.startSpeed.curveMultiplier;
            },
            set: function (v) {
                this.startSpeed.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSize", {
            /**
             * The initial size of particles when emitted.
             *
             * 粒子发射时的初始大小。
             */
            get: function () {
                return this.startSize3D.xCurve;
            },
            set: function (v) {
                this.startSize3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSizeMultiplier", {
            /**
             * Start size multiplier.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
             *
             * 开始尺寸乘数。
             * 如果您只想更改整体尺寸倍增器，则此方法比访问整个曲线更有效。
             */
            get: function () {
                return this.startSize.curveMultiplier;
            },
            set: function (v) {
                this.startSize.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSizeX", {
            /**
             * The initial size of particles along the X axis when emitted.
             *
             * 发射时沿X轴的粒子的初始大小。
             */
            get: function () {
                return this.startSize3D.xCurve;
            },
            set: function (v) {
                this.startSize3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSizeXMultiplier", {
            /**
             * Start rotation multiplier along the X axis.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
             *
             * 启动旋转乘法器沿X轴。
             * 如果您只想更改整体大小倍增器，则此方法比访问整个曲线更有效。
             */
            get: function () {
                return this.startSizeX.curveMultiplier;
            },
            set: function (v) {
                this.startSizeX.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSizeY", {
            /**
             * The initial size of particles along the Y axis when emitted.
             *
             * 发射时沿Y轴的粒子的初始大小。
             */
            get: function () {
                return this.startSize3D.yCurve;
            },
            set: function (v) {
                this.startSize3D.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSizeYMultiplier", {
            /**
             * Start rotation multiplier along the Y axis.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
             *
             * 启动旋转乘法器沿Y轴。
             * 如果您只想更改整体大小倍增器，则此方法比访问整个曲线更有效。
             */
            get: function () {
                return this.startSizeY.curveMultiplier;
            },
            set: function (v) {
                this.startSizeY.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSizeZ", {
            /**
             * The initial size of particles along the Z axis when emitted.
             *
             * 发射时沿Z轴的粒子的初始大小。
             */
            get: function () {
                return this.startSize3D.zCurve;
            },
            set: function (v) {
                this.startSize3D.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startSizeZMultiplier", {
            /**
             * Start rotation multiplier along the Z axis.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall size multiplier.
             *
             * 启动旋转乘法器沿Z轴。
             * 如果您只想更改整体大小倍增器，则此方法比访问整个曲线更有效。
             */
            get: function () {
                return this.startSizeZ.curveMultiplier;
            },
            set: function (v) {
                this.startSizeZ.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotation", {
            /**
             * The initial rotation of particles when emitted.
             * 粒子发射时的初始旋转。
             */
            // @oav({ tooltip: "The initial rotation of particles when emitted." })
            get: function () {
                return this.startRotation3D.zCurve;
            },
            set: function (v) {
                this.startRotation3D.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotationMultiplier", {
            /**
             * Start rotation multiplier.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
             *
             * 开始旋转乘数。
             * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
             */
            get: function () {
                return this.startRotation.curveMultiplier;
            },
            set: function (v) {
                this.startRotation.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotationX", {
            /**
             * The initial rotation of particles around the X axis when emitted.
             *
             * 发射时粒子围绕X轴的初始旋转。
             */
            get: function () {
                return this.startRotation3D.xCurve;
            },
            set: function (v) {
                this.startRotation3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotationXMultiplier", {
            /**
             * Start rotation multiplier around the X axis.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
             *
             * 开始绕X轴旋转乘法器。
             * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
             */
            get: function () {
                return this.startRotationX.curveMultiplier;
            },
            set: function (v) {
                this.startRotationX.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotationY", {
            /**
             * The initial rotation of particles around the Y axis when emitted.
             *
             * 发射时粒子围绕Y轴的初始旋转。
             */
            get: function () {
                return this.startRotation3D.yCurve;
            },
            set: function (v) {
                this.startRotation3D.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotationYMultiplier", {
            /**
             * Start rotation multiplier around the Y axis.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
             *
             * 开始绕Y轴旋转乘法器。
             * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
             */
            get: function () {
                return this.startRotationY.curveMultiplier;
            },
            set: function (v) {
                this.startRotationY.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotationZ", {
            /**
             * The initial rotation of particles around the Z axis when emitted.
             *
             * 发射时粒子围绕Z轴的初始旋转。
             */
            get: function () {
                return this.startRotation3D.zCurve;
            },
            set: function (v) {
                this.startRotation3D.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleMainModule.prototype, "startRotationZMultiplier", {
            /**
             * Start rotation multiplier around the Z axis.
             * This method is more efficient than accessing the whole curve, if you only want to change the overall rotation multiplier.
             *
             * 开始绕Z轴旋转乘法器。
             * 这种方法比访问整个曲线更有效，如果你只想改变整体旋转乘数。
             */
            get: function () {
                return this.startRotationZ.curveMultiplier;
            },
            set: function (v) {
                this.startRotationZ.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleMainModule.prototype.initParticleState = function (particle) {
            //
            var birthRateAtDuration = particle.birthRateAtDuration;
            particle.velocity.set(0, 0, 0);
            particle.acceleration.set(0, 0, 0);
            if (this.useStartSize3D) {
                particle.startSize.copy(this.startSize3D.getValue(birthRateAtDuration));
            }
            else {
                var startSize = this.startSize.getValue(birthRateAtDuration);
                particle.startSize.set(startSize, startSize, startSize);
            }
            //
            if (this.useStartRotation3D) {
                particle.rotation.copy(this.startRotation3D.getValue(birthRateAtDuration));
            }
            else {
                var startRotation = this.startRotation.getValue(birthRateAtDuration);
                particle.rotation.set(0, 0, startRotation);
            }
            particle.angularVelocity.set(0, 0, 0);
            //
            particle.startColor.copy(this.startColor.getValue(birthRateAtDuration));
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleMainModule.prototype.updateParticleState = function (particle) {
            // 加速度
            var gravity = world_gravity.scaleNumberTo(this.gravityModifier.getValue(this.particleSystem._emitInfo.rateAtDuration));
            this.particleSystem.addParticleAcceleration(particle, gravity, feng3d.ParticleSystemSimulationSpace.World, _Main_preGravity);
            //
            particle.size.copy(particle.startSize);
            particle.color.copy(particle.startColor);
        };
        __decorate([
            feng3d.oav({ exclude: true })
        ], ParticleMainModule.prototype, "enabled", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The duration of the particle system in seconds." })
            ,
            feng3d.oav({ tooltip: "粒子系统的持续时间(秒)。" })
        ], ParticleMainModule.prototype, "duration", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Is the particle system looping?" })
            ,
            feng3d.oav({ tooltip: "粒子系统在循环吗?" })
        ], ParticleMainModule.prototype, "loop", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "When looping is enabled, this controls whether this particle system will look like it has already simulated for one loop when first becoming visible." })
            ,
            feng3d.oav({ tooltip: "当循环被激活时，它控制这个粒子系统在第一次出现时是否看起来像已经模拟了一个循环。" })
        ], ParticleMainModule.prototype, "prewarm", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Start delay in seconds." })
            ,
            feng3d.oav({ tooltip: "启动延迟(以秒为单位)。" })
        ], ParticleMainModule.prototype, "startDelay", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The total lifetime in seconds that each new particle will have." })
            ,
            feng3d.oav({ tooltip: "每个新粒子的总寿命(以秒计)。" })
        ], ParticleMainModule.prototype, "startLifetime", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The initial speed of particles when emitted." })
            ,
            feng3d.oav({ tooltip: "粒子发射时的初始速度。" })
        ], ParticleMainModule.prototype, "startSpeed", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "A flag to enable specifying particle size individually for each axis." })
            ,
            feng3d.oav({ tooltip: "允许为每个轴分别指定粒度大小的标志。" })
        ], ParticleMainModule.prototype, "useStartSize3D", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The initial size of particles when emitted." })
            ,
            feng3d.oav({ tooltip: "粒子发射时的初始大小。" })
        ], ParticleMainModule.prototype, "startSize", null);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The initial size of particles when emitted." })
            ,
            feng3d.oav({ tooltip: "发射时粒子的初始大小。" })
        ], ParticleMainModule.prototype, "startSize3D", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "A flag to enable 3D particle rotation." })
            ,
            feng3d.oav({ tooltip: "一个启用粒子3D旋转的标记。" })
        ], ParticleMainModule.prototype, "useStartRotation3D", void 0);
        __decorate([
            feng3d.oav({ tooltip: "粒子发射时的初始旋转。" })
        ], ParticleMainModule.prototype, "startRotation", null);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The initial rotation of particles when emitted." })
            ,
            feng3d.oav({ tooltip: "粒子发射时的初始旋转。" })
        ], ParticleMainModule.prototype, "startRotation3D", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Cause some particles to spin in the opposite direction. Set between 0 and 1, where higher values will cause a higher proportion of particles to spin in the opposite direction." })
            ,
            feng3d.oav({ tooltip: "导致一些粒子向相反的方向旋转。设置在0和1之间，数值越大，粒子朝相反方向旋转的比例越大。" })
        ], ParticleMainModule.prototype, "randomizeRotationDirection", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The initial color of particles when emitted." })
            ,
            feng3d.oav({ tooltip: "粒子发射时的初始颜色。" })
        ], ParticleMainModule.prototype, "startColor", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Scale applied to the gravity." })
            ,
            feng3d.oav({ tooltip: "应用于重力加速度的缩放。" })
        ], ParticleMainModule.prototype, "gravityModifier", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "This selects the space in which to simulate particles. It can be either world or local space.", component: "OAVEnum", componentParam: { enumClass: ParticleSystemSimulationSpace } })
            ,
            feng3d.oav({ tooltip: "模拟空间，使粒子位置模拟在世界，本地或自定义空间。在本地空间中，它们相对于自己的转换而存在，在自定义空间中，它们相对于自定义转换。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemSimulationSpace } })
        ], ParticleMainModule.prototype, "simulationSpace", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Override the default playback speed of the Particle System." })
            ,
            feng3d.oav({ tooltip: "重写粒子系统的默认播放速度。" })
        ], ParticleMainModule.prototype, "simulationSpeed", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Control how the particle system's Transform Component is applied to the particle system.", component: "OAVEnum", componentParam: { enumClass: ParticleSystemScalingMode } })
            ,
            feng3d.oav({ tooltip: "控制粒子系统的变换组件如何应用于粒子系统。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemScalingMode } })
        ], ParticleMainModule.prototype, "scalingMode", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "If set to true, the particle system will automatically start playing on startup." })
            ,
            feng3d.oav({ tooltip: "如果设置为真，粒子系统将自动开始播放启动。" })
        ], ParticleMainModule.prototype, "playOnAwake", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The maximum number of particles to emit." })
            ,
            feng3d.oav({ tooltip: "发射粒子的最大数量。" })
        ], ParticleMainModule.prototype, "maxParticles", void 0);
        return ParticleMainModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleMainModule = ParticleMainModule;
    var world_gravity = new feng3d.Vector3(0, -9.8, 0);
    var _Main_preGravity = "_Main_preGravity";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统发射模块。
     */
    var ParticleEmissionModule = /** @class */ (function (_super) {
        __extends(ParticleEmissionModule, _super);
        function ParticleEmissionModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 随着时间的推移，新粒子产生的速度。
             */
            _this.rateOverTime = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { between0And1: true, constant: 10, constantMin: 10, constantMax: 10, curveMultiplier: 10 });
            /**
             * The rate at which new particles are spawned, over distance.
             * New particles will only be emitted when the emitter moves.
             *
             * 产生新粒子的速度，通过距离。
             * 新粒子只有世界空间模拟且发射器移动时才会被发射出来。
             */
            _this.rateOverDistance = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { between0And1: true, constant: 0, constantMin: 0, constantMax: 1 });
            /**
             * 爆发数组
             */
            _this.bursts = [];
            return _this;
        }
        Object.defineProperty(ParticleEmissionModule.prototype, "rateOverTimeMultiplier", {
            /**
             * Change the rate over time multiplier.
             * This is more efficient than accessing the whole curve, if you only want to change the overall rate multiplier.
             *
             * 改变率随时间的乘数。
             * 如果您只想更改整体的速率乘数，那么这比访问整个曲线更有效。
             * 只在
             */
            get: function () {
                return this.rateOverTime.curveMultiplier;
            },
            set: function (v) {
                this.rateOverTime.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleEmissionModule.prototype, "rateOverDistanceMultiplier", {
            /**
             * Change the rate over distance multiplier.
             * This is more efficient than accessing the whole curve, if you only want to change the overall rate multiplier.
             *
             * 改变速率随距离变化的乘数。
             * 如果您只想更改整体的速率乘数，那么这比访问整个曲线更有效。
             */
            get: function () {
                return this.rateOverDistance.curveMultiplier;
            },
            set: function (v) {
                this.rateOverDistance.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleEmissionModule.prototype, "burstCount", {
            /**
             * The current number of bursts.
             *
             * 当前的爆发次数。
             */
            get: function () {
                return this.bursts.length;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Get the burst array.
         * 获取爆发数组。
         *
         * @param bursts Array of bursts to be filled in.要填充的爆发数组。
         * @returns The number of bursts in the array.数组中的爆发次数。
         */
        ParticleEmissionModule.prototype.getBursts = function (bursts) {
            bursts.length = this.bursts.length;
            for (var i = 0, n = bursts.length; i < n; i++) {
                bursts[i] = this.bursts[i];
            }
            return bursts.length;
        };
        /**
         * Set the burst array.
         * 设置爆发数组。
         *
         * @param bursts Array of bursts.爆发的数组。
         * @param size Optional array size, if burst count is less than array size.可选的数组大小，如果爆发计数小于数组大小。
         */
        ParticleEmissionModule.prototype.setBursts = function (bursts, size) {
            if (size === void 0) { size = Number.MAX_SAFE_INTEGER; }
            var size = Math.min(bursts.length, size);
            for (var i = 0; i < size; i++) {
                this.bursts[i] = bursts[i];
            }
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The rate at which new particles are spawned, over time." })
            ,
            feng3d.oav({ tooltip: "随着时间的推移，新粒子产生的速度。" })
        ], ParticleEmissionModule.prototype, "rateOverTime", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The rate at which new particles are spawned, over distance." })
            ,
            feng3d.oav({ tooltip: "产生新粒子的速度，通过距离。新粒子只有世界空间模拟且发射器移动时才会被发射出来。" })
        ], ParticleEmissionModule.prototype, "rateOverDistance", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ component: "OAVArray", tooltip: "在指定时间进行额外发射指定数量的粒子", componentParam: { defaultItem: function () { return new feng3d.ParticleEmissionBurst(); } } })
        ], ParticleEmissionModule.prototype, "bursts", void 0);
        return ParticleEmissionModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleEmissionModule = ParticleEmissionModule;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Shape of the emitter volume, which controls where particles are emitted and their initial direction.
     * 发射体体积的形状，它控制粒子发射的位置和初始方向。
     */
    var ParticleShapeModule = /** @class */ (function (_super) {
        __extends(ParticleShapeModule, _super);
        function ParticleShapeModule() {
            var _this = _super.call(this) || this;
            /**
             * Align particles based on their initial direction of travel.
             * 根据粒子的初始运动方向排列粒子。
             *
             * Using align to Direction in the Shape module forces the system to be rendered using Local Billboard Alignment.
             * 在形状模块中使用align to Direction迫使系统使用本地看板对齐方式呈现。
             */
            _this.alignToDirection = false;
            /**
             * Randomizes the starting direction of particles.
             * 随机化粒子的起始方向。
             */
            _this.randomDirectionAmount = 0;
            /**
             * Spherizes the starting direction of particles.
             * 使粒子的起始方向球面化。
             */
            _this.sphericalDirectionAmount = 0;
            /**
             * Angle of the cone.
             *
             * 圆锥的角度。
             */
            _this.angle = 25;
            /**
             * Circle arc angle.
             *
             * 圆弧角。
             */
            _this.arc = 360;
            /**
             * The mode used for generating particles around the arc.
             *
             * 在弧线周围产生粒子的模式。
             */
            _this.arcMode = feng3d.ParticleSystemShapeMultiModeValue.Random;
            /**
             * When using one of the animated modes, how quickly to move the emission position around the arc.
             *
             * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
             */
            _this.arcSpeed = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { constant: 1, constantMin: 1, constantMax: 1 });
            /**
             * Control the gap between emission points around the arc.
             *
             * 控制弧线周围发射点之间的间隙。
             */
            _this.arcSpread = 0;
            /**
             * Scale of the box.
             *
             * 盒子的缩放。
             */
            _this.box = new feng3d.Vector3(1, 1, 1);
            /**
             * Length of the cone.
             *
             * 圆锥的长度（高度）。
             */
            _this.length = 5;
            /**
             * Apply a scaling factor to the mesh used for generating source positions.
             *
             * 对用于生成源位置的网格应用缩放因子。
             *
             * @todo
             */
            _this.meshScale = 1;
            /**
             * Where on the mesh to emit particles from.
             *
             * 从网格的什么地方发射粒子。
             *
             * @todo
             */
            _this.meshShapeType = feng3d.ParticleSystemMeshShapeType.Vertex;
            /**
             * Modulate the particle colors with the vertex colors, or the material color if no vertex colors exist.
             *
             * 用顶点颜色调节粒子颜色，如果没有顶点颜色，则调节材质颜色。
             *
             * @todo
             */
            _this.useMeshColors = true;
            /**
             * Move particles away from the surface of the source mesh.
             *
             * 将粒子从源网格的表面移开。
             */
            _this.normalOffset = 0;
            /**
             * Radius of the shape.
             *
             * 形状的半径。
             */
            _this.radius = 1;
            /**
             * The mode used for generating particles around the radius.
             *
             * 在弧线周围产生粒子的模式。
             */
            _this.radiusMode = feng3d.ParticleSystemShapeMultiModeValue.Random;
            /**
             * When using one of the animated modes, how quickly to move the emission position along the radius.
             *
             * 当使用一个动画模式时，如何快速移动发射位置周围的弧。
             */
            _this.radiusSpeed = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { constant: 1, constantMin: 1, constantMax: 1 });
            /**
             * Control the gap between emission points around the radius.
             *
             * 控制弧线周围发射点之间的间隙。
             */
            _this.radiusSpread = 0;
            _this._shapeSphere = new feng3d.ParticleSystemShapeSphere(_this);
            _this._shapeHemisphere = new feng3d.ParticleSystemShapeHemisphere(_this);
            _this._shapeCone = new feng3d.ParticleSystemShapeCone(_this);
            _this._shapeBox = new feng3d.ParticleSystemShapeBox(_this);
            _this._shapeCircle = new feng3d.ParticleSystemShapeCircle(_this);
            _this._shapeEdge = new feng3d.ParticleSystemShapeEdge(_this);
            _this.shapeType = feng3d.ParticleSystemShapeType.Cone;
            return _this;
        }
        Object.defineProperty(ParticleShapeModule.prototype, "arcSpeedMultiplier", {
            /**
             * A multiplier of the arc speed of the emission shape.
             *
             * 发射形状的电弧速度的乘数。
             */
            get: function () {
                return this.arcSpeed.curveMultiplier;
            },
            set: function (v) {
                this.arcSpeed.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleShapeModule.prototype, "radiusSpeedMultiplier", {
            /**
             * A multiplier of the radius speed of the emission shape.
             *
             * 发射形状的半径速度的乘法器。
             */
            get: function () {
                return this.radiusSpeed.curveMultiplier;
            },
            set: function (v) {
                this.radiusSpeed.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleShapeModule.prototype.initParticleState = function (particle) {
            var startSpeed = this.particleSystem.main.startSpeed.getValue(particle.birthRateAtDuration);
            //
            var position = _temp_position.set(0, 0, 0);
            var dir = _temp_dir.set(0, 0, 1);
            //
            if (this.enabled) {
                this.activeShape.calcParticlePosDir(particle, position, dir);
            }
            dir.scaleNumber(startSpeed);
            if (this.particleSystem.main.simulationSpace == feng3d.ParticleSystemSimulationSpace.World) {
                var localToWorldMatrix = this.particleSystem.transform.localToWorldMatrix;
                localToWorldMatrix.transformPoint3(position, position);
                localToWorldMatrix.transformVector3(dir, dir);
            }
            particle.position.add(position);
            particle.velocity.add(dir);
            if (!this.enabled)
                return;
            //
            if (this.alignToDirection) {
                var mat = new feng3d.Matrix4x4();
                mat.lookAt(particle.velocity, feng3d.Vector3.Y_AXIS);
                var mat0 = feng3d.Matrix4x4.fromRotation(particle.rotation.x, particle.rotation.y, particle.rotation.z);
                mat0.append(mat);
                particle.rotation = mat0.getRotation();
            }
            var length = particle.velocity.length;
            if (this.randomDirectionAmount > 0) {
                var velocity = feng3d.Vector3.random().scaleNumber(2).subNumber(1).normalize(length);
                particle.velocity.lerpNumber(velocity, this.randomDirectionAmount).normalize(length);
            }
            if (this.sphericalDirectionAmount > 0) {
                var velocity = particle.position.clone().normalize(length);
                particle.velocity.lerpNumber(velocity, this.sphericalDirectionAmount).normalize(length);
            }
        };
        ParticleShapeModule.prototype._onShapeTypeChanged = function () {
            var preValue = this.activeShape;
            switch (this.shapeType) {
                case feng3d.ParticleSystemShapeType.Sphere:
                    this.shape = feng3d.ParticleSystemShapeType1.Sphere;
                    this._shapeSphere.emitFromShell = false;
                    this.activeShape = this._shapeSphere;
                    break;
                case feng3d.ParticleSystemShapeType.SphereShell:
                    this.shape = feng3d.ParticleSystemShapeType1.Sphere;
                    this._shapeSphere.emitFromShell = true;
                    this.activeShape = this._shapeSphere;
                    break;
                case feng3d.ParticleSystemShapeType.Hemisphere:
                    this.shape = feng3d.ParticleSystemShapeType1.Hemisphere;
                    this._shapeHemisphere.emitFromShell = false;
                    this.activeShape = this._shapeHemisphere;
                    break;
                case feng3d.ParticleSystemShapeType.HemisphereShell:
                    this.shape = feng3d.ParticleSystemShapeType1.Hemisphere;
                    this._shapeHemisphere.emitFromShell = true;
                    this.activeShape = this._shapeHemisphere;
                    break;
                case feng3d.ParticleSystemShapeType.Cone:
                    this.shape = feng3d.ParticleSystemShapeType1.Cone;
                    this._shapeCone.emitFrom = feng3d.ParticleSystemShapeConeEmitFrom.Base;
                    this.activeShape = this._shapeCone;
                    break;
                case feng3d.ParticleSystemShapeType.ConeShell:
                    this.shape = feng3d.ParticleSystemShapeType1.Cone;
                    this._shapeCone.emitFrom = feng3d.ParticleSystemShapeConeEmitFrom.BaseShell;
                    this.activeShape = this._shapeCone;
                    break;
                case feng3d.ParticleSystemShapeType.ConeVolume:
                    this.shape = feng3d.ParticleSystemShapeType1.Cone;
                    this._shapeCone.emitFrom = feng3d.ParticleSystemShapeConeEmitFrom.Volume;
                    this.activeShape = this._shapeCone;
                    break;
                case feng3d.ParticleSystemShapeType.ConeVolumeShell:
                    this.shape = feng3d.ParticleSystemShapeType1.Cone;
                    this._shapeCone.emitFrom = feng3d.ParticleSystemShapeConeEmitFrom.VolumeShell;
                    this.activeShape = this._shapeCone;
                    break;
                case feng3d.ParticleSystemShapeType.Box:
                    this.shape = feng3d.ParticleSystemShapeType1.Box;
                    this._shapeBox.emitFrom = feng3d.ParticleSystemShapeBoxEmitFrom.Volume;
                    this.activeShape = this._shapeBox;
                    break;
                case feng3d.ParticleSystemShapeType.BoxShell:
                    this.shape = feng3d.ParticleSystemShapeType1.Box;
                    this._shapeBox.emitFrom = feng3d.ParticleSystemShapeBoxEmitFrom.Shell;
                    this.activeShape = this._shapeBox;
                    break;
                case feng3d.ParticleSystemShapeType.BoxEdge:
                    this.shape = feng3d.ParticleSystemShapeType1.Box;
                    this._shapeBox.emitFrom = feng3d.ParticleSystemShapeBoxEmitFrom.Edge;
                    this.activeShape = this._shapeBox;
                    break;
                case feng3d.ParticleSystemShapeType.Mesh:
                    this.shape = feng3d.ParticleSystemShapeType1.Mesh;
                    console.warn("\u672A\u5B9E\u73B0 ParticleSystemShapeType.Mesh");
                    this.activeShape = null;
                    break;
                case feng3d.ParticleSystemShapeType.MeshRenderer:
                    this.shape = feng3d.ParticleSystemShapeType1.MeshRenderer;
                    console.warn("\u672A\u5B9E\u73B0 ParticleSystemShapeType.Mesh");
                    this.activeShape = null;
                    break;
                case feng3d.ParticleSystemShapeType.SkinnedMeshRenderer:
                    this.shape = feng3d.ParticleSystemShapeType1.SkinnedMeshRenderer;
                    console.warn("\u672A\u5B9E\u73B0 ParticleSystemShapeType.Mesh");
                    this.activeShape = null;
                    break;
                case feng3d.ParticleSystemShapeType.Circle:
                    this.shape = feng3d.ParticleSystemShapeType1.Circle;
                    this._shapeCircle.emitFromEdge = false;
                    this.activeShape = this._shapeCircle;
                    break;
                case feng3d.ParticleSystemShapeType.CircleEdge:
                    this.shape = feng3d.ParticleSystemShapeType1.Circle;
                    this._shapeCircle.emitFromEdge = true;
                    this.activeShape = this._shapeCircle;
                    break;
                case feng3d.ParticleSystemShapeType.SingleSidedEdge:
                    this.shape = feng3d.ParticleSystemShapeType1.Edge;
                    this.activeShape = this._shapeEdge;
                    break;
                default:
                    console.warn("\u9519\u8BEF ParticleShapeModule.shapeType \u503C " + this.shapeType);
                    break;
            }
            feng3d.serialization.setValue(this.activeShape, preValue);
            this.dispatch("refreshView");
        };
        ParticleShapeModule.prototype._onShapeChanged = function () {
            switch (this.shape) {
                case feng3d.ParticleSystemShapeType1.Sphere:
                    this.shapeType = this._shapeSphere.emitFromShell ? feng3d.ParticleSystemShapeType.SphereShell : feng3d.ParticleSystemShapeType.Sphere;
                    break;
                case feng3d.ParticleSystemShapeType1.Hemisphere:
                    this.shapeType = this._shapeHemisphere.emitFromShell ? feng3d.ParticleSystemShapeType.HemisphereShell : feng3d.ParticleSystemShapeType.Hemisphere;
                    break;
                case feng3d.ParticleSystemShapeType1.Cone:
                    switch (this._shapeCone.emitFrom) {
                        case feng3d.ParticleSystemShapeConeEmitFrom.Base:
                            this.shapeType = feng3d.ParticleSystemShapeType.Cone;
                            break;
                        case feng3d.ParticleSystemShapeConeEmitFrom.BaseShell:
                            this.shapeType = feng3d.ParticleSystemShapeType.ConeShell;
                            break;
                        case feng3d.ParticleSystemShapeConeEmitFrom.Volume:
                            this.shapeType = feng3d.ParticleSystemShapeType.ConeVolume;
                            break;
                        case feng3d.ParticleSystemShapeConeEmitFrom.VolumeShell:
                            this.shapeType = feng3d.ParticleSystemShapeType.ConeVolumeShell;
                            break;
                        default:
                            console.warn("\u9519\u8BEFParticleSystemShapeCone.emitFrom\u503C " + this._shapeCone.emitFrom);
                            break;
                    }
                    break;
                case feng3d.ParticleSystemShapeType1.Box:
                    switch (this._shapeBox.emitFrom) {
                        case feng3d.ParticleSystemShapeBoxEmitFrom.Volume:
                            this.shapeType = feng3d.ParticleSystemShapeType.Box;
                            break;
                        case feng3d.ParticleSystemShapeBoxEmitFrom.Shell:
                            this.shapeType = feng3d.ParticleSystemShapeType.BoxShell;
                            break;
                        case feng3d.ParticleSystemShapeBoxEmitFrom.Edge:
                            this.shapeType = feng3d.ParticleSystemShapeType.BoxEdge;
                            break;
                        default:
                            console.warn("\u9519\u8BEFParticleSystemShapeCone.emitFrom\u503C " + this._shapeCone.emitFrom);
                            break;
                    }
                    break;
                case feng3d.ParticleSystemShapeType1.Mesh:
                    this.shapeType = feng3d.ParticleSystemShapeType.Mesh;
                    break;
                case feng3d.ParticleSystemShapeType1.MeshRenderer:
                    this.shapeType = feng3d.ParticleSystemShapeType.MeshRenderer;
                    break;
                case feng3d.ParticleSystemShapeType1.SkinnedMeshRenderer:
                    this.shapeType = feng3d.ParticleSystemShapeType.SkinnedMeshRenderer;
                    break;
                case feng3d.ParticleSystemShapeType1.Circle:
                    this.shapeType = this._shapeCircle.emitFromEdge ? feng3d.ParticleSystemShapeType.CircleEdge : feng3d.ParticleSystemShapeType.Circle;
                    break;
                case feng3d.ParticleSystemShapeType1.Edge:
                    this.shapeType = feng3d.ParticleSystemShapeType.SingleSidedEdge;
                    break;
                default:
                    console.warn("\u9519\u8BEF ParticleShapeModule.shape \u503C " + this.shape);
                    break;
            }
        };
        __decorate([
            feng3d.serialize,
            feng3d.watch("_onShapeTypeChanged")
        ], ParticleShapeModule.prototype, "shapeType", void 0);
        __decorate([
            feng3d.oav({ tooltip: "发射粒子的形状类型。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemShapeType1 } }),
            feng3d.watch("_onShapeChanged")
        ], ParticleShapeModule.prototype, "shape", void 0);
        __decorate([
            feng3d.oav({ component: "OAVObjectView" })
        ], ParticleShapeModule.prototype, "activeShape", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Align particles based on their initial direction of travel." })
            ,
            feng3d.oav({ tooltip: "根据粒子的初始运动方向排列粒子。" })
        ], ParticleShapeModule.prototype, "alignToDirection", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Randomizes the starting direction of particles." })
            ,
            feng3d.oav({ tooltip: "随机化粒子的起始方向。" })
        ], ParticleShapeModule.prototype, "randomDirectionAmount", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Spherizes the starting direction of particles." })
            ,
            feng3d.oav({ tooltip: "Spherizes the starting direction of particles." })
        ], ParticleShapeModule.prototype, "sphericalDirectionAmount", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "angle", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "arc", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "arcMode", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "arcSpeed", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "arcSpread", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "box", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "length", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "radius", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "radiusMode", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "radiusSpeed", void 0);
        __decorate([
            feng3d.serialize
        ], ParticleShapeModule.prototype, "radiusSpread", void 0);
        return ParticleShapeModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleShapeModule = ParticleShapeModule;
    var _temp_position = new feng3d.Vector3(0, 0, 0);
    var _temp_dir = new feng3d.Vector3(0, 0, 1);
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 速度随时间变化模块
     *
     * Controls the velocity of each particle during its lifetime.
     * 控制每个粒子在其生命周期内的速度。
     */
    var ParticleVelocityOverLifetimeModule = /** @class */ (function (_super) {
        __extends(ParticleVelocityOverLifetimeModule, _super);
        function ParticleVelocityOverLifetimeModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Curve to control particle speed based on lifetime.
             *
             * 基于寿命的粒子速度控制曲线。
             */
            _this.velocity = new feng3d.MinMaxCurveVector3();
            /**
             * Specifies if the velocities are in local space (rotated with the transform) or world space.
             *
             * 指定速度是在局部空间(与变换一起旋转)还是在世界空间。
             */
            _this.space = feng3d.ParticleSystemSimulationSpace.Local;
            return _this;
        }
        Object.defineProperty(ParticleVelocityOverLifetimeModule.prototype, "x", {
            /**
             * Curve to control particle speed based on lifetime, on the X axis.
             *
             * 曲线控制粒子速度基于寿命，在X轴上。
             */
            get: function () {
                return this.velocity.xCurve;
            },
            set: function (v) {
                this.velocity.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleVelocityOverLifetimeModule.prototype, "xMultiplier", {
            /**
             * X axis speed multiplier.
             *
             * X轴速度倍增器。
             */
            get: function () {
                return this.x.curveMultiplier;
            },
            set: function (v) {
                this.x.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleVelocityOverLifetimeModule.prototype, "y", {
            /**
             * Curve to control particle speed based on lifetime, on the Y axis.
             *
             * 曲线控制粒子速度基于寿命，在Y轴上。
             */
            get: function () {
                return this.velocity.yCurve;
            },
            set: function (v) {
                this.velocity.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleVelocityOverLifetimeModule.prototype, "yMultiplier", {
            /**
             * Y axis speed multiplier.
             *
             * Y轴速度倍增器。
             */
            get: function () {
                return this.y.curveMultiplier;
            },
            set: function (v) {
                this.y.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleVelocityOverLifetimeModule.prototype, "z", {
            /**
             * Curve to control particle speed based on lifetime, on the Z axis.
             *
             * 曲线控制粒子速度基于寿命，在Z轴上。
             */
            get: function () {
                return this.velocity.zCurve;
            },
            set: function (v) {
                this.velocity.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleVelocityOverLifetimeModule.prototype, "zMultiplier", {
            /**
             * Z axis speed multiplier.
             *
             * Z轴速度倍增器。
             */
            get: function () {
                return this.z.curveMultiplier;
            },
            set: function (v) {
                this.z.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleVelocityOverLifetimeModule.prototype.initParticleState = function (particle) {
            particle[_VelocityOverLifetime_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleVelocityOverLifetimeModule.prototype.updateParticleState = function (particle) {
            this.particleSystem.removeParticleVelocity(particle, _VelocityOverLifetime_preVelocity);
            if (!this.enabled)
                return;
            var velocity = this.velocity.getValue(particle.rateAtLifeTime, particle[_VelocityOverLifetime_rate]);
            this.particleSystem.addParticleVelocity(particle, velocity, this.space, _VelocityOverLifetime_preVelocity);
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Curve to control particle speed based on lifetime." })
            ,
            feng3d.oav({ tooltip: "基于寿命的粒子速度控制曲线。" })
        ], ParticleVelocityOverLifetimeModule.prototype, "velocity", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Specifies if the velocities are in local space (rotated with the transform) or world space.", component: "OAVEnum", componentParam: { enumClass: ParticleSystemSimulationSpace } })
            ,
            feng3d.oav({ tooltip: "指定速度是在局部空间(与变换一起旋转)还是在世界空间。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemSimulationSpace } })
        ], ParticleVelocityOverLifetimeModule.prototype, "space", void 0);
        return ParticleVelocityOverLifetimeModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleVelocityOverLifetimeModule = ParticleVelocityOverLifetimeModule;
    var _VelocityOverLifetime_rate = "_VelocityOverLifetime_rate";
    var _VelocityOverLifetime_preVelocity = "_VelocityOverLifetime_preVelocity";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Limit Velocity Over Lifetime module.
     *
     * 基于时间轴限制速度模块。
     */
    var ParticleLimitVelocityOverLifetimeModule = /** @class */ (function (_super) {
        __extends(ParticleLimitVelocityOverLifetimeModule, _super);
        function ParticleLimitVelocityOverLifetimeModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Set the size over lifetime on each axis separately.
             *
             * 在每个轴上分别设置生命周期内的大小。
             */
            _this.separateAxes = false;
            /**
             * Maximum velocity curve, when not using one curve per axis.
             *
             * 最大速度曲线，当不使用每轴一个曲线时。
             */
            _this.limit = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { between0And1: true, constant: 1, constantMin: 1, constantMax: 1 });
            /**
             * Maximum velocity.
             *
             * 最高速度。
             */
            _this.limit3D = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1 }, yCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1 }, zCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1 } });
            /**
             * Specifies if the velocities are in local space (rotated with the transform) or world space.
             *
             * 指定速度是在局部空间(与变换一起旋转)还是在世界空间。
             */
            // @oav({ tooltip: "Specifies if the velocities are in local space (rotated with the transform) or world space.", component: "OAVEnum", componentParam: { enumClass: ParticleSystemSimulationSpace } })
            _this.space = feng3d.ParticleSystemSimulationSpace.Local;
            /**
             * Controls how much the velocity that exceeds the velocity limit should be dampened.
             *
             * 控制多少速度，超过速度限制应该被抑制。
             */
            _this.dampen = 1;
            return _this;
        }
        Object.defineProperty(ParticleLimitVelocityOverLifetimeModule.prototype, "limitMultiplier", {
            /**
             * Change the limit multiplier.
             *
             * 改变限制乘法因子。
             */
            get: function () {
                return this.limit.curveMultiplier;
            },
            set: function (v) {
                this.limit.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleLimitVelocityOverLifetimeModule.prototype, "limitX", {
            /**
             * Maximum velocity curve for the X axis.
             *
             * X轴的最大速度曲线。
             */
            get: function () {
                return this.limit3D.xCurve;
            },
            set: function (v) {
                this.limit3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleLimitVelocityOverLifetimeModule.prototype, "limitXMultiplier", {
            /**
             * Change the limit multiplier on the X axis.
             *
             * 改变X轴上的极限乘法器。
             */
            get: function () {
                return this.limit3D.xCurve.curveMultiplier;
            },
            set: function (v) {
                this.limit3D.xCurve.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleLimitVelocityOverLifetimeModule.prototype, "limitY", {
            /**
             * Maximum velocity curve for the Y axis.
             *
             * Y轴的最大速度曲线。
             */
            get: function () {
                return this.limit3D.yCurve;
            },
            set: function (v) {
                this.limit3D.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleLimitVelocityOverLifetimeModule.prototype, "limitYMultiplier", {
            /**
             * Change the limit multiplier on the Y axis.
             *
             * 改变Y轴上的极限乘法器。
             */
            get: function () {
                return this.limit3D.yCurve.curveMultiplier;
            },
            set: function (v) {
                this.limit3D.yCurve.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleLimitVelocityOverLifetimeModule.prototype, "limitZ", {
            /**
             * Maximum velocity curve for the Z axis.
             *
             * Z轴的最大速度曲线。
             */
            get: function () {
                return this.limit3D.zCurve;
            },
            set: function (v) {
                this.limit3D.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleLimitVelocityOverLifetimeModule.prototype, "limitZMultiplier", {
            /**
             * Change the limit multiplier on the Z axis.
             *
             * 更改Z轴上的极限乘法器。
             */
            get: function () {
                return this.limit3D.zCurve.curveMultiplier;
            },
            set: function (v) {
                this.limit3D.zCurve.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         *
         * @param particle 粒子
         */
        ParticleLimitVelocityOverLifetimeModule.prototype.initParticleState = function (particle) {
            particle[_LimitVelocityOverLifetime_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         *
         * @param particle 粒子
         */
        ParticleLimitVelocityOverLifetimeModule.prototype.updateParticleState = function (particle) {
            if (!this.enabled)
                return;
            var limit3D = this.limit3D.getValue(particle.rateAtLifeTime, particle[_LimitVelocityOverLifetime_rate]);
            var limit = this.limit.getValue(particle.rateAtLifeTime, particle[_LimitVelocityOverLifetime_rate]);
            var pVelocity = particle.velocity.clone();
            // 计算变换矩阵
            var mat = new feng3d.Matrix4x4();
            //
            if (this.space != this.particleSystem.main.simulationSpace) {
                if (this.space == feng3d.ParticleSystemSimulationSpace.World) {
                    mat.copy(this.particleSystem.transform.localToWorldMatrix);
                }
                else {
                    mat.copy(this.particleSystem.transform.worldToLocalMatrix);
                }
            }
            // 变换到现在空间进行限速
            mat.transformVector3(pVelocity, pVelocity);
            if (this.separateAxes) {
                pVelocity.clamp(limit3D.negateTo(), limit3D);
            }
            else {
                if (pVelocity.lengthSquared > limit * limit)
                    pVelocity.normalize(limit);
            }
            mat.invert();
            // 还原到原空间
            mat.transformVector3(pVelocity, pVelocity);
            // 
            particle.velocity.lerpNumber(pVelocity, this.dampen);
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Set the size over lifetime on each axis separately." })
            ,
            feng3d.oav({ tooltip: "在每个轴上分别设置生命周期内的大小。" })
        ], ParticleLimitVelocityOverLifetimeModule.prototype, "separateAxes", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Maximum velocity curve, when not using one curve per axis." })
            ,
            feng3d.oav({ tooltip: "最大速度曲线，当不使用每轴一个曲线时。" })
        ], ParticleLimitVelocityOverLifetimeModule.prototype, "limit", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Maximum velocity." })
            ,
            feng3d.oav({ tooltip: "最高速度。" })
        ], ParticleLimitVelocityOverLifetimeModule.prototype, "limit3D", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "指定速度是在局部空间(与变换一起旋转)还是在世界空间。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemSimulationSpace } })
        ], ParticleLimitVelocityOverLifetimeModule.prototype, "space", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Controls how much the velocity that exceeds the velocity limit should be dampened.", component: "OAVEnum", componentParam: { enumClass: ParticleSystemSimulationSpace } })
            ,
            feng3d.oav({ tooltip: "控制多少速度，超过速度限制应该被抑制。" })
        ], ParticleLimitVelocityOverLifetimeModule.prototype, "dampen", void 0);
        return ParticleLimitVelocityOverLifetimeModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleLimitVelocityOverLifetimeModule = ParticleLimitVelocityOverLifetimeModule;
    var _LimitVelocityOverLifetime_rate = "_LimitVelocityOverLifetime_rate";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The Inherit Velocity Module controls how the velocity of the emitter is transferred to the particles as they are emitted.
     *
     * 遗传速度模块控制发射体的速度在粒子发射时如何传递到粒子上。（只有粒子系统在世界空间中模拟时生效）
     */
    var ParticleInheritVelocityModule = /** @class */ (function (_super) {
        __extends(ParticleInheritVelocityModule, _super);
        function ParticleInheritVelocityModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this["__class__"] = "feng3d.ParticleInheritVelocityModule";
            /**
             * How to apply emitter velocity to particles.
             *
             * 如何将发射体速度应用于粒子。
             */
            _this.mode = feng3d.ParticleSystemInheritVelocityMode.Initial;
            /**
             * Curve to define how much emitter velocity is applied during the lifetime of a particle.
             *
             * 曲线，用来定义在粒子的生命周期内应用了多少发射速度。
             */
            _this.multiplier = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { constant: 1, constantMin: 1, constantMax: 1 });
            return _this;
        }
        Object.defineProperty(ParticleInheritVelocityModule.prototype, "curve", {
            /**
             * Curve to define how much emitter velocity is applied during the lifetime of a particle.
             *
             * 曲线，用来定义在粒子的生命周期内应用了多少发射速度。
             */
            get: function () {
                return this.multiplier;
            },
            set: function (v) {
                this.multiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleInheritVelocityModule.prototype, "curveMultiplier", {
            /**
             * Change the curve multiplier.
             *
             * 改变曲线的乘数。
             */
            get: function () {
                return this.multiplier.curveMultiplier;
            },
            set: function (v) {
                this.multiplier.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleInheritVelocityModule.prototype.initParticleState = function (particle) {
            particle[_InheritVelocity_rate] = Math.random();
            if (!this.enabled)
                return;
            if (this.particleSystem.main.simulationSpace == feng3d.ParticleSystemSimulationSpace.Local)
                return;
            if (this.mode != feng3d.ParticleSystemInheritVelocityMode.Initial)
                return;
            var multiplier = this.multiplier.getValue(particle.rateAtLifeTime, particle[_InheritVelocity_rate]);
            particle.velocity.addScaledVector(multiplier, this.particleSystem._emitInfo.speed);
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleInheritVelocityModule.prototype.updateParticleState = function (particle) {
            if (!this.enabled)
                return;
            if (this.particleSystem.main.simulationSpace == feng3d.ParticleSystemSimulationSpace.Local)
                return;
            if (this.mode != feng3d.ParticleSystemInheritVelocityMode.Current)
                return;
            var multiplier = this.multiplier.getValue(particle.rateAtLifeTime, particle[_InheritVelocity_rate]);
            particle.position.addScaledVector(multiplier, this.particleSystem._emitInfo.moveVec);
        };
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "如何将发射体速度应用于粒子。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemInheritVelocityMode } })
        ], ParticleInheritVelocityModule.prototype, "mode", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "曲线，用来定义在粒子的生命周期内应用了多少发射速度。" })
        ], ParticleInheritVelocityModule.prototype, "multiplier", void 0);
        return ParticleInheritVelocityModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleInheritVelocityModule = ParticleInheritVelocityModule;
    var _InheritVelocity_rate = "_InheritVelocity_rate";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 作用在粒子上的力随时间变化模块
     *
     * 控制每个粒子在其生命周期内的力。
     * Script interface for the Force Over Lifetime module.
     */
    var ParticleForceOverLifetimeModule = /** @class */ (function (_super) {
        __extends(ParticleForceOverLifetimeModule, _super);
        function ParticleForceOverLifetimeModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 作用在粒子上的力
             */
            _this.force = new feng3d.MinMaxCurveVector3();
            /**
             * Are the forces being applied in local or world space?
             *
             * 这些力是作用于局部空间还是世界空间
             */
            _this.space = feng3d.ParticleSystemSimulationSpace.Local;
            /**
             * When randomly selecting values between two curves or constants, this flag will cause a new random force to be chosen on each frame.
             *
             * 当在两条曲线或常数之间随机选择值时，此标志将导致在每一帧上选择一个新的随机力。
             *
             * @todo
             */
            _this.randomized = false;
            return _this;
        }
        Object.defineProperty(ParticleForceOverLifetimeModule.prototype, "x", {
            /**
             * The curve defining particle forces in the X axis.
             *
             * 在X轴上定义粒子力的曲线。
             */
            get: function () {
                return this.force.xCurve;
            },
            set: function (v) {
                this.force.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleForceOverLifetimeModule.prototype, "xMultiplier", {
            /**
             * Change the X axis mulutiplier.
             *
             * 改变X轴的乘数。
             */
            get: function () {
                return this.x.curveMultiplier;
            },
            set: function (v) {
                this.x.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleForceOverLifetimeModule.prototype, "y", {
            /**
             * The curve defining particle forces in the Y axis.
             *
             * 在Y轴上定义粒子力的曲线。
             */
            get: function () {
                return this.force.yCurve;
            },
            set: function (v) {
                this.force.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleForceOverLifetimeModule.prototype, "yMultiplier", {
            /**
             * Change the Y axis mulutiplier.
             *
             * 改变Y轴的乘数。
             */
            get: function () {
                return this.y.curveMultiplier;
            },
            set: function (v) {
                this.y.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleForceOverLifetimeModule.prototype, "z", {
            /**
             * The curve defining particle forces in the Z axis.
             *
             * 在Z轴上定义粒子力的曲线。
             */
            get: function () {
                return this.force.zCurve;
            },
            set: function (v) {
                this.force.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleForceOverLifetimeModule.prototype, "zMultiplier", {
            /**
             * Change the Z axis mulutiplier.
             *
             * 改变Z轴的乘数。
             */
            get: function () {
                return this.z.curveMultiplier;
            },
            set: function (v) {
                this.z.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleForceOverLifetimeModule.prototype.initParticleState = function (particle) {
            particle[_ForceOverLifetime_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleForceOverLifetimeModule.prototype.updateParticleState = function (particle) {
            this.particleSystem.removeParticleAcceleration(particle, _ForceOverLifetime_preForce);
            if (!this.enabled)
                return;
            var force = this.force.getValue(particle.rateAtLifeTime, particle[_ForceOverLifetime_rate]);
            this.particleSystem.addParticleAcceleration(particle, force, this.space, _ForceOverLifetime_preForce);
        };
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "作用在粒子上的力" })
        ], ParticleForceOverLifetimeModule.prototype, "force", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Are the forces being applied in local or world space?", component: "OAVEnum", componentParam: { enumClass: ParticleSystemSimulationSpace } })
            ,
            feng3d.oav({ tooltip: "这些力是作用于局部空间还是世界空间?", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemSimulationSpace } })
        ], ParticleForceOverLifetimeModule.prototype, "space", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "When randomly selecting values between two curves or constants, this flag will cause a new random force to be chosen on each frame." })
            ,
            feng3d.oav({ tooltip: "当在两条曲线或常数之间随机选择值时，此标志将导致在每一帧上选择一个新的随机力。" })
        ], ParticleForceOverLifetimeModule.prototype, "randomized", void 0);
        return ParticleForceOverLifetimeModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleForceOverLifetimeModule = ParticleForceOverLifetimeModule;
    var _ForceOverLifetime_rate = "_ForceOverLifetime_rate";
    var _ForceOverLifetime_preForce = "_ForceOverLifetime_preForce";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * the Color By Speed module.
     *
     * 颜色随速度变化模块。
     */
    var ParticleColorBySpeedModule = /** @class */ (function (_super) {
        __extends(ParticleColorBySpeedModule, _super);
        function ParticleColorBySpeedModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * The gradient controlling the particle colors.
             *
             * 控制粒子颜色的梯度。
             */
            _this.color = new feng3d.MinMaxGradient();
            /**
             * Apply the color gradient between these minimum and maximum speeds.
             *
             * 在这些最小和最大速度之间应用颜色渐变。
             */
            _this.range = new feng3d.Vector2(0, 1);
            return _this;
        }
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleColorBySpeedModule.prototype.initParticleState = function (particle) {
            particle[_ColorBySpeed_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleColorBySpeedModule.prototype.updateParticleState = function (particle) {
            if (!this.enabled)
                return;
            var velocity = particle.velocity.length;
            var rate = Math.clamp((velocity - this.range.x) / (this.range.y - this.range.x), 0, 1);
            var color = this.color.getValue(rate, particle[_ColorBySpeed_rate]);
            particle.color.multiply(color);
        };
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "控制粒子颜色的梯度。" })
        ], ParticleColorBySpeedModule.prototype, "color", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "在这些最小和最大速度之间应用颜色渐变。" })
        ], ParticleColorBySpeedModule.prototype, "range", void 0);
        return ParticleColorBySpeedModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleColorBySpeedModule = ParticleColorBySpeedModule;
    var _ColorBySpeed_rate = "_ColorBySpeed_rate";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 颜色随时间变化模块
     */
    var ParticleColorOverLifetimeModule = /** @class */ (function (_super) {
        __extends(ParticleColorOverLifetimeModule, _super);
        function ParticleColorOverLifetimeModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * The gradient controlling the particle colors.
             * 控制粒子颜色的梯度。
             */
            _this.color = new feng3d.MinMaxGradient();
            return _this;
        }
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleColorOverLifetimeModule.prototype.initParticleState = function (particle) {
            particle[_ColorOverLifetime_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleColorOverLifetimeModule.prototype.updateParticleState = function (particle) {
            if (!this.enabled)
                return;
            particle.color.multiply(this.color.getValue(particle.rateAtLifeTime, particle[_ColorOverLifetime_rate]));
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "The gradient controlling the particle colors." })
            ,
            feng3d.oav({ tooltip: "控制粒子颜色的梯度。" })
        ], ParticleColorOverLifetimeModule.prototype, "color", void 0);
        return ParticleColorOverLifetimeModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleColorOverLifetimeModule = ParticleColorOverLifetimeModule;
    var _ColorOverLifetime_rate = "_ColorOverLifetime_rate";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 缩放随时间变化模块
     */
    var ParticleSizeOverLifetimeModule = /** @class */ (function (_super) {
        __extends(ParticleSizeOverLifetimeModule, _super);
        function ParticleSizeOverLifetimeModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Set the size over lifetime on each axis separately.
             *
             * 在每个轴上分别设置生命周期内的大小。
             */
            _this.separateAxes = false;
            /**
             * Curve to control particle size based on lifetime.
             *
             * 基于寿命的粒度控制曲线。
             */
            _this.size3D = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 }, yCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 }, zCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 } });
            return _this;
        }
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "size", {
            /**
             * Curve to control particle size based on lifetime.
             *
             * 基于寿命的粒度控制曲线。
             */
            // @oav({ tooltip: "Curve to control particle size based on lifetime." })
            get: function () {
                return this.size3D.xCurve;
            },
            set: function (v) {
                this.size3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "sizeMultiplier", {
            /**
             * Size multiplier.
             *
             * 尺寸的乘数。
             */
            get: function () {
                return this.size.curveMultiplier;
            },
            set: function (v) {
                this.size.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "x", {
            /**
             * Size over lifetime curve for the X axis.
             *
             * X轴的尺寸随生命周期变化曲线。
             */
            get: function () {
                return this.size3D.xCurve;
            },
            set: function (v) {
                this.size3D.xCurve;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "xMultiplier", {
            /**
             * X axis size multiplier.
             *
             * X轴尺寸的乘数。
             */
            get: function () {
                return this.x.curveMultiplier;
            },
            set: function (v) {
                this.x.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "y", {
            /**
             * Size over lifetime curve for the Y axis.
             *
             * Y轴的尺寸随生命周期变化曲线。
             */
            get: function () {
                return this.size3D.yCurve;
            },
            set: function (v) {
                this.size3D.yCurve;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "yMultiplier", {
            /**
             * Y axis size multiplier.
             *
             * Y轴尺寸的乘数。
             */
            get: function () {
                return this.y.curveMultiplier;
            },
            set: function (v) {
                this.y.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "z", {
            /**
             * Size over lifetime curve for the Z axis.
             *
             * Z轴的尺寸随生命周期变化曲线。
             */
            get: function () {
                return this.size3D.zCurve;
            },
            set: function (v) {
                this.size3D.zCurve;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeOverLifetimeModule.prototype, "zMultiplier", {
            /**
             * Z axis size multiplier.
             *
             * Z轴尺寸的乘数。
             */
            get: function () {
                return this.z.curveMultiplier;
            },
            set: function (v) {
                this.z.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleSizeOverLifetimeModule.prototype.initParticleState = function (particle) {
            particle[_SizeOverLifetime_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleSizeOverLifetimeModule.prototype.updateParticleState = function (particle) {
            if (!this.enabled)
                return;
            var size = this.size3D.getValue(particle.rateAtLifeTime, particle[_SizeOverLifetime_rate]);
            if (!this.separateAxes) {
                size.y = size.z = size.x;
            }
            particle.size.multiply(size);
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Set the size over lifetime on each axis separately." })
            ,
            feng3d.oav({ tooltip: "在每个轴上分别设置生命周期内的大小。" })
        ], ParticleSizeOverLifetimeModule.prototype, "separateAxes", void 0);
        __decorate([
            feng3d.oav({ tooltip: "基于寿命的粒度控制曲线。" })
        ], ParticleSizeOverLifetimeModule.prototype, "size", null);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Curve to control particle size based on lifetime." })
            ,
            feng3d.oav({ tooltip: "基于寿命的粒度控制曲线。" })
        ], ParticleSizeOverLifetimeModule.prototype, "size3D", void 0);
        return ParticleSizeOverLifetimeModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleSizeOverLifetimeModule = ParticleSizeOverLifetimeModule;
    var _SizeOverLifetime_rate = "_SizeOverLifetime_rate";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Script interface for the Size By Speed module.
     *
     * 粒子系统 缩放随速度变化模块
     */
    var ParticleSizeBySpeedModule = /** @class */ (function (_super) {
        __extends(ParticleSizeBySpeedModule, _super);
        function ParticleSizeBySpeedModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Set the size over speed on each axis separately.
             *
             * 在每个轴上分别设置生命周期内的大小。
             */
            _this.separateAxes = false;
            /**
             * Curve to control particle size based on speed.
             *
             * 基于寿命的粒度控制曲线。
             */
            _this.size3D = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 }, yCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 }, zCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 } });
            /**
             * Apply the size curve between these minimum and maximum speeds.
             *
             * 在这些最小和最大速度之间应用尺寸变化。
             */
            _this.range = new feng3d.Vector2(0, 1);
            return _this;
        }
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "size", {
            /**
             * Curve to control particle size based on speed.
             *
             * 基于速度的粒度控制曲线。
             */
            // @oav({ tooltip: "Curve to control particle size based on speed." })
            get: function () {
                return this.size3D.xCurve;
            },
            set: function (v) {
                this.size3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "sizeMultiplier", {
            /**
             * Size multiplier.
             *
             * 尺寸的乘数。
             */
            get: function () {
                return this.size.curveMultiplier;
            },
            set: function (v) {
                this.size.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "x", {
            /**
             * Size over speed curve for the X axis.
             *
             * X轴的尺寸随生命周期变化曲线。
             */
            get: function () {
                return this.size3D.xCurve;
            },
            set: function (v) {
                this.size3D.xCurve;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "xMultiplier", {
            /**
             * X axis size multiplier.
             *
             * X轴尺寸的乘数。
             */
            get: function () {
                return this.x.curveMultiplier;
            },
            set: function (v) {
                this.x.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "y", {
            /**
             * Size over speed curve for the Y axis.
             *
             * Y轴的尺寸随生命周期变化曲线。
             */
            get: function () {
                return this.size3D.yCurve;
            },
            set: function (v) {
                this.size3D.yCurve;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "yMultiplier", {
            /**
             * Y axis size multiplier.
             *
             * Y轴尺寸的乘数。
             */
            get: function () {
                return this.y.curveMultiplier;
            },
            set: function (v) {
                this.y.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "z", {
            /**
             * Size over speed curve for the Z axis.
             *
             * Z轴的尺寸随生命周期变化曲线。
             */
            get: function () {
                return this.size3D.zCurve;
            },
            set: function (v) {
                this.size3D.zCurve;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleSizeBySpeedModule.prototype, "zMultiplier", {
            /**
             * Z axis size multiplier.
             *
             * Z轴尺寸的乘数。
             */
            get: function () {
                return this.z.curveMultiplier;
            },
            set: function (v) {
                this.z.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleSizeBySpeedModule.prototype.initParticleState = function (particle) {
            particle[_SizeBySpeed_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleSizeBySpeedModule.prototype.updateParticleState = function (particle) {
            if (!this.enabled)
                return;
            var velocity = particle.velocity.length;
            var rate = Math.clamp((velocity - this.range.x) / (this.range.y - this.range.x), 0, 1);
            var size = this.size3D.getValue(rate, particle[_SizeBySpeed_rate]);
            if (!this.separateAxes) {
                size.y = size.z = size.x;
            }
            particle.size.multiply(size);
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Set the size over speed on each axis separately." })
            ,
            feng3d.oav({ tooltip: "在每个轴上分别设置生命周期内的大小。" })
        ], ParticleSizeBySpeedModule.prototype, "separateAxes", void 0);
        __decorate([
            feng3d.oav({ tooltip: "基于速度的粒度控制曲线。" })
        ], ParticleSizeBySpeedModule.prototype, "size", null);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Curve to control particle size based on speed." })
            ,
            feng3d.oav({ tooltip: "基于寿命的粒度控制曲线。" })
        ], ParticleSizeBySpeedModule.prototype, "size3D", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "在这些最小和最大速度之间应用颜色渐变。" })
        ], ParticleSizeBySpeedModule.prototype, "range", void 0);
        return ParticleSizeBySpeedModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleSizeBySpeedModule = ParticleSizeBySpeedModule;
    var _SizeBySpeed_rate = "_SizeBySpeed_rate";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 旋转角度随时间变化模块
     */
    var ParticleRotationOverLifetimeModule = /** @class */ (function (_super) {
        __extends(ParticleRotationOverLifetimeModule, _super);
        function ParticleRotationOverLifetimeModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Set the rotation over lifetime on each axis separately.
             * 在每个轴上分别设置基于生命周期的旋转。
             */
            _this.separateAxes = false;
            /**
             * 角速度，基于生命周期的旋转。
             */
            _this.angularVelocity = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 }, yCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 }, zCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 } });
            return _this;
        }
        Object.defineProperty(ParticleRotationOverLifetimeModule.prototype, "x", {
            /**
             * Rotation over lifetime curve for the X axis.
             *
             * X轴的旋转寿命曲线。
             */
            get: function () {
                return this.angularVelocity.xCurve;
            },
            set: function (v) {
                this.angularVelocity.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationOverLifetimeModule.prototype, "xMultiplier", {
            /**
             * Rotation multiplier around the X axis.
             *
             * 绕X轴旋转乘法器
             */
            get: function () {
                return this.x.curveMultiplier;
            },
            set: function (v) {
                this.x.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationOverLifetimeModule.prototype, "y", {
            /**
             * Rotation over lifetime curve for the Y axis.
             *
             * Y轴的旋转寿命曲线。
             */
            get: function () {
                return this.angularVelocity.yCurve;
            },
            set: function (v) {
                this.angularVelocity.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationOverLifetimeModule.prototype, "yMultiplier", {
            /**
             * Rotation multiplier around the Y axis.
             *
             * 绕Y轴旋转乘法器
             */
            get: function () {
                return this.y.curveMultiplier;
            },
            set: function (v) {
                this.y.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationOverLifetimeModule.prototype, "z", {
            /**
             * Rotation over lifetime curve for the Z axis.
             *
             * Z轴的旋转寿命曲线。
             */
            get: function () {
                return this.angularVelocity.zCurve;
            },
            set: function (v) {
                this.angularVelocity.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationOverLifetimeModule.prototype, "zMultiplier", {
            /**
             * Rotation multiplier around the Z axis.
             *
             * 绕Z轴旋转乘法器
             */
            get: function () {
                return this.z.curveMultiplier;
            },
            set: function (v) {
                this.z.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleRotationOverLifetimeModule.prototype.initParticleState = function (particle) {
            particle[_RotationOverLifetime_rate] = Math.random();
            particle[_RotationOverLifetime_preAngularVelocity] = new feng3d.Vector3();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleRotationOverLifetimeModule.prototype.updateParticleState = function (particle) {
            var preAngularVelocity = particle[_RotationOverLifetime_preAngularVelocity];
            particle.angularVelocity.sub(preAngularVelocity);
            preAngularVelocity.set(0, 0, 0);
            if (!this.enabled)
                return;
            var v = this.angularVelocity.getValue(particle.rateAtLifeTime, particle[_RotationOverLifetime_rate]);
            if (!this.separateAxes) {
                v.x = v.y = 0;
            }
            particle.angularVelocity.add(v);
            preAngularVelocity.copy(v);
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Set the rotation over lifetime on each axis separately." })
            ,
            feng3d.oav({ tooltip: "在每个轴上分别设置基于生命周期的旋转。" })
        ], ParticleRotationOverLifetimeModule.prototype, "separateAxes", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "角速度，基于生命周期的旋转。" })
        ], ParticleRotationOverLifetimeModule.prototype, "angularVelocity", void 0);
        return ParticleRotationOverLifetimeModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleRotationOverLifetimeModule = ParticleRotationOverLifetimeModule;
    var _RotationOverLifetime_rate = "_RotationOverLifetime_rate";
    var _RotationOverLifetime_preAngularVelocity = "_RotationOverLifetime_preAngularVelocity";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统 旋转角度随速度变化模块
     */
    var ParticleRotationBySpeedModule = /** @class */ (function (_super) {
        __extends(ParticleRotationBySpeedModule, _super);
        function ParticleRotationBySpeedModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Set the rotation by speed on each axis separately.
             * 在每个轴上分别设置随速度变化的旋转。
             */
            _this.separateAxes = false;
            /**
             * 角速度，随速度变化的旋转。
             */
            _this.angularVelocity = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 }, yCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 }, zCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 } });
            /**
             * Apply the rotation curve between these minimum and maximum speeds.
             *
             * 在这些最小和最大速度之间应用旋转曲线。
             */
            _this.range = new feng3d.Vector2(0, 1);
            return _this;
        }
        Object.defineProperty(ParticleRotationBySpeedModule.prototype, "x", {
            /**
             * Rotation by speed curve for the X axis.
             *
             * X轴的旋转随速度变化曲线。
             */
            get: function () {
                return this.angularVelocity.xCurve;
            },
            set: function (v) {
                this.angularVelocity.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationBySpeedModule.prototype, "xMultiplier", {
            /**
             * Rotation multiplier around the X axis.
             *
             * 绕X轴旋转乘法器
             */
            get: function () {
                return this.x.curveMultiplier;
            },
            set: function (v) {
                this.x.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationBySpeedModule.prototype, "y", {
            /**
             * Rotation by speed curve for the Y axis.
             *
             * Y轴的旋转随速度变化曲线。
             */
            get: function () {
                return this.angularVelocity.yCurve;
            },
            set: function (v) {
                this.angularVelocity.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationBySpeedModule.prototype, "yMultiplier", {
            /**
             * Rotation multiplier around the Y axis.
             *
             * 绕Y轴旋转乘法器
             */
            get: function () {
                return this.y.curveMultiplier;
            },
            set: function (v) {
                this.y.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationBySpeedModule.prototype, "z", {
            /**
             * Rotation by speed curve for the Z axis.
             *
             * Z轴的旋转随速度变化曲线。
             */
            get: function () {
                return this.angularVelocity.zCurve;
            },
            set: function (v) {
                this.angularVelocity.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleRotationBySpeedModule.prototype, "zMultiplier", {
            /**
             * Rotation multiplier around the Z axis.
             *
             * 绕Z轴旋转乘法器
             */
            get: function () {
                return this.z.curveMultiplier;
            },
            set: function (v) {
                this.z.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleRotationBySpeedModule.prototype.initParticleState = function (particle) {
            particle[_RotationBySpeed_rate] = Math.random();
            particle[_RotationBySpeed_preAngularVelocity] = new feng3d.Vector3();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleRotationBySpeedModule.prototype.updateParticleState = function (particle) {
            var preAngularVelocity = particle[_RotationBySpeed_preAngularVelocity];
            particle.angularVelocity.sub(preAngularVelocity);
            preAngularVelocity.set(0, 0, 0);
            if (!this.enabled)
                return;
            var velocity = particle.velocity.length;
            var rate = Math.clamp((velocity - this.range.x) / (this.range.y - this.range.x), 0, 1);
            var v = this.angularVelocity.getValue(rate, particle[_RotationBySpeed_rate]);
            if (!this.separateAxes) {
                v.x = v.y = 0;
            }
            particle.angularVelocity.add(v);
            preAngularVelocity.copy(v);
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Set the rotation by speed on each axis separately." })
            ,
            feng3d.oav({ tooltip: "在每个轴上分别设置随速度变化的旋转。" })
        ], ParticleRotationBySpeedModule.prototype, "separateAxes", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "角速度，随速度变化的旋转。" })
        ], ParticleRotationBySpeedModule.prototype, "angularVelocity", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "在这些最小和最大速度之间应用旋转曲线。" })
        ], ParticleRotationBySpeedModule.prototype, "range", void 0);
        return ParticleRotationBySpeedModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleRotationBySpeedModule = ParticleRotationBySpeedModule;
    var _RotationBySpeed_rate = "_RotationBySpeed_rate";
    var _RotationBySpeed_preAngularVelocity = "_RotationBySpeed_preAngularVelocity";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Script interface for the Noise Module.
     *
     * The Noise Module allows you to apply turbulence to the movement of your particles. Use the low quality settings to create computationally efficient Noise, or simulate smoother, richer Noise with the higher quality settings. You can also choose to define the behavior of the Noise individually for each axis.
     *
     * 噪声模块
     *
     * 噪声模块允许你将湍流应用到粒子的运动中。使用低质量设置来创建计算效率高的噪声，或者使用高质量设置来模拟更平滑、更丰富的噪声。您还可以选择为每个轴分别定义噪声的行为。
     */
    var ParticleNoiseModule = /** @class */ (function (_super) {
        __extends(ParticleNoiseModule, _super);
        function ParticleNoiseModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Control the noise separately for each axis.
             *
             * 分别控制每个轴的噪声。
             */
            _this.separateAxes = false;
            /**
             * How strong the overall noise effect is.
             *
             * 整体噪音效应有多强。
             */
            _this.strength3D = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), { xCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 }, yCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 }, zCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 } });
            /**
             * Low values create soft, smooth noise, and high values create rapidly changing noise.
             *
             * 低值产生柔和、平滑的噪声，高值产生快速变化的噪声。
             */
            _this.frequency = 0.5;
            /**
             * Scroll the noise map over the particle system.
             *
             * 在粒子系统上滚动噪声图。
             */
            _this.scrollSpeed = new feng3d.MinMaxCurve();
            /**
             * Higher frequency noise will reduce the strength by a proportional amount, if enabled.
             *
             * 如果启用高频率噪音，将按比例减少强度。
             */
            _this.damping = true;
            /**
             * Layers of noise that combine to produce final noise.
             *
             * 一层一层的噪声组合在一起产生最终的噪声。
             */
            _this.octaveCount = 1;
            /**
             * When combining each octave, scale the intensity by this amount.
             *
             * 当组合每个八度时，按这个比例调整强度。
             */
            _this.octaveMultiplier = 0.5;
            /**
             * When combining each octave, zoom in by this amount.
             *
             * 当组合每个八度时，放大这个数字。
             */
            _this.octaveScale = 2;
            /**
             * Generate 1D, 2D or 3D noise.
             *
             * 生成一维、二维或三维噪声。
             */
            _this.quality = feng3d.ParticleSystemNoiseQuality.High;
            /**
             * Enable remapping of the final noise values, allowing for noise values to be translated into different values.
             *
             * 允许重新映射最终的噪声值，允许将噪声值转换为不同的值。
             */
            _this.remapEnabled = false;
            /**
             * Define how the noise values are remapped.
             *
             * 定义如何重新映射噪声值。
             */
            _this.remap3D = feng3d.serialization.setValue(new feng3d.MinMaxCurveVector3(), {
                xCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 },
                yCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 },
                zCurve: { between0And1: true, constant: 1, constantMin: 1, constantMax: 1, curveMultiplier: 1 }
            });
            _this._scrollValue = 0;
            return _this;
        }
        Object.defineProperty(ParticleNoiseModule.prototype, "strength", {
            /**
             * How strong the overall noise effect is.
             *
             * 整体噪音效应有多强。
             */
            get: function () {
                return this.strength3D.xCurve;
            },
            set: function (v) {
                this.strength3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleNoiseModule.prototype, "strengthX", {
            /**
             * Define the strength of the effect on the X axis, when using separateAxes option.
             *
             * 在使用分别控制每个轴时，在X轴上定义效果的强度。
             */
            get: function () {
                return this.strength3D.xCurve;
            },
            set: function (v) {
                this.strength3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleNoiseModule.prototype, "strengthY", {
            /**
             * Define the strength of the effect on the Y axis, when using separateAxes option.
             *
             * 在使用分别控制每个轴时，在Y轴上定义效果的强度。
             */
            get: function () {
                return this.strength3D.yCurve;
            },
            set: function (v) {
                this.strength3D.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleNoiseModule.prototype, "strengthZ", {
            /**
             * Define the strength of the effect on the Z axis, when using separateAxes option.
             *
             * 在使用分别控制每个轴时，在Z轴上定义效果的强度。
             */
            get: function () {
                return this.strength3D.zCurve;
            },
            set: function (v) {
                this.strength3D.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleNoiseModule.prototype, "remap", {
            /**
             * Define how the noise values are remapped.
             *
             * 定义如何重新映射噪声值。
             */
            get: function () {
                return this.remap3D.xCurve;
            },
            set: function (v) {
                this.remap3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleNoiseModule.prototype, "remapX", {
            /**
             * Define how the noise values are remapped on the X axis, when using the ParticleSystem.NoiseModule.separateAxes option.
             *
             * 在使用分别控制每个轴时，如何在X轴上重新映射噪声值。
             */
            get: function () {
                return this.remap3D.xCurve;
            },
            set: function (v) {
                this.remap3D.xCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleNoiseModule.prototype, "remapY", {
            /**
             * Define how the noise values are remapped on the Y axis, when using the ParticleSystem.NoiseModule.separateAxes option.
             *
             * 在使用分别控制每个轴时，如何在Y轴上重新映射噪声值。
             */
            get: function () {
                return this.remap3D.yCurve;
            },
            set: function (v) {
                this.remap3D.yCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleNoiseModule.prototype, "remapZ", {
            /**
             * Define how the noise values are remapped on the Z axis, when using the ParticleSystem.NoiseModule.separateAxes option.
             *
             * 在使用分别控制每个轴时，如何在Z轴上重新映射噪声值。
             */
            get: function () {
                return this.remap3D.zCurve;
            },
            set: function (v) {
                this.remap3D.zCurve = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleNoiseModule.prototype.initParticleState = function (particle) {
            particle[_Noise_strength_rate] = Math.random();
            particle[_Noise_particle_rate] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleNoiseModule.prototype.updateParticleState = function (particle) {
            this.particleSystem.removeParticlePosition(particle, _Noise_preOffset);
            if (!this.enabled)
                return;
            var strengthX = 1;
            var strengthY = 1;
            var strengthZ = 1;
            if (this.separateAxes) {
                var strength3D = this.strength3D.getValue(particle.rateAtLifeTime, particle[_Noise_strength_rate]);
                strengthX = strength3D.x;
                strengthY = strength3D.y;
                strengthZ = strength3D.z;
            }
            else {
                strengthX = strengthY = strengthZ = this.strength.getValue(particle.rateAtLifeTime, particle[_Noise_strength_rate]);
            }
            //
            var frequency = ParticleNoiseModule._frequencyScale * this.frequency;
            //
            var offsetPos = new feng3d.Vector3(strengthX, strengthY, strengthZ);
            //
            offsetPos.scaleNumber(ParticleNoiseModule._strengthScale);
            if (this.damping) {
                offsetPos.scaleNumber(1 / this.frequency);
            }
            var time = particle.rateAtLifeTime * ParticleNoiseModule._timeScale % 1;
            //
            offsetPos.x *= this._getNoiseValue((1 / 3 * 0 + time) * frequency, particle[_Noise_particle_rate] * frequency);
            offsetPos.y *= this._getNoiseValue((1 / 3 * 1 + time) * frequency, particle[_Noise_particle_rate] * frequency);
            offsetPos.z *= this._getNoiseValue((1 / 3 * 2 + time) * frequency, particle[_Noise_particle_rate] * frequency);
            //
            this.particleSystem.addParticlePosition(particle, offsetPos, this.particleSystem.main.simulationSpace, _Noise_preOffset);
        };
        /**
         * 绘制噪音到图片
         *
         * @param image 图片数据
         */
        ParticleNoiseModule.prototype.drawImage = function (image) {
            var strength = this._getDrawImageStrength();
            var strengthX = strength.x;
            var strengthY = strength.y;
            var strengthZ = strength.z;
            //
            strengthX *= ParticleNoiseModule._strengthScale;
            strengthY *= ParticleNoiseModule._strengthScale;
            strengthZ *= ParticleNoiseModule._strengthScale;
            if (this.damping) {
                strengthX /= this.frequency;
                strengthY /= this.frequency;
                strengthZ /= this.frequency;
            }
            //
            var frequency = ParticleNoiseModule._frequencyScale * this.frequency;
            //
            var data = image.data;
            var imageWidth = image.width;
            var imageHeight = image.height;
            // var datas: number[] = [];
            // var min = Number.MAX_VALUE;
            // var max = Number.MIN_VALUE;
            for (var x = 0; x < imageWidth; x++) {
                for (var y = 0; y < imageHeight; y++) {
                    var xv = x / imageWidth * frequency;
                    var yv = 1 - y / imageHeight * frequency;
                    var value = this._getNoiseValue(xv, yv);
                    // datas.push(value);
                    // if (min > value) min = value;
                    // if (max < value) max = value;
                    if (xv < 1 / 3)
                        value = (value * strengthX + 1) / 2 * 256;
                    else if (xv < 2 / 3)
                        value = (value * strengthY + 1) / 2 * 256;
                    else
                        value = (value * strengthZ + 1) / 2 * 256;
                    var cell = (x + y * imageWidth) * 4;
                    data[cell] = data[cell + 1] = data[cell + 2] = Math.floor(value);
                    data[cell + 3] = 255; // alpha
                }
            }
            // console.log(datas, min, max);
        };
        ParticleNoiseModule.prototype._getDrawImageStrength = function () {
            var strengthX = 1;
            var strengthY = 1;
            var strengthZ = 1;
            if (this.separateAxes) {
                if (this.strengthX.mode == feng3d.MinMaxCurveMode.Curve || this.strengthX.mode == feng3d.MinMaxCurveMode.TwoCurves)
                    strengthX = this.strengthX.curveMultiplier;
                else if (this.strengthX.mode == feng3d.MinMaxCurveMode.Constant)
                    strengthX = this.strengthX.constant;
                else if (this.strengthX.mode == feng3d.MinMaxCurveMode.TwoConstants)
                    strengthX = this.strengthX.constantMax;
                if (this.strengthY.mode == feng3d.MinMaxCurveMode.Curve || this.strengthY.mode == feng3d.MinMaxCurveMode.TwoCurves)
                    strengthY = this.strengthY.curveMultiplier;
                else if (this.strengthY.mode == feng3d.MinMaxCurveMode.Constant)
                    strengthY = this.strengthY.constant;
                else if (this.strengthY.mode == feng3d.MinMaxCurveMode.TwoConstants)
                    strengthY = this.strengthY.constantMax;
                if (this.strengthZ.mode == feng3d.MinMaxCurveMode.Curve || this.strengthZ.mode == feng3d.MinMaxCurveMode.TwoCurves)
                    strengthZ = this.strengthZ.curveMultiplier;
                else if (this.strengthZ.mode == feng3d.MinMaxCurveMode.Constant)
                    strengthZ = this.strengthZ.constant;
                else if (this.strengthZ.mode == feng3d.MinMaxCurveMode.TwoConstants)
                    strengthZ = this.strengthZ.constantMax;
            }
            else {
                if (this.strength.mode == feng3d.MinMaxCurveMode.Curve || this.strength.mode == feng3d.MinMaxCurveMode.TwoCurves)
                    strengthX = strengthY = strengthZ = this.strength.curveMultiplier;
                else if (this.strength.mode == feng3d.MinMaxCurveMode.Constant)
                    strengthX = strengthY = strengthZ = this.strength.constant;
                else if (this.strength.mode == feng3d.MinMaxCurveMode.TwoConstants)
                    strengthX = strengthY = strengthZ = this.strength.constantMax;
            }
            return { x: strengthX, y: strengthY, z: strengthZ };
        };
        /**
         * 获取噪音值
         *
         * @param x
         * @param y
         */
        ParticleNoiseModule.prototype._getNoiseValue = function (x, y) {
            var value = this._getNoiseValueBase(x, y);
            for (var l = 1, ln = this.octaveCount; l < ln; l++) {
                var value0 = this._getNoiseValueBase(x * this.octaveScale, y * this.octaveScale);
                value += (value0 - value) * this.octaveMultiplier;
            }
            return value;
        };
        /**
         * 获取单层噪音值
         *
         * @param x
         * @param y
         */
        ParticleNoiseModule.prototype._getNoiseValueBase = function (x, y) {
            var scrollValue = this._scrollValue;
            if (this.quality == feng3d.ParticleSystemNoiseQuality.Low) {
                return feng3d.noise.perlin1(x + scrollValue);
            }
            if (this.quality == feng3d.ParticleSystemNoiseQuality.Medium) {
                return feng3d.noise.perlin2(x, y + scrollValue);
            }
            // if (this.quality == ParticleSystemNoiseQuality.High)
            return feng3d.noise.perlin3(x, y, scrollValue);
        };
        /**
         * 更新
         *
         * @param interval
         */
        ParticleNoiseModule.prototype.update = function (interval) {
            this._scrollValue += this.scrollSpeed.getValue(this.particleSystem._emitInfo.rateAtDuration) * interval / 1000;
        };
        // 以下两个值用于与Unity中数据接近
        ParticleNoiseModule._frequencyScale = 5;
        ParticleNoiseModule._strengthScale = 0.3;
        ParticleNoiseModule._timeScale = 5;
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "分别控制每个轴的噪声。" })
        ], ParticleNoiseModule.prototype, "separateAxes", void 0);
        __decorate([
            feng3d.oav({ tooltip: "整体噪音效应有多强。" })
        ], ParticleNoiseModule.prototype, "strength", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "整体噪音效应有多强。" })
        ], ParticleNoiseModule.prototype, "strength3D", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "低值产生柔和、平滑的噪声，高值产生快速变化的噪声。" })
        ], ParticleNoiseModule.prototype, "frequency", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "在粒子系统上滚动噪声图。" })
        ], ParticleNoiseModule.prototype, "scrollSpeed", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "如果启用高频率噪音，将按比例减少强度。" })
        ], ParticleNoiseModule.prototype, "damping", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "一层一层的噪声组合在一起产生最终的噪声。" })
        ], ParticleNoiseModule.prototype, "octaveCount", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "当组合每个八度时，按这个比例调整强度。" })
        ], ParticleNoiseModule.prototype, "octaveMultiplier", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "当组合每个八度时，放大这个数字。" })
        ], ParticleNoiseModule.prototype, "octaveScale", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "生成一维、二维或三维噪声。", componentParam: { enumClass: feng3d.ParticleSystemNoiseQuality } })
        ], ParticleNoiseModule.prototype, "quality", void 0);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "允许重新映射最终的噪声值，允许将噪声值转换为不同的值。" })
        ], ParticleNoiseModule.prototype, "remapEnabled", void 0);
        __decorate([
            feng3d.oav({ tooltip: "生成一维、二维或三维噪声。" })
        ], ParticleNoiseModule.prototype, "remap", null);
        __decorate([
            feng3d.serialize,
            feng3d.oav({ tooltip: "生成一维、二维或三维噪声。" })
        ], ParticleNoiseModule.prototype, "remap3D", void 0);
        return ParticleNoiseModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleNoiseModule = ParticleNoiseModule;
    var _Noise_strength_rate = "_Noise_strength_rate";
    var _Noise_particle_rate = "_Noise_particle_rate";
    var _Noise_preOffset = "_Noise_preOffset";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Script interface for the SubEmittersModule.
     *
     * The sub-emitters module allows you to spawn particles in child emitters from the positions of particles in the parent system.
     *
     * This module triggers child particle emission on events such as the birth, death, and collision of particles in the parent system.
     */
    var ParticleSubEmittersModule = /** @class */ (function (_super) {
        __extends(ParticleSubEmittersModule, _super);
        function ParticleSubEmittersModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.subEmitters = [];
            return _this;
        }
        Object.defineProperty(ParticleSubEmittersModule.prototype, "subEmittersCount", {
            /**
             * The total number of sub-emitters.
             */
            get: function () {
                return this.subEmitters.length;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Add a new sub-emitter.
         */
        ParticleSubEmittersModule.prototype.AddSubEmitter = function (subEmitter, type, properties, emitProbability) {
            subEmitter._isSubParticleSystem = true;
            this.subEmitters.push({ subEmitter: subEmitter, type: type, properties: properties, emitProbability: emitProbability });
        };
        /**
         * Gets the probability that the sub-emitter emits particles.
         *
         * @param index The index of the sub-emitter.
         */
        ParticleSubEmittersModule.prototype.GetSubEmitterEmitProbability = function (index) {
            if (!this.subEmitters[index])
                return 0;
            return this.subEmitters[index].emitProbability;
        };
        /**
         * Gets the properties of the sub - emitter at the given index.
         *
         * @param index The index of the sub-emitter.
         */
        ParticleSubEmittersModule.prototype.GetSubEmitterProperties = function (index) {
            if (!this.subEmitters[index])
                return null;
            return this.subEmitters[index].properties;
        };
        /**
         * Gets the sub - emitter Particle System at the given index.
         *
         * @param index The index of the desired sub-emitter.
         */
        ParticleSubEmittersModule.prototype.GetSubEmitterSystem = function (index) {
            if (!this.subEmitters[index])
                return null;
            return this.subEmitters[index].subEmitter;
        };
        /**
         * Gets the type of the sub - emitter at the given index.
         *
         * @param index The index of the desired sub-emitter.
         */
        ParticleSubEmittersModule.prototype.GetSubEmitterType = function (index) {
            if (!this.subEmitters[index])
                return null;
            return this.subEmitters[index].type;
        };
        /**
         * Removes a sub - emitter from the given index in the array.
         *
         * @param index The index of the desired sub-emitter.
         */
        ParticleSubEmittersModule.prototype.RemoveSubEmitter = function (index) {
            if (!this.subEmitters[index])
                return;
            this.subEmitters.splice(index, 1);
        };
        /**
         * Sets the probability that the sub - emitter emits particles.
         *
         * @param index The index of the sub-emitter you want to modify.
         * @param emitProbability The probability value.
         */
        ParticleSubEmittersModule.prototype.SetSubEmitterEmitProbability = function (index, emitProbability) {
            if (!this.subEmitters[index])
                return;
            this.subEmitters[index].emitProbability = emitProbability;
        };
        /**
         * Sets the properties of the sub - emitter at the given index.
         *
         * @param index The index of the sub-emitter you want to modify.
         * @param properties The new properties to assign to this sub-emitter.
         */
        ParticleSubEmittersModule.prototype.SetSubEmitterProperties = function (index, properties) {
            if (!this.subEmitters[index])
                return;
            this.subEmitters[index].properties = properties;
        };
        /**
         * Sets the Particle System to use as the sub - emitter at the given index.
         */
        ParticleSubEmittersModule.prototype.SetSubEmitterSystem = function (index, subEmitter) {
            if (!this.subEmitters[index])
                return;
            this.subEmitters[index].subEmitter = subEmitter;
        };
        /**
         * Sets the type of the sub - emitter at the given index.
         *
         * @param index The index of the sub-emitter you want to modify.
         * @param type The new spawning type to assign to this sub-emitter.
         */
        ParticleSubEmittersModule.prototype.SetSubEmitterType = function (index, type) {
            if (!this.subEmitters[index])
                return;
            this.subEmitters[index].type = type;
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleSubEmittersModule.prototype.updateParticleState = function (particle) {
            for (var i = 0, n = this.subEmittersCount; i < n; i++) {
                var emitterType = this.GetSubEmitterType(i);
                if (emitterType == feng3d.ParticleSystemSubEmitterType.Birth) {
                    this.particleSystem.TriggerSubEmitter(i, [particle]);
                }
            }
        };
        return ParticleSubEmittersModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleSubEmittersModule = ParticleSubEmittersModule;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 粒子系统纹理表动画模块。
     */
    var ParticleTextureSheetAnimationModule = /** @class */ (function (_super) {
        __extends(ParticleTextureSheetAnimationModule, _super);
        function ParticleTextureSheetAnimationModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Defines the tiling of the texture.
             *
             * 定义纹理的平铺。
             */
            _this.tiles = new feng3d.Vector2(1, 1);
            /**
             * Specifies the animation type.
             *
             * 指定动画类型。
             */
            _this.animation = feng3d.ParticleSystemAnimationType.WholeSheet;
            /**
             * Curve to control which frame of the texture sheet animation to play.
             *
             * 曲线控制哪个帧的纹理表动画播放。
             */
            _this.frameOverTime = feng3d.serialization.setValue(new feng3d.MinMaxCurve(), { mode: feng3d.MinMaxCurveMode.Curve, curveMin: { keys: [{ time: 0, value: 0, inTangent: 1, outTangent: 1 }, { time: 1, value: 1, inTangent: 1, outTangent: 1 }] } });
            /**
             * Use a random row of the texture sheet for each particle emitted.
             *
             * 对每个发射的粒子使用纹理表的随机行。
             */
            _this.useRandomRow = true;
            _this._rowIndex = 0;
            /**
             * Define a random starting frame for the texture sheet animation.
             *
             * 为纹理表动画定义一个随机的起始帧。
             */
            _this.startFrame = new feng3d.MinMaxCurve();
            /**
             * Specifies how many times the animation will loop during the lifetime of the particle.
             *
             * 指定在粒子的生命周期内动画将循环多少次。
             */
            _this.cycleCount = 1;
            /**
             * Flip the UV coordinate on particles, causing them to appear mirrored.
             *
             * 在粒子上翻转UV坐标，使它们呈现镜像翻转。
             */
            _this.flipUV = new feng3d.Vector2();
            /**
             * Choose which UV channels will receive texture animation.
             *
             * 选择哪个UV通道将接收纹理动画。
             *
             * todo 目前引擎中只有一套UV
             */
            _this.uvChannelMask = feng3d.UVChannelFlags.Everything;
            return _this;
        }
        Object.defineProperty(ParticleTextureSheetAnimationModule.prototype, "rowIndex", {
            /**
             * Explicitly select which row of the texture sheet is used, when useRandomRow is set to false.
             *
             * 当useRandomRow设置为false时，显式选择使用纹理表的哪一行。
             */
            get: function () { return this._rowIndex; },
            set: function (v) {
                this._rowIndex = Math.clamp(v, 0, this.tiles.y - 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleTextureSheetAnimationModule.prototype, "flipU", {
            /**
             * Flip the U coordinate on particles, causing them to appear mirrored horizontally.
             *
             * 在粒子上翻转U坐标，使它们呈现水平镜像。
             */
            get: function () {
                return this.flipUV.x;
            },
            set: function (v) {
                this.flipUV.x = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleTextureSheetAnimationModule.prototype, "flipV", {
            /**
             * Flip the V coordinate on particles, causing them to appear mirrored vertically.
             *
             * 在粒子上翻转V坐标，使它们垂直镜像。
             */
            get: function () {
                return this.flipUV.y;
            },
            set: function (v) {
                this.flipUV.y = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleTextureSheetAnimationModule.prototype, "frameOverTimeMultiplier", {
            /**
             * Frame over time mutiplier.
             *
             * 帧随时间变化的乘数。
             */
            get: function () {
                return this.frameOverTime.curveMultiplier;
            },
            set: function (v) {
                this.frameOverTime.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleTextureSheetAnimationModule.prototype, "numTilesX", {
            /**
             * Defines the tiling of the texture in the X axis.
             *
             * 定义纹理在X轴上的平铺。
             */
            get: function () {
                return this.tiles.x;
            },
            set: function (v) {
                this.tiles.x = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleTextureSheetAnimationModule.prototype, "numTilesY", {
            /**
             * Defines the tiling of the texture in the Y axis.
             *
             * 定义纹理在Y轴上的平铺。
             */
            get: function () {
                return this.tiles.y;
            },
            set: function (v) {
                this.tiles.y = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ParticleTextureSheetAnimationModule.prototype, "startFrameMultiplier", {
            /**
             * Starting frame multiplier.
             *
             * 起始帧乘数。
             */
            get: function () {
                return this.startFrame.curveMultiplier;
            },
            set: function (v) {
                this.startFrame.curveMultiplier = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        ParticleTextureSheetAnimationModule.prototype.initParticleState = function (particle) {
            particle[_TextureSheetAnimation_frameOverTime] = Math.random();
            particle[_TextureSheetAnimation_startFrame] = Math.random();
            particle[_TextureSheetAnimation_randomRow] = Math.random();
        };
        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        ParticleTextureSheetAnimationModule.prototype.updateParticleState = function (particle) {
            particle.tilingOffset.init(1, 1, 0, 0);
            particle.flipUV.set(0, 0);
            if (!this.enabled)
                return;
            var segmentsX = this.tiles.x;
            var segmentsY = this.tiles.y;
            var step = this.tiles.clone().reciprocal();
            var uvPos = new feng3d.Vector2();
            var frameOverTime = this.frameOverTime.getValue(particle.rateAtLifeTime, particle[_TextureSheetAnimation_frameOverTime]);
            var frameIndex = this.startFrame.getValue(particle.rateAtLifeTime, particle[_TextureSheetAnimation_startFrame]);
            var rowIndex = this.rowIndex;
            var cycleCount = this.cycleCount;
            if (this.animation == feng3d.ParticleSystemAnimationType.WholeSheet) {
                frameIndex = Math.round(frameIndex + frameOverTime * segmentsX * segmentsY * cycleCount);
                uvPos.set(frameIndex % segmentsX, Math.floor(frameIndex / segmentsX) % segmentsY).scale(step);
            }
            else if (this.animation == feng3d.ParticleSystemAnimationType.SingleRow) {
                frameIndex = Math.round(frameIndex + frameOverTime * segmentsX * cycleCount);
                if (this.useRandomRow) {
                    rowIndex = Math.round(segmentsY * particle[_TextureSheetAnimation_randomRow]);
                }
                uvPos.set(frameIndex % segmentsX, rowIndex).scale(step);
            }
            particle.tilingOffset.init(step.x, step.y, uvPos.x, uvPos.y);
            particle.flipUV = this.flipUV;
        };
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Defines the tiling of the texture." })
            ,
            feng3d.oav({ tooltip: "定义纹理的平铺。" })
        ], ParticleTextureSheetAnimationModule.prototype, "tiles", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Specifies the animation type." })
            ,
            feng3d.oav({ tooltip: "指定动画类型。", component: "OAVEnum", componentParam: { enumClass: feng3d.ParticleSystemAnimationType } })
        ], ParticleTextureSheetAnimationModule.prototype, "animation", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Curve to control which frame of the texture sheet animation to play." })
            ,
            feng3d.oav({ tooltip: "曲线控制哪个帧的纹理表动画播放。" })
        ], ParticleTextureSheetAnimationModule.prototype, "frameOverTime", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Use a random row of the texture sheet for each particle emitted." })
            ,
            feng3d.oav({ tooltip: "对每个发射的粒子使用纹理表的随机行。" })
        ], ParticleTextureSheetAnimationModule.prototype, "useRandomRow", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Explicitly select which row of the texture sheet is used, when useRandomRow is set to false." })
            ,
            feng3d.oav({ tooltip: "当useRandomRow设置为false时，显式选择使用纹理表的哪一行。" })
        ], ParticleTextureSheetAnimationModule.prototype, "rowIndex", null);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Define a random starting frame for the texture sheet animation." })
            ,
            feng3d.oav({ tooltip: "为纹理表动画定义一个随机的起始帧。" })
        ], ParticleTextureSheetAnimationModule.prototype, "startFrame", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Specifies how many times the animation will loop during the lifetime of the particle." })
            ,
            feng3d.oav({ tooltip: "指定在粒子的生命周期内动画将循环多少次。" })
        ], ParticleTextureSheetAnimationModule.prototype, "cycleCount", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Flip the UV coordinate on particles, causing them to appear mirrored." })
            ,
            feng3d.oav({ tooltip: "在粒子上翻转UV坐标，使它们呈现镜像翻转。" })
        ], ParticleTextureSheetAnimationModule.prototype, "flipUV", void 0);
        __decorate([
            feng3d.serialize
            // @oav({ tooltip: "Choose which UV channels will receive texture animation.", component: "OAVEnum", componentParam: { enumClass: UVChannelFlags } })
            ,
            feng3d.oav({ tooltip: "选择哪个UV通道将接收纹理动画。", component: "OAVEnum", componentParam: { enumClass: feng3d.UVChannelFlags } })
        ], ParticleTextureSheetAnimationModule.prototype, "uvChannelMask", void 0);
        return ParticleTextureSheetAnimationModule;
    }(feng3d.ParticleModule));
    feng3d.ParticleTextureSheetAnimationModule = ParticleTextureSheetAnimationModule;
    var _TextureSheetAnimation_frameOverTime = "_TextureSheetAnimation_rateAtLifeTime";
    var _TextureSheetAnimation_startFrame = "_TextureSheetAnimation_startFrame";
    var _TextureSheetAnimation_randomRow = "_TextureSheetAnimation_randomRow";
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Use this class to render particles on to the screen.
     */
    var ParticleSystemRenderer = /** @class */ (function (_super) {
        __extends(ParticleSystemRenderer, _super);
        function ParticleSystemRenderer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ParticleSystemRenderer;
    }(feng3d.ParticleModule));
    feng3d.ParticleSystemRenderer = ParticleSystemRenderer;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=particlesystem.js.map
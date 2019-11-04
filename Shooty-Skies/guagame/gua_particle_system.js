class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {
        this.duration = 50
        // this.x = 150
        // this.y = 200
        this.numberOfParticles = 100
        this.particles = []
    }
    update() {
        this.duration--

        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)

            // 火花速度
            var s = 2

            // 设置初始化坐标
            var vx = 0.1 * randomBetween(-s, s)
            var vy = 0.1 * randomBetween(-s, s)

            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        // if (this.duration < 0) {
        //     // TODO, 这是一个临时的方案
        //     // 应该从 scene 中删除自己才对
        //     return
        // }        
        for (var p of this.particles) {
            p.draw()
        }
    }
}
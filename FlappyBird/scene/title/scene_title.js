class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    setup() {
        var game = this.game
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // title
        var title = GuaImage.new(game, 'title')
        title.x = 50
        title.y = 30
        this.addElement(title)
        // ready
        var ready = GuaImage.new(game, 'ready')
        ready.x = 40
        ready.y = 100
        this.addElement(ready)
        // 不加入水管
        // this.pipe = Pipes.new(game)
        // this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 18
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        this.birdSpeed = 2
        var b = GuaAnimation.new(game)
        b.x = 120
        b.y = 200
        this.bird = b
        this.addElement(b)
        // 开始标题, 鸟在画面中间不要动
        b.isTitle = true
    }
    update() {
        super.update()
        // 地面移动
        var offset = -5
        this.skipCount--
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    startGame(game) {
        var s = Scene.new(game)
        game.replaceScene(s)
    }
    setupInputs() {
        var self = this
        var b = this.bird
        var game = this.game
        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
            var s = Scene.new(game)
            game.replaceScene(s)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
            var s = Scene.new(game)
            game.replaceScene(s)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }
}

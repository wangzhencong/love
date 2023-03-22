;
(function (window) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

    const FRAME_RATE = 60
    const PARTICLE_NUM = 2000
    const RADIUS = Math.PI * 2
    const CANVASWIDTH = 500
    const CANVASHEIGHT = 150
    const CANVASID = 'canvas'

    let texts = ['蔚蓝星空下', '男孩独自坐望', '星海闪烁', '仿佛在问', '个巴掌过来，不要委屈，不要等枣，十分钟之内再把脸凑过来打一下就好啦
不许给婆讲道理，尤其是生气的时候
即使生气，也不要长时间生气，不要一直咄咄逼人，要在十分钟之内不生气
即使被婆拉黑，也要发暖心的信息，并且不许发试探性的信息，例如“。”，“，”，“？”等
不许大声说话，要温柔体贴，讲道理也要适可而止
不许不接电话，生气的时候也要接电话
主动打电话过去哄婆宝的时候要知道道歉，不要持续顶嘴
要疼爱小婆宝，懂得准备惊喜，礼物，要多花点时间陪伴，不要只忙于工作
对小乖宝要耐心，不要不耐烦，她说话要认真听，不要因为她说太多就嫌耳朵疼
不要责怪小乖宝说话音量太大，音量大了听得清楚，这是优点
和小婆宝要文化统一，不要一直存在分歧，要学习小婆宝的文化和思想
和小婆宝有矛盾时，要懂得主动妥协，不要想着双方互相妥协
打电话给婆宝道歉的时候要懂得克制情绪，不能乐开花，要严肃，不要把情绪过多表现出来，更不要情绪激动，反过来顶撞
平时周末不加班的时候要早点去看小乖宝，小乖宝一个人孤单呢，希望早点见到大公宝
逢年过节要懂得给小婆宝准备礼物，不能只是单纯花时间陪婆吃大餐
尽管和小婆宝很亲近，但也不要优先处理外面的人情世故，要把小婆宝放在首位
即使小婆宝啰嗦，也不要表现的不耐烦
和小婆宝打电话的时候，即使旁边有人，也要对小婆宝温柔的说话，不要因为有人就改变说

', '我在等一个人', '一个女孩', '这个女孩', '真没什么好的', '性格很倔强', '脾气又不好',
        '还很强势', '但男孩觉得', '这都是表面', '在他的眼中', '女孩任性起来', '耍起混来的时候', '真的很可爱', '可是', '就是这样的她', '也非常的脆弱', '也有',
        '伤心难过的时候', '而男孩', '看着她', '想要做一千件事', '让她开心起来', '却总是放下', '已经攥紧的拳头', '空荡荡', '因为男孩知道', '女孩心中有个人', '那是一座女孩',
        '筑起的城堡', '男孩走不近', '只能呆呆望着', '其实他也知道', '这样很傻', '但是放下', '却做不到', '在城堡外', '继续等待', '男孩再次抬头', '望向星空', '嘿',
        '女孩', '我能成为', '你的星星吗', '小小的星光', '不过分炙热', '不会灼伤你', '让你耍赖', '给你依赖', '给你幸福', '等待着你', 'Always'
    ]

    let canvas,
        ctx,
        particles = [],
        quiver = true,
        text = texts[0],
        textIndex = 0,
        textSize = 70

    function draw() {
        ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.textBaseline = 'middle'
        ctx.fontWeight = 'bold'
        ctx.font = textSize + 'px \'SimHei\', \'Avenir\', \'Helvetica Neue\', \'Arial\', \'sans-serif\''
        ctx.fillText(text, (CANVASWIDTH - ctx.measureText(text).width) * 0.5, CANVASHEIGHT * 0.5)

        let imgData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT)

        ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)

        for (let i = 0, l = particles.length; i < l; i++) {
            let p = particles[i]
            p.inText = false
        }
        particleText(imgData)

        window.requestAnimationFrame(draw)
    }

    function particleText(imgData) {
        // 点坐标获取
        var pxls = []
        for (var w = CANVASWIDTH; w > 0; w -= 3) {
            for (var h = 0; h < CANVASHEIGHT; h += 3) {
                var index = (w + h * (CANVASWIDTH)) * 4
                if (imgData.data[index] > 1) {
                    pxls.push([w, h])
                }
            }
        }

        var count = pxls.length
        var j = parseInt((particles.length - pxls.length) / 2, 10)
        j = j < 0 ? 0 : j

        for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
            try {
                var p = particles[j],
                    X,
                    Y

                if (quiver) {
                    X = (pxls[i - 1][0]) - (p.px + Math.random() * 10)
                    Y = (pxls[i - 1][1]) - (p.py + Math.random() * 10)
                } else {
                    X = (pxls[i - 1][0]) - p.px
                    Y = (pxls[i - 1][1]) - p.py
                }
                var T = Math.sqrt(X * X + Y * Y)
                var A = Math.atan2(Y, X)
                var C = Math.cos(A)
                var S = Math.sin(A)
                p.x = p.px + C * T * p.delta
                p.y = p.py + S * T * p.delta
                p.px = p.x
                p.py = p.y
                p.inText = true
                p.fadeIn()
                p.draw(ctx)
            } catch (e) {}
        }
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i]
            if (!p.inText) {
                p.fadeOut()

                var X = p.mx - p.px
                var Y = p.my - p.py
                var T = Math.sqrt(X * X + Y * Y)
                var A = Math.atan2(Y, X)
                var C = Math.cos(A)
                var S = Math.sin(A)

                p.x = p.px + C * T * p.delta / 2
                p.y = p.py + S * T * p.delta / 2
                p.px = p.x
                p.py = p.y

                p.draw(ctx)
            }
        }
    }

    function setDimensions() {
        canvas.width = CANVASWIDTH
        canvas.height = CANVASHEIGHT
        canvas.style.position = 'absolute'
        canvas.style.left = '0px'
        canvas.style.top = '0px'
        canvas.style.bottom = '0px'
        canvas.style.right = '0px'
        canvas.style.marginTop = window.innerHeight * .15 + 'px'
    }

    function event() {
        document.addEventListener('click', function (e) {
            textIndex++
            if (textIndex >= texts.length) {
                textIndex--
                return
            }
            text = texts[textIndex]
            console.log(textIndex)
        }, false)

        document.addEventListener('touchstart', function (e) {
            textIndex++
            if (textIndex >= texts.length) {
                textIndex--
                return
            }
            text = texts[textIndex]
            console.log(textIndex)
        }, false)
    }

    function init() {
        canvas = document.getElementById(CANVASID)
        if (canvas === null || !canvas.getContext) {
            return
        }
        ctx = canvas.getContext('2d')
        setDimensions()
        event()

        for (var i = 0; i < PARTICLE_NUM; i++) {
            particles[i] = new Particle(canvas)
        }

        draw()
    }

    class Particle {
        constructor(canvas) {
            let spread = canvas.height
            let size = Math.random() * 1.2
            // 速度
            this.delta = 0.06
            // 现在的位置
            this.x = 0
            this.y = 0
            // 上次的位置
            this.px = Math.random() * canvas.width
            this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
            // 记录点最初的位置
            this.mx = this.px
            this.my = this.py
            // 点的大小
            this.size = size
            // this.origSize = size
            // 是否用来显示字
            this.inText = false
            // 透明度相关
            this.opacity = 0
            this.fadeInRate = 0.005
            this.fadeOutRate = 0.03
            this.opacityTresh = 0.98
            this.fadingOut = true
            this.fadingIn = true
        }
        fadeIn() {
            this.fadingIn = this.opacity > this.opacityTresh ? false : true
            if (this.fadingIn) {
                this.opacity += this.fadeInRate
            } else {
                this.opacity = 1
            }
        }
        fadeOut() {
            this.fadingOut = this.opacity < 0 ? false : true
            if (this.fadingOut) {
                this.opacity -= this.fadeOutRate
                if (this.opacity < 0) {
                    this.opacity = 0
                }
            } else {
                this.opacity = 0
            }
        }
        draw(ctx) {
            ctx.fillStyle = 'rgba(226,225,142, ' + this.opacity + ')'
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
            ctx.closePath()
            ctx.fill()
        }
    }

    // setTimeout(() => {
    init()
    // }, 4000);
    // mp3.play()
})(window)

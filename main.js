// Initialize
enchant();

// Environments
var FPS = 15;
var pronamaPic = "./pic/pronama.png"

window.onload = function() {
	var core = new Core(500,500);
	core.preload(pronamaPic);
	core.fps = FPS;

	core.onload = function(){
		// 各フレームのサイズ ==> 32x48
		// 6フレームあります
		var pronama = new Sprite(32,48);
		pronama.image = core.assets[pronamaPic];
		// プロ生ちゃんの初期位置
		pronama.x = 0;
		pronama.y = 0;

		pronama.addEventListener('enterframe', function(){
			// 十字キーで操作
			if (core.input.up) this.y -= 5;
			if (core.input.down) this.y += 5;	
			if (core.input.left) this.x -= 5;
			if (core.input.right) this.x += 5;

			// x方向移動の度にフレームを変える
			this.frame = this.x % 6;
		})

		var scene = core.rootScene;
		scene.addChild(pronama);
	}

	core.start();
}

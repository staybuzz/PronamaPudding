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
		
		// 画像のX方向の反転
		// scaleX = 1 -> 左向き（標準）
		// scaleX = -1 -> 右向き
		pronama.scaleX = -1; // 初期状態は右向き

		pronama.addEventListener('enterframe', function(){
			// 十字キーで操作
			if (core.input.up) this.y -= 5;
			if (core.input.down) this.y += 5;	
			if (core.input.left){
				pronama.scaleX = 1;
				this.x -= 5;	
			}
			if (core.input.right){
				pronama.scaleX = -1;
				this.x += 5;
			}
			//　プロ生ちゃんが逃げて消えないようにする
			if (this.x > 500) this.x = 1;
			if (this.y > 500) this.y = 1;
			if (this.x < 0) this.x = 500;
			if (this.y < 0) this.y = 500;

			// x方向移動の度にフレームを変える
			this.frame = this.x % 6;

			// Label情報
			label.text = this.scaleX;
		})

		// Label
		var label = new Label();
		label.x = 300;
		label.y = 5;
		label.color = 'red';
		label.font = '14px';

		var scene = core.rootScene;
		scene.addChild(pronama);
		scene.addChild(label);
	}

	core.start();
}

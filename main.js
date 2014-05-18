// Initialize
enchant();

// Environments
var FPS = 30;
var pronamaPic = "./pic/pronama.png"
var puddingPic = "./pic/pudding.png"

window.onload = function() {
	var core = new Core(500,500);
	core.preload(pronamaPic);
	core.preload(puddingPic);
	core.fps = FPS;

	core.onload = function(){
		// 各フレームのサイズ ==> 32x48
		// 6フレームあります
		var pronama = new Sprite(32,48);
		pronama.image = core.assets[pronamaPic];

		// 各フレームのサイズ ==> 64x128
		// 3フレーム
		var pudding = new Sprite(128,64);
		pudding.image = core.assets[puddingPic];
		pudding.frame = 1;

		// プロ生ちゃんの初期位置
		pronama.x = 0;
		pronama.y = 0;

		//プリンの位置
		pudding.x = 200;
		pudding.y = 200;
		//プリン拡大
		pudding.scale(1.5, 2);

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
			//　プロ生ちゃんが逃げていなくならないようにする
			if (this.x > 500) this.x = 1;
			if (this.y > 500) this.y = 1;
			if (this.x < 0) this.x = 500;
			if (this.y < 0) this.y = 500;

			// x方向移動の度にフレームを変える
			this.frame = this.x % 6;
		})

		// プロ生ちゃんがプリンに体当たりしたときプリンを揺らす
		// ref: http://blog.livedoor.jp/kamikaze_cyclone/archives/33615748.html
		var num = 1;   // アニメーションの制御用
		var count = 0; // 5フレームごとにプリンのframeを切り替えるための変数
		pudding.addEventListener('enterframe', function(){
			if (this.within(pronama, 100)) {
				if (count == 5) {
	                // カウンターを戻す
	                count = 0;
	                // 符号を反転させることで規則的に処理をするようにする
	                if (this.frame == 2 || this.frame == 0) {
	                    num *= -1;
	                }
	                // フレームの画像の切り替え
	                this.frame += num;
            	}
	            // カウンタを進める
	            count++;
	        }
		})

		var scene = core.rootScene;
		scene.addChild(pronama);
		scene.addChild(pudding);
	}

	core.start();
}

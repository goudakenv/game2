const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

// プレイヤーの設定
const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  speed: 5,
  bullets: [],
  score: 0  // スコアを初期化
};

// スコアを更新する関数
function updateScore(points) {
  player.score += points;
  document.getElementById('scoreDisplay').innerText = `Score: ${player.score}`;
}

// 敵の設定
const enemies = [];
const enemyBulletSpeed = 5;
const enemyBulletSize = 5;

// 弾丸の設定
const bulletSpeed = 10;
const bulletSize = 5;

// 敵を追加する関数
function addEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        speed: 2,
        bullets: []
    };
    enemies.push(enemy);
}

// キー入力の処理
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// プレイヤーの描画
function drawPlayer() {
  // プレイヤーを三角形で描画
  ctx.fillStyle = '#00FF00';
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y); // 三角形の頂点
  ctx.lineTo(player.x, player.y + player.height); // 三角形の底辺左
  ctx.lineTo(player.x + player.width, player.y + player.height); // 三角形の底辺右
  ctx.closePath();
  ctx.fill();
}

// 敵の描画
function drawEnemies() {
    ctx.fillStyle = '#FF0000';
    for (let enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // 敵の弾丸の描画
        ctx.fillStyle = '#FF00FF';
        for (let enemyBullet of enemy.bullets) {
            ctx.fillRect(enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height);
        }
    }
}

// 弾丸の描画
function drawBullets() {
  ctx.fillStyle = '#FFFFFF';
  for (let bullet of player.bullets) {
      // 円形の弾丸を描画
      ctx.beginPath();
      ctx.arc(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2, bulletSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
  }
}

// ゲームの更新
function update() {
    // プレイヤーの移動
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // 弾丸の発射
    if (keys['Space']) {
        const bullet = {
            x: player.x + player.width / 2 - bulletSize / 2,
            y: player.y,
            width: bulletSize,
            height: bulletSize,
            speed: bulletSpeed
        };
        player.bullets.push(bullet);
        keys['Space'] = false;
    }

    // 弾丸の移動
    for (let bullet of player.bullets) {
        bullet.y -= bullet.speed;
    }

    // 敵の移動と弾の発射
    for (let enemy of enemies) {
        enemy.y += enemy.speed;

        // ランダムで敵が弾を発射
        if (Math.random() < 0.01) {
            const enemyBullet = {
                x: enemy.x + enemy.width / 2 - enemyBulletSize / 2,
                y: enemy.y + enemy.height,
                width: enemyBulletSize,
                height: enemyBulletSize,
                speed: enemyBulletSpeed
            };
            enemy.bullets.push(enemyBullet);
        }

      // 弾丸と敵の衝突判定
    for (let i = 0; i < player.bullets.length; i++) {
      const bullet = player.bullets[i];
      if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
      ) {
          player.bullets.splice(i, 1);
          enemies.splice(enemies.indexOf(enemy), 1);

          // スコアを更新（この例では10点）
          updateScore(10);

          break;
      }
  }


        // 敵の弾丸の移動
        for (let enemyBullet of enemy.bullets) {
            enemyBullet.y += enemyBullet.speed;
        }

        // プレイヤーと敵の弾丸の衝突判定
        for (let enemyBullet of enemy.bullets) {
            if (
                player.x < enemyBullet.x + enemyBullet.width &&
                player.x + player.width > enemyBullet.x &&
                player.y < enemyBullet.y + enemyBullet.height &&
                player.y + player.height > enemyBullet.y
            ) {
                alert('ゲームオーバー');
                location.reload();
            }
        }

        // 敵の弾丸が画面外に到達したら削除
        enemy.bullets = enemy.bullets.filter(bullet => bullet.y < canvas.height);
    }

    // 敵の生成
    if (Math.random() < 0.02) {
        addEnemy();
    }

    // 画面のクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // オブジェクトの描画
    drawPlayer();
    drawEnemies();
    drawBullets();

    // ループ
    requestAnimationFrame(update);
}

// ゲームの開始
update();

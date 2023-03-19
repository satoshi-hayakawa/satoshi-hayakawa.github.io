const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let gridSize = 9;
let cellSize = (canvas.width - 2) / gridSize;
let playWithComputer = false;
let currentPlayer = "black";
let gameEnded = false;
let gameEndTime = 1;

// アゲハマ
let blackCaptures = 0;
let whiteCaptures = 0;

// 終了判定
let consecutivePasses = 0;

// 陣地の塗り分け
function createPattern(color) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = 8;
  patternCanvas.height = 8;

  patternCtx.strokeStyle = color;
  patternCtx.lineWidth = 1;
  patternCtx.beginPath();
  patternCtx.moveTo(0, 8);
  patternCtx.lineTo(8, 0);
  patternCtx.stroke();

  return patternCtx.createPattern(patternCanvas, "repeat");
}

const blackPattern = createPattern("#000");
const whitePattern = createPattern("#fff");


// 星の位置
const starPointsNine = [
	[4, 4],[4, 10],[4, 16],[10, 4],[10, 10],[10, 16],[16, 4],[16, 10],[16, 16],
];

let starPoints = [[5, 5]];

// グリッドを描画
function drawGrid() {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  
  for (let i = 0; i < gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
    ctx.lineTo(cellSize / 2 + i * cellSize, canvas.height - cellSize / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
    ctx.lineTo(canvas.width - cellSize / 2, cellSize / 2 + i * cellSize);
    ctx.stroke();
  }
  starPoints.forEach(([x, y]) => {
    drawStar(x - 1, y - 1);
  });
}

// 星を描画
function drawStar(x, y) {
    ctx.beginPath();
    ctx.arc(cellSize / 2 + x * cellSize, cellSize / 2 + y * cellSize, cellSize * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

// 石を描画
function drawStone(x, y, color) {
	if ((x<0)||(x>18)||(y<0)||(y>18)) return false;

	ctx.beginPath();
	ctx.arc((x + 0.5) * cellSize, (y + 0.5) * cellSize, cellSize * 0.45, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
	return true;
}

let board = Array(gridSize)
  .fill(null)
  .map(() => Array(gridSize).fill(0));

let boardHistory = [];
boardHistory.push(JSON.parse(JSON.stringify(board)));

// ボードサイズ変更
const size9Btn = document.getElementById("size9Btn");
const size13Btn = document.getElementById("size13Btn");
const size19Btn = document.getElementById("size19Btn");

function changeBoardSize(size) {
  gridSize = size;
  cellSize = (canvas.width - 2) / gridSize;
  board = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(0));
	boardHistory = []
	boardHistory.push(JSON.parse(JSON.stringify(board)));
	if (size === 9) starPoints = [[5, 5]];
	else if (size === 13) starPoints = [[4, 4],[4, 10],[10, 4],[10,10]];
	else starPoints = starPointsNine;
	currentPlayer = "black"
	redrawBoard();
}

size9Btn.addEventListener("click", () => changeBoardSize(9));
size13Btn.addEventListener("click", () => changeBoardSize(13));
size19Btn.addEventListener("click", () => changeBoardSize(19));

// 手番の表示
function updateCurrentPlayerDisplay() {
  const playerColorElement = document.getElementById("playerColor");
  playerColorElement.textContent = currentPlayer === "black" ? "黒" : "白";
}

// 石を打つ
humanBtn.addEventListener("click", () => {
  playWithComputer = false;
});

computerBtn.addEventListener("click", () => {
  playWithComputer = true;
});

const undoBtn = document.getElementById("undoBtn");
const passBtn = document.getElementById("passBtn");
const resignBtn = document.getElementById("resignBtn");

function undoMove() {
  if (boardHistory.length <= gameEndTime) return; // 最初の状態に戻った場合は無視。通常はgameEndTime=1
  boardHistory.pop(); // 直近の盤面状態を削除
  // 直接boardに代入するのではなく、新しいオブジェクトとしてコピーする
  board = JSON.parse(JSON.stringify(boardHistory[boardHistory.length - 1]));
	currentPlayer = currentPlayer === "black" ? "white" : "black";
  redrawBoard();
}

function passMove() {
  currentPlayer = currentPlayer === "black" ? "white" : "black";
  updateCurrentPlayerDisplay(); // 手番表示を更新
  consecutivePasses++; // 連続パスのカウントを増やす

  // 連続パスが2回になった場合、ゲームを終了し、勝敗を決定する
  if (consecutivePasses === 2 && boardHistory.length > 1) {
		gameEnded = true;
		gameEndTime = boardHistory.length
    showEndGameMessage();
  }
}


function resignGame() {
  if (currentPlayer === "black") alert(`黒が投了しました。白の勝ちです。`);
	else alert(`白が投了しました。黒の勝ちです。`);
}

undoBtn.addEventListener("click", undoMove);
passBtn.addEventListener("click", passMove);
resignBtn.addEventListener("click", resignGame);

// 以下、アタリ判定ロジック
function getAdjacentCoords(x, y) {
	const adjacentCoords = [];
	if (x > 0) adjacentCoords.push([x - 1, y]);
	if (x < gridSize - 1) adjacentCoords.push([x + 1, y]);
	if (y > 0) adjacentCoords.push([x, y - 1]);
	if (y < gridSize - 1) adjacentCoords.push([x, y + 1]);
	return adjacentCoords;
}

function getGroup(x, y, color, visited = new Set()) {
  const key = `${x},${y}`;
  if (visited.has(key) || board[y][x] !== color) return [];
  visited.add(key);
  const group = [{ x, y }];
  for (const [adjX, adjY] of getAdjacentCoords(x, y)) {
    group.push(...getGroup(adjX, adjY, color, visited));
  }
  return group;
}

// 地の計算
function getEmptyGroup(x, y) {
  return getGroup(x, y, 0);
}

function hasLiberties(x, y, color, visited = new Set()) {
  const key = `${x},${y}`;
  if (visited.has(key) || board[y][x] !== color) return false;
  visited.add(key);

  for (const [adjX, adjY] of getAdjacentCoords(x, y)) {
    if (board[adjY][adjX] === 0) return true;
  }

  for (const [adjX, adjY] of getAdjacentCoords(x, y)) {
    if (hasLiberties(adjX, adjY, color, visited)) return true;
  }
  return false;
}

function isInAtari(x, y, color) {
  return !hasLiberties(x, y, color);
}

function updateCaptureCounts() {
  const blackCapturesElement = document.getElementById("blackCaptures");
  const whiteCapturesElement = document.getElementById("whiteCaptures");
  blackCapturesElement.textContent = blackCaptures;
  whiteCapturesElement.textContent = whiteCaptures;
}

		
function captureStones(x, y, color) {
  let capturedCount = 0;
  for (const [adjX, adjY] of getAdjacentCoords(x, y)) {
    if (board[adjY][adjX] === -color && isInAtari(adjX, adjY, -color)) {
      const groupToCapture = getGroup(adjX, adjY, -color);
      for (const { x, y } of groupToCapture) {
        board[y][x] = 0;
        capturedCount++; // 石を取るたびにカウントを増やす
      }
    }
  }
  if (color === "white") {
    whiteCaptures += capturedCount;
  } else {
    blackCaptures += capturedCount;
  }
  updateCaptureCounts(); // アゲハマの表示を更新
}

// ランダムな手を打つ
function playRandomMove() {
	let isValid = false
	while (!isValid) {
		const x = Math.floor(Math.random() * gridSize);
		const y = Math.floor(Math.random() * gridSize);

		// 追加: クリックした位置が盤面の範囲外なら何もしない
		if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) continue;
		if (board[y][x] !== 0) continue; // 既に石がある場所は無視
		
		isValid = true
		board[y][x] = currentPlayer === "black" ? 1 : -1;
		captureStones(x, y, currentPlayer === "black" ? 1 : -1);
	}
}

// 死活判定はユーザーにしてもらう
function showEndGameMessage() {
  alert('死に石をクリックして取り除いてください。クリックミスした場合は「待った」で戻れます。全ての死に石を取り除いたら、「完了」ボタンを押してください。');
  document.getElementById('finish-judgment').style.display = 'inline-block';
	document.getElementById('currentPlayerDisplay').style.display = 'none';
}

function finishJudgment() {
  document.getElementById('finish-judgment').style.display = 'none';
	document.getElementById('currentPlayerDisplay').style.display = 'inline-block';
  calculateTerritoryAndDetermineWinner();
	gameEnded = false;
	gameEndTime = 1
}

// 勝敗判定
function calculateTerritoryAndDetermineWinner() {
  let blackTerritory = 0;
  let whiteTerritory = 0;
  let territoryMap = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(0));
  let visited = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(false));

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (board[y][x] === 0 && !visited[y][x]) {
        const emptyGroup = getEmptyGroup(x, y);
        let blackInfluence = false;
        let whiteInfluence = false;
        for (const { x, y } of emptyGroup) {
					visited[y][x] = true;
          const adjacents = getAdjacentCoords(x, y);

          for (const [adjX, adjY] of adjacents) {
            if (board[adjY][adjX] === 1) {
              blackInfluence = true;
            } else if (board[adjY][adjX] === -1) {
              whiteInfluence = true;
            }
          }
        }

        if (blackInfluence && !whiteInfluence) {
          blackTerritory += emptyGroup.length;
          for (const {x, y} of emptyGroup) {
            territoryMap[y][x] = 1;
          }
        } else if (whiteInfluence && !blackInfluence) {
          whiteTerritory += emptyGroup.length;
          for (const {x, y} of emptyGroup) {
            territoryMap[y][x] = -1;
          }
        }
      }
    }
  }

  // Show territory on the board
  redrawBoard(territoryMap);

	const result = blackTerritory + blackCaptures > whiteTerritory + whiteCaptures + 6.5 ? "黒の勝ち" : "白の勝ち";
  alert(`黒の陣地+アゲハマ: ${blackTerritory + blackCaptures} / 白の陣地+アゲハマ+コミ6.5: ${whiteTerritory + whiteCaptures + 6.5}\n結果: ${result}`);
}

// クリックイベント
function handleInteraction(event) {
  event.preventDefault();

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const p = (clientX - rect.left) * scaleX;
  const q = (clientY - rect.top) * scaleY;

	const x = Math.round((p - cellSize/2) / cellSize);
	const y = Math.round((q - cellSize/2) / cellSize);
	
	// 追加: クリックした位置が盤面の範囲外なら何もしない
	if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;

	if (gameEnded){
		if (board[y][x] === 0) return;
		if (board[y][x] === 1) whiteCaptures++;
		else blackCaptures++;
		board[y][x] = 0;
		boardHistory.push(JSON.parse(JSON.stringify(board)))
		updateCaptureCounts()
		redrawBoard()
		return;
	}

	if (board[y][x] !== 0) return; // 既に石がある場所は無視

	if (drawStone(x, y, currentPlayer)){
		board[y][x] = currentPlayer === "black" ? 1 : -1;
		captureStones(x, y, currentPlayer === "black" ? 1 : -1);
		currentPlayer = currentPlayer === "black" ? "white" : "black";
		if (playWithComputer) {
			redrawBoard()
			playRandomMove();
			currentPlayer = currentPlayer === "black" ? "white" : "black";
		}
	}
	consecutivePasses = 0;
	boardHistory.push(JSON.parse(JSON.stringify(board)))
	redrawBoard()
}

function redrawBoard(territoryMap = null) {
	// 背景色を設定
  ctx.fillStyle = "#f0f0f0";
  // 背景を塗りつぶす
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (board[y][x] !== 0) {
        const color = board[y][x] === 1 ? "black" : "white";
        drawStone(x, y, color);
      } else if (territoryMap) {
        if (territoryMap[y][x] === 1) {
          ctx.fillStyle = blackPattern;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        } else if (territoryMap[y][x] === -1) {
          ctx.fillStyle = whitePattern;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  }
	updateCurrentPlayerDisplay()
}

// グリッドを描画
changeBoardSize(9);
redrawBoard();

canvas.addEventListener("click", handleInteraction);
//canvas.addEventListener("touchend", handleInteraction);
canvas.addEventListener("mousedown", handleInteraction, false);
canvas.addEventListener("touchstart", handleInteraction, false);
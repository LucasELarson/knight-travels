setTimeout(() => {
   class BoardSquare {
      constructor(x, y, id) {
         this.x = x;
         this.y = y;
         this.id = id;
      }
   }
   let count = 0;

   let board;

   function makeBoard() {
      board = [];
      for (let i = 0; i < 8; i++) {
         for (let z = 0; z < 8; z++) {
            const spot = new BoardSquare(i, z, "s" + i + z);
            board.push(spot);
         }
      }
      for (let q = 0; q < board.length; q++) {
         const gameBoard = document.getElementById("board");
         const square = document.createElement("div");
         square.classList.add("square");
         if (board[q].x % 2 === board[q].y % 2) {
            square.setAttribute("id", board[q].id);
            square.classList.add("white");
            square.innerText = `(${board[q].x}, ${board[q].y})`;
            gameBoard.appendChild(square);
         } else {
            square.setAttribute("id", board[q].id);
            square.classList.add("black");
            square.innerText = `(${board[q].x}, ${board[q].y})`;
            square.style.color = "white";
            gameBoard.appendChild(square);
         }
      }
      console.log(board);
   }
   function Node(pos, path) {
      if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
         return null;
      }
      return { pos, path };
   }

   function knightMoves([x, y], [a, b]) {
      const q = [Node([x, y], [[x, y]])];
      let currentNode = q.shift();

      while (currentNode.pos[0] !== a || currentNode.pos[1] !== b) {
         const moves = [
            [currentNode.pos[0] + 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] + 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] + 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] + 1, currentNode.pos[1] + 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] + 2],
         ];
         moves.forEach((move) => {
            const node = Node(move, currentNode.path.concat([move]));
            if (node) {
               q.push(node);
            }
         });
         currentNode = q.shift();
      }
      console.log(`=> You made it in ${currentNode.path.length - 1} moves! The path is as follows:`);
      currentNode.path.forEach((pos) => {
         console.log(String(pos));
         // makes divs for  output //
         const output = document.getElementById("output");
         const outputdiv = document.createElement("div");
         outputdiv.setAttribute("id", "outputdiv");
         const outputtitle = document.createElement("h4");
         const outputText = document.createElement("h5");
         outputtitle.innerText = `Step ${count}`;
         outputText.innerText = String(pos);
         outputdiv.appendChild(outputtitle);
         outputdiv.appendChild(outputText);
         output.appendChild(outputdiv);

         // marks the path of the knight //
         const pathedSquare = document.getElementById(`s${pos[0]}${pos[1]}`);
         pathedSquare.style.backgroundColor = "grey";
         pathedSquare.style.backgroundColor = "grey";
         pathedSquare.style.fontSize = "3em";
         pathedSquare.style.textAlign = "center";
         pathedSquare.style.color = "#9f3333";
         pathedSquare.innerText = count;
         count++;
      });
   }
   makeBoard();
   const start = [];
   const end = [];

   const goButton = document.getElementById("run");

   goButton.addEventListener("click", () => {
      makeStart();
      makeEnd();
      knightMoves(start, end);
   });
   function makeStart(x, y) {
      const f1 = Number(document.getElementById("f1").value);
      const f2 = Number(document.getElementById("f2").value);
      start.push(f1, f2);
      console.log(start);
   }
   function makeEnd(x, y) {
      const e1 = Number(document.getElementById("e1").value);
      const e2 = Number(document.getElementById("e2").value);
      end.push(e1, e2);
      console.log(end);
   }
}, 1);
